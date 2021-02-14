import React from "react";
import { Button } from "@material-ui/core";

interface IFButtonProps {
  text: String;
  date: String; // TODO: change to some sort of Date-object
  version?: "light" | "dark";
  style?: React.CSSProperties | undefined;
}

export default function FDateButton({ text, date, version="light", style } : IFButtonProps ) {
  let clr_string: String = "";
  let bg_clr: "lightgray" | undefined;
  switch(version) {
    case "light":
      clr_string = "text-dark";
      bg_clr = "lightgray";
      break;
    case "dark":
      clr_string = "bg-dark text-white";
      bg_clr = undefined;
      break;
  }
  return (
    <Button
      className={clr_string + " text-center px-3 py-2 m-1"}
      style={{
        minWidth: '16rem',
        textTransform: 'none',
        backgroundColor: bg_clr,
        ...style
      }}  
    >
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{fontWeight: 'bold'}}>
          {text} 
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: "80%" }}>
          {date}
        </div>
      </div>
    </Button>
  );
}