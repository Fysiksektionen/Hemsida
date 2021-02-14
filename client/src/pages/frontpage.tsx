import placeholder from '../placeholder.jpg'
import React from 'react';
import FButton from '../components/FButton';
import { Menu, Search } from '@material-ui/icons';


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
    </>
  )
}

export default Frontpage;
