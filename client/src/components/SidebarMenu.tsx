import { Link, List, ListItem, Table, TableRow } from "@material-ui/core";
import React, { PropsWithChildren, useState } from "react";
import { Row, Container } from "react-bootstrap";
import { INewsItem } from "./news/NewsArticle";

interface IListItem {
  id: string;
  title: string;
  [x: string]: any;
}

interface ISidebarMenuProps {
  menuItems: string[];
  itemRefs: any;
  listItems: Array<IListItem>;
}

export function SidebarMenu({ menuItems, itemRefs, listItems, children } : PropsWithChildren<ISidebarMenuProps>) {
  const [activeItem, setActiveItem] = useState(listItems[0]);

  const handleMenuClick = (item: IListItem) => {
    setActiveItem(item);
    itemRefs[item.id].current.scrollIntoView({
    behavior: 'auto',
    alignToTop: true,
  })
};

  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <h1 className="py-4">Nyheter</h1>
      </Row>
      <Row>
        <div style={{ width: "80%"}}>
          {children}
        </div>
        <div className="py-4" style={{ width: "20%", position: "fixed", right: "0"}}>
          <List>
            {listItems.map(item =>
            <ListItem
              key={item.id}
              style={{ width: "100%"}}
            >
              <Link
              onClick={() => handleMenuClick(item)}>
              {activeItem === item ?
              <div>
                <b>
                  {'•\u00A0' + item.title}
                </b>
              </div>
              : 
              <div className="px-1">
                {'\u00A0\u00A0' + item.title}
              </div>
              }
              </Link>
            </ListItem>
            )}
          </List>
        </div>
      </Row>
    </Container>
  )
}