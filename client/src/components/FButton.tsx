import Reac from "react";
import { Button } from "@material-ui/core";

interface IFButtonProps {
  text: String;
  Icon?: React.ReactNode;
  version?: "light" | "dark";
  style?: React.CSSProperties | undefined;
}

export default function FButton({ text, Icon, version="light", style } : IFButtonProps ) {
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
      endIcon={Icon}
      style={{
        minWidth: '8rem',
        textTransform: 'none',
        fontWeight: 'bold',
        ...style
      }}  
    >
      <div>{text}</div>
    </Button>
  );
}