import placeholder from '../placeholder.jpg'
import React from 'react';
import FButton from '../components/f-styled/buttons/FButton';
import { AccountBalance, Menu, Search } from '@material-ui/icons';
import FDateButton from '../components/f-styled/buttons/FDateButton';
import FLargeIconButton from '../components/f-styled/buttons/FLargeIconButton';


function Frontpage() {
  return (
    <>
      <div className="" style={{height: "800px"}}>
          <img src={placeholder} style={{width: "100%", marginTop: "50px"}}></img>
      </div>
      <div
        className="px-4 my-4"
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <FButton
          text="Engagera dig"
          version="dark"
        />
        <FButton
          text="Om sektionen"
          version="dark"
        />
        <FButton
          text="Event"
          version="dark"
        />
      </div>
      <div
        className="px-4 my-4"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <FDateButton text="Namn på möte" date="1997-10-10"/>
        <FDateButton text="Namn på möte" date="1997-10-10" version="dark"/>
      </div>
      <div
        className="px-4 my-4"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <FLargeIconButton text="Budget" Icon={AccountBalance}/>
      </div>
    </>
  )
}

export default Frontpage;
