---
title: Permissions
level: intermediate
---
The Bolt Permissions System
===========================

Bolt uses a [Role-Based Permission](https://en.wikipedia.org/wiki/Role-based_access_control)
system. This means that:

* Every *user* has zero or more *roles*
* Every *role* can grant zero or more *permissions*
* The same *permission* can be granted through several different *roles*
* Several users can have the same *role*, and one role can be granted to multiple *users*
* Every permission-protected *action* requires a given *permission*, or
  possibly a combination of *permissions*
* The same *permission* can govern more than one *action*, but usually we try
  to avoid this

The permissions needed to perform an action are hard-coded into Bolt, but
everything else is configurable by editing the YAML file
`config/bolt/permissions.yml`; this can be done either directly, or through
Bolt's back-end UI.

Things to keep in mind
----------------------

By changing the permissions you basically change the way how people can
interact with Bolt, and who is allowed to do what. By changing the permissions
you should be aware of the fact that you might inadvertently grant people
permissions you don't want them to have. Two important considerations:

 1. Permissions are quite central to Bolt's inner workings, and by
    misconfiguring them, you can lock yourself out - for example, removing the
    `IS_AUTHENTICATED_REMEMBERED` role from the `dashboard` permission will make
    the Bolt dashboard completely inaccessible for everyone.

 2. If somebody has the permission to `user:edit`, they can also grant
    permissions to themselves or others. This means they can give themselves
    roles with more permissions, or take away those roles from others.
    This is similar for a lot of permissions that are by default assigned
    to ROLE_ADMIN only.
    In short: **Do _not_ give someone the `ROLE_ADMIN` (or `ROLE_DEVELOPER`) role, 
    or change the setup in a way that they have permission to do things that were
    previously only accessible to `ROLE_ADMIN` unless you trust them fully!**


The `permissions.yml` File Format
---------------------------------

`permissions.yml`, like all of Bolt's configuration, is a YAML file, and the
default configuration provides extensive documentation.

Some notable things to watch out for:

* In a permission list, each item is a permission name mapped to a list of
  roles that grant this permission.
* In the ContentType specific permissions, there is a subtle difference between
  an entry specifying a permission with an empty list, and the absence of an
  entry. More on this later.
* The permissions for a given user are *not* stored in `permissions.yml`, but
  in Bolt's database; they can be administered through the back-end UI.

Types of Permissions
--------------------
Permissions fall into two categories: *global permissions* and
*per-ContentType permissions*.

**Global permissions** govern actions that are not specific to any ContentType,
such as editing configuration files, modifying users,
performing database maintenance, etc. These permissions can be found in the
`global:` section of the `permissions.yml` file; most of them map directly to a
URL route in the Bolt back-end, e.g. the `translation` permission maps
to `http://your-domain.org/bolt/translation`. The default configuration file
describes those permissions in more detail that do not follow this mapping.

**Per-ContentType permissions** govern actions specific to a ContentType. They
are defined in three "layers": the `contenttype-base`, `contenttype-default`,
and `contenttypes` sections. The way these work is a bit tricky to wrap one's
head around, but it allows for maximum flexibility without too much clutter.

For each ContentType, the following permissions are available:

| Permission  | Description |
|-------------|-------------|
| `create` | required to create new records |
| `edit` | required to modify existing records |
| `delete` | required to delete existing records; (note that it is usually preferable to disallow deletion entirely, and use depublication instead,  because deletion cannot be undone) |
| `change-status` | required to change the publication state of a record |
| `change-ownership` | required to transfer ownership of a record to another user (NOT IMPLEMENTED YET) |
| `view` | required to view a record in the admin interface (_not_ in the front end) -- note that the permissions above implicitly allow `view` as well|

How ContentType Specific Permissions Are Calculated
----------------------------------------------------
For ContentType related actions, permissions can be set individually for each
ContentType. For this, we define three groups of permission sets.

 - The `contenttype-base` permission sets *overrides*; any roles specified here
   will grant a permission for all ContentTypes, regardless of the rest of this
   section.
 - The `contenttype-default` contains rules that are used when the desired
   ContentType does not define a rule for this permission itself.
 - The `contenttypes` section specifies permissions for individual
   ContentTypes.

To understand how this works, it may be best to follow the `ContentVoter`
through its decision-making process.

It checks whether any of the current user's roles match any of the
roles in `contenttype-base/{permission}`. If so, the search is over, and the
permission can be granted.

The next step is to find `contenttypes/{contenttype}/{permission}`. If it is
found, then the permission can be granted if and only if any of the user's
roles match any role in `contenttypes/{contenttype}/{permission}`.

If either `contenttypes/{contenttype}` or
`contenttypes/{contenttype}/{permission}` is absent, the permission checker
uses `contenttype-default/{permission}` instead. If any role exists in both the
user's roles and `contenttype-default/{permission}`, the permission can be
granted.

Note especially that an *empty* set of roles in the ContentType section means
something else than the *absence* of the permission. If the permission is
defined with an empty role list, it overrides the role list in `contenttype-
default`; but if the permission is not mentioned, the corresponding entry in
`contenttype-default` applies.

Configuring Roles
-----------------
Bolt uses [Symfony Security](https://symfony.com/doc/current/security.html)
for its Roles and Permissions setup. Because of this part of the security configuration
is in `config/packages/security.yaml`.

The default setup will contain the following assignable roles: `ROLE_DEVELOPER`, `ROLE_ADMIN`, 
`ROLE_CHIEF_EDITOR`, `ROLE_EDITOR`, `ROLE_USER`.

These roles are put in a hierarchy specified in `config/packages/security.yaml`, this 
means that in the order specified above every role also has the permissions given to
the roles that are following it. (So `ROLE_ADMIN` can do everything `ROLE_CHIEF_EDITOR` can do etc.)

Below is an explanation of permissions for these roles in general terms, as
configured by default. Always check `config/bolt/permissions.yaml` if you want
to be certain.

`ROLE_USER` is the role a user gets when there is no role set. It doesn't
give access to anything in the Bolt administration panel.

`ROLE_EDITOR` is to be used when you want to limit the contenttypes that can be
edited.

`ROLE_CHIEF_EDITOR` is for the main editor of the website - the default setup is
such that this role allows editing _all_ contenttypes.

`ROLE_ADMIN` can do everything that is possible

`ROLE_DEVELOPER` can 'switch user', a function that is really convenient during 
development when you want to check the effects of security settings for other accounts.

There are also roles that should not be assigned in the config files. 
See for example `CONTENT_OWNER` below.

Content Ownership
-----------------

Every record of a ContentType has an *owner*; depending on the configuration,
the owner may have more permissions on a record than other users. This is
governed by the `CONTENT_OWNER` role. `CONTENT_OWNER` is assigned automatically by Bolt
within the context of a content item.

Ownership of a content item defaults to the user who created it, but it can be
transferred explicitly. Transferring ownership is governed by the `change-ownership` 
permission. (NOT IMPLEMENTED YET)

An Example: Editors and Chief Editors
-------------------------------------

In larger organisations, you may have a process in place where editors produce
content, but only the chief editor can decide if and when it is published. Each
editor is allowed to edit her own work, but not someone else's; the chief
editor, however, should be able to redact everyone's articles.

To achieve this, grant the `create` permission to a role named `ROLE_EDITOR`, and
the `change-status` permissions to a role named `ROLE_CHIEF_EDITOR`.
Additionally, grant `edit` to the `CONTENT_OWNER` role and to `ROLE_CHIEF_EDITOR`.

This is what it looks like in `permissions.yml`:

```
contenttype-default:
    edit: [ CONTENT_OWNER, ROLE_CHIEF_EDITOR ]
    create: [ ROLE_EDITOR, ROLE_CHIEF_EDITOR ]
    change-status: [ ROLE_CHIEF_EDITOR ]
    change-ownership: [ ROLE_CHIEF_EDITOR ]
```


Manually Checking Permissions
-----------------------------

Sometimes, you want to check permissions as part of a template or extension.
You can use the default Symfony functionality for this.
In code you can inject the `Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface` 
and use it like `$authorizationChecker->isGranted('permissionname'))`
In twig templates the `is_granted('permissionname')` is available. 
If the permission is object specific you should pass that object (content item)
as a second parameter, e.g. `is_granted('change-status', record)` 


A few examples:

```php
# check if the currently authenticated user has permission to view the dashboard
/** @var AuthorizationCheckerInterface $authorizationChecker */
$authorizationChecker->isGranted('dashboard');
```

```twig
# check if the currently authenticated user can change the status of this record:
is_granted('change-status', record)
```

Debugging Permissions
---------------------

Use the symfony toolbar to debug permissions in combination with the 'switch user'
functionality available to users with the `ROLE_DEVELOPER` role.

Extending the Permission System
---------------------

Bolt uses [Symfony Security](https://symfony.com/doc/current/security.html), this
makes it relatively easy to obtain documentation and tips on how to achieve what you want.
Start by reading the linked documentation when you want to make a change.
The Bolt classes that implement the Bolt specific functionality are 
in the `Bolt\Security` namespace. `ContentVoter` and `GlobalVoter` are doing most
of the decision making. (Strictly speaking they are only 'voting' and the decision is
made elsewhere in the security system)

If you search the Bolt core code for `isGranted` and the templates for `is_granted` you will 
find almost all places where security checks are currently used.
