import React from 'react';
import Banner from '../components/banner'
import OrangeInfoBoxes from '../components/orange_info_boxes';
import NewsWidget from '../components/news/frontpage_news_widget'

function Frontpage() {
  return (
    <div>
      <Banner />
      <OrangeInfoBoxes />
      <div style={{height: "50px"}}></div>
      <NewsWidget />
      <div style={{height: "100px"}}></div>
    </div>
  )
}

export default Frontpage;
