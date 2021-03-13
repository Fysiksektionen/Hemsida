import React from 'react';

export function CenteredText(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"text-center " + props.className}>{props.children}</div>
  )
}

export function CenteredAbsolute(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>{props.children}</div>
  )
}
