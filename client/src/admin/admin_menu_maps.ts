import { AdminPage } from '../types/admin_components';
import PagesAdminPage from './Pages';
import UsersAdminPage from './Users';

type AdminMenuItem = {
    name: string,
    icon: string,
    path: string,
    getParams?: object
}

export const menuItems: AdminMenuItem[] = [
    {
        name: 'Pages',
        icon: 'fas fa-user',
        path: 'pages/'
    },
    {
        name: 'Users',
        icon: 'far fa-copy',
        path: 'users/'
    }
];

export const pathToAdminComponent: NodeJS.Dict<AdminPage> = {
    'pages/': PagesAdminPage,
    'users/': UsersAdminPage
};
