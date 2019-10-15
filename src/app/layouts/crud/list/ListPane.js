import React from 'react';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,

import { withStyles, Zoom, Paper, Chip, Tooltip, Divider, List, CircularProgress, } from '@material-ui/core';

import MediaWidth from 'app/layouts/MediaWidth';
import Dashboard from 'app/views/dashboard/Dashboard';
import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash
import ButtonsTierList from './ButtonsTierList'; // CRUDButtons,
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemSummary from '../ItemSummary';

const styles = theme => ({
  paper: {
    // temp-border
    // border: 'solid blue 4px',
    color: theme.palette.text.secondary,
  },
});

const ListPane = ({
  classes, items, hasMore, navComponentId, dashboard, miniDashboard,
  creatable, readable, searchable, filterable, sortable, starrable,
  searchMenuOptions, filterMenuOptions, sortMenuOptions, searchFilterSortModelWithLabels,
  selectedIndex, onClickStar, onNext, onToggle, onClickCreateButton, onSearchFilterSort,
}) => {

  const ready1 = items && items.length;
  if(!ready1) return null;

  const getDashboard = () =>
    <MediaWidth
      mobile={<Dashboard dashboard={dashboard} type="micro" />}
      // tablet={<Dashboard dashboard={dashboard} type="mini"  />}
      // laptop={<Dashboard dashboard={dashboard} type="mini"  />}
    />

  const getHeaderChips = () => {
    const { listPaneHeaderChips, } = readable;

    const ready1 = listPaneHeaderChips && listPaneHeaderChips.length;
    if(!ready1) return null;

    const getChipsArray = () =>
      listPaneHeaderChips.map( item => <Chip className="ml-4 my-4" key={item} title={item} label={item} /> )

    return (
      <div className="w-full">
        <Zoom in mountOnEnter unmountOnExit>
          <Paper className="w-full p-4 mb-8">{getChipsArray()}</Paper>
        </Zoom>
      </div>
    )
  }

  const getHeaderButtons = () => (
    ( creatable || searchable || filterable || sortable )
    &&
    <div className="w-full">
      <Zoom in mountOnEnter unmountOnExit>
        <ButtonsTierList
          creatable={creatable}
          searchable={searchable}
          filterable={filterable}
          sortable={sortable}

          searchMenuOptions={searchMenuOptions}
          filterMenuOptions={filterMenuOptions}
          sortMenuOptions={sortMenuOptions}
          // for initial state after re-render following data fetch...
          searchFilterSortModelWithLabels={searchFilterSortModelWithLabels}

          onClickCreateButton={onClickCreateButton}
          onSearchFilterSort={onSearchFilterSort}
        />
      </Zoom>
    </div>
  )

  const getList = () =>
    <InfiniteScroll
      dataLength={items && items.length}
      next={onNext} // event
      hasMore={hasMore} // boolean
      loader={
        // {<h4>Loading...</h4>}
        <div className='ml-24 mt-12'>
          <CircularProgress className={classes.progress} color="secondary" />
        </div>
      }
      // conditionally omit height, otherwise too much whitespace appears after end message for short lists
      height={ hasMore ? (window.innerHeight - 128 - 56) : undefined } // -28 // {800} {400}
      endMessage={
        <div className="text-center p-16">
          End of list
        </div>
      }
    >
      <FuseAnimateGroup
        delay={500}
        enter={{ animation: "transition.slideUpBigIn" }}
        leave={{ animation: "transition.slideLeftOut" }}
      >
        {
          items && items.map( ( item, index, ) =>
            <Tooltip
              key={hash([item, (item && item.createdAt),])}
              TransitionComponent={Zoom} placement="top" title="Click for detail"
            >
              <div
                // className="border-b" // use divider instead
              >
                {/* { getSummary( item, true, index, ) } */}
                <ItemSummary
                  side="list"
                  navComponentId={navComponentId}
                  item={item}
                  index={index}
                  onToggle={onToggle}
                  selectedIndex={selectedIndex}
                  readable={readable}
                  starrable={starrable}
                  onClickStar={onClickStar}
                  // actionable={actionable} // not needed on list side
                />
                <Divider />
              </div>
            </Tooltip>
          )
        }
      </FuseAnimateGroup>
    </InfiniteScroll>

  const getListPane = () =>
    <React.Fragment>
      { miniDashboard && !!miniDashboard.length && getDashboard() }
      {getHeaderButtons()}
      {getHeaderChips()}
      <Paper className={classNames(classes.paper, "z-10",)}>
        <List className="m-0 p-0" component="nav">
          {/* <ListSubheader className="text-left">Items</ListSubheader> */}
          {getList()}
        </List>
      </Paper>
    </React.Fragment>

  return getListPane();
  
}


// export default ListPane;
export default withStyles(styles)(ListPane);