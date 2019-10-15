// inspired by:
// https://codesandbox.io/s/lrvwm88pv7
// https://stackoverflow.com/a/55093394
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data

import React, { Component } from 'react';

import { withStyles, Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';
import _ from '@lodash';

import {
  getSearchableFields, getForm, replaceFormFieldsArrayWithLabels, replaceFormFieldsLabelArrayWithKeyIds,
} from 'app/config/AppConfig';

import CRUDView from './CRUDView';
import Loading from 'app/components/Loading';
import Error500Page from 'app/components/Error500Page';

import { loadAsyncData } from 'app/containers/LoadAsync';

const styles = theme => ({
  root: {
    height: '100%',
  },
  refresh: {
    margin   : theme.spacing.unit,
    color    : 'white',
    zIndex   : 1201, // tablet: 1201, laptop: 1100, mobile: <= 1100,
    position : 'fixed', // 'absolute',
    top      : 0,
    right    : theme.spacing.unit * 7, // 72,
  },
});

// // https://codesandbox.io/s/lrvwm88pv7
// const loadAsyncData = () => {
//   let timeout;
//   const promise = new Promise((resolve, reject) => {
//     timeout = setTimeout(
//       () =>
//         resolve({
//           example: "value",
//           random: Math.random()
//         }),
//       1000
//     );
//   });
//   promise.cancel = () => clearTimeout(timeout);
//   return promise;
// };

// const SORT_MENU_ITEMS = [ 'Sort by', 'Date', 'Price', 'Margin', ];
const FILTER_MENU_ITEMS = [
  'Filter by', 'All', 'Starred', 'Unstarred', 'Challenged', 'Pending', 'Resolved', 'Won', 'Lost', // [ 'foo' , 'bar'   , 'baz'  , ] ,
];

const BATCH_SIZE = 15; // 20

const INITIAL_STATE_ITEMS = {
  items: [],
}

const INITIAL_STATE_LOADING_OPS = {
  isError: false,
  isLoading: true,
  hasMore: true,
  lastShown: false,
}

// const INITIAL_STATE_BUTTONS_TIER_LIST = {
//   searchString              : ''   ,
//   searchBy                  : ''   ,
//   filterBy                  : []   ,
//   sortBy                    : ''   ,
//   sortDirectionIsDescending : true ,
// }

const INITIAL_STATE_BUTTONS_TIER_MENU = {
  searchMenuOptions               : [] ,
  filterMenuOptions               : [] ,
  sortMenuOptions                 : [] ,
  searchFilterSortModel           : {} ,
  searchFilterSortModelWithLabels : {} ,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_ITEMS,
  ...INITIAL_STATE_LOADING_OPS,
  // ...INITIAL_STATE_BUTTONS_TIER_LIST,
  ...INITIAL_STATE_BUTTONS_TIER_MENU,
};

class CRUDContainer extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.handleLoad();
    this.getButtonsTierMenuOptions(); // For fastest page load speed, defer this task until buttons are clicked
  }

  componentWillUnmount() {
    this.handleCancel();
  }

  handleLoad = () => {
    this.setState(INITIAL_STATE, () => {
      this.handleFetchMoreData();
    });
  }

  // begin buttons tier list

  handleSearchFilterSort = searchFilterSortModelWithLabels => {
    // const { searchString, searchBy, filterBy, sortBy, sortDirectionIsDescending, } = model; // searchStringDialogIsOpen,
    // console.log('searchFilterSortModelWithLabels\n', searchFilterSortModelWithLabels,);

    const ready1 = searchFilterSortModelWithLabels;
    if(!ready1) return null;
    const ready2 = !_.isEmpty(searchFilterSortModelWithLabels);
    if(!ready2) return null;
    
    const { searchBy, filterBy, sortBy, } = searchFilterSortModelWithLabels;

    // replace (title case) labels with (lower case) key ids
    const modelArrayWithKeys = replaceFormFieldsLabelArrayWithKeyIds([searchBy, filterBy, sortBy,]); // ['name', 'email', 'phone',]
    let searchFilterSortModel = {...searchFilterSortModelWithLabels};
    const a = [ 'searchBy', 'filterBy', 'sortBy', ];
    a.map( (item, index,) => searchFilterSortModel[item] = modelArrayWithKeys[index] );

    // mutate state
    this.setState({
      ...INITIAL_STATE_ITEMS,
      ...INITIAL_STATE_LOADING_OPS,
      searchFilterSortModel,
      searchFilterSortModelWithLabels, // to pass back to ButtonsTierList to set initial state after re-render
    }
      , () => this.handleFetchMoreData()
    )
  }

  getSearchMenuOptions = () => {
    const HEADER = 'Search in';
    const { readable, searchable,  } = this.props;
    // console.log('readable\n', readable,);
    // console.log('searchable\n', searchable,);
    const ready1 = readable && searchable;
    if(!ready1) return null;
    const searchableFieldIds = getSearchableFields(searchable, readable,);
    // console.log('searchableFieldIds\n', searchableFieldIds,);
    const form = getForm(searchableFieldIds);
    const searchableFieldLabels = replaceFormFieldsArrayWithLabels(form);
    const searchMenuOptions = [ HEADER, ...searchableFieldLabels, ];

    this.setState({ searchMenuOptions, });
  }
  
  getFilterMenuOptions = () => {
    const filterMenuOptions = FILTER_MENU_ITEMS;
    this.setState({ filterMenuOptions, });
  }
  
  getSortMenuOptions = () => {
    // const sortMenuOptions = SORT_MENU_ITEMS;
    
    // close copy of getSearchMenuOptions()
    const HEADER = 'Sort by';
    const { readable, sortable,  } = this.props;
    // console.log('readable\n', readable,);
    // console.log('sortable\n', sortable,);
    const ready1 = readable && sortable;
    if(!ready1) return null;
    const sortableFieldIds = getSearchableFields(sortable, readable,);
    // console.log('sortableFieldIds\n', sortableFieldIds,);
    const form = getForm(sortableFieldIds);
    const sortableFieldLabels = replaceFormFieldsArrayWithLabels(form);
    const sortMenuOptions = [ HEADER, ...sortableFieldLabels, ];

    this.setState({ sortMenuOptions, });
  }

  // For fastest page load speed, defer these tasks until buttons are clicked
  getButtonsTierMenuOptions = () => {
    this.getSearchMenuOptions();
    this.getFilterMenuOptions();
    this.getSortMenuOptions();
  }
  
  // end buttons tier list

  // refs: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  // https://stackoverflow.com/a/55093394 | https://codesandbox.io/s/lrvwm88pv7
  // handleFetchMoreData() {
  //   this._asyncRequest = loadAsyncData().then(
  //     externalData => {
  //       this._asyncRequest = null;
  //       this.setState({externalData});
  //     }
  //   );
  // }
  handleFetchMoreData = async () => {
    // console.log('props\n', this.props);
    const { readable, } = this.props;
    const { items, searchFilterSortModel, } = this.state;
    
    const ready1 = readable && readable.path;
    if( !ready1 ) return null;
    const ready2 = this && this.state && this.state.hasMore;
    if( !ready2 ) return null;
    
    // ref: https://stackoverflow.com/a/49906662
    let isMounted = true;

    // this._asyncRequest = loadAsyncData();
    // ref: https://firebase.google.com/docs/firestore/query-data/query-cursors#paginate_a_query
    this._asyncRequest = loadAsyncData( readable, BATCH_SIZE, this.state.lastShown, searchFilterSortModel, );
    // const items = await this._asyncRequest;
    const newData = await this._asyncRequest; // { data:<arrayOfObjects>, lastShown:<documentSnapshot>, }
    // console.log('newData\n', newData,);

    const newDataType = typeof newData;
    // console.log('newDataType\n', newDataType,);
    const ready3 = newDataType !== 'undefined';
    // console.log('ready3\n', ready3,); 
    if(!ready3) {
      // this.handleLoad();
      return null;
    }

    const { lastShown, } = newData;
    const newItems = newData.data;
    // console.log('newItems\n', newItems,);
    const hasMore = newItems.length === BATCH_SIZE;
    this._asyncRequest = null;
    if(isMounted) {
      this.setState({
        hasMore,
        isLoading: false,
        items: [ ...items, ...newItems, ],
        lastShown,
      }
        , () => {
          // console.log('state\n', this.state);
          isMounted = false;
        }
      );
    }
  }

  // handleFetchMoreData = () => {
  //   if (this.state.items.length >= 500) {
  //     this.setState({ hasMore: false });
  //     return null;
  //   }
  //   this.setState({
  //     items: this.state.items.concat(Array.from({ length: 20 }))
  //   });
  // }

  // handleCancel() {
  //   if (this._asyncRequest) {
  //     this._asyncRequest.cancel();
  //   }
  // }
  handleCancel = () => {
    this.setState(INITIAL_STATE
      , () => {
        if (this._asyncRequest) {
          // this._asyncRequest.cancel();
          this._asyncRequest = null;
        }
      }
    );
  };

  handleResetSearchFilterSort = () => this.setState({searchFilterSortModelWithLabels: {},})

  // render() {
  //   return (
  //     <div className="App">
  //       {(isLoading && <button onClick={this.handleCancel}>Cancel</button>) || (
  //         <button onClick={this.handleFetchMoreData}>Load</button>
  //       )}
  //       <div>
  //         <h3>{(isLoading && "Loading...") || "Not loading"}</h3>
  //       </div>
  //       <pre>
  //         <code>{JSON.stringify(this.state)}</code>
  //       </pre>
  //     </div>
  //   );
  // }

  render() {
    const { handleLoad, handleFetchMoreData, handleSearchFilterSort, handleResetSearchFilterSort, } = this;
    const {
      isLoading, isError, items, hasMore,
      searchMenuOptions, filterMenuOptions, sortMenuOptions, searchFilterSortModelWithLabels,
    } = this.state;
    const {
      classes, profile, settings, dashboard, navComponentId,
      condensed, miniDashboard, searchable, sortable, filterable, starrable,
      creatable, readable, updatable, deletable, actionable, alertable,
    } = this.props;
    
    const getCRUDView = () =>
      <CRUDView
        profile={profile} settings={settings} dashboard={dashboard} navComponentId={navComponentId}
        items={items} condensed={condensed} miniDashboard={miniDashboard} hasMore={hasMore}
        searchable={searchable} sortable={sortable} filterable={filterable} starrable={starrable} actionable={actionable}
        creatable={creatable} readable={readable} updatable={updatable} deletable={deletable} alertable={alertable}
        searchMenuOptions={searchMenuOptions} filterMenuOptions={filterMenuOptions} sortMenuOptions={sortMenuOptions}
        searchFilterSortModelWithLabels={searchFilterSortModelWithLabels} // for initial state after re-render following data fetch
        onResetSearchFilterSort={handleResetSearchFilterSort}
        onRefresh={handleLoad} onNext={handleFetchMoreData} onSearchFilterSort={handleSearchFilterSort}
      />

    const getRefreshButton = () =>
      <Tooltip TransitionComponent={Zoom} title="Refresh data">
        <IconButton className={classes.refresh} onClick={handleFetchMoreData} color="inherit">
          <Icon>refresh</Icon>
        </IconButton>
      </Tooltip>
      
    const getMainContent = () => ( items ? <React.Fragment> {getRefreshButton()} {getCRUDView()} </React.Fragment> : null )
    const getIsError = () => <div className="h-full"><Error500Page /></div>
    const getHasLoaded = () => ( isError ? getIsError() : getMainContent() )
    const getIsLoading = () => <div className="h-full"><Loading /></div>
    const getCRUDContainer = () => ( isLoading ? getIsLoading() : getHasLoaded() )

    return getCRUDContainer();
  }
}

// export default CRUDContainer;
export default withStyles( styles, {withTheme: true,}, )(CRUDContainer);