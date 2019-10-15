// inspired by
// https://material-ui.com/components/selects/#simple-select

import React, { useRef, useEffect, useState, } from 'react'; //
import {
  // makeStyles, // Input, FilledInput, FormHelperText,
  OutlinedInput, InputLabel, MenuItem, FormControl, Select,
} from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const SelectField = ({ onChange, id, label, options, required, error: isError, value: valueInit='', }) => {
  // const classes = useStyles();
  // const [ values, setValues, ] = useState({
  //   age: '',
  //   name: 'hai',
  // });

  // console.log('id\n', id,);
  // console.log('label\n', label,);
  // console.log('valueInit\n', valueInit,);
  const [ value      , setValue      , ] = useState(valueInit);
  const [ labelWidth , setLabelWidth , ] = useState(0);

  // solves "labelWidth error": "The prop `labelWidth` is marked as required in `OutlinedInput`, but its value is `undefined`."
  const inputLabel = useRef(null);
  useEffect( () => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  // const handleChange = event => {
  const handleChange = ({ target: { /*name,*/ value, },}) => {
    // setValues( oldValues => ({
    //   ...oldValues,
    //   // [event.target.name]: event.target.value,
    //   [name]: value,
    // }));
    setValue(value);

    // console.log('id\n', id);
    // console.log('name\n', name);
    // console.log('value\n', value);

    const arg = {
      target: {
        id, // maps to key in app/config/AppConfig.formFieldConfig // must be customized for custom components
        value,
      },
    };

    onChange(arg);
  }

  return (
    <form
      // className={classes.root}
      className="mb-24 w-full"
      autoComplete="off"
    >
      <FormControl
        variant="outlined"
        fullWidth
        // className={classes.formControl}
        required={required}
      >
        <InputLabel
          // solves "labelWidth error"
          ref={inputLabel}
          htmlFor={label}
        >
          {/* Age */}
          {label}
        </InputLabel>
        <Select  // for implementation examples and consolidation targets: search: <Select
          // fullWidth
          // value={values.age}
          value={value}
          error={!!isError}
          onChange={handleChange}
          input={
            <OutlinedInput
              labelWidth={labelWidth} // solves "labelWidth error"
              id={id}
              name={label}
            />
          }
        >
          <MenuItem value="" disabled>
            <em>Select one</em>
          </MenuItem>
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {
            // options.map(( option, index, ) => (
            options.map(( { value, label, }, index, ) => (
              <MenuItem
                // key={option}
                key={value}
                // disabled={index === 0}
                // selected={index === selectedIndex}
                // onClick={event => handleMenuItemClick(event, index,)}
                value={value}
              >
                {/* {option} */}
                {label}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default SelectField;
// export default makeStyles(styles, { withTheme: true })(SelectField);