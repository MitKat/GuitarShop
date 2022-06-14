import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/main';
import { Card } from '../../types/card';

const filterModel = (searchText: string, listOfModel: Card[]) => {
  if(!searchText) {
    return listOfModel;
  }

  return listOfModel.filter(({name}) =>
    name.toLowerCase().includes(searchText.toLowerCase()),
  );
};

function FormSearch(): JSX.Element {
  const {catalogCards} = useAppSelector(({DATA}) => DATA);
  const [guitarList, setGuitarList] = useState(catalogCards);
  const [valueSearch, setValueSearch] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectValueIndex, setSelectValueIndex] = useState(0);

  const handleChangeSearch = (evt:ChangeEvent<HTMLInputElement>) => {
    setValueSearch(evt.target.value);
    setIsListOpen(true);
  };

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const foundGuitar = filterModel(valueSearch, catalogCards);
      setGuitarList(foundGuitar);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [catalogCards, valueSearch]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleClickSearch = (id: number) => () => {
    document.location.href=`/product/${id}`;
  };

  const handleKeyPressArrow = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'ArrowDown') {
      setSelectValueIndex((prev) =>
        prev < guitarList.length - 1 ? prev + 1 : prev,
      );
    } else if (evt.key === 'ArrowUp') {
      setSelectValueIndex((prev) => (!prev ? prev - 1 : prev));
    }
  }, [guitarList.length, setSelectValueIndex]);

  const handleKeyPressEnter = useCallback((evt: KeyboardEvent) => {
    if(evt.key === 'Enter' && guitarList.length) {
      document.location.href=`/product/${selectValueIndex}`;
    }
  }, [guitarList, selectValueIndex]);

  useEffect(() => {
    if (valueSearch.length) {
      document.addEventListener('keydown', handleKeyPressArrow);
      document.addEventListener('keydown', handleKeyPressEnter);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPressArrow);
      document.removeEventListener('keydown', handleKeyPressEnter);
    };
  }, [valueSearch.length, handleKeyPressArrow, handleKeyPressEnter]);

  const handleResetSearch = () => {
    setValueSearch('');
    setIsListOpen(false);
  };

  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search" onSubmit={handleFormSubmit}>
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input"
          id="search" type="text" autoComplete="off"
          placeholder="что вы ищите?"
          value={valueSearch}
          onChange={handleChangeSearch}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={isListOpen ? 'form-search__select-list list-opened' : 'form-search__select-list hidden'}>
        {guitarList.map((guitar, index) =>
          (
            <li className="form-search__select-item"
              key={guitar.id}
              tabIndex={index}
              onClick={handleClickSearch(guitar.id)}
            >
              {guitar.name}
            </li>
          ),
        )}
      </ul>
      <button className="form-search__reset" type="reset"
        form="form-search"
        onClick={handleResetSearch}
      >
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default React.memo(FormSearch);
