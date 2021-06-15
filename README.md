Bolt Documentation Site & Content
=================================

This repository is for both the site, and content, of [Bolt][bolt], and should 
be considered a counterpart of the [Bolt Core repository][repo].

The documentation uses the [Markdown][markdown] format.

There is no need to build anything to generate HTML. We parse the markdown with
PHP.

Since this repository is set up to use git's worktree feature, it is advised to
use git version 2.5 or later.

**Note:** Git worktree is a dumpster fire. If a branch breaks, see below on how to 
fix it.

Updating Documentation
----------------------

The repository uses branches to group documentation relevant to each version in
the format of `<major.minor>`, e.g. `3.0`.

Changes should be PR-ed against the *lowest* relevant version and will then be
merged down into higher version branches as required.

e.g. if you're fixing a typo that exists in the same Markdown file in both 
version 3.0 as well as in 3.1, you would checkout `3.0` and submit your PR 
against that branch.

Local site set-up
-----------------

To run the site locally you need to complete the following steps:

  * Create the repository with `git clone`
  * Create worktrees for required versions
  * Run `composer update` to install required vendor libraries

### Site Set-up

```
git clone git@github.com:bolt/docs.git bolt-docs
cd bolt-docs
git checkout site
composer install
```

### Worktrees Set-up

An example that sets up work trees for version 4.0 of the documentation
branches:

```
git worktree add -b 4.0 var/versions/4.0
```

Alternatively, if you have `grep` and `sed` installed, this will set up all of
the version worktrees for you

```
for VERSION in $(git branch --remotes --list | grep -E "^  origin\/[2-9]" | sed 's/origin\///g'); do
    git branch $VERSION origin/$VERSION
    git worktree add var/versions/$VERSION $VERSION
done
```

### Configure Default Version

For your local environment you can edit the `.env` file, located in the project
root. It should contain the following:

```
DEFAULT_VERSION=4.0
APP_ENV=dev
```

### Web Server Set-up

Finally if you wish to use the built-in PHP web server, it can be run from the
`bolt-docs/` folder, pointing to `public/` as the document root.

```
php -S 127.0.0.1:8000 -t public public/index.php
```

You can also use the Symfony web server bundle. You will need to start by
preparing the project:

```
git stash
composer require server --dev
git reset --hard HEAD
rm config/routes/annotations.yaml -f
git stash pop
```

Then starting the web server:
```
bin/console server:start
```

Alternatively, configure your preferred web server to point at the `public/`
folder.

To see the documentation site go to `example.localhost/3.5/`, from where you'll
get redirected to the front page of the documentation.

## Building front-end assets

First, install the `npm` dependencies: 

```bash
npm install
```

Then, build the assets: 

```bash
npm run build 
```

## If a "worktree" breaks, here's how to fix it

As mentioned above, Git's worktree feature is iffy at best. It might 
break all of a sudden, with no apparent way to fix it:

```bash
$ git pull
fatal: not a git repository: /Users/bob/Sites/docs/.git/worktrees/XXX
```

To fix it, run the following commands, replacing `XXX` with the actual 
name of your broken worktree branch.

```bash 
cd ..
rm -rf XXX
git worktree prune
git branch -D XXX
git worktree add -b XXX XXX
cd XXX

# note: you are now in a new `XXX` folder, but you need to `reset` 
# it to actually show `XXX`, and not a botched copy of another branch
git checkout master
git branch -D XXX
git checkout XXX
```

[bolt]: http://docs.bolt.cm/
[markdown]: http://daringfireball.net/projects/markdown/
[repo]: https://github.com/bolt/core
