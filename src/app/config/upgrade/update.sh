#!/bin/bash
#
# Update yarn and all dependencies

# steps 1-3
brew install node && brew update && brew upgrade node && brew install yarn && brew upgrade yarn && cd && cd dropbox/swap/fuse && git clone https://maria-le:teleworm1@github.com/withinpixels/fuse-react.git && mv fuse-react/ v05/ && cd v05 && yarn && yarn add --dev react-redux-firebase redux-firestore @fortawesome/fontawesome-free @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome nuka-carousel material-auto-rotating-carousel react-swipeable-views react-chartist chartist email-validator react-number-format moment numeral object-hash react-text-mask text-mask-addons react-icons react-image react-infinite-scroll-component react-rating react-visibility-sensor recompose @material-ui/lab
#   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   #   

# define variables
old=$1
new=$2
localpath=$3
# remoterepo=$4

# make this script executable for next run
chmod a+x "v$new/$localpath/update.sh"

# navigate to destination directory
cd "v$new"

# Get latest tooling
# step 1
brew install node && brew update && brew upgrade node && brew install yarn && brew upgrade yarn
brew install node # &&
brew update       # &&
brew upgrade node # &&
brew install yarn # &&
brew upgrade yarn # &&

# Clone latest repo
# step 2
cd && cd dropbox/swap/fuse && git clone https://maria-le:teleworm1@github.com/withinpixels/fuse-react.git && mv fuse-react/ v05/
cd
cd dropbox/swap/fuse
git clone https://maria-le:teleworm1@github.com/withinpixels/fuse-react.git
mv fuse-react/ v05/

# step 3
cd v05 && yarn && yarn add --dev react-redux-firebase redux-firestore @fortawesome/fontawesome-free @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome nuka-carousel material-auto-rotating-carousel react-swipeable-views react-chartist chartist email-validator react-number-format moment numeral object-hash react-text-mask text-mask-addons react-icons react-image react-infinite-scroll-component react-rating react-visibility-sensor recompose @material-ui/lab

cd v05
# Install dependencies
yarn

# install react-redux-firebase
yarn add react-redux-firebase redux-firestore # https://youtu.be/gf5bVfVlNUM?t=104

# install fontawesome
yarn add --dev @fortawesome/fontawesome-free # https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
yarn add @fortawesome/fontawesome-svg-core # https://github.com/FortAwesome/react-fontawesome#or-with-yarn
yarn add @fortawesome/free-solid-svg-icons # https://github.com/FortAwesome/react-fontawesome#or-with-yarn
yarn add @fortawesome/free-brands-svg-icons # https://github.com/FortAwesome/react-fontawesome#or-with-yarn
yarn add @fortawesome/react-fontawesome # https://github.com/FortAwesome/react-fontawesome#or-with-yarn

# install carousel solutions
yarn add nuka-carousel # https://www.npmjs.com/package/nuka-carousel
yarn add material-auto-rotating-carousel # https://www.npmjs.com/package/material-auto-rotating-carousel
yarn add react-swipeable-views # https://www.npmjs.com/package/react-swipeable-views

# install other solutions
yarn add react-chartist
yarn add chartist
yarn add email-validator # https://www.npmjs.com/package/email-validator
yarn add react-number-format # https://www.npmjs.com/package/react-number-format

# yarn add lodash
yarn add moment # https://www.npmjs.com/package/moment
yarn add numeral # https://www.npmjs.com/package/numeral
yarn add object-hash # https://www.npmjs.com/package/object-hash
yarn add react-text-mask # https://www.npmjs.com/package/react-text-mask
yarn add text-mask-addons # https://www.npmjs.com/package/text-mask-addons
yarn add react-icons # https://www.npmjs.com/package/react-icons
yarn add react-image # https://www.npmjs.com/package/react-image
yarn add react-infinite-scroll-component # https://www.npmjs.com/package/react-infinite-scroll-component
yarn add react-rating # https://www.npmjs.com/package/react-rating
yarn add react-visibility-sensor # https://www.npmjs.com/package/react-visibility-sensor
yarn add recompose # https://www.npmjs.com/package/recompose
yarn add @material-ui/lab # https://material-ui.com/components/about-the-lab/

# integrate git
# ref: https://stackoverflow.com/a/53325899
# git init
# git clone <url_of_the_github_repository_extension_dot_git>
# git clone https://github.com/username/repo_name.git
# git add .
# git commit -m "first commit"
# git push origin master

# return to home path
cd ..