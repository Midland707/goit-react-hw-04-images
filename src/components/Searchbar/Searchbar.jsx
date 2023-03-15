import React, { useState } from 'react';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [searchWord, setSearchWord] = useState('');

  const onChangeHandel = event => {
    const { value } = event.currentTarget;
    setSearchWord(value);
  };

  const onSubmitForm = eventSubmit => {
    eventSubmit.preventDefault();
    if (searchWord.trim() === '') {
      alert('Ведіть назву фотографії');
      return;
    }
    onSubmit(searchWord);
    setSearchWord('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onSubmitForm}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="searchWord"
          autoComplete="off"
          value={searchWord}
          autoFocus
          placeholder="Search images and photos"
          required
          onChange={onChangeHandel}
        />
      </SearchForm>
    </SearchBar>
  );
}
