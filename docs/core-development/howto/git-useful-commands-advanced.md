---
title: Useful git commands - Advanced
level: advanced
---
Useful git commands - Advanced
==============================

This HOWTO is aimed at people doing development, or debugging, of Bolt.

They are not recommended as installation guides **especially for production
environments**.

**WARNING: Always make backups!** 

<p class="tip"><strong>Tip:</strong> This guide is an advance guide, best 
suited to people comfortable with `git` basics. 
</p>


Assumptions
-----------

This HOWTO makes the following assumptions throughout

  * Bolt's main repository remote is called "`upstream`"
  * Your personal fork of the `bolt/bolt` repository remote is called "`origin`"
  * `X.Y` notation is used to refer the semantic versioning of "minor" and
    "patch" release numbers.


Rebasing
--------

**REALLY BIG WARNING:** Rebasing as detailed here, is **only** to be done to
affect non-release or master branches, more specifically those under **sole
personal use** for preparation of pull requests.

<p class="tip"><strong>Tip:</strong> If during a rebase, things go horribly
wrong and you want to just abort the process, well git provides 
`git rebase --abort` to get you back to where you started.
</p>


### Rebasing against desired merge branch

**NOTE** 
This assumes that the branch you are wanting to have merged, is having its
starting point moved from the `HEAD` when branched, to the `HEAD` commit of 
`upstream`.


```
git checkout hotfix/issue-1555
git fetch upstream/release/X.Y
git rebase upstream/release/X.Y
```

This will checkout your local working branch, fetch the changes from Bolt's
main repository, without merging them, and then attempts to rebase.


### Combining several commits into one

If you have several commits that are better served to your fellow programmers
as a single change, making it more relevant for reviewers. 

To commence a rebase in this way, you provide the `-i` option:

```
git rebase -i upstream/release/X.Y
```

This will start your configured console editor, with a list of commits similar
to:

```
pick 276cbfc Move x, y, z
pick b82ea54 Actually move y
pick 9fefe1e Actually, actually move z
pick 766b73e Fix something

```

Assuming the second and third commits should be combined with the first, you
simply change the verb from `pick` to `fixup` or even just `f`.


```
pick 276cbfc Move x, y, z
fixup b82ea54 Actually move y
fixup 9fefe1e Actually, actually move z
pick 766b73e Fix something

```

Once saved, and you've exited the editor, git will attempt to combine the three
commits, leaving the last one alone.


```
876cb10 Move x, y, z
a16b910 Fix something
```


### Moving a branch from one starting point to another

If your branch was started from one branch, and you wish to reattach the
starting point of *your* branch, of another: 

```
git rebase --onto <new branch> <old branch>

```

This is very useful if a branch is required to be merged into a different
branch than it was started from. 
