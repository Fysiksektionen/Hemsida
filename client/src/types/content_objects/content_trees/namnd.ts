import { ContentDict } from '../../api_object_types';
import { BlockFeed, HeadingBlock } from '../blocks';

export type NamndPageCT = ContentDict & {
    items: {
        title: HeadingBlock,
        content: BlockFeed
    }
}
