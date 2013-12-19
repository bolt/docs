The Bolt Permissions System
===========================

Bolt uses a [Role-Based Permission](https://en.wikipedia.org/wiki/Role-based_access_control)
system. This means that:

* Every *user* can be a member of zero or more *roles*
* Every *role* can grant zero or more *permissions*
* The same *permission* can be granted through several different *roles*
* Several users can be members of the same *role*
* Every permission-protected *action* requires a given *permission*, or
  possibly a combination of *permissions*
* The same *permission* can govern more than one *action*, but usually we try
  to avoid this

The permissions needed to perform an action are hard-coded into Bolt, but
everything else is configurable by editing the YAML file `app/config/permissions.yml`;
this can be done either directly, or through Bolt's back-end UI.

A Word Of Warning
-----------------

Permissions are quite central to Bolt's inner workings, and by misconfiguring
them, you can lock yourself out - for example, removing the `anonymous` role
from the `login` or `postLogin` permissions will make logging in completely
impossible: you won't even see the login page.

The `permissions.yml` File Format
---------------------------------

`permissions.yml`, like all of Bolt's configuration, is a YAML file, and the
default configuration provides extensive documentation.

Some notable things to watch out for:

* In a permission list, each item is a permission name mapped to a list of
  roles that grant this permission.
* In the content-type specific permissions, there is a subtle difference
  between an entry specifying a permission with an empty list, and the absence
  of an entry. More on this later.
* The permissions for a given user are *not* stored in `permissions.yml`, but
  in Bolt's database; they can be administered through the back-end UI.

Types of Permissions
--------------------
Permissions fall into two categories: *global permissions* and *per-contenttype
permissions*.

**Global permissions** govern actions that are not specific to any content
type, such as editing configuration files, modifying users, logging in and out,
performing database maintenance, etc. These permissions can be found in the
`global:` section of the `permissions.yml` file; most of them map directly to a
URL route in the Bolt back-end, e.g. the `global:translation` permission maps
to `http://your-domain.org/bolt/translation`. The default configuration file
describes those permissions in more detail that do not follow this mapping.

**Per-Contenttype permissions** govern actions specific to a content type. They
are defined in three "layers": the `contenttype-all`, `contenttype-default`,
and `contenttypes` sections. The way these work is a bit tricky to wrap one's
head around, but it allows for maximum flexibility without too much clutter.

For each content type, the following permissions are available:

* `create` - required to create new records
* `edit` - required to modify existing records
* `delete` - required to delete existing records; (note that it is usually
  preferable to disallow deletion entirely, and use depublication instead,
  because deletion cannot be undone)
* `publish` and `depublish` - required to change the publication state of a
  record
* `change-ownership` - required to transfer ownership of a record to another
  user

How Content Type Specific Permissions Are Calculated
----------------------------------------------------
For content type related actions, permissions can be set individually for
each content type. For this, we define three groups of permission sets.
The 'contenttype-all' permission sets *overrides*; any roles specified here
will grant a permission for all content types, regardless of the rest of this
section.
The 'contenttype-default' contains rules that are used when the desired
content type does not define a rule for this permission itself.
The 'contenttypes' section specifies permissions for individual content
types.

To understand how this works, it may be best to follow the permission checker
through its decision-making process.

First, it checks whether the current user is in the "root" role; if so, it
short-circuits and always grants anything unconditionally.

Otherwise, it checks whether any of the current user's roles match any of the
roles in contenttype-all/{permission}. If so, the search is over, and the
permission can be granted.

The next step is to find contenttypes/{contenttype}/{permission}. If it is
found, then the permission can be granted if and only if any of the user's
roles match any role in contenttypes/{contenttype}/{permission}.

If either contenttypes/{contenttype} or
contenttypes/{contenttype}/{permission} is absent, the permission checker
uses contenttype-default/{permission} instead. If any role exists in both the
user's roles and contenttype-default/{permission}, the permission can be
granted.

Note especially that an *empty* set of roles in the contenttype section means
something else than the *absence* of the permission. If the permission is
defined with an empty role list, it overrides the role list in
contenttype-default; but if the permission is not mentioned, the
corresponding entry in contenttype-default applies.

Configuring Roles
-----------------
A simple web site will typically use a three-tiered role system: editors,
administrators, and developers. Such a system matches the access-level based
system found in earlier Bolt versions. Available roles can be configured in the
`roles:` section of the `permissions.yml`.

Besides the user-configurable roles, Bolt implements four built-in roles that
cannot be changed (but they *can* be configured to grant permissions). These
roles are:

* `root`, the "superuser" role; Bolt will automatically grant all permissions
  to this role. Manually adding it to any permission is pointless, because it
  implicitly grants every permission anyway.
* `everyone`, the "anonymous" role; every user automatically has this role.
  Adding the `everyone` role to any permission will grant it to all users.
* `owner`: this role is only valid in the context of an individual content
  item, and the user who "owns" the item (usually the person who created it)
  will be in the `owner` role.
* `anonymous`: this role is automatically assigned at all times, even when
  no user is logged in at all.

Content Ownership
-----------------

Every record of a content type has an *owner*; depending on the configuration,
the owner may have more permissions on a record than other users; this is
governed by the magic `owner` role, which is assigned automatically by Bolt
within the context of a content item.

Ownership of a content item defaults to the user who created it, but it can be
transferred explicitly. Transferring ownership is governed by the
`change-ownership` permission.

An Example: Editors and Chief Editors
-------------------------------------

In larger organisations, you may have a process in place where editors produce
content, but only the chief editor can decide if and when it is published. Each
editor is allowed to edit her own work, but not someone else's; the chief
editor, however, should be able to redact everyone's articles.

To achieve this, grant the `create` permission to a role named `editor`, and
the `publish` and `depublish` permissions to a role named `chief-editor`.
Additionally, grant `edit` to the magic `owner` role and to `chief-editor`.

This is what it looks like in `permissions.yml`:

<pre>
contenttype-default:
    edit: [ owner, chief-editor ]
    create: [ editor, chief-editor ]
    publish: [ chief-editor ]
    depublish: [ chief-editor ]
    change-ownership: [ chief-editor ]
</pre>
