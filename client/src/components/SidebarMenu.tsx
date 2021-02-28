import React, { PropsWithChildren, useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Grid, Link, List, ListItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";


export interface IMenuItem {
  id: string;
  title: string;
  refsTo?: string;
}

interface ISidebarMenuProps {
  menuItems: IMenuItem[];
}


export function SidebarMenu({ menuItems, children } : PropsWithChildren<ISidebarMenuProps>) {  
  // TODO: Update active month-item based on scroll position
  const [active, setActive] = useState(menuItems[0].refsTo || "");
  let location = useLocation();

  let currPath: string | undefined;

  useEffect(() => {
    currPath = window.location.href.split("#")[1];
    if (currPath !== undefined) setActive(window.location.href.split("#")[1]);
  }, [location])

  // let refDict: { [key: string]: string } = {};
  // feedItems.forEach((feedItem: IFeedItem) => {
  //   if (feedItem.linkedBy) {
  //     refDict[feedItem.linkedBy.month + "_" + feedItem.linkedBy.year] = feedItem.content.id;
  //   }
  // });

  return (
    <Container style={{ width: "100%" }}>
      <Row>
        <Grid container justify="space-between" direction="row">
          <Col xs={8}>
          <div style={{ width: "100%"}}>
            {children}
          </div>
          </Col>
          <Col xs>
            <div style={{ position: "sticky", width: "100%", top: "200px", paddingTop: "2rem", paddingBottom: "2rem" }}>            
              <List>
                {menuItems.map(item =>
                <ListItem
                  dense
                  key={item.id}
                  style={{ width: "100%" }}
                >
                  {item.refsTo ?
                  <Link
                    href={"#" + item.refsTo}
                    underline="none"
                  >
                    {active === item.refsTo ?
                    <div style={{ color: "black" }}>
                      <b>
                        {'•\u00A0' + item.title}
                      </b>
                    </div>
                    : 
                    <div className="px-1" style={{ color: "black" }}>
                      {'\u00A0\u00A0' + item.title}
                    </div>
                    }
                  </Link> :
                  <Link underline="none">
                    <div className="px-1" style={{ color: "lightgray" }}>
                      {'\u00A0\u00A0' + item.title}
                    </div>
                  </Link>
                  }
                </ListItem>
                )}
              </List>
            </div>
          </Col>
        </Grid>
      </Row>
    </Container>
  )
}