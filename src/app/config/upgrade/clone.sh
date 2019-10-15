#!/bin/bash
#
# Clone latest version of remote repo to local
# clone remote upgrade to local repo or manually download and unzip

#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# define variables
old=$1
new=$2
localpath=$3
# remoterepo=$4
targetrepo=$4

git clone $targetrepo.git v$new

# make this script executable for next run
chmod a+x v$new/$localpath/clone.sh