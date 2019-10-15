import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import GeoSelect from '../GeoSelect/GeoSelect'
import Chip from '@material-ui/core/Chip';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

const steps = [
  'Select country'         ,
  'Select state or region' ,
  'Select location'        ,
];

const INITIAL_STATE = {
  geoNation: '',
  geoRegion: '',
  geoLocal: '',
  activeStep: 0,
  openNation: false,
  openRegion: false,
  openLocal: false,
  openSnackbar: false,
}

class GeoStepper extends React.Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // componentDidMount() {
  //   this.setState(this.initialState);
  // }

  // handleNext = () => {
  //   const { geoNation, geoRegion, geoLocal } = this.state;
  //   // each term adds one to the total if truthy
  //   // sets the dep var to the total number of truthy terms
  //   const out = (!!geoNation | 0) + (!!geoRegion | 0) + (!!geoLocal | 0);
  //   this.setState({
  //     activeStep: out,
  //   });
  // }

  // getStepContent = step => {
  //   switch (step) {
  //     case 0:
  //       return <GeoSelect
  //                control='select' //  button
  //                variant='country'
  //                value={this.state.geoNation}
  //                onClick={this.handleopenNation}
  //                onOpen={this.handleopenNation}
  //                onClose={this.handleCloseNation}
  //                onChange={this.handleChangeNation}
  //              />;
  //     case 1:
  //       return <GeoSelect
  //                control='select'
  //                variant='region'
  //                value={this.state.geoRegion}
  //                country={this.state.geoNation}
  //                onOpen={this.handleOpenRegion}
  //                onClose={this.handleCloseRegion}
  //                onChange={this.handleChangeRegion}
  //              />;
  //     case 2:
  //       return <GeoSelect
  //                control='select'
  //                variant='local'
  //                value={this.state.geoLocal}
  //                region={this.state.geoRegion}
  //                country={this.state.geoNation}
  //                onOpen={this.handleOpenLocal}
  //                onClose={this.handleCloseLocal}
  //                onChange={this.handleChangeLocal}
  //              />;
  //     default:
  //       return 'Unknown step';
  //   }
  // }

  getStepContent = step => {
    const {
      geoNation  , geoRegion  , geoLocal  , 
      openNation , openRegion , openLocal ,
    } = this.state;
    const {
      handleopenNation , handleCloseNation , handleChangeNation ,
      handleOpenRegion , handleCloseRegion , handleChangeRegion ,
      handleOpenLocal  , handleCloseLocal  , handleChangeLocal  ,
    } = this;
    // const control = 'none'; //  'none' | 'button' | 'select'
    const steps = [
      <GeoSelect
        control='none'
        variant='country'
        open={openNation}
        value={geoNation}
        onOpen={handleopenNation}
        onClose={handleCloseNation}
        onChange={handleChangeNation}
      />
      ,
      <GeoSelect
        control='none'
        variant='region'
        open={openRegion}
        value={geoRegion}
        country={geoNation}
        onOpen={handleOpenRegion}
        onClose={handleCloseRegion}
        onChange={handleChangeRegion}
      />
      ,
      <GeoSelect
        control='none'
        variant='local'
        open={openLocal}
        value={geoLocal}
        region={geoRegion}
        country={geoNation}
        onOpen={handleOpenLocal}
        onClose={handleCloseLocal}
        onChange={handleChangeLocal}
      />    
      ,
    ];
    return steps[step];
  }

  getOpenHandlers = () => [
    this.handleopenNation ,
    this.handleOpenRegion ,
    this.handleOpenLocal  ,
  ]

  getGeoValue = () => [
    this.state.geoNation ,
    this.state.geoRegion ,
    this.state.geoLocal  ,
  ]
  
  // ---------- country ------------

  handleopenNation = () => {
    this.setState({
      activeStep: 0,
      openNation: true,
      openRegion: false,
      openLocal: false,
      // geoNation: '',
      // geoRegion: '',
      // geoLocal: '',
    });
    // console.log('state\n', this.state);
  };

  handleCloseNation = () => {
    this.setState({
      openNation: false,
    });
    // console.log('state\n', this.state);
  };
  
  handleChangeNation = e => {
    const geoNation = e.target.value;
    const data = {
      geoNation: geoNation,
      // geoRegion: geoRegion,
      // geoLocal: geoLocal,
    };
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({     
      activeStep: 1,
      openNation: false,
      openRegion: false,
      openLocal: false,
      geoNation: geoNation,
      geoRegion: '',
      geoLocal: '',
    });
    // this.handleNext();
    // console.log('state\n', this.state);
    this.props.onChange(data);
  };

  // ---------- region ------------

  handleOpenRegion = () => {
    this.setState({  
      activeStep: 1,
      openNation: false,
      openRegion: true,
      openLocal: false,
      // geoNation: '',
      // geoRegion: '',
      // geoLocal: '',
    });
    // console.log('state\n', this.state);
  };
  
  handleCloseRegion = () => {
    this.setState({
      openRegion: false,
    });
    // console.log('state\n', this.state);
  };
  
  handleChangeRegion = e => {
    const { geoNation, } = this.state;
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    const geoRegion = e.target.value;
    const data = {
      geoNation: geoNation,
      geoRegion: geoRegion,
      // geoLocal: geoLocal,
    };
    this.setState({      
      activeStep: 2,
      openNation: false,
      openRegion: false,
      openLocal: false,
      // geoNation: '',
      geoRegion: geoRegion,
      geoLocal: '',
    });
    // this.handleNext();
    // console.log('state\n', this.state);
    this.props.onChange(data);
  };
  
  // ---------- local ------------

  handleOpenLocal = () => {
    this.setState({ 
      activeStep: 2,
      openNation: false,
      openRegion: false,
      openLocal: true,
      // geoNation: '',
      // geoRegion: '',
      // geoLocal: '',
    });
    // console.log('state\n', this.state);
  };

  handleCloseLocal = () => {
    this.setState({
      openLocal: false,
    });
    // console.log('state\n', this.state);
  };

  handleChangeLocal = e => {
    const { geoNation, geoRegion, } = this.state;
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    const geoLocal = e.target.value;
    const data = {
      geoNation: geoNation,
      geoRegion: geoRegion,
      geoLocal: geoLocal,
    };
    this.setState({
      activeStep: 3,
      openNation: false,
      openRegion: false,
      openLocal: false,
      // geoNation: '',
      // geoRegion: '',
      geoLocal: geoLocal,
    });
    // this.handleNext();
    // console.log('state\n', this.state);
    this.props.onChange(data);
    this.props.onValid(data);
  };

  // ---------- stepper ------------

  // handleNext = () => {
  //   this.setState(state => ({
  //     activeStep: state.activeStep + 1,
  //   }));
  // };

  handleReset = () => {
    // this.setState({
    //   activeStep: 0,
    // });
    this.setState(INITIAL_STATE);
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  // handleSave = () => {
  //   this.setState({openSnackbar: true,});
  // };

  handleCloseSnackbar = () => {
    this.setState({openSnackbar: false,});
  };

  // ------------------------------

  // handleBack = () => {
  //   const { activeStep } = this.state;
  //   switch( activeStep ) {
  //     case 1:
  //       this.setState({
  //         geoNation: null,
  //       })
  //       break;
  //     case 2:
  //       this.setState({
  //         geoRegion: null,
  //       })
  //       break;
  //     default:
  //       console.log('activeState out of range');
  //   }
  //   this.setState({
  //     activeStep: (activeStep + 1),
  //   });
  // }

  handleClickButton = () => {
    const { activeStep } = this.state;
    // console.log('button clicked...');
    // console.log('activeStep', activeStep);
    const a = this.getOpenHandlers();
    // console.log('open handlers\n', a);
    a[activeStep]();
  }

  handleClickChip = index => {
    // console.log('button clicked...');
    // console.log('index', index);
    const a = this.getOpenHandlers();
    // console.log('open handlers\n', a);
    a[index]();
  }

  render() {
    const {
      state, getGeoValue, getStepContent,
      handleClickChip, handleBack, handleReset,
      handleClickButton, handleCloseSnackbar,
    } = this;
    const {
      classes, key, onSave, heading, showSaveButton,
      // onValid, onChange,
    } = this.props;
    const { activeStep, openSnackbar, } = this.state;
    const { root, chip, close, button, resetContainer, actionsContainer, } = classes;

    return (
      <div key={key} className={root}>
        <Typography variant="subtitle1" color="inherit" className="my-4">
          {heading}
        </Typography>
        <Stepper
          activeStep={activeStep}
          // orientation="horizontal"
          orientation="vertical"
        >
          {steps.map((label, index) =>
            <Step key={label}>
              <StepLabel>
                {/* <span className="opacity-50 ml-8 text-base">{this.getGeoValue()[index]}</span> */}
                {'Step ' + (index + 1) + ': ' + label}
                {
                  getGeoValue()[index] ?
                  <Chip className={chip + ' ml-8'}
                  label={getGeoValue()[index]}
                  onClick={() => handleClickChip(index)} />
                  : null
                }
              </StepLabel>
              <StepContent>
                <div>{getStepContent(index)}</div>
                <div className={actionsContainer}>
                  <Button
                    className={button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className={button}
                    variant="contained"
                    color="primary"
                    onClick={handleClickButton}
                  >
                    Select
                  </Button>
                </div>
              </StepContent>
            </Step>
          )}
        </Stepper>
        {activeStep === showSaveButton && steps.length && (
          <Paper square elevation={0} className={resetContainer}>
            <div>You finished all steps. You&rsquo;re done!</div>
            <Button onClick={handleReset} className={[button, "mr-32"].join(" ")}>Reset</Button>
            <Button onClick={handleBack} className={button}>Back</Button>
            <Button onClick={() => onSave(state)} className={button}
              variant="contained"
              color="primary"
            >Save</Button>
          </Paper>
        )}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Saved</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={handleCloseSnackbar}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={close}
              onClick={handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

      </div>
    );
  }
}

GeoStepper.defaultProps = {
  showSaveButton: true,
  onChange: () => {},
  onValid: () => {},
  onSave: () => {},
  key: Date.now(),
  heading: 'Location', // 'Set your location',
};

GeoStepper.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  onValid: PropTypes.func,
  onSave: PropTypes.func,
  showSaveButton: PropTypes.bool,
  key: PropTypes.number,
  heading: PropTypes.string,
};

export default withStyles(styles)(GeoStepper);