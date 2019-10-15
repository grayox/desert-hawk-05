import React, { useState, useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';

import {
  AppBar, Card, CardContent, Toolbar, Icon, // Paper,
  Typography, Button, TextField, Radio, RadioGroup,
  FormControl, FormLabel, FormControlLabel, ListItemIcon, ListItemText,
  InputLabel, Select, MenuItem, OutlinedInput,
} from '@material-ui/core';

// import SelectControl from 'app/components/selects/SelectControl';

// const styles = theme => ({});

// const ALERT_SUCCESS = 'Your note was submitted. Thank you!';
// eslint-disable-next-line
const ALERT_WARN = 'Your note has exceeded the maximum allowable size.\
                    Consider shortening it or splitting it into two parts.';

const NarrativeForm = props => {
  // const { classes, } = props;
  // const { container, margin, textField, } = classes;
  const initialType = null;
  const initialCanReset = false;
  const initialCanSubmit = false;
  // const initialTypeSelectIsOpen = false;
  const {
    heading, contentLabel, typeLabel, rowsCount, minLength, maxLength, onSave, initialContent, radio=false,
  } = props;

  const [ type       , setType       , ] = useState(initialType);
  const [ content    , setContent    , ] = useState(initialContent);
  const [ canReset   , setCanReset   , ] = useState(initialCanReset);
  const [ canSubmit  , setCanSubmit  , ] = useState(initialCanSubmit);
  const [ labelWidth , setLabelWidth , ] = useState(0);
  // const [ typeSelectIsOpen , setTypeSelectIsOpen , ] = useState(initialTypeSelectIsOpen);

  const inputLabel = useRef();
  useEffect( () => {
    // const ready1 = inputLabel && inputLabel.current && inputLabel.current.offsetWidth
    // if(!ready1) return;
    setLabelWidth(inputLabel.current.offsetWidth);
    handleEnableButton();
  }, [ type, content, ]);

  const handleReset = () => {
    setType(initialType);
    setContent(initialContent);
    setCanReset(initialCanReset);
    setCanSubmit(initialCanSubmit);
    // setTypeSelectIsOpen(initialTypeSelectIsOpen);
  }

  const handleSubmit = event => {
    const newData = { type, content, };
    onSave(newData);
    // console.log('content\n', content,);
    // alert(`${ALERT_SUCCESS}\n\n${content}`);
    handleReset();
  }

  const handleChangeType = ({ target, }) => {
    setType(target.value);
  }

  const handleEnableButton = () => {
    const ready1 = type && type.length;
    const ready2 = content && content.length;
    const ready3 = ready2 > minLength;
    const ready4 = ready1 || ready2;
    const ready5 = ready1 && ready3;
    setCanReset(ready4);
    setCanSubmit(ready5);
  }

  const handleChangeContent = ({ target, }) => {
    // console.log('target\n', target,);
    const { value, } = target;
    // console.log('value\n', value,);
    const { length, } = content;
    const isWarning = length > maxLength;
    if(isWarning) {
      alert(ALERT_WARN);
      const newStr = content.slice(0, -1);
      setContent(newStr);
      return;
    }
    setContent(value);
  }

  const getAppBar = () =>
    <AppBar position="static" elevation={0}>
      <Toolbar className="pl-16 pr-8">
        <Typography variant="subtitle1" color="inherit" className="flex-1">
          {heading}
        </Typography>
      </Toolbar>
    </AppBar>

  const typeConfig = [
    { value : 'bug'        , label : 'Bug report'      , icon : 'bug_report'      , } ,
    // { value : 'review'     , label : 'Product review'  , icon : 'thumbs_up_down'  , } ,
    // { value : 'review'     , label : 'Product review'  , icon : 'favorite_border' , } ,
    { value : 'positive'   , label : 'Positive review' , icon : 'thumb_up'        , } ,
    { value : 'negative'   , label : 'Negative review' , icon : 'thumb_down'      , } ,
    { value : 'question'   , label : 'Question'        , icon : 'contact_support' , } ,
    { value : 'comment'    , label : 'Comment'         , icon : 'comment'         , } ,
    { value : 'suggestion' , label : 'Suggestion'      , icon : 'feedback'        , } ,
    // { value : 'request'    , label : 'Feature request' , icon : 'star_border'     , } ,
    { value : 'request'    , label : 'Feature request' , icon : 'touch_app'       , } ,
  ]

  const getTypeSelect = () =>
    <FormControl
      variant="outlined"
      fullWidth
      // className={classes.formControl}
    >
      <InputLabel ref={inputLabel} htmlFor="select">{type ? null : typeLabel}</InputLabel>
      {
      // <SelectControl
      //   size='medium'
      //   control='select'
      //   label={typeLabel}
      //   items={typeConfig}
      //   value={type}
      //   isOpen={typeSelectIsOpen}
      //   // onOpen={handleTypeSelectOpen}
      //   // onClick={handleTypeSelectOpen}
      //   // onClose={handleTypeSelectClose}
      //   onChange={handleChangeType}
      // />
      }
      <Select  // for implementation examples and consolidation targets: search: <Select
        value={type}
        onChange={handleChangeType}
        input={<OutlinedInput labelWidth={labelWidth} name="select" id="select" />}
      >
        {
          typeConfig.map( ({ value, label, icon=null, }, index,) =>
            <MenuItem key={value} value={value}>
              {
                icon
                ?
                <React.Fragment>
                  <ListItemIcon className="inline">
                    <Icon className="align-middle">{icon}</Icon>
                  </ListItemIcon>
                  <Typography className="inline" variant="inherit" display="inline" noWrap>
                    {label}
                  </Typography>
                </React.Fragment>
                :
                <ListItemText primary={label} />
              }
            </MenuItem>
        )}
      </Select>
    </FormControl>

  const getTypeRadio = () =>
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <div className="py-16">{typeLabel}</div>
      </FormLabel>
      <RadioGroup
        aria-label="position" name="position" value={type} onChange={handleChangeType} // row
      >
        {
          typeConfig.map( ({value, label,},) =>
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio color="secondary" />} // primary
              label={label}
              labelPlacement="end" // start | end | top | bottom
            />
          )
        }
      </RadioGroup>
    </FormControl>

  const getTextField = () =>
    <TextField
      // className={classNames(margin, textField,)} // className={textField}
      variant="outlined"
      id="feedback-form"
      label={contentLabel}
      fullWidth
      multiline
      rows={rowsCount}
      value={content}
      onChange={handleChangeContent}
      margin="normal"
    />

  const getButtons = () =>
    <div className="mt-16 text-right">
      <Button
        type="reset"
        // variant="contained"
        // color="primary"
        // color="secondary"
        className="mr-8"
        aria-label="Reset"
        disabled={!canReset}
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button
        type="submit"
        variant="contained"
        // color="primary"
        color="secondary"
        // className="mx-auto"
        aria-label="Submit"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>

  const getCardContent = () =>
    <CardContent className="p-32">
    {/* <Paper className="max-w-sm m-32 p-32"> */}
      {/* <Typography className="h1 mb-24">{heading}</Typography> */}
      {radio ? getTypeRadio() : getTypeSelect()}
      {getTextField()}
      {getButtons()}
    {/* </Paper> */}
    </CardContent>

  const getNarrativeForm = () =>
    <Card className="w-full m-0 md:mb-16">
      {getAppBar()} 
      {getCardContent()}
    </Card>

  return getNarrativeForm();
}

NarrativeForm.defaultProps = {
  heading: 'Send us a note',
  contentLabel: 'What’s on your mind?',
  typeLabel: 'Type of feedback',
  radio: false, 
  rowsCount: 8,
  minLength: 4,
  maxLength: 9999, // 1Mb/document, firestore limit
  initialContent: '',
  // initialType: null,
  // initialCanSubmit: false,
  // initialTypeSelectIsOpen: false,
};

NarrativeForm.propTypes = {
  // classes: PropTypes.object.isRequired,
  radio: PropTypes.bool,
  heading: PropTypes.string,
  contentLabel: PropTypes.string,
  typeLabel: PropTypes.string,
  rowsCount: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  initialContent: PropTypes.string,
  // initialType: PropTypes.string,
  // initialCanSubmit: PropTypes.bool,
  // initialTypeSelectIsOpen: PropTypes.bool,
};

// export default withStyles(styles)(NarrativeForm);
export default NarrativeForm;