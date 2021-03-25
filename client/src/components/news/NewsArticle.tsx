import React from 'react';
import { NewsPageMinimal } from '../../types/news';
import Image from 'react-bootstrap/Image';

export default function NewsArticle(props : NewsPageMinimal) {
    return (
        <div
            className="news-article-base"
            style={{ backgroundColor: '#f0f0f0' }}
        >
            <div style={{ width: '100%' }}>
                <Image fluid={true} src={props.image.href} alt='' />
            </div>
            <div className="p-4 news-article-base-text">
                <h4 className="mb-0">{props.title}</h4>
                <small>{props.publishedAt}</small>
                <div className="mt-3">
                    {props.preamble}
                </div>
            </div>
        </div>
    );
}
