import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAME_KEY_ENTER } from '../../const';
import { useAppSelector } from '../../hooks/main';
import { Card } from '../../types/card';

const filterModel = (searchText: string, listOfModel: Card[]) => {
  if(!searchText) {
    return [];
  }

  return listOfModel.filter(({name}) =>
    name.toLowerCase().includes(searchText.toLowerCase()),
  );
};

function FormSearch(): JSX.Element {
  const navigate = useNavigate();
  const {catalogCards} = useAppSelector(({DATA}) => DATA);
  const [guitarList, setGuitarList] = useState(catalogCards);
  const [valueSearch, setValueSearch] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);

  const handleChangeSearch = (evt:ChangeEvent<HTMLInputElement>) => {
    setValueSearch(evt.target.value);
    setIsListOpen(true);
  };

  useEffect(() => {
    if (catalogCards) {
      const foundGuitar = filterModel(valueSearch, catalogCards);
      setGuitarList(foundGuitar);
    }
  }, [catalogCards, valueSearch]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleClickSearch = (id: number) => () => {
    navigate(`/product/${id}`);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLLIElement>, id: number) => {
    if (evt.key === NAME_KEY_ENTER) {
      navigate(`/product/${id}`);
    }
  };

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

        <ul className={isListOpen ? 'form-search__select-list list-opened' : 'form-search__select-list hidden'}>
          {guitarList.map((guitar) =>
            (
              <li className="form-search__select-item"
                key={guitar.id}
                tabIndex={0}
                data-value={guitar.id}
                onClick={handleClickSearch(guitar.id)}
                onKeyDown={(evt) => handleKeyDown(evt, guitar.id)}
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
      </form>
    </div>
  );
}

export default React.memo(FormSearch);
