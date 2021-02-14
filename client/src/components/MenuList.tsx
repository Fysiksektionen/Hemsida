import React from "react";
import { List, ListItem } from "@material-ui/core";
import { IMenuItem } from "./SidebarMenu";

<div
  className="bg-dark text-white px-4"
  style={{
    height: "100%",
    minWidth: window.innerWidth * 0.4
  }}
>
  Text
</div>

interface IMenuListProps {
  data: IMenuItem[];
}

export default function MenuList({ data }: IMenuListProps ) {
  return (
    <div
      className="bg-dark text-white"
      style={{
        height: "100%",
        minWidth: window.innerWidth * 0.4
      }}
    >
      <List style={{ marginTop: "3rem" }}>
        {data.map(val => (
            <ListItem>
              <div 
                style={{
                  fontWeight: "bold",
                  fontSize: val.isHeader ? "170%" : "100%",
                  marginLeft: val.isHeader ? "2rem" : "3rem",
                  marginTop: val.isHeader ? "1rem" : 0 
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