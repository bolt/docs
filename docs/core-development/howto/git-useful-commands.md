---
title: Useful git commands
level: advanced
---
Useful git commands
===================

This HOWTO is aimed at people doing development, or debugging, of Bolt.

They are not recommended as installation guides **especially for production
environments**.

**WARNING:** Always make backups! 


Assumptions
-----------

This HOWTO makes the following assumptions throughout

  * Bolt's main repository remote is called "`upstream`"
  * Your personal fork of the `bolt/bolt` repository remote is called "`origin`"
  * `X.Y` notation is used to refer the semantic versioning of "minor" and
    "patch" release numbers.


Cloning Bolt
------------

To clone the main Bolt repository, simply clone and name the remote repository.

```
mkdir /my/bolt/clone/directory
cd /my/bolt/clone/directory
# Note the dot at the end of the next line!
git clone https://github.com/bolt/bolt.git .
git remote rename origin upstream
```

You can now get changes for Bolt's main repository by simply pulling the branch
your are tracking. 


Following (tracking) a new branch
---------------------------------

Tracking a (pre-)release branch is done by *minor* and *patch* numbers.

```
git fetch upstream
git checkout -b release/X.Y upstream/release/X.Y
```
Firstly, this does a "fetch" of Bolt's main repository, meaning it retrieves
the changes to git's database and updates its internal knowledge of 
*upstream's* branches, without applying them to your local branches. 

The second command will then create the branch `release/X.Y` as-at the current
git `HEAD` commit on `upstream`'s `release/X.Y`branch.


What branch am I on?
--------------------

A useful trick to keep in mind, to identify the branch you are on, you can use
the `git branch` command.

It will output a list of your local branches, with the active (current) one
prefixed with a `*`.

```
  feature/world-peace
  hotfix/issue-1555
  master
  release/2.2
  release/3.0
* release/3.1
  release/3.2
```


Setting your Bolt fork as a remote
----------------------------------

```
git remote add origin https://github.com/YourName/bolt.git
```


What remote repositories am I connected to?
-------------------------------------------

```
git remote -v
```

Will show output similar to:

```
origin      git@github.com:YourName/bolt.git (fetch)
origin      git@github.com:YourName/bolt.git (push)
upstream    https://github.com/bolt/bolt.git (fetch)
upstream    https://github.com/bolt/bolt.git (push)
```


Change status of current branch
-------------------------------

To determine if your **currently checked out** git branch has uncommitted
changes, `git status` is your friend.

Always keep this command in regular use. 

If nothing has change the output will be similar to:

```
On branch hotfix/issue-1555
Your branch is up-to-date with 'origin/hotfix/issue-1555'.
nothing to commit, working directory clean

```


Switching branches
------------------

```
git checkout release/X.Y
``` 


Updating a tracked branch
-------------------------

```
git pull
``` 

Updating a un-tracked branch from Bolt
--------------------------------------

```
git pull upstream release/X.Y
``` 

Updating master branch from Bolt's master
-----------------------------------------

```
git checkout master
git pull upstream master
``` 


Showing the changes to the current branch
-----------------------------------------

These assume that you created the current branch from the starting point
of `release/X.Y` branch.  

Not that changes that have been pulled into the local branch your are comparing
will also show.


### Log entries

To see an abbreviated list, or one commit per-line:

```
git log --oneline release/X.Y..HEAD
```

Omitting the `--oneline` provides more verbose change logs.


### File(s) that change

```
git diff --stat release/X.Y..HEAD
```

Will give some output similar to:

```
 src/Application.php         |  6 +-----
 src/Controller/Frontend.php | 11 ++++++++++-
 src/Stack.php               | 18 ++++++++++++------

```

Removing the `--stat` will show the summary of differences to lines. 
