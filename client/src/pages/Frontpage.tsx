import React from 'react';
import Banner from '../components/Banner';
import OrangeInfoBoxes from '../components/OrangeInfoBoxes';
import NewsWidget from '../components/news/FrontpageNewsWidget';
import { AccountBalance } from '@material-ui/icons';
import FDateButton from '../components/f-styled/buttons/FDateButton';
import FLargeIconButton from '../components/f-styled/buttons/FLargeIconButton';
import {PageData} from '../components/PageTypeLoader';

function Frontpage(pageData: PageData) {
  return (
    <div>
      <Banner />
      <OrangeInfoBoxes />
      <div style={{height: "50px"}}/>
      <NewsWidget />
      <div style={{height: "100px"}}/>
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
    </div>
  )
}

export default Frontpage;
