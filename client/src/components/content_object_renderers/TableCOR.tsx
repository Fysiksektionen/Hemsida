import React from 'react';
import { TableCell, TableRow } from '../../types/content_objects/blocks';
import { mockText } from '../../mock_data/mock_utils';
import TextCOR from '../content_object_renderers/TextCOR';

type TableProps = {
    width: number,
    height: number,
    rows: TableRow[]
}

function makeRow(cells: TableCell[]) {
    const cols = cells.map(cell => {
        if (cell.attributes.headerStyle) {
            return <th><TextCOR textCO={cell}/></th>;
        } else {
            return <td><TextCOR textCO={cell}/></td>;
        }
    });
    return (
        <tr>
            {cols}
        </tr>
    );
}

function fillMissing(cells: TableCell[], nrOfCells: number) {
    if (cells.length < nrOfCells) {
        const nrOfMissingCells = nrOfCells - cells.length;
        for (let i = 0; i < nrOfMissingCells; i++) {
            const text = mockText('');
            const cell = text as TableCell;
            cells.push(cell);
        }
    }
}

export default function TableCOR(props: TableProps) {
    const rows = props.rows;
    fillMissing(rows[rows.length - 1].items, props.width);

    const JSXRows = rows.map(row => makeRow(row.items));
    return (
        <table className="table">
            {JSXRows}
        </table>
    );
}
