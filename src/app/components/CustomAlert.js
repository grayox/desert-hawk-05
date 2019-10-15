// alerts inspired by   : https://v0.tailwindcss.com/docs/examples/alerts/#app
// v1.x upgrade         : https://tailwindcss.com/components/alerts/#app
// snackbar inspired by : https://material-ui.com/components/snackbars/

import React, { useState, useEffect,  useRef, } from 'react'; //
// import React, { useState, } from 'react';
import PropTypes from 'prop-types';

// import classNames from 'classnames';
import {
  // withStyles, SnackbarContent, Icon, IconButton,
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

import CreateDialogContainer from 'app/containers/CreateDialogContainer';

// const styles = theme => ({
//   success: {
//     backgroundColor: 'green', //green[600],
//   },
//   error: {
//     backgroundColor: 'red', // theme.palette.error.dark,
//   },
//   info: {
//     backgroundColor: 'blue', // theme.palette.primary.main,
//   },
//   warning: {
//     backgroundColor: 'amber', //amber[700],
//   },
//   icon: {
//     fontSize: 20,
//   },
//   iconVariant: {
//     opacity: 0.9,
//     marginRight: '4px' // theme.spacing(1),
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// })

// const getCustomAlertDemo = () =>
//   <React.Fragment>
//     <CustomAlert variant="traditional" />
//     <CustomAlert variant="modern"      />
//     <CustomAlert variant="left"        />
//     <CustomAlert variant="titled"      />
//     <CustomAlert variant="solid"       />
//     <CustomAlert variant="top"         />
//     <CustomAlert variant="banner"      />
//   </React.Fragment>

const CustomAlert = ({
  variant, heading, body, buttonText, dialog, actionButtonLabel,
}) => {

  const [ infoIsOpen     , setInfoIsOpen     , ] = useState(false);
  const [ actionIsOpen   , setActionIsOpen   , ] = useState(false);
  const [ snackbarIsOpen , setSnackbarIsOpen , ] = useState(false);

  const firstRenderAction = useRef(true);
  const firstRenderSnackbar = useRef(true);
  // console.log('firstRenderAction\n', firstRenderAction,);
  // console.log('firstRenderSnackbar\n', firstRenderSnackbar,);

  useEffect( () => {
    if( firstRenderAction.current ) {
      firstRenderAction.current = false;
      return;
    } else if(!actionIsOpen) {
      setSnackbarIsOpen(true);
      return;
    }
  }, [ actionIsOpen, ],);

  useEffect( () => {
    if (firstRenderSnackbar.current) {
      firstRenderSnackbar.current = false;
      return;
    } else if(!snackbarIsOpen) {
      handleRefresh();
      return;
    }
  }, [ snackbarIsOpen, ],);

  const handleRefresh = () => console.log('We will refresh now',);
  const handleOpenInfo  = () => setInfoIsOpen(true)
  const handleCloseInfo = () => setInfoIsOpen(false)
  const handleClickInfo = () => handleOpenInfo() // alert('You clicked the info button')
  
  const handleOpenAction  = () => setActionIsOpen(true)
  const handleCloseAction = () => setActionIsOpen(false)
  const handleClickAction = () => {
    handleOpenAction();
    // alert('You clicked the action button');
  }

  // const handleOpenSnackbar = () => setSnackbarIsOpen(true)

  const handleCloseSnackbar = ( event, reason, ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarIsOpen(false);
  }

  const getInfoDialog = () =>
    <Dialog
      open={infoIsOpen}
      onClose={handleCloseInfo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialog}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseInfo} color="primary">
          Okay, got it
        </Button>
      </DialogActions>
    </Dialog>

  const getActionDialog = () =>
    <CreateDialogContainer
      id='outbox'
      dialogIsOpen={actionIsOpen} snackbarIsOpen={snackbarIsOpen}
      // onOpenDialog={handleOpenAction}
      onCloseDialog={handleCloseAction}
      // onOpenSnackbar={handleOpenSnackbar}
      onCloseSnackbar={handleCloseSnackbar}
    />

  // const onClose = () Action
  // const getSnackbar = () =>
  //   <SnackbarContent
  //     // className={clsx(classes[variant], className)}
  //     aria-describedby="client-snackbar"
  //     message={
  //       <span id="client-snackbar" className={classes.message}>
  //         <Icon
  //           // className={clsx(classes.icon, classes.iconVariant)}
  //         />
  //         {
  //           // message
  //           'Hello world'
  //         }
  //       </span>
  //     }
  //     action={[
  //       <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
  //         <Icon className={classes.icon}>close</Icon>
  //       </IconButton>,
  //     ]}
  //     // {...other}
  //   />

  const getTraditional = () =>
    <div className="mb-16 p-16 bg-red-lightest border border-red-light text-red-dark rounded relative xshadow-md" role="alert">
      <strong className="font-bold mb-8">{heading}</strong>
      <p className="mt-8">{body}</p>
      {
      // <span className="absolute pin-t pin-b pin-r px-4 py-3">
      //   <svg className="fill-current h-6 w-6 text-red" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      // </span>
      }
      <div className="mt-8 text-right">
        <Button className="text-red-dark" size="small" onClick={handleClickInfo}>{buttonText}</Button>
        <Button
          className="ml-8" size="small" color="secondary"
          variant="contained" onClick={handleClickAction}
        >
          {actionButtonLabel}
        </Button>
      </div>
    </div>

  const getModernWithBadge = () =>
    <div className="mb-16 p-16 bg-indigo-darkest text-center">
      <div className="p-8 bg-indigo-darker items-center text-indigo-lightest leading-none lg:rounded-full flex lg:inline-flex" role="alert">
        <span className="mr-8 p-8 flex rounded-full bg-indigo uppercase text-xs font-bold">{heading}</span>
        <span className="mr-8 font-semibold text-left flex-auto">{body}</span>
        {
        // <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
        }
      </div>
    </div>


  const getLeftAccentBorder = () =>
    <div className="mb-16 p-16 bg-orange-lightest border-l-4 border-orange text-orange-dark" role="alert">
      <p className="font-bold">{heading}</p>
      <p>{body}</p>
    </div>

  const getTitled = () =>
    <div className="mb-16" role="alert">
      <div className="px-16 py-8 bg-red text-white font-bold rounded-t">
        {heading}
      </div>
      <div className="p-16 border border-t-0 border-red-light rounded-b bg-red-lightest text-red-dark">
        <p>{body}</p>
      </div>
    </div>

  const getSolid = () =>
    <div className="mb-16 p-16 flex items-center bg-blue text-white text-sm font-bold" role="alert">
      {
      // <svg className="mr-2 fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
      }
      <p>{body}</p>
    </div>

  const getTopAccentBorder = () =>
    <div className="mb-16 p-16 bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest shadow-md" role="alert">
      <div className="flex">
        {
        // <div className="py-1"><svg className="fill-current h-6 w-6 text-teal mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        }
        <div>
          <p className="font-bold">{heading}</p>
          <p className="text-sm">{body}</p>
        </div>
      </div>
    </div>

  const getBanner = () =>
    <div className="my-1b p-16 bg-blue-lightest border-t border-b border-blue text-blue-dark" role="alert">
      <p className="font-bold">{heading}</p>
      <p className="text-sm">{body}</p>
    </div>

  const alertConfig = {
    traditional: getTraditional(),
    modern: getModernWithBadge(),
    left: getLeftAccentBorder(),
    titled: getTitled(),
    solid: getSolid(),
    top: getTopAccentBorder(),
    banner: getBanner(),
  }

  const getAlertConfig = () => alertConfig[variant]

  const getCustomAlert = () =>
    <React.Fragment>
      { getAlertConfig()  }
      { getInfoDialog()   }
      { getActionDialog() }
    </React.Fragment>

  return getCustomAlert();
}

CustomAlert.propTypes = {
  // classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf([ 'traditional', 'modern', 'left', 'titled', 'solid', 'top', 'banner', ]),
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  actionButtonLabel: PropTypes.string,
  actionButtonHref: PropTypes.string,
  dialog: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

CustomAlert.defaultProps = {
  variant: 'traditional',
  heading: 'Holy smokes!',
  body: 'Something seriously bad happened.',
  buttonText: 'Learn more', // ️️ℹ️
  actionButtonLabel: '',
  actionButtonHref: '',
  dialog: '',
};

export default CustomAlert;