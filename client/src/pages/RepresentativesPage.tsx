import React from 'react';
import { RepresentativesPageContentTree } from '../types/page_specific/types_RepresentativesPage';
import { ContentObject } from '../types/api_object_types';

export default function RepresentativesPage(props: ContentObject) {
    const content = props as RepresentativesPageContentTree;
    return (
        <div>
            <h1>
            {content.items.infoBox.items.title.text}
            </h1>
            <p>
                {content.items.infoBox.items.text.text}
            </p>
        </div>
    );
}
