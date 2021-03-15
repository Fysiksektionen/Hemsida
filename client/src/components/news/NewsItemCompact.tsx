import React, { useState } from 'react';
import {INewsItem, NewsArticleBase} from './NewsArticle'
import Collapse from 'react-bootstrap/Collapse'
import Fadeout from '../Fadeout'
import './NewsItemCompact.css'


function NewsItemCompact(props : INewsItem) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)}>
      <NewsArticleBase {...props}>  
        <Fadeout fade={!open} color="#f0f0f0" midpoint="50px">
          <Collapse in={open} className="collapse-with-default-height">
            <div>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
              terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
              labore wes anderson cred nesciunt sapiente ea proident.
              <p>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                labore wes anderson cred nesciunt sapiente ea proident.
              </p>
            </div>
          </Collapse>
        </Fadeout>
        <BottomText opened={open} />
      </NewsArticleBase>
    </div>
  )
}

function BottomText(props: {opened: boolean}) {
  return (<div className="read-more">{props.opened ? Share() : ReadMore()}</div>)
}

function ReadMore() {
  return ("Läs mer...")
}

function Share() {
  return ("Dela")
}

export default NewsItemCompact;
