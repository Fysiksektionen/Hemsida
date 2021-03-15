import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { IMenuItem } from './HeaderMenu';

interface IMenuListProps {
  data: IMenuItem[];
}

export default function MenuList({ data }: IMenuListProps) {
    return (
        <div
            className="bg-dark text-white"
            style={{
                height: '100%',
                minWidth: window.innerWidth * 0.4
            }}
        >
            <List>
                {data.map((val, index) => (
                    <ListItem key={index}>
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: val.isHeader ? '170%' : '100%',
                                marginLeft: val.isHeader ? '3rem' : '4rem',
                                marginTop: val.isHeader ? '1rem' : 0
                            }}
                        >
                            {val.itemText}
                        </div>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
