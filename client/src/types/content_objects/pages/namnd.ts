import { ContentDict, ContentText } from '../../api_object_types';
import { BlockFeed } from '../blocks';

export type NamndPageCT = ContentDict & {
    items: {
        title: ContentText,
        content: BlockFeed
    }
}
