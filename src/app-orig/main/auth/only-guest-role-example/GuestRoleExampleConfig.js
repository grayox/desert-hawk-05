import {authRoles} from 'app-orig/auth';
import GuestRoleExample from './GuestRoleExample';

export const GuestRoleExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.onlyGuest,//['guest']
    routes  : [
        {
            path     : '/auth/guest-role-example',
            component: GuestRoleExample
        }
    ]
};
