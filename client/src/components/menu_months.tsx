import React from 'react';

interface IMenuMonths {
    links: string[12]
}

const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function MenuMonths() {
    return (
      <div style={{width: "400px"}}>
        <ul style={{listStyleType: "none"}}>
          <li><a href="#">Senaste nytt</a></li>
            {monthNames.map(month => <li><a href='#'>{month}</a></li>)}
        </ul>
      </div>
    )
  }
  
  export default MenuMonths;