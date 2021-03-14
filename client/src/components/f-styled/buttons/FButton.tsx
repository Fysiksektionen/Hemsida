import React from "react";
import { Button, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export type FButtonProps = {
  text: String;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  version?: "light" | "dark";
  style?: React.CSSProperties | undefined;
  onClick?: () => void
  props?: any;
}

export default function FButton({ text, Icon, version="light", style, ...props } : FButtonProps ) {
  var bg_clr: string = "white";
  var text_clr: string = "black";
  switch(version) {
    case "light":
      bg_clr = "var(--F-light-gray)";
      text_clr = "black";
      break;
    case "dark":
      bg_clr = "var(--F-dark-gray)";
      text_clr = "white";
      break;
  }
  return (
    <Button
      className={"text-center px-3 py-2 m-1"}
      endIcon={Icon ? <Icon/> : undefined}
      style={{
        backgroundColor: bg_clr,
        color: text_clr,
        minWidth: '8rem',
        textTransform: 'none',
        fontWeight: 'bold',
        ...style
      }}
      onClick={onClick}
      {...props}
    >
      <div>{text}</div>
    </Button>
  );
}