import { ArrowDropDown } from '@material-ui/icons';
import { Locale, locales } from '../contexts';
import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import seFlag from '../country_flags/se.svg';
import gbFlag from '../country_flags/gb.svg';

type LocaleSelectorProps = {
    localeState: Locale,
    setLocaleHook?: (locale: Locale) => void
}

export default function LocaleSelector(props: LocaleSelectorProps) {
    const flagIcons: { [key: string]: any; } = {
        sv: <img src={seFlag} alt={'Svenska flaggan'} style={{ height: '1rem', width: '1.6rem' }}/>,
        en: <img src={gbFlag} alt={'English flag'} style={{ height: '1rem', width: '2rem' }}/>
    };

    return (
        <Select
            IconComponent={() => <ArrowDropDown visibility="hidden"/>}
            disableUnderline
            className="my-2"
            value={props.localeState.id}
            onChange={event => {
                if (props.setLocaleHook !== undefined) {
                    props.setLocaleHook(locales[event.target.value as string]);
                }
            }}>
            {Object.keys(locales).map(key =>
                <MenuItem value={key} key={key}>
                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                        {flagIcons[key]}
                    </div>
                </MenuItem>
            )}
        </Select>
    );
}
