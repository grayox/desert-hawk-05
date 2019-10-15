// inspired by
// https://medium.com/react-in-depth/why-react-suspense-will-be-a-game-changer-37b40fea71ec
// see canonical data fetch pattern at above link and recopied below at the bottom of this file

import React, { Component, } from 'react'; // useState, Suspense,
// import { CircularProgress, } from '@material-ui/core';
// import Skeleton from 'app/components/Skeleton';
import Skeleton from '@material-ui/lab/Skeleton';

import { loadUserData, } from 'app/containers/LoadAsync';
import _ from '@lodash';

// // const WidgetData = props => {
//   // if(props) console.log('props\n', props,);
// const WidgetData = ({ dataSource={}, }) => {
//   // path: string, fields: string,
//   const { path, getField, } = dataSource;
//   // if(path) console.log('path\n', path,);
//   // if(getField) console.log('getField\n', getField,);

  // const ready1 = path && path.length;
  // if(!ready1) return null;
  // const ready2 = getField && getField.length;
  // if(!ready2) return null;

  // const [ hasLoaded, setHasLoaded, ] = useState(false);

// const TEST_STRING = 'leads.geoLocations.United States | Washington | Seattle | financial';

const INITIAL_STATE = {
  data: null,
  hasLoaded: false,
}

class WidgetData extends Component {

  state = { ...INITIAL_STATE, };

  componentDidMount() {
    this.handleLoad();
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.userID !== prevProps.userID) {
  //     console.log('state\n', this.state);
  //   }
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  //   this.timer = null;
  // }

  handleLoad = () => {
    this.fetchData()
    .then( data => {
      // console.log('data\n', data,);
      this.setState(
        { data, hasLoaded: true, },
        // () => {
        //   // console.log('data\n', data,);
        //   this.props.onDataChanged(data);
        // },
      );
    })
    // .then( () => {
      // console.log('state\n', this.state);
    // });
  // set recurring data fetch
  // this.timer = setInterval(() => fetchData(), 5000);
  }

  fetchData = async () => {
    this.setState({ hasLoaded: false, });
    const { dataSource, } = this.props;
    const ready1 = dataSource && (!_.isEmpty(dataSource));
    if(!ready1) return null;

    const { path, } = dataSource; // getField,
    // console.log('path\n', path,);
    const ready2 = path;
    if(!ready2) return null;
    // this._asyncRequest = await loadUserData(path,);
    // const data = this._asyncRequest;
    // const data = await loadUserData(path,);
    // console.log('path\n', path,);
    const out = await loadUserData(path,);
    // console.log('out\n', out,);
    return out;
  }

  getData = () => {
    const { data, } = this.state;
    // console.log('props\n', this.props,);
    const { settings, dataSource, } = this.props;
    // console.log('dataSource\n', dataSource,);

    const ready1 = settings && (!_.isEmpty(settings));
    if(!ready1) return null;
    const ready2 = dataSource && (!_.isEmpty(dataSource));
    if(!ready2) return null;

    const { getField, } = dataSource; // path,
    const field = getField(settings);
    // console.log('field\n', field,);

    // const result = data && data.leads && data.leads.geoLocations
    //   && data.leads.geoLocations['United States | Washington | Seattle | financial'];
    // console.log('TEST_STRING\n', TEST_STRING,);
    // const result = _.get(data, TEST_STRING, '',);
    const result = _.get(data, field, '',);
    // console.log('result\n', result,);
    // const out = (typeof result === 'number') ? result : '⚠️';
    const out = result || 0;
    // console.log('out\n', out,);
    this.props.onDataChanged(out);
    return out;
  }

  // const getData = () => {
  // // const getData = async () => {
  //   // const _asyncRequest = await loadUserData(path);
  //   // console.log('_asyncRequest\n', _asyncRequest,);
  //   const out = 15;
  //   // const out = _asyncRequest.leads.geoLocations['United States | Washington | Seattle | financial'];
  //   // const data = _asyncRequest;
  //   console.log('out\n', out,);
  //   if(typeof out === 'number') {
  //     setHasLoaded(true);
  //     return out;
  //   } else return null;
  // }

  // // const data = 17;
  // const data = getData();
  // // if(data) setHasLoaded(true);

  render() {
    const { hasLoaded, } = this.state; // data,
    const { getData, } = this;
    const { handleFontSize, } = this.props;

    const data = getData();
    const fontSize = handleFontSize(data);

    const getWidgetData = () =>
      // <div> {path} {getField} </div>
      <div className={fontSize}>
        {
          hasLoaded
          ?
          data
          :
          // <CircularProgress color="secondary" />
          // <Skeleton type='circle' radius='30' />
          <Skeleton variant="circle" width={30} height={30} />
        }
      </div>
  
    return getWidgetData();
  }

}

export default WidgetData;
// export default withStyles(styles)(DashboardWidget);

// Canonical data fetch pattern
// ref: https://medium.com/react-in-depth/why-react-suspense-will-be-a-game-changer-37b40fea71ec
// class DynamicData extends Component {
//   state = {
//     loading: true,
//     error: null,
//     data: null
//   };

//   componentDidMount () {
//     fetchData(this.props.id)
//       .then((data) => {
//         this.setState({
//           loading: false,
//           data
//         });
//       })
//       .catch((error) => {
//         this.setState({
//           loading: false,
//           error: error.message
//         });
//       });
//   }

//   componentDidUpdate (prevProps) {
//     if (this.props.id !== prevProps.id) {
//       this.setState({ loading: true }, () => {
//         fetchData(this.props.id)
//           .then((data) => {
//             this.setState({
//               loading: false,
//               data
//             });
//           })
//           .catch((error) => {
//             this.setState({
//               loading: false,
//               error: error.message
//             });
//           });
//       });
//     }
//   }

//   render () {
//     const { loading, error, data } = this.state;
//     return loading ? (
//       <p>Loading...</p>
//     ) : error ? (
//       <p>Error: {error}</p>
//     ) : (
//       <p>Data loaded 🎉</p>
//     );
//   }
// }