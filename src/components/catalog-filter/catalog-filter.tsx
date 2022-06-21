import React, { ChangeEvent, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { URLSearchParamsInit, useLocation } from 'react-router-dom';
import { TypeGuitar, TypeGuitarTranslation } from '../../const';
// import { filteredPriceMax, filteredPriceMin } from '../../store/data-process/data-process';
// import { Card } from '../../types/card';
// import { getMaxPrice, getMinPrice } from '../../utils';

type CatalogFilterProps = {
  setSearchParams: (nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state: any} |
    undefined) => void;
    minPrice: number;
    maxPrice: number;
}

function CatalogFilter({setSearchParams, minPrice, maxPrice}: CatalogFilterProps): JSX.Element {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [isDisabled4, setIsDisabled4] = useState(false);
  const [isDisabled6, setIsDisabled6] = useState(false);
  const [isDisabled7, setIsDisabled7] = useState(false);
  const [isDisabled12, setIsDisabled12] = useState(false);

  // const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const handleFilterPriceStart = () => {
    if(minPriceRef.current !== null) {

      if (Number(minPriceRef.current.value) <= minPrice) {
        minPriceRef.current.value = String(minPrice);
      }
      params.set('priceStart', minPriceRef.current.value);
      setSearchParams(params);

      // dispatch(filteredPriceMin(Number(minPriceRef.current.value)));
    }
  };

  const enableAll = () => {
    setIsDisabled4(false);
    setIsDisabled6(false);
    setIsDisabled7(false);
    setIsDisabled12(false);
  };

  const handleFilterPriceEnd = () => {
    if(maxPriceRef.current !== null) {
      if(Number(maxPriceRef.current.value) >= maxPrice) {
        maxPriceRef.current.value = String(maxPrice);
      }
      params.set('priceEnd', maxPriceRef.current.value);
      setSearchParams(params);
      // dispatch(filteredPriceMax(Number(maxPriceRef.current.value)));
    }
  };

  const handleChangeTypeGuitar = (evt: ChangeEvent<HTMLInputElement>) => {
    // const nameType = evt.target.value;
    // const countsStrun = getByType(nameType);

    // eslint-disable-next-line no-console
    // console.log(countsStrun);

    const typesGuitar = Array.from(params.getAll('type'));
    const typeParams = typesGuitar.find((item) => item === evt.target.value);

    if (typeParams) {
      params.delete('type');
      const filteredTypesGuitar = typesGuitar.filter((item) => item !== typeParams);
      filteredTypesGuitar.map((item) => params.append('type', item));
      setSearchParams(params);
      if (filteredTypesGuitar.length === 0) {
        enableAll();
      } else {
        setIsDisabled4(!filteredTypesGuitar.find((item) => 'ukulele' === item || 'electric' === item));
        setIsDisabled6(!filteredTypesGuitar.find((item) => 'acoustic' === item || 'electric' === item));
        setIsDisabled7(!filteredTypesGuitar.find((item) => 'acoustic' === item || 'electric' === item));
        setIsDisabled12(!filteredTypesGuitar.find((item) => 'acoustic' === item));
      }
    } else {
      params.append('type', evt.target.value);
      setSearchParams(params);
      const updatedParams = Array.from(params.getAll('type'));
      if (updatedParams.length === 0) {
        enableAll();
      } else {
        setIsDisabled4(!updatedParams.find((item) => 'ukulele' === item || 'electric' === item));
        setIsDisabled6(!updatedParams.find((item) => 'acoustic' === item || 'electric' === item));
        setIsDisabled7(!updatedParams.find((item) => 'acoustic' === item || 'electric' === item));
        setIsDisabled12(!updatedParams.find((item) => 'acoustic' === item));
      }
    }
  };

  const handleReset = () => {
    params.delete('type');
    params.delete('priceStart');
    params.delete('priceEnd');
    params.delete('countString');
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
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" disabled={isDisabled4} />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" disabled={isDisabled6}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" disabled={isDisabled7}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"disabled={isDisabled12}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleReset} >Очистить</button>
    </form>
  );
}

export default React.memo(CatalogFilter);
