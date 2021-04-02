import React, { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import { EditorialModeContext } from '../../contexts';

/**
 * Wrapper of HTML a-tag that disables the linking functionality when in EditorialMode.
 * @param props: Props passed to anchor-tag.
 */
export default function A(props: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
    return (
        <EditorialModeContext.Consumer>
            {edit =>
                (edit
                    ? <a
                        {...props}
                        onClick={(event) => { event.preventDefault(); }}
                        className={props.className ? ' '.concat(props.className, 'normalCursor') : 'normalCursor'}
                    >
                        {props.children}
                    </a>
                    : <a {...props}>
                        {props.children}
                    </a>
                )
            }

        </EditorialModeContext.Consumer>

    );
}
