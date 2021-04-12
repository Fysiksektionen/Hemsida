import React from 'react';
import { ContentList } from '../../types/api_object_types';

export type ContentObjectFeedCOEProps = {
    content: ContentList
}

export default function ContentObjectFeedCOE({ content }: ContentObjectFeedCOEProps) {
    return (
        <div>{content}</div>
    );
}
