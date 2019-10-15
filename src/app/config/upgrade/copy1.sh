#!/bin/bash
#
# Copy files and directories to upgraded version

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# define variables
old="04" # $1
new="05" # $2
localpath="src/app/config/upgrade" # $3
# remoterepo=$4
compareto="xfer.txt" # $4
temp="files-to-xfer-temp.txt"

# copy list of files intended to be processed,
# store them in a temporary file in the destination directory
cp "v$old/$localpath/$compareto" "v$new/$temp"

# navigate to destination directory
cd "v$new"

# rename certain files in destination directory
# ref: https://unix.stackexchange.com/a/481334/167174
# test bin: https://repl.it | https://repl.it/repls/SplendidGrayMenu
# while read ; do mv "vx/$REPLY" "v03/${REPLY%.js}-orig.js" ; done < v03/src/app/config/upgrade/xfer.txt # non-recurring update
# while read
# loop over every file in the directory labeled "$temp"
while IFS= read -r fullfile || [ -n "$fullfile" ]; # path/to/foo.bar
  do
    # mv "$REPLY" "${REPLY%.js}-orig.js"
    # fullfile="$REPLY" # path/to/foo.bar
    filename="${fullfile##*/}" # foo.bar
    pathto="${fullfile%/*}" # path/to
    prefix="${filename%.*}"; # foo
    extension="${filename##*.}" # bar
    # echo "fullfile: $fullfile"
    # echo "filename: $filename"
    # echo "pathto: $pathto"
    # echo "prefix: $prefix"
    # echo "extension: $extension"
    # echo "move from: $pathto/$prefix.$extension"
    # echo "move to: $pathto/$prefix-orig.$extension"
    mv "./$pathto/$prefix.$extension" "./$pathto/$prefix-orig.$extension"
  done < "$temp"
# cleanup
rm "$temp"
# exit 1

# deal with README which was left out of above loop because it's path is not in the root directory
mv README.md README-orig.md
cd ..
cp v$old/README.md v$new/README.md

# navigate to source directory
cd "v$old"
# copy files listed in xfter.txt from source then paste to destination directories
# ref: https://unix.stackexchange.com/a/481043/167174
cpio -u --create < "$localpath/$compareto" | (cd "../v$new" && cpio --extract)

# navigate back to parent directory
cd ..

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   
#
#   COPY DIRECTORIES
#
#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   
# create destination directories
# mkdir v$new/src/app/
# mkdir v$new/src/store/actions/my-actions
# mkdir v$new/src/store/reducers/my-reducers
# # copy directories
# cp -r v$old/src/app/ v$new/src/app/
# cp -r v$old/src/store/actions/my-actions v$new/src/store/actions/my-actions
# cp -r v$old/src/store/reducers/my-reducers v$new/src/store/reducers/my-reducers
# INSTRUCTIONS FOR COPYING DIRECTORIES AND CONTENTS
# mkdir v03/src/store/actions/my-actions && mkdir v03/src/store/reducers/my-reducers
# # adds folder to destination (because it does NOT have a trailing slash behind the source directory '/')
# cp -r v01/src/store/actions/my-actions v03/src/store/actions/my-actions && cp -r v01/src/store/reducers/my-reducers v03/src/store/reducers/my-reducers
# cp -r v01/src/store/actions/my-actions v03/src/store/actions/my-actions/ && cp -r v01/src/store/reducers/my-reducers v03/src/store/reducers/my-reducers/
# # does NOT add a folder to destination (because it has trailing slash behind the source directory '/')
# cp -r v01/src/store/actions/my-actions/ v03/src/store/actions/my-actions && cp -r v01/src/store/reducers/my-reducers/ v03/src/store/reducers/my-reducers
# # a trailing slash behind the source directory means only the directory contents are copied not the directory itself
# # the trailing slash makes a `mkdir` command necessary prior to the `cp` command
# # to do the copy paste in a single command, omit the trailing slash from the source directory in the `cp` command as follows
# cp -r v01/src/store/actions/my-actions v03/src/store/actions/my-actions && cp -r v01/src/store/reducers/my-reducers v03/src/store/reducers/my-reducers
# # the following lines correctly implement the `cp` command to copy the directory contents and the directory itself

# remoterepo=$4# copy directories
cp -r "v$old/src/app" "v$new/src/app"

# moved the following into app/store/ directory which is copied in the above operation
# cp -r "v$old/src/store/actions/my-actions" "v$new/src/store/actions/my-actions"
# cp -r "v$old/src/store/reducers/my-reducers" "v$new/src/store/reducers/my-reducers"

# see src/app/config/upgrade/compare.sh
# do the following copy AFTER comparing the files for differences
# cp -r "v$new/src/main/content/apps" "v$new/src/app/apps-orig" # cp -r "src/main/content/apps" "src/app/apps-orig" # cp -r "src/main/content/apps" "src/app/apps1"
# cp -r "v$new/src/main/content/pages/profile" "v$new/src/app/profile-orig" # cp -r "src/main/content/pages/profile" "src/app/profile-orig"

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# make this script executable for next run
chmod a+x "v$new/$localpath/copy.sh"