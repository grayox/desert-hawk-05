#!/bin/bash
#
# compare files for changes
# compare all files in xfer.txt

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# define variables
old=$1
new=$2
localpath=$3
# remoterepo=$4
compareto=$4

# ref: https://unix.stackexchange.com/a/481182/167174
# md5 -r v03/README-orig.md
# md5 -c <file1> <file2>
# md5 v03/src/@fuse/components/FuseAuthorization/FuseAuthorization-orig.js \
# md5 v04/src/@fuse/components/FuseAuthorization/FuseAuthorization.js
# while IFS= read -r filename;
#   # do diff $old/"$filename-orig" $new/"$filename"; # verbose
#   do [[ $(md5 v$old/"$filename-orig") = $(md5 v$new/"$filename") ]] || echo $filename differs; # boolean
#   done < v$old/$localpath/$compareto
# ref: https://stackoverflow.com/a/965072
# https://www.cyberciti.biz/faq/bash-loop-over-file/
# while IFS= read -r fullfile; # path/to/foo.bar # does not read last line
# solution: https://stackoverflow.com/a/12919766
# # loop over every file in the directory labeled "v$old/$localpath/$compareto"
while IFS= read -r fullfile || [ -n "$fullfile" ]; # path/to/foo.bar
  do
    filename="${fullfile##*/}" # foo.bar
    pathto="${fullfile%/*}" # path/to
    prefix="${filename%.*}"; # foo
    extension="${filename##*.}" # bar
    # echo "fullfile: $fullfile"
    # echo "pathto: $pathto"
    # echo "filename: $filename"
    # echo "prefix: $prefix"
    # echo "extension: $extension"
    derivative="$pathto/$prefix-orig.$extension" # path/to/foo-orig.bar
    oldfile="v$old/$derivative"
    newfile="v$new/$derivative"
    md5 "$oldfile"
    md5 "$newfile"
    # use the md5 hash checksum algorithm to compare each file in the list
    [[ $(md5 -q "$oldfile") == $(md5 -q "$newfile") ]] || echo "differs: $derivative"; # boolean
  done < "v$old/$localpath/$compareto"

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# compare the two directories for changes in the apps (original vs modified)

# # attempt 1 of 3
# # this works, but we need to keep the arguments together on the same line
# # ref: https://stackoverflow.com/q/53723801\
# dir1=("v$new/src/main/content/apps/" "v$new/src/main/content/pages/profile/")
# dir2=("v$new/src/app/apps-orig/"  "v$new/src/app/profile-orig/"       )
# for i in ${!dir1[@]}
# do
#   echo "Comparing ${dir1[i]} to ${dir2[i]}"
#   # rsync -ai --dry-run dir1 dir2
#   rsync -ai --dry-run "$dir1/" "$dir2/"
#   # ref: https://stackoverflow.com/a/53679909
#   # if [[ -n $(rsync -ai --dry-run dir1/ dir2/) ]]; then
#   if rsync -ai --dry-run "$dir1/" "$dir2/" | grep -q "."
#   then
#     echo "⚠️ The app files are different❗"
#     rsync -ai --dry-run "$dir1/" "$dir2/"
#     # do the following copy AFTER comparing the files for differences
#     # cp -r "v$new/src/main/content/apps" "v$new/src/app/apps-orig" # cp -r "src/main/content/apps" "src/app/apps-orig" # cp -r "src/main/content/apps" "src/app/apps1"
#     echo "⚠️ The app files are different❗"
#   else
#     echo "👍 The app files are the same.🚀"
#   fi
# done

# # attempt 2 of 3
# # this works, but there might be a simpler way
# # ref: https://stackoverflow.com/q/537332862
# # https://ideone.com/73KVsN
# pair1=( "v$new/src/main/content/apps"          "v$new/src/app/apps-orig"    )
# pair2=( "v$new/src/main/content/pages/profile" "v$new/src/app/profile-orig" )
# declare -n currPair
# for currPair in "${!pair@}";
# do
#   echo "Comparing ${currPair[0]} to ${currPair[1]}"
#   # rsync -ai --dry-run dir1 dir2
#   rsync -ai --dry-run "${currPair[0]}/" "${currPair[1]}/"
#   # ref: https://stackoverflow.com/a/53679909
#   # if [[ -n $(rsync -ai --dry-run {currPair[0]}/ {currPair[1]}/) ]]; then
#   if rsync -ai --dry-run "${currPair[0]}/" "${currPair[1]}/" | grep -q "."
#   then
#     echo "⚠️ The app files are different❗"
#     rsync -ai --dry-run "${currPair[0]}/" "${currPair[1]}/"
#     # do the following copy AFTER comparing the files for differences
#     # cp -r v$new/src/main/content/apps v$new/src/app/apps-orig # cp -r src/main/content/apps src/app/apps-orig # cp -r src/main/content/apps src/app/apps1 # cp -r src/app/profile-orig/* src/app/layouts/settings/
#     echo "⚠️ The app files are different❗"
#   else
#     echo "👍 The app files are the same.🚀"
#   fi
# done

# # attempt 3 of 3
# ref: https://stackoverflow.com/a/32873452
compareDir "v$new/src/main/content/apps"          "v$new/src/app/apps-orig"
compareDir "v$new/src/main/content/pages/profile" "v$new/src/app/profile-orig"

# write the compareDir() function called by the above commands
compareDir() {
  dir1="$1"
  dir2="$2"
  echo "Comparing $dir1 to $dir2"
  rsync -ai --dry-run "$dir1/" "$dir2/"
  # ref: https://stackoverflow.com/a/53679909
  if rsync -ai --dry-run "$dir1/" "$dir2/" | grep -q "."
  then
    echo "⚠️ The app files are different❗"
    rsync -ai --dry-run "$dir1/" "$dir2/"
    # do the following copy AFTER comparing the files for differences
    # cp -r "v$new/src/main/content/apps" "v$new/src/app/apps-orig" # cp -r "src/main/content/apps" "src/app/apps-orig" # cp -r "src/main/content/apps" "src/app/apps1"
    echo "⚠️ The app files are different❗"
    # note that we rolled src/app/profile-orig/ProfilePage.js into src/app/layouts/settings/Settings.js
  else
    echo "👍 The app files are the same.🚀"
  fi
}

# make this script executable for next run
chmod a+x "v$new/$localpath/compare.sh"