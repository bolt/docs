Bolts Docs Asset Building
=========================

Quick Start
-----------

### Install Yarn

#### CentOS & RHEL 6, Fedora 21

```
    sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
    sudo yum install yarn
```


#### CentOS & RHEL 7, Fedora 22+

```
    sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
    sudo dnf install yarn
```


#### Debian/Ubuntu Linux

```
    sudo apt-key adv --fetch-keys https://dl.yarnpkg.com/debian/pubkey.gpg
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn
```


#### OS X (with Homebrew)

```
    brew update
    brew install yarn
```


#### Windows

Download and install the MSI from [Yarn's site](https://yarnpkg.com/).
Direct link: [latest.msi](https://yarnpkg.com/latest.msi).


### Install required components:

```
    cd app/src/
    yarn install --strict-semver
```


### Rebuild CSS & JavaScript:

Only build assets:

```
    yarn run gulp build
```

Build and leave watch running:

```
    yarn run gulp
```


**NOTE:** Removing the `build` argument will leave Gulp watching for changes
and rebuild as required.

### Updating dependencies to their latest versions:

Use `npm-check-updates` to check for packages that have major updates, not
caught by the regular update that respects SemVer.

If you don't foresee problems, run `npm-check-updates -u`.

Next, upgrade yarn:

```
    yarn upgrade --strict-semver
    yarn install --strict-semver
```
