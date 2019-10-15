import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, InputLabel, MenuItem, ListItemText, FormControl, Select, Button, Icon, // OutlinedInput,
} from '@material-ui/core';

const styles = theme => ({
  formControl: {
    minWidth: 150,
    margin: theme.spacing.unit,
  },
  hiddenControl: {
    width: 0,
    height: 0,
    marginTop: '-4px',
    visibility: 'hidden',
  },
});

const SelectControl = props => <div autoComplete="off">{getFormContent(props)}</div>

const getFormContent = props => {
  const { classes, label, size, control, } = props; // icon,
  let out;
  switch(control) {
    case 'none':
      out = (
        <div className={classes.hiddenControl}>
          {getSelect(props)}
        </div>
      );
      break;
    case 'select':
      out = (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="geo">{label}</InputLabel>
          {getSelect(props)}
        </FormControl>
      );
      break;
    case 'button':
      out = (
        <React.Fragment>
          <Button
            className={classes.button}
            onClick={props.onClick}
            size={size}
          >{label}</Button>
          <div className={classes.hiddenControl}>
            {getSelect(props)}
          </div>
        </React.Fragment>
      );
      break;
    default:
      console.warn('default called');
  }
  return out;
}

const getSelect = ({ isOpen, value, items, onOpen, onClose, onChange, }) => 
  <Select  // for implementation examples and consolidation targets: search: <Select
    open={isOpen}
    value={value}
    onOpen={onOpen}
    onClose={onClose}
    onChange={e => onChange(e)}
    inputProps={{
      name: 'value',
      id: 'select',
    }}
    // input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
  >
    {getMenuItems(items,)}
  </Select>

const getMenuItems = items => {
  const out = items.map(item =>
    typeof item === 'object'
    ?
    (
      <MenuItem key={item.value} value={item.value}>
        {item && item.icon && <Icon>{item.icon}</Icon>}
        <ListItemText primary={item.label} />
      </MenuItem>
    )
    :
    (
      <MenuItem key={item} value={item}>
        <ListItemText primary={item} />
      </MenuItem>
    )
  );
  return out;
}

SelectControl.defaultProps = {
  size: 'medium', // 'small', 'medium', 'large',
  control: 'select', // 'none', 'select', 'button',
  icon: false,
};

SelectControl.propTypes = {
  // classes: PropTypes.object.isRequired,
  // button size
  size: PropTypes.oneOf([ 'small', 'medium', 'large', ]), // default: 'medium'
  // 'none' requires an external button to control open and closing
  // 'button' provides its own button
  // 'select' provides standard dropdown interface
  control: PropTypes.oneOf([ 'none', 'select', 'button', ]), // default: 'select'
  label: PropTypes.string,
  icon: PropTypes.bool,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      icon  : PropTypes.string,
      value : PropTypes.string.isRequired,
      label : PropTypes.string.isRequired,
    })),
  ]).isRequired,
  value: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

SelectControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectControl);