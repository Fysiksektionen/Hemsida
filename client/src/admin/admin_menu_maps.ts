import React from 'react';
import PagesAdminPage from './Pages';
import UsersAdminPage from './Users';
import { AdminPageProps } from '../types/admin_components';

type AdminMenuItem = {
    name: string,
    icon: string,
    getParams?: object,
    component: React.FunctionComponent<AdminPageProps>
}

export const menuItems: NodeJS.Dict<AdminMenuItem> = {
    'pages/': {
        name: 'Pages',
        icon: 'fas fa-user',
        component: PagesAdminPage
    },
    'users/': {
        name: 'Users',
        icon: 'far fa-copy',
        component: UsersAdminPage
    }
};
