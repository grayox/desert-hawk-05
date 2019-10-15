import React from 'react';
import { Hidden, } from '@material-ui/core';

// <--- mobile ---| 600px |--- tablet ---| 1280px |--- laptop --->

// import MediaWidth from 'app/layouts/MediaWidth';
// <MediaWidth
//   mobile={getMobileContent()}
//   tablet={getTabletContent()}
//   laptop={getLaptopContent()}
// />
// or
// <MediaWidth
//   mobile={<MobileDrawer/>}
//   tablet={<TabletDrawer/>}
//   laptop={<LaptopDrawer/>}
// />

const MediaWidth = ({ mobile=null, tablet=null, laptop=null, }) => {

  const getMediaWidth = () =>
    <React.Fragment>
      <Hidden mdDown>{laptop}</Hidden>
      <Hidden xsDown lgUp>{tablet}</Hidden>
      <Hidden smUp>{mobile}</Hidden>
    </React.Fragment>

  // the following was begun to solve the problem eventually solved by giving all arguments default values of null
  // did not delete, but left the code below as cruft to serve as a stem for any future improvements dvelopment

  // <Hidden mdDown>{laptop}</Hidden>
  // <Hidden xsDown lgUp>{tablet}</Hidden>
  // <Hidden smUp>{mobile}</Hidden>

  // const getMobile

  // const getMediaWidth = () =>
  //   <React.Fragment>
  //     {getLaptop()}
  //     {getTablet()}
  //     {getMobile()}
  //   </React.Fragment>

  return getMediaWidth();
}

export default MediaWidth;