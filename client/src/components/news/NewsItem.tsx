import React from 'react';
import { NewsPageMinimal } from '../../types/news';
import Image from 'react-bootstrap/Image';

export function NewsArticleBase(props : NewsPageMinimal & {children?: React.ReactNode}) {
    return (
        <div>
            <Image fluid={true} src={props.image.href} alt='' className='rounded-top' />
            <div className="p-4">
                <h4 className="mb-0">{props.title}</h4>
                <small>{props.publishedAt}</small>
                {props.children}
            </div>
        </div>
    );
}

export function NewsArticleText(props : {text: string}) {
    return (
        <div className="mt-3">
            {props.text}
        </div>
    );
}

function NewsArticle(props : NewsPageMinimal) {
    return (
        <NewsArticleBase {...props}>
            <NewsArticleText text={props.preamble} />
        </NewsArticleBase>
    );
}

export default NewsArticle;
