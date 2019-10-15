import React from 'react';
import PropTypes from 'prop-types';
import geoData from './geolocations-backpage';
import SelectControl from '../selects/SelectControl'

const GeoSelect = props => {
  const { size, control, variant, open, value, onOpen, onClose, onChange, } = props;
  const items = getListItems(props);
  return (
    <SelectControl
      size={size}
      label={`Select ${variant}`}
      items={items}
      control={control}
      value={value}
      isOpen={open}
      onOpen={onOpen}
      onClose={onClose}
      onChange={onChange}
    />
  );
}

const getListItems = ({ variant, nation, region, }) => {
  let out, ready;
  // console.log('props\n', this.props);
  switch(variant) {
    case 'nation':
      out = Object.keys(geoData);
      break;
    case 'region':
      ready = !!nation;
      if(!ready) {
        console.error('Missing nation');
        return;
      }
      out = Object.keys(geoData[nation]);
      break;
    case 'local':
      ready = !!(nation && region);
      if(!ready) {
        console.error('Missing nation or region');
        return;
      }
      out = geoData[nation][region];
      break;
    default:
      console.error('We do not recognize that variant: ', variant);
  }
  return out;
}

GeoSelect.defaultProps = {
  size: 'medium',
  control: 'select',
};

GeoSelect.propTypes = {
  // classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['nation', 'region', 'local']),
  control: PropTypes.oneOf(['none', 'select', 'button']).isRequired, // default: 'select'
  nation: PropTypes.string,
  region: PropTypes.string,
  size: PropTypes.string,
  open: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  // onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GeoSelect;