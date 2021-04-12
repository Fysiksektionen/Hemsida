import React from 'react';
import { EditorialModeContext } from '../../contexts';
import ContentObjectFeedCOE from '../content_object_editors/ContentObjectFeedCOE';
import { ContentObjectFeed } from '../../types/content_object_trees';
import { ContentImage, ContentText } from '../../types/api_object_types';
import { Col, Image, Row } from 'react-bootstrap';

import parse from 'html-react-parser';

function FeedTextCOR({ content }: {content: ContentText}) {
    const textContent = (content.attributes as NodeJS.Dict<string>).isHTML ? parse(content.text) : content.text;
    const sizeToValue: NodeJS.Dict<JSX.Element> = {
        0: <div>{textContent}</div>,
        1: <h1>{textContent}</h1>,
        2: <h2>{textContent}</h2>,
        3: <h3>{textContent}</h3>,
        4: <h4>{textContent}</h4>,
        5: <h5>{textContent}</h5>
    };

    const size = (content.attributes as { size: number|undefined })?.size !== undefined
        ? (content.attributes as { size: number }).size
        : 0;

    const retObj = sizeToValue[size];

    if (retObj !== undefined) {
        return <Row>{retObj}</Row>;
    } else {
        return <Row/>;
    }
}

function FeedImageCOR({ content }: {content: ContentImage}) {
    const alignments = {
        left: 'justify-content-start',
        center: 'justify-content-center',
        right: 'justify-content-end'
    };

    const justificationClass = alignments[(content.attributes as {alignment: 'left'|'center'|'right'}).alignment];

    return (
        <Row className={justificationClass}>
            <Image src={content.image.href} width={(content.attributes as {width: string}).width}/>
        </Row>
    );
}

export type ContentObjectFeedCORProps = {
    content: ContentObjectFeed
}

export default function ContentObjectFeedCOR({ content }: ContentObjectFeedCORProps) {
    return (
        <EditorialModeContext.Consumer>
            {(edit) => (
                edit
                    ? <ContentObjectFeedCOE content={content} />
                    : <Col>
                        {content.items.map((obj) => {
                            if (obj.dbType === 'text') {
                                return <FeedTextCOR content={obj} />;
                            } else if (obj.dbType === 'image') {
                                return <FeedImageCOR content={obj} />;
                            } else {
                                return <></>;
                            }
                        })}
                    </Col>
            )}
        </EditorialModeContext.Consumer>
    );
}
