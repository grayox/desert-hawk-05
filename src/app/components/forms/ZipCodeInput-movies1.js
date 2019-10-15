// inspired by https://material-ui.com/demos/text-fields/

import React, { Component, } from 'react';
import { withStyles, TextField, Button, } from '@material-ui/core';

import axios from 'axios';
// import { http, https, } from 'follow-redirects';
// import html2json from 'html2json';

const styles = theme => ({
  root: {
    // fontSize: 'xx-large',
  },
  button: {
    margin: theme.spacing.unit,
    // fontSize: 24,
  },
});

const TARGET_LENGTH = 5;
const INITIAL_STATE = {
  zip: '',
  isLoading: false,
  isValidZip: false,
  moviesData: undefined,
}

class MyForm extends Component {

  state = INITIAL_STATE;

  // constructor(props) {
  //   super(props);
  //   this.state = INITIAL_STATE;
  // }

  handleGetIsValidZip = zip => {
    const isValidZip = ( zip.length === TARGET_LENGTH );
    this.setState({ isValidZip, });
  }

  handleChange = event => {
    const s = event.target.value;
    
    // text string must not be too long
    const ready1 = (s.length <= TARGET_LENGTH);
    if(!ready1) return;
    
    // text string must only include numbers
    const patt = /\D/g; // checks for non-digit characters
    const res = patt.test(s); // search returns boolean
    const ready2 = !res;
    if(!ready2) return;

    const zip = s;
    this.setState(
      { zip, }
      ,() => this.handleGetIsValidZip(zip) // console.log('zip', this.zip,)
    );
  }

  handleSubmit = () => this.setState({isLoading: true,}, () => this.fetchmoviesData(this.state.zip))

  string2html = xs => {
    // ref: https://stackoverflow.com/a/35385518
    const s = '<div id="myDiv"></div>';
    const template = document.createElement('template');
    const str = s.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = str;
    const htmlObject = template.content.firstChild;
    return htmlObject;
  }

  fetchmoviesData = zip => {
    // const { zip, } = this.state;
    console.log('Your zip code is:\n', zip,);
    // alert(`Your zip code is: ${zip}`);
    // https://www.fandango.com/02139_movietimes
    // const url = 'https://www.example.com';
    const url = `https://www.fandango.com/${zip}_movietimes`;
    // fetch(url).then(response => console.log('response\n', response));
    const params = {};
    axios
      .get(url, params,)
      .then( response => {
        // console.log('response\n', response);
        const dataAsString = response && response.data;
        // const dataAsHtmlObject = this.string2html(dataAsString);
        const moviesData = dataAsString; // html2json(dataAsHtmlObject);
        // console.log('moviesData\n', moviesData);
        this.setState(
          { moviesData, }
          ,() => this.setState({isLoading: false,})
        );
      }
    );
  }

  render() {
    const { handleChange, handleSubmit, } = this;
    const { classes, } = this.props;
    const { zip, isValidZip, isLoading, moviesData, } = this.state;

    const zipInputForm = (
      <React.Fragment>
        <TextField
          error={!isValidZip}
          // id="outlined-error"
          label="Zip code"
          placeholder="Enter your zip code"
          // defaultValue="Hello World"
          // className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          value={zip}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            disabled={!isValidZip}
            className={classes.button}
            onClick={handleSubmit}
          >
            Get movies
          </Button>
        </div>
        <div>{zip}</div>
      </React.Fragment>
    )

    const getContent = () => moviesData ? moviesData : zipInputForm

    return (
      <div className={classes.root}>
        { isLoading ? <div>Loading...</div> : getContent() }
      </div>
    );
  }
}

// export default MyForm;
export default withStyles(styles)(MyForm);