#!/bin/bash
#
# Engage git tracking

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# define variables
old=$1
new=$2
localpath=$3
remoterepo=$4

# make this script executable for next run
chmod a+x v$new/$localpath/git.sh

# navigate to local directory
cd "v$new"

# /users/atlasgroup/Dropbox/GitNotes.txt
# ITEM 4 - Shortcut procedure summary for backing up github remote repository
# git config --list
# git config github.user grayox
# git remote -v
# git remote set-url origin https://github.com/grayox/desert-hawk-05
# git add -A
# git commit -m "new commit"
# git push -u origin master
#   ------------ verify key backup operations ------------
#   # First, ensure you documented the changes made to the new version and what the plan is for the next version (todo)
#   # Document above changes and todo on the file named dropbox/<appname>/<vx>/README.md
#   $ git --bare init # for brand new project and directory
#   ------------ START HERE - create and point git to new remote repository ------------
#   # For convenience, increment sample code by '1' for each task completed (for next time)
#   $ cd dropbox/swap/v10  #            # positions in correct directory
#   $ git remote -v        # (optional) # background info, describes remote repository # optional but RECOMMENDED | skip at your own risk
#   # !important ——— Manually create new repository ——— !important --> login to github using grayox
#   # go here to create new repo: https://github.com/new -> repo name: brass-beagle-13
#   $ git remote set-url origin https://github.com/grayox/desert-hawk-03  # corrects remote location if necessary
#     - or -
#       # Note: $ git --bare init # will initialize new git 'bare' or, without a work tree,
#       # and will cause the following error: this operation must be run in a work tree
#       # so use the following command instead (without the --bare flag)
git init # initialize new git
# git remote add origin https://github.com/grayox/desert-hawk-03 # sets first origin
git remote add origin "$remoterepo-$new" # sets first origin
#   $ git remote -v    # double checks new remote directory location has been set correctly
#   --- continue here with backup operations ---
git add -A
git commit -m "new commit"
git push -u origin master
#         # Note: In case of errors:
#         # to fix error: Please make sure you have the correct access rights and the repository exists.
#         # ref: https://github.com/jakubroztocil/cloudtunes/issues/23
#         $ git clone https://github.com/grayox/desert-hawk-03.git
#         -OR-
#         $ git push -f origin master
#   --- files to delete from prior version ---
#   to minimize archive file space, delete largest files (dependencies, data, libraries, archives, .git)
#   1. /src/node_modules/, /src/bower_components/, /src/functions/node_modules/
#   2. /src/custom-elements/paper-item-zip/state-zip-data.json, /src/custom-elements/custom-libraries/zip-lat-lon-data.json
#   3. /src/custom-libraries/, /src/archive/
#   4. Note on memory size of files, folders and directories:
#        a. If the file sizes show as much larger than sum of the individual files, the difference might be in the hidden files.
#        b. These hidden files start with a dot (.) and are also called "dot files."
#        c. One of the largest of these hidden files is .git
#        d. To show the dot files in the finder, use: COMMAND + SHIFT + .
#   --- notes on git ---
#   $ git remote remove old  # removes polymer-starter-kit from result of: git remove -v

# navigate back to parent directory
cd ..