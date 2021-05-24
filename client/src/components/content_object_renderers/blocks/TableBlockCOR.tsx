import React from 'react';
import { TableBlock } from '../../../types/content_objects/blocks';
import { EditorialModeContext } from '../../../contexts';
import TableCOR from '../TableCOR';

// TODO Should be able to specify relative width maybe. So maybe not w-100.
export default function TableBlockCOR({ content }: {content: TableBlock}) {
    return (
        <div className='w-100'>
            <EditorialModeContext.Consumer>
                {edit => {
                    return (!edit
                        ? <TableCOR rows={content.items} width={content.attributes.width} height={content.attributes.height}/>
                        : <TableCOR rows={content.items} width={content.attributes.width} height={content.attributes.height}/>
                    );
                }}
            </EditorialModeContext.Consumer>
        </div>
    );
}
