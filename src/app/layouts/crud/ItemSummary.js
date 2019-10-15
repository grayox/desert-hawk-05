import React from 'react';
// import moment from 'moment';
// import _ from '@lodash';

import HashAvatar from 'app/components/HashAvatar';
import {
  withStyles, Zoom, Fab, Chip, Tooltip, Icon, IconButton,
  ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core';
// import Skeleton from '@material-ui/lab/Skeleton';

import { getComponentsNavConfig, getFindNested, } from 'app/config/AppConfig'; // getBizCategoryLabel,

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
});

const DEFAULT_ACTIONABLE_ICON = 'send';
const DEFAULT_STAR_COLOR = 'secondary'; // supported colors: 'inherit', 'primary', 'secondary', 'action', 'error', 'disabled'

// getSummary = ( item, isList, index, ) => {
const ItemSummary = ({
  classes, navComponentId, actionable, starrable, item, // readable,
  side, index, selectedIndex, onAction, onClickStar, onToggle,
}) => {

  const ready1 = item;
  if(!ready1) return null;

  const { createdAt, idHash, } = item;
  // console.log('idHash\n', idHash);
  // console.log('createdAt\n', createdAt);
  // console.log('starrable\n', starrable);

  const actionableIcon = ( actionable && actionable.icon ) || DEFAULT_ACTIONABLE_ICON;
  
  const handleClick = () => {
    // const handleClickConfig = {
    //   list: onToggle(item, side, index,),
    //   detail: () => {}, // undesirable behavior
    // };
    // return handleClickConfig[side];
    switch(side) {
      case 'list':
        return onToggle(item, side, index,);
      case 'detail':
        return null;
      default:
        throw new Error('Side must be one of: "list" or "detail"');
    }
  }

  const getStarSwitch = () => {
    const ready1 = item && starrable;
    if(!ready1) return null;

    const { starred, } = item;
    const icon = starred ? 'star' : 'star_border';
    return (
      <Tooltip TransitionComponent={Zoom} placement="left" title="Star item">
        <IconButton onClick={() => onClickStar(index, starred,)}>
          <Icon color={DEFAULT_STAR_COLOR}>{icon}</Icon>
        </IconButton>
      </Tooltip>
    )
  }

  const getListSide = () => (
    <span>
      { starrable && getStarSwitch() }
      <Tooltip TransitionComponent={Zoom} placement="left" title="See detail">
        {
        // Not using this for two reasons:
        // 1. Does not yet provide selectedIndex to state
        // 2. Horizontal space constraint on narrow screens
        // <CRUDButtons
        //   updatable={updatable}
        //   deletable={deletable}
        //   onUpdate={handleOpenUpdateDialog}
        //   onDelete={handleOpenDeleteDialog}
        // />
        }
        <IconButton
          color="inherit"
          aria-label="More detail"
          className={classes.margin}
          onClick={() => onToggle( item, "list", index, )}
        >
          <Icon>more_horiz</Icon>
        </IconButton>
      </Tooltip>
    </span>
  )
  
  const getDetailSide = () => (
    <div>
      <span>{ starrable && getStarSwitch() }</span>
      <span>
        {
          actionable &&
          <Zoom in mountOnEnter unmountOnExit>
            <Tooltip TransitionComponent={Zoom} placement="left" title={actionable && actionable.label}>
              <Fab size="small" color="primary" className={classes.margin} onClick={onAction}>
                <Icon>{actionableIcon}</Icon>
              </Fab>
            </Tooltip>
          </Zoom>
        }
      </span>
    </div>
  )

  const getSecondaryAction = () => {
    const getSecondaryActionConfig = {
      list: getListSide(),
      detail: getDetailSide(),
    };
    return getSecondaryActionConfig[side];
  }

  const componentsNavConfig = getComponentsNavConfig({ item, });
  // const matches = _.filter(componentsNavConfig, {id: navComponentId,},);
  // const component = matches[0];
  const component = getFindNested(componentsNavConfig, 'id', navComponentId, );
  const read = component && component.crudConfig && component.crudConfig.readable;
  const {
    // itemSummaryPrimaryText, itemSummaryPrimaryChips,
    // itemSummarySecondaryText, itemSummarySecondaryChips,
    itemSummary,
  } = read;
  const {
    primaryText: itemSummaryPrimaryText, secondaryText: itemSummarySecondaryText,
    primaryChips: itemSummaryPrimaryChips, secondaryChips: itemSummarySecondaryChips,
  } = itemSummary;
  // console.log('componentsNavConfig\n', componentsNavConfig,);
  // console.log('navComponentId\n', navComponentId,);
  // console.log('component\n', component,);
  // console.log('read\n', read,);
  // console.log('readable\n', readable,);
  // const { itemSummaryPrimaryText, itemSummarySecondaryText, } = readable; // itemSummaryPrimaryText: undefined
  
  const getChips = a =>
    // a: array Of Strings
    a.map(item => item && item.length && <Chip key={item} label={item} variant="outlined" className="mr-4" />)

  const getItemConfig = level => {
    const config = {
      primary   : itemSummaryPrimaryChips   ? getChips(itemSummaryPrimaryChips)   : itemSummaryPrimaryText   ,
      secondary : itemSummarySecondaryChips ? getChips(itemSummarySecondaryChips) : itemSummarySecondaryText ,
    }
    const out = config[level];
    return out;
  }

  const getItemSummaryMain = () =>
    <ListItem
      button
      // divider light // use <Divider /> instead
      key={idHash || createdAt}
      onClick={handleClick}
      selected={!!index && (selectedIndex === index)}
    >
      <Zoom key={index} in mountOnEnter unmountOnExit>
        <ListItemAvatar>
          <HashAvatar
            message={idHash || createdAt}
            // variant="uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
          />
        </ListItemAvatar>
      </Zoom>
      <ListItemText
        // primary={item.geoLocal}
        // secondary={moment(createdAt).fromNow()}
        primary={getItemConfig('primary')}
        secondary={getItemConfig('secondary')}
      />
      <ListItemSecondaryAction>{getSecondaryAction()}</ListItemSecondaryAction>
    </ListItem>

  // const getItemSummarySkeleton = () => <Skeleton variant="circle" width={40} height={40} />

  const getItemSummary = () =>
    // getItemSummarySkeleton();
    getItemSummaryMain();

  return getItemSummary();
}
 
// export default ItemSummary;
export default withStyles(styles)(ItemSummary);