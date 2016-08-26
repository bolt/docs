---
title: Contributing to Bolt
---
Contributing to Bolt code or docs
=================================

Whether you're a user of Bolt, a developer or both: contributing to Bolt is
easy! This document shows what you can contribute and how to contribute to make
it an even better product!

How you can contribute
----------------------

- Discuss topics on the [wiki](https://github.com/bolt/bolt/wiki)
- Comment on, or add [issues](https://github.com/bolt/bolt/issues?state=open)
- Contribute docs to [bolt-docs](https://github.com/bolt/bolt-docs).
- Contribute code to [bolt](https://github.com/bolt/bolt)
- Write [extensions](../extensions/introduction)

Contributing docs or code
-------------------------

Basically this comes down to forking, branching and issuing pull requests. For
some background information your can read this [help/manual][fork] of Github.

Fixing particular issues
------------------------

When you're going to work on a particular issue, be sure to make a separate branch for it
as this allows for better separation between the issues you're working on. This also helps
us analyzing pull requests and we simply cannot accept pull requests with a lot of fixes
running across each other. We try to work in the following way (which is pretty common on
Github projects):

- Branch the repo you're basing the fix on. (This is often the master branch). A commonly
  used name for branches looks like `"issue-<issue number>-<issue title>"`. This can then
  easily be identified.
- Fix the issue and commit the files to your created branch. If needed, you can
  [refer][refer] (see the supported synonyms or use `#<issue number>` to just
  refer to issues) to Github issue numbers in your commit message.
- Push the branch to your own Github account.
- Go to your Github account, switch to the branch you pushed and look for the
  pull request button.
- Double-check if the changed files are correct.
- Fill in a descriptive title and a description. In this field you can also
  refer to issues in the same way as in commits, shown above.
- Now the waiting begins until your pull request is reviewed. This will result
  in the pull request either being discussed, accepted or rejected.

Creating a new feature
----------------------

For a new feature there is a three step process:

*Note*: This obviously doesn't include bug fixes

### Step 1 - RFC submission

Create a GitHub issue with the prefix of `[RFC]` in the subject line.

Describe:
- What the feature is
- What the impacts are

### Step 2 - RFC moved to Roadmap

Once approved, a core team member will add the feature and contributor's GitHub
handle to the [Roadmap][roadmap] wiki page

### Step 3 - Feature implemented and merged into version `-next`

Once the feature window is open the contributor can submit a PR for review and
merging.

Step by step guide to forking, branching and pushing
----------------------------------------------------

If you're not yet proficient with forking, branching and pushing your fix,
here's a step- by-step guide: This example assumes that you have a Github
account and uses the **bolt code repository**. The commands also hold for the
other repositories. The only thing which should be changed is the repository
url. The steps cover this [help/manual][fork] of Github. Lines starting with `#`
are comments, lines with `$` are commands which you need to execute in your
terminal.

- Step 1: Go to `https://github.com/bolt/bolt` and click the fork button You now
  have your own bolt repository, named `<your github username>/bolt`. In my case
  this is `bobdenotter/bolt`.
- Step 2: You now need to clone the project from your personal repository to
  your local machine to be able to work on it. Open up a terminal and navigate
  to the folder you'd like to put your project in. Clone the repository to your
  machine, like so:

    `$ git clone https://github.com/<your github username>/bolt.git`

- Enter the project you've just cloned by changing to the folder just created:

  `$ cd bolt`

- Step 3: Now you're in the project folder, you have a git root here. This root
  is in a hidden folder `.git/`. You now need to configure the bolt repository
  to be the source you want to get updates from. This is a remote repository
  called the 'upstream'. Add the upstream like so:

  `$ git remote add upstream https://github.com/bolt/bolt.git`

  You can now update your local version of bolt with the latest version of bolt
  of the official repository by fetching the code from the 'upstream' you've
  just added.

  `$ git fetch upstream`

  Now that the latest data is downloaded, you need to merge them in your own
  branch. If you're stepping through this, the following command is okay for
  now:

  `$ git merge upstream/master`

  The changes have now been applied and you've got the latest version of bolt.

- Step 4: You can now push this version to your own Github account like so:

  `$ git push origin master`

  Where 'master' stands for your local branch (it is called the 'master' branch)
  and origin is the repository you've cloned from, which is your own Github
  repo.

- Step 5: Branching. When you're ready to take on an issue, you should create a
  branch. If you're creating a branch of your master branch, make sure it's up
  to date (step 3). Let's say we want to take on issue `#123` called "create login
  form". A branch name which can easily be identified would be "issue-123
  -create-login-form". You can create it like so:

  `$ git branch issue-123-create-login-form`

  You're now working in a branch. Any commit you do while you're in this branch
  will be commited to this branch only.

- Step 6: When you're done fixing, you can push your branch to a **new** branch
  in your Github repository by pushing your branch 'issue-123-create-login-form'
  to a new branch 'issue-123-login-form' to the destination 'origin' (your
  Github repo):

  `$ git push origin issue-123-create-login-form:issue-123-create-login-form`

- Step 7: Go to the right repository (here:
  `https://github.com/<username>/bolt`) and switch to the branch 'issue-123
  -create-login-form'. Then find the pull request button to create a pull
  request. In the pull request screen, you can do three things: you can view
  your commits, the changed files and fill in a title and description. First
  double-check if the changed files are the ones you've changed and want to
  contribute. (You can check the commits as well if you like to). Then fill in a
  descriptive title and a description (see "Pull Request Details" section
  below).

- Step 8: When your pull request has been accepted and merged, you can delete
  the branch 'issue-123-create-login-form' as the files are now part of the
  'upstream' repository of bolt. This means that you and the rest of the world
  automatically get those files when updating from upstream (`git fetch upstream`
  and merging it).

Pull Request Details (PR)
-------------------------

Details of your changes should be susinctly documented in the pull request. For
new features it should include a short use case and justification.

Along with notating any issues the PR fixes, it should include mentions of any
other PRs it depends on, and any relevant changelog updates.

As an example:

```
These changes stop kittens from crying due to poorly formatted CatNip requests.

Fixes #1024
Fixes #2048
Depends on #3072

Changelog
---------

* Feature: My change does something cool (see #1024)
* Fixed: Something that was broken (see #2048)
* Updated: FooBar library to v1.3.6
```

[fork]: https://help.github.com/articles/fork-a-repo
[refer]: https://github.com/blog/831-issues-2-0-the-next-generation
[roadmap]: https://github.com/bolt/bolt/wiki/Bolt-2.x-Roadmap
