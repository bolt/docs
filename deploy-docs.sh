#!/usr/bin/env bash

# CONFIGURATION NOTE:
#
# The $SITE_DIR/var/cache/ directory needs to have the following set:
#
#     setfacl -R --no-mask -m u:nginx:rwX -m u:bolt:rwX var/cache
#     setfacl -dR --no-mask -m u:nginx:rwX -m u:bolt:rwX var/cache
#

REMOTE="origin"

function fail_gracefully () {
    echo "Exiting due to error!"
    exit 1
}

function update_branch () {
    SITE_DIR=$1
    ver=$2

    pushd $SITE_DIR/var/versions/$ver > /dev/null
    [[ $? -ne 0 ]] && fail_gracefully

    echo "Pulling $REMOTE $ver"

    if [[ $ver == "master" ]] ; then
        BRANCH="$ver"
    else
        BRANCH="$ver"
    fi

    echo ""
    echo "###############################################################################"
    echo "Updating $BRANCH"
    echo ""

    git pull $REMOTE --rebase $BRANCH
    [[ $? -ne 0 ]] && fail_gracefully

    popd > /dev/null
}

function do_deploy () {
    SITE_DIR=$1

    if [ ! -d $SITE_DIR ] ; then
        echo ""
        echo "Bolt Docs Site root directory not found or misconfigured, expected:"
        echo "    $SITE_DIR"

        fail_gracefully
    fi

    pushd $SITE_DIR > /dev/null

    VERSIONS=$(git branch -a | grep -E "remotes/origin/(2\.[2]|3\.[0-9]|4\.[0-9])" | sed 's/remotes\/origin\///g' | sort)

    if [[ $VERSIONS == "" ]]; then
        echo "Problem deploying no branches found!"
        fail_gracefully
    fi

    git remote update --prune
    [[ $? -ne 0 ]] && fail_gracefully

    echo ""
    echo "###############################################################################"
    echo "Updating site branch"
    echo ""

    git checkout -q site
    [[ $? -ne 0 ]] && fail_gracefully

    git pull --rebase
    [[ $? -ne 0 ]] && fail_gracefully

    composer install --no-dev
    [[ $? -ne 0 ]] && fail_gracefully

    for ver in $VERSIONS ; do
        update_branch $SITE_DIR $ver
    done

#    update_branch $SITE_DIR master

    popd > /dev/null

    # Remove cache files
    echo "Flushing cache directories"
    rm $SITE_DIR/var/cache/* -rf
}

do_deploy /var/www/sites/docs.bolt.cm/production/
do_deploy /var/www/sites/docs.bolt.cm/development/

echo ""
echo "-------------------------------------------------------------------------------"
echo Finished at $(date)
echo "-------------------------------------------------------------------------------"
echo ""
