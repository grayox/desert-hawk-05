import React from "react"
import ContentLoader from "react-content-loader"

// inspired by: http://danilowoz.com/create-content-loader/

const getCircle = radius =>
  <ContentLoader
    height={radius * 2}
    width={radius * 2}
  >
    <circle cx={radius} cy={radius} r={radius} />
  </ContentLoader>

const getRect = ( height, width, ) =>
  <ContentLoader
    height={height}
    width={width}
  >
    <rect x="0" y="0" rx="5" ry="5" width={width} height={height} />
  </ContentLoader>

const getSkeleton = ( type, height, width, radius, ) => {
  // console.log('type\n', type,);
  // console.log('radius\n', radius,);
  const config = {
    rect   : getRect( height, width, ),
    circle : getCircle( radius, ),
  };
  return config[type];
}

const Skeleton = ({ type='rect', height=98, width=156, radius=30, }) =>
  // getSkeleton( type, height, width, radius, )
  <ContentLoader
    height={160}
    width={60}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>

export default Skeleton;