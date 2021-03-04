import React from "react";
import { Button, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface IFButtonProps {
  text: String;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  version?: "light" | "dark";
  style?: React.CSSProperties | undefined;
  onClick?: () => void
}

export default function FButton({ text, Icon, version="light", style, onClick } : IFButtonProps ) {
  var clr_string: String;
  switch(version) {
    case "light":
      clr_string = "bg-white text-dark";
      break;
    case "dark":
      clr_string = "bg-dark text-white";
      break;
  }
  return (
    <Button
      className={clr_string + " text-center px-3 py-2 m-1"}
      endIcon={Icon ? <Icon/> : undefined}
      style={{
        minWidth: '8rem',
        textTransform: 'none',
        fontWeight: 'bold',
        ...style
      }}
      onClick={onClick}
    >
      <div>{text}</div>
    </Button>
  );
}