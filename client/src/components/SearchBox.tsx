/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
import FTextField from './f-styled/FTextField';

interface ISearchField {
  // Need this to access InputProps since it is passed by Autocomplete-component.
  // We use it to not override the entire InputProps when simply editing startAdornment.
  InputProps?: any;
}

export function SearchField({InputProps, ...params}: ISearchField) {
  // TODO applicera locale sv/en på denna label.
  return (
    <FTextField
    variant="standard"
    placeholder="Sök..."
    // Note ordering of InputProps *after* params
    // since it will be overwritten otherwise.
    {...params} 
    InputProps={{...InputProps,
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>
      ),
    }}
    />
  )
}

const pageResults : IResult[] = [
  {type: "news", title: "Terminal-torsdag med F.dev"},
  {type: "news", title: "Det blir en mottagning!"},
  {type: "news", title: "Snart är det dags för häv!"},
  {type: "news", title: "En fest utan dess like"},
  {type: "event", title: "Häv"},
  {type: "event", title: "Mottagningen 2020"},
  {type: "event", title: "Terminal-Torsdag"},
]

export function GroupedSearch() {
  return (
    <Autocomplete
      freeSolo
      openOnFocus={false}
      // TODO here we can sort the options if we want to
      options={pageResults}
      groupBy={(option: IResult) => option.type.toUpperCase()}
      getOptionLabel={(option: IResult) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <SearchField {...params}/>}
    />
  );
}

interface IResult {
  type: string;
  title: string;
}

