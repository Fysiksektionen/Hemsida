import React from 'react';

export type OffsetTitleProp = {
    title: string,
    children: React.ReactNode,
    tag?: string, // h1, h2, h3, h4 ...
    offsetLeft?: number, // 1-5   (or what ever is defined in bootstrap)
    offsetTop?: number, // 1-5
    titleClass?: string,
    offsetClass?: string,
}

export default function OffsetTitle(props : OffsetTitleProp) {
    const TitleTag = (props.tag ?? 'h1') as keyof JSX.IntrinsicElements;
    const titleStyle = props.titleClass ?? 'font-weight-bolder';
    const offsetStyle = props.offsetClass ?? (`ml-${props.offsetLeft ?? 5} mt-${props.offsetTop ?? 5}`);
    return (
        <div>
            <TitleTag className={titleStyle}>{props.title}</TitleTag>
            <div className={offsetStyle}>{props.children}</div>
        </div>
    );
}
