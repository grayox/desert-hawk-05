import {authRoles} from 'app-orig/auth';
import store from 'app-orig/store';
import {logoutUser} from 'app-orig/auth/store/actions';

export const LogoutConfig = {
    auth  : authRoles.user,
    routes: [
        {
            path     : '/logout',
            component: () => {
                store.dispatch(logoutUser());
                return 'Logging out..'
            }
        }
    ]
};

