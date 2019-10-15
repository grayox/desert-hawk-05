import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Typography} from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    root         : {},
    searchWrapper: {
        width     : '100%',
        height    : 56,
        padding   : 18,
        display   : 'flex',
        alignItems: 'center'
    },
    search       : {
        paddingLeft: 16
    }
});

class Error500Page extends Component {

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 items-center justify-center p-16")}>

                <div className="max-w-512 text-center">

                    <FuseAnimate animation="transition.expandIn" delay={100}>
                        <Typography variant="h1" color="inherit" className="font-medium mb-16">
                            500
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate delay={500}>
                        <Typography variant="h5" color="textSecondary" className="mb-16">
                            Well, you broke the internet!
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate delay={600}>
                        <Typography variant="subtitle1" color="textSecondary" className="mb-48">
                            Just kidding, looks like we have an internal issue, please try again in a few minutes
                        </Typography>
                    </FuseAnimate>

                    <Link className="font-medium" to="/feedback">Report this problem</Link>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Error500Page);
