import React, {Component} from 'react';
import {withStyles, Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import auth0Service from 'auth0Service';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'store/actions';
import * as userActions from 'auth/store/actions';

const styles = theme => ({
    root: {
        width: '100%'
    }
});

class Auth0LoginTab extends Component {

    showDialog = () => {
        auth0Service.login();
    };

    componentDidMount()
    {
        this.showDialog();

        auth0Service.onAuthenticated(() => {

            this.props.showMessage({message: 'Logging in with Auth0'});

            auth0Service.getUserData().then(tokenData => {

                this.props.setUserDataAuth0(tokenData);

                const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : '/';
                this.props.history.push({
                    pathname
                });

                this.props.showMessage({message: 'Logged in with Auth0'});
            });
        });
    }

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Button
                    className="w-full my-48"
                    color="primary"
                    variant="contained"
                    onClick={this.showDialog}
                >
                    Log In/Sign Up with Auth0
                </Button>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            setUserDataAuth0: userActions.setUserDataAuth0,
            showMessage     : Actions.showMessage
        },
        dispatch);
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(null, mapDispatchToProps)(Auth0LoginTab)));
