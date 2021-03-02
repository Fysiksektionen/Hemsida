import React from 'react';

const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

function MenuMonths() {
  return (
      <ul style={{listStyleType: "none"}}>
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <li><a href="#">Senaste nytt</a></li>
        {monthNames.map(month => <li><a href='#'>{month}</a></li>)}
      </ul>
    )
  }

export default MenuMonths;