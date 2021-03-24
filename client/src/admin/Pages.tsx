import React from 'react';
import { Table } from 'react-bootstrap';
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { AdminPageProps } from '../types/admin_components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PagesAdminPage(props: AdminPageProps) {
    return (
        <div className="px-4 pt-4">
            <h2>List all pages</h2>

            <Table>
                <TableHead>
                    <TableCell>Name</TableCell>
                    <TableCell>Something else</TableCell>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Page 1</TableCell>
                        <TableCell>123</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Page 2</TableCell>
                        <TableCell>534</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};
