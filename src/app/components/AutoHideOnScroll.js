// inspired by this demo: https://codesandbox.io/s/4z56yl6rm4
// based on this SO answer: https://stackoverflow.com/a/50427181

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: 'translate(0, 0)',
    transition: 'transform .5s',
  },
  hide: {
    transform: 'translate(0, -70px)',
    transition: 'transform .5s',
  },
};

class CollapsibleAppBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shouldShow: null,
    };

    this.lastScroll = null;

    this.handleScroll = this.handleScroll.bind(this);
    // Alternatively, you can throttle scroll events to avoid
    // updating the state too often. Here using lodash.
    // this.handleScroll = _.throttle(this.handleScroll.bind(this), 100);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    console.log('hai');
    const lastScroll = window.scrollY;

    if (lastScroll === this.state.lastScroll) {
      return;
    }

    const shouldShow =
      this.lastScroll !== null ? lastScroll < this.lastScroll : null;

    if (shouldShow !== this.state.shouldShow) {
      this.setState(prevState => ({
        ...prevState,
        shouldShow,
      }));
    }

    this.lastScroll = lastScroll;
  }

  getScrollClassName() {
    console.log('state\n', this.state);
    if (this.state.shouldShow === null) {
      return '';
    }

    return this.state.shouldShow
      ? this.props.classes.show
      : this.props.classes.hide;
  }

  render() {
    const { classes, children } = this.props;
    return (
      <div className={`${classes.root} ${this.getScrollClassName()}`}>
        {children}
      </div>
      // <AppBar
      //   position="fixed"
      //   className={`${classes.root} ${this.getScrollClassName()}`}
      // >
      //   <Toolbar>
      //     <Typography variant="title" color="inherit">
      //       Title
      //     </Typography>
      //   </Toolbar>
      // </AppBar>
    );
  }
}

CollapsibleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapsibleAppBar);
