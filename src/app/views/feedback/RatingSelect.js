// ref: http://dreyescat.github.io/react-rating/

import React, { useState, } from 'react';
import PropTypes from 'prop-types';

// import { withStyles, } from '@material-ui/core/styles';
import {
  Typography, Button,
  AppBar, Card, CardContent, Toolbar, // Paper,
} from '@material-ui/core'; // withStyles,

import { FaStar, FaRegStar, } from 'react-icons/fa'; // https://react-icons.netlify.com/#/

import Rating from 'react-rating';

// const styles = theme => ({});

// eslint-disable-next-line
// const THANKS_MESSAGE = 'Thanks! 👼 Would you also like to rate us at';
// const FEEDBACK_REQUEST = 'Feedback submitted. Thank you. 🙏\n\nPlease consider sending us a note about how we can improve.';

const RatingSelect = props => {
  const { heading , initialRating , stop , onSave , } = props; // forwardMinimum, // redirectPath,
  const [ value            , setValue             , ] = useState(initialRating);
  const [ buttonIsDisabled , setButtonIsDisabled  , ] = useState(true);

  const handleClick = n => {
    // console.log('value\n', n,);
    if(n === value) {
      handleReset();
    } else {
      handleChange(n);
      setButtonIsDisabled(false);
    }
  }

  const handleChange = n => {
    // console.log('value\n', n,);
    setValue(n);
  }

  const handleReset = () => {
    setValue(undefined);
    setButtonIsDisabled(true);
  }
  
  const handleSave = event => {
    onSave(value,);
    setButtonIsDisabled(true);

    // if(value < forwardMinimum) {
    //   // alert(value);
    //   // alert(`${value}. ${FEEDBACK_REQUEST}`);
    //   alert(FEEDBACK_REQUEST);
    //   return;
    // }
    // alert(`${THANKS_MESSAGE} ${redirectPath}`);
  }
  
  const getAppBar = () =>
    <AppBar position="static" elevation={0}>
      <Toolbar className="pl-16 pr-8">
        <Typography variant="subtitle1" color="inherit" className="flex-1">
          {heading}
        </Typography>
      </Toolbar>
    </AppBar>

  const getRating = () =>
    <Rating
      stop={stop} initialRating={value} onClick={handleClick} // onChange={handleChange}
      emptySymbol={<FaRegStar className="mx-8 text-3xl text-orange" />}
      fullSymbol={<FaStar className="mx-8 text-3xl text-orange" />}
    />

  const getValue = () => <Typography className="ml-12 opacity-50" hidden={!value}>{value && `${value}/5 stars`}</Typography>
  
  const getButtons = () => 
    <div className="mt-24 text-right">
      <Button disabled={buttonIsDisabled} className="mr-8" onClick={handleReset}>Reset</Button>
      <Button disabled={buttonIsDisabled} variant="contained" color="secondary" onClick={handleSave}>Submit</Button>
    </div>

  const getCardContent = () =><CardContent className="p-32">{getRating()}{getValue()}{getButtons()}</CardContent>

  const getRatingSelect = () => <Card className="w-full m-0 md:mb-16">{getAppBar()}{getCardContent()}</Card>

  return getRatingSelect();
}

RatingSelect.defaultProps = {
  heading: 'Rate us',
  initialRating: undefined,
  stop: 5,
  forwardMinimum: 5,
  // redirectPath: null, // 'example.com',
};

RatingSelect.propTypes = {
  // classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  initialRating: PropTypes.number,
  stop: PropTypes.number,
  forwardMinimum: PropTypes.number,
  // redirectPath: PropTypes.string,
};

// export default withStyles(styles)(RatingSelect);
export default RatingSelect;