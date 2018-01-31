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

Development build of the assets:

```
    yarn dev
```

Development build & watch for changes:

```
    yarn watch
```

Build assets for deployment:

```
    yarn build
```


### Updating dependencies to their latest versions:


Run Yarn in interactive mode and select the libraries to upgrade:

```
    yarn upgrade-interactive --latest
```
