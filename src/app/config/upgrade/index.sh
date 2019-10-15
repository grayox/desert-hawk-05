#!/bin/bash
# Procedure for changing files not in app/
# 1. ensure new file gets copied to future upgrade
#    a. copy clone original file
#    b. rename original file "x.js" as "x-orig.js"
#    c. modify cloned file
#    d. add "path/to/x.js" to xfer.txt
# 2. if complete directories are modified
#    a. move entire directory to app/
#    b. rename directory to app/source-orig
#    c. add "path/to/source" to list of "compareDir" commands in compare.sh file
#
# Config Upgrades
#
# ref: https://www.macs.hw.ac.uk/~hwloidl/Courses/LinuxIntro/x984.html
#
# Usage:
# non-recurring, make it executable
# chmod a+x v04/src/app/config/upgrade/index.sh
# run the following each time; in this case, to upgrade from v04 to v05
# -----------------------------------------------------------------------------
# ./v04/src/app/config/upgrade/index.sh 04 05
# -----------------------------------------------------------------------------
# navigate to and run the script while in the following directory
# cd dropbox/swap/fuse

# step 0 of 9
# define variables
backup="archive" # name of directory (relative to where script is run from) where we will save backup/archive
timestamp="$(date +%s)" # unique name identifier to prevent accidental overwrites
compareto="xfer.txt"
localpath="src/app/config/upgrade"
remoterepo="https://github.com/grayox/desert-hawk"
targetrepo="https://github.com/withinpixels/fuse-react"
old=$1 # 04
new=$2 # 05

# step 1 of 9
# init all scripts allows them to be executed
chmod a+x "v$old/$localpath/index.sh"
chmod a+x "v$old/$localpath/clone.sh"
chmod a+x "v$old/$localpath/compare.sh"
chmod a+x "v$old/$localpath/copy.sh"
chmod a+x "v$old/$localpath/git.sh"
chmod a+x "v$old/$localpath/update.sh"

# # step 2 of 9 (deprecated)
# # make backup tar file in case of accidental overwrite or deletion
# # ref: http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-5.html
# # ref: http://www.bic.mni.mcgill.ca/users/kate/Howto/tar_notes.html
# # tar -xf myfile_20040617.tar # extract files
# # mkdir $backup-$timestamp
# tar -cfzv backup-v$old-$timestamp.tgz v$old
# # deprecate: use rsync instead

# step 2 of 9
# make backup archive in case of accidental overwrite or deletion
# ref: https://linux.die.net/man/1/rsync | https://stackoverflow.com/a/14789400
mkdir "v$old-$backup-$timestamp/"
rsync -av --progress v$old "v$old-$backup-$timestamp/" \
  --exclude node_modules \
  --exclude coverage \
  --exclude build \
  # -n # test run

# # # step 3 of 9 (optional)
# # # clone remote upgrade to local repo or manually download and unzip prior to step 0
# # chmod a+x "v$old/$localpath/clone.sh"
# # "./v$old/$localpath/clone.sh" $old $new $targetrepo
# git clone "$targetrepo.git" "v$new"
# git clone https://grayox@github.com/withinpixels/fuse-react v05
# git clone https://maria-le@github.com/withinpixels/fuse-react v05
# git clone https://<username>:<password>@github.com/<ORG_NAME>/<PROJECT-NAME>.git
# https://stackoverflow.com/q/53548940

# step 4 of 9
# copy files and directories to upgraged version
# ./v04/src/app/config/upgrade/copy.sh
# "./v$old/$localpath/copy.sh" $old $new $localpath $compareto

# step 5 of 9
# make this script executable for next run
chmod a+x "v$new/$localpath/index.sh"
# remember to include (the appropriate version of) the above command in every new file added here to the index.sh

# step 6 of 9
# engage git tracking
"./v$old/$localpath/git.sh" $old $new $localpath $remoterepo

# step 7 of 9
# update yarn and all dependencies
"./v$old/$localpath/update.sh" $old $new $localpath

# step 8 of 9
# compare files for changes
# compare all files in xfer.txt
"./v$old/$localpath/compare.sh" $old $new $localpath $compareto

# # step 9 of 9
# # start dev server
# cd "v$new"
# yarn start

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# NOTES
# - add all new files to /src/app
# - ~@edit@~ remove (comment out) footer and rightSidePanel from <FuseLayout> in index.js
# - insert new logo in root/public/assets/images/logos/new-brand.svg
# - ~@edit@~ branding in src/main/MainNavbarHeader.js (2 places)

# 1. /src/fuse-configs/fuseNavigationConfig.js -- duplicate(append: `-orig`); rewrite file
# 3. /src/main/content/components/ComponentsConfig.js => /src/app/ComponentsConfig.js (now /src/app/config/ComponentsConfig.js)
#    - when editing routes in 3 (ComponentsConfig), make sure they match the url in 1 (fuseNavigationConfig).
#    - and that the redirectTo in 2 (fuseRoutesConfig) matches the first (home) route in both 1 (fuseNavigationConfig) and 3 (ComponentsConfig)
# 4. note: home page redirection is via
#    A. /src/fuse-configs/fuseRoutesConfig.js
#    B. /src/main/content/apps/dashboards/analytics/AnalyticsDashboardAppConfig.js
#       note: to avoid collisions, might want to turn off this path/link connection at a later time