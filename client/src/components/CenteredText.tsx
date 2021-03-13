import React from 'react';

function CenteredText(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"text-center " + props.className}>{props.children}</div>
  )
}

export default CenteredText;