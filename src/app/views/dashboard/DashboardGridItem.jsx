import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

// @material-ui/core
// import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import InfoIconOutline from '@material-ui/icons/InfoOutlined';

// core components
import GridItem from "app/vendors/creative-tim/components/Grid/GridItem";
// import Danger from "app/vendors/creative-tim/components/div/Danger.jsx";
import Card from "app/vendors/creative-tim/components/Card/Card";
import CardHeader from "app/vendors/creative-tim/components/Card/CardHeader";
import CardIcon from "app/vendors/creative-tim/components/Card/CardIcon";
// import CardBody from "app/vendors/creative-tim/components/Card/CardBody.jsx";
import CardFooter from "app/vendors/creative-tim/components/Card/CardFooter";
import dashboardStyle from "app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";

const styles = theme => ({
  ...dashboardStyle,
  root: {
    width: '100%',
  },
  card: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.default
    backgroundColor: theme.palette.background.paper,
  },
  cardIcon: {
    cursor: 'pointer',
  }
});

function DashboardGridItem(props) {
  const { classes, item, onClickInfo, } = props;
  const { label, backgroundColor } = props;
  return (
    <GridItem xs={12} sm={6} md={3} key={item.label}>
    {/* https://stackoverflow.com/a/48905261 */}
      <Card className={classnames(classes.card)}
            style={{ backgroundColor }}
            label={label}
        >
        <CardHeader color={item.color} stats icon>
          <CardIcon
            color={item.color}
            onClick={() => onClickInfo(item)}
            className={classnames(classes.cardIcon)}
          >
            {React.createElement(item.icon)}
          </CardIcon>
          <div className={classes.cardCategory}>{item.label}</div>
          <div variant="h4">{item.data}</div>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <IconButton
              color='primary'
              className={classes.button}
              onClick={() => onClickInfo(item)}
            >
              {React.createElement(InfoIconOutline)}
            </IconButton>
          </div>
          <div className={classes.stats}>
            <div className="text-right">
              <Button size='small'>{item.buttonLabel}</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

DashboardGridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickInfo: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
 
export default withStyles(styles, {withTheme: true})(DashboardGridItem);