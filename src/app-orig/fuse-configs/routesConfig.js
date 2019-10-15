import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {appsConfigs} from 'app-orig/main/apps/appsConfigs';
import {pagesConfigs} from 'app-orig/main/pages/pagesConfigs';
import {authRoleExamplesConfigs} from 'app-orig/main/auth/authRoleExamplesConfigs';
import {UserInterfaceConfig} from 'app-orig/main/user-interface/UserInterfaceConfig';
import {DocumentationConfig} from 'app-orig/main/documentation/DocumentationConfig';
import {LoginConfig} from 'app-orig/main/login/LoginConfig';
import {RegisterConfig} from 'app-orig/main/register/RegisterConfig';
import {LogoutConfig} from 'app-orig/main/logout/LogoutConfig';
import {CallbackConfig} from 'app-orig/main/callback/CallbackConfig';

const routeConfigs = [
    ...appsConfigs,
    ...pagesConfigs,
    ...authRoleExamplesConfigs,
    UserInterfaceConfig,
    DocumentationConfig,
    LogoutConfig,
    LoginConfig,
    RegisterConfig,
    LogoutConfig,
    CallbackConfig
];

const routes = [
    //if you want to make whole app auth protected by default change defaultAuth for example:
    // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
    // The individual route configs which has auth option won't be overridden.
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/apps/dashboards/analytics"/>
    },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

export default routes;
