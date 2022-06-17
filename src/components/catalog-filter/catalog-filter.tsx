import React, { ChangeEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { TypeGuitar, TypeGuitarTranslation } from '../../const';
import { filteredPriceMax, filteredPriceMin } from '../../store/data-process/data-process';
import { Card } from '../../types/card';
import { getMaxPrice, getMinPrice } from '../../utils';

type CatalogFilterProps = {
  guitarList: Card[];
}


function CatalogFilter({guitarList}: CatalogFilterProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line no-console
  console.log(searchParams);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const minPrice = getMinPrice(guitarList);
  const maxPrice = getMaxPrice(guitarList);

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const handleFilterPriceStart = () => {
    if(minPriceRef.current !== null) {

      if (Number(minPriceRef.current.value) <= minPrice) {
        minPriceRef.current.value = String(minPrice);
      }
      params.set('priceStart', minPriceRef.current.value);
      setSearchParams(params);

      dispatch(filteredPriceMin(Number(minPriceRef.current.value)));
    }
  };

  const handleFilterPriceEnd = () => {
    if(maxPriceRef.current !== null) {
      if(Number(maxPriceRef.current.value) >= maxPrice) {
        maxPriceRef.current.value = String(maxPrice);
      }
      params.set('priceEnd', maxPriceRef.current.value);
      setSearchParams(params);
      dispatch(filteredPriceMax(Number(maxPriceRef.current.value)));
    }
  };

  const handleChangeTypeGuitar = (evt: ChangeEvent<HTMLInputElement>) => {

    const typesGuitar = Array.from(params.values());
    const typeParams = typesGuitar.find((item) => item === evt.target.value);

    if (typeParams) {
      params.delete('type');
      const filteredTypesGuitar = typesGuitar.filter((item) => item !== typeParams);
      filteredTypesGuitar.map((item) => params.append('type', item));
      // setSearchParams(params);
    } else {
      params.append('type', evt.target.value);
    }
    setSearchParams(params);

  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={`${minPrice}`} id="priceMin" name="от" ref={minPriceRef} onBlur={handleFilterPriceStart}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={`${maxPrice}`} id="priceMax" name="до" ref={maxPriceRef} onBlur={handleFilterPriceEnd}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          Object.keys(TypeGuitar).map((item) => (
            <div className="form-checkbox catalog-filter__block-item" key={item}>
              <input className="visually-hidden" type="checkbox" id={item} name={item} value={item} onChange={handleChangeTypeGuitar} />
              <label htmlFor={item}>{TypeGuitarTranslation.get(item)}</label>
            </div>))
        }

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"  />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default React.memo(CatalogFilter);
