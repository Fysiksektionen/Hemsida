import React from "react";
import { IconButton, Button, Drawer } from '@material-ui/core';
import MenuList from "./MenuList";
import { CloseRounded } from "@material-ui/icons";

export interface IMenuItem {
    category: String,
    itemText: String,
    isHeader: boolean
}

const mock_data: IMenuItem[] = [
    { category: "Engagera dig", itemText: "Engagera dig", isHeader: true },
    { category: "Engagera dig", itemText: "Vad kan du göra?", isHeader: false },
    { category: "Engagera dig", itemText: "Klubbmästeriet fkm*", isHeader: false },
    { category: "Sektionen", itemText: "Sektionen", isHeader: true },
    { category: "Sektionen", itemText: "Vad är Fysiksektionen?", isHeader: false },
    { category: "Sektionen", itemText: "Styret", isHeader: false },
    { category: "Event", itemText: "Event", isHeader: true },
    { category: "Event", itemText: "Lista över event", isHeader: false },
    { category: "Event", itemText: "Sektionskalender", isHeader: false },
    { category: "Resurser", itemText: "Resurser", isHeader: true },
    { category: "Resurser", itemText: "Styrdokument", isHeader: false },
    { category: "Resurser", itemText: "Möteshandlingar", isHeader: false },
]

export default function HeaderMenu() {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setIsOpen(open);
    };

    return (
        <React.Fragment key={'right'}>
            <Button className="mx-3" onClick={toggleDrawer(true)}>
                {"Meny"}
            </Button>
            <Drawer
                anchor={'right'}
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                <div
                    className="bg-dark text-white"
                    style={{ textAlign: "right" }}
                >
                    <IconButton
                        onClick={toggleDrawer(false)}
                        color="secondary"
                        style={{ color: "white" }}
                    >
                        <CloseRounded/>
                    </IconButton>
                </div>
                <MenuList data={mock_data}/>
            </Drawer>
        </React.Fragment>
    );
}