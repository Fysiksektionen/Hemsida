import React from 'react';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function MenuMonths() {
    return (
        <ul style={{ listStyleType: 'none' }}>
            <li><a href="#">Senaste nytt</a></li>
            {monthNames.map(month =>
                <li key={month}>
                    <a href='#'>{month}</a>
                </li>
            )}
        </ul>
    );
}

export default MenuMonths;
