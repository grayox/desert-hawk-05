import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import axios from 'axios/index';
import {GridList, GridListTile, GridListTileBar, Icon, IconButton, Typography, ListSubheader} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimateGroup} from '@fuse';

const styles = theme => ({
    root: {},
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    }
});

class PhotosVideosTab extends Component {

    state = {
        photosVideos: []
    };

    componentDidMount()
    {
        axios.get('/api/profile/photos-videos').then(res => {
            this.setState({photosVideos: res.data});
        });
    }

    render()
    {
        const {classes} = this.props;
        const {photosVideos} = this.state;

        return (
            <div className={classNames(classes.root, "md:flex max-w-2xl")}>
                <div className="flex flex-col flex-1 md:pr-32">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                        {photosVideos.map((period) => (
                            <div key={period.id} className="mb-48">

                                <ListSubheader component="div" className="flex items-center pl-0 mb-24">
                                    <Typography className="mr-16" variant="h6">{period.name}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">{period.info}</Typography>
                                </ListSubheader>

                                <GridList className="" spacing={8} cols={0}>
                                    {period.media.map(media => (
                                        <GridListTile
                                            classes={{
                                                root: "w-1 sm:w-1/2 md:w-1/4",
                                                tile: "rounded-8"
                                            }}
                                            key={media.preview}
                                        >
                                            <img src={media.preview} alt={media.title}/>
                                            <GridListTileBar
                                                title={media.title}
                                                actionIcon={
                                                    <IconButton className="" color="inherit">
                                                        <Icon className={classes.icon}>info</Icon>
                                                    </IconButton>
                                                }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        ))}
                    </FuseAnimateGroup>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(PhotosVideosTab);
