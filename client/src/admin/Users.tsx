import React from 'react';
import { Table } from 'react-bootstrap';
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { AdminPageProps } from '../types/admin_components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UsersAdminPage(props: AdminPageProps) {
    return (
        <div className="px-4 pt-5">
            <h2>List all users</h2>

            <Table>
                <TableHead>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Christoffer</TableCell>
                        <TableCell>123</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Leo</TableCell>
                        <TableCell>534</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
