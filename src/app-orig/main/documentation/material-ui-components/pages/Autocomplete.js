import React from 'react';
import {FuseExample, FuseHighlight, FusePageSimple} from '@fuse';
import {Button, Icon, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
/* eslint import/no-webpack-loader-syntax: off */
/* eslint no-unused-vars: off */
/* eslint-disable jsx-a11y/accessible-emoji */
const useStyles = makeStyles(theme => ({
    layoutRoot: {
        '& .description': {
            marginBottom: 16
        }
    }
}));

function AutocompleteDoc(props)
{
    const classes = useStyles();
    return (

        <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-16">
                            <Icon className="text-18" color="action">home</Icon>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Documentation</Typography>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Material UI Components</Typography>
                        </div>
                        <Typography variant="h6">Autocomplete</Typography>
                    </div>
                    <Button
                        className="normal-case"
                        variant="contained"
                        component="a"
                        href="https://material-ui.com/components/autocomplete"
                        target="_blank"
                        role="button"
                    >
                        <Icon className="mr-4">link</Icon>
                        Reference
                    </Button>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl">
                    <Typography className="text-44 mt-32 mb-8" component="h1">Autocomplete</Typography>
                    <Typography className="description">The autocomplete is a normal text input enhanced by a panel of suggested options.</Typography>

                    <Typography className="mb-16" component="div">Material-UI doesn&#39;t provide a high-level API for solving this problem.
                        You are encouraged to use a solution the React community has built, following one of the examples below.</Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">downshift</Typography>
                    <Typography className="mb-16" component="div"> src="https://img.shields.io/github/stars/paypal/downshift.svg?style=social&label=Stars" alt="stars/>
                        src="https://img.shields.io/npm/dm/downshift.svg" alt="npm downloads/></Typography>
                    <Typography className="mb-16" component="div">This example demonstrates how to use <a href="https://github.com/downshift-js/downshift">downshift</a>.</Typography>
                    <Typography className="mb-16" component="div">The last demo allows the user to clear the input and show a number of options on focus.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app-orig/main/documentation/material-ui-components/components/autocomplete/IntegrationDownshift.js').default}
                        raw={require('!raw-loader!app-orig/main/documentation/material-ui-components/components/autocomplete/IntegrationDownshift.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">react-select</Typography>
                    <Typography className="mb-16" component="div"> src="https://img.shields.io/github/stars/JedWatson/react-select.svg?style=social&label=Stars" alt="stars/>
                        src="https://img.shields.io/npm/dm/react-select.svg" alt="npm downloads/></Typography>
                    <Typography className="mb-16" component="div">This example demonstrates how to use <a href="https://github.com/JedWatson/react-select">react-select</a>.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app-orig/main/documentation/material-ui-components/components/autocomplete/IntegrationReactSelect.js').default}
                        raw={require('!raw-loader!app-orig/main/documentation/material-ui-components/components/autocomplete/IntegrationReactSelect.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">react-autosuggest</Typography>
                    <Typography className="mb-16" component="div"> src="https://img.shields.io/github/stars/moroshko/react-autosuggest.svg?style=social&label=Stars" alt="stars/>
                        src="https://img.shields.io/npm/dm/react-autosuggest.svg" alt="npm downloads/></Typography>
                    <Typography className="mb-16" component="div">This example demonstrates how to use <a href="https://github.com/moroshko/react-autosuggest">react-autosuggest</a>.
                        It also uses <a href="https://www.npmjs.com/package/autosuggest-highlight">autosuggest-highlight</a> for the highlighting logic.</Typography>
                    <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app-orig/main/documentation/material-ui-components/components/autocomplete/IntegrationAutosuggest.js').default}
                        raw={require('!raw-loader!app-orig/main/documentation/material-ui-components/components/autocomplete/IntegrationAutosuggest.js')}
                    /></Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">Complementary projects</Typography>
                    <Typography className="mb-16" component="div">For more advanced use cases you might be able to take advantage of:</Typography>
                    <ul>
                        <li><a href="https://mui.wertarbyte.com/#material-ui-chip-input">material-ui-chip-input</a>: The chip input is used to allow selecting multiple text values.</li>
                        <li><a href="https://github.com/techniq/mui-downshift">mui-downshift</a>: A thin layer over paypal&#39;s downshift to use Material-UI visual components.</li>
                        <li><a href="https://github.com/plan-three/material-ui-autosuggest">material-ui-autosuggest</a>: A fuzzy-search component for React and Material-UI.</li>
                        <li><a href="https://github.com/iulian-radu-at/react-select-material-ui">react-select-material-ui</a>: Extend react-select with Material-UI.</li>
                    </ul>

                </div>
            }
        />

    );
}

export default AutocompleteDoc;
