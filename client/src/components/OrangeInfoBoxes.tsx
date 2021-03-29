import React from 'react';

type InfoBoxProps = {
    color: string
}

function OrangeInfoBox(props : InfoBoxProps) {
    // TODO: Temporary, should be improved in another branch
    return (
        <div className="" style={{ padding: '1em', backgroundColor: props.color }}>
            <h3>Lorem ipsum</h3>
            <p style={{ fontWeight: 'lighter' }}>dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    );
}

function OrangeInfoBoxes() {
    return (
        <div>
            <table style={{ backgroundColor: 'orange', color: 'white' }}>
                <tbody>
                    <tr>
                        <td><OrangeInfoBox color="orange" /></td>
                        <td><OrangeInfoBox color="orangered" /></td>
                        <td><OrangeInfoBox color="orange" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OrangeInfoBoxes;
