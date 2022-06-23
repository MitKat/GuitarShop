import React, { ChangeEvent, useRef, useState } from 'react';
import { URLSearchParamsInit, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParamsFilter, TypeGuitar, TypeGuitarTranslation } from '../../const';
import { useAppSelector } from '../../hooks/main';
import { getMaxPrice, getMinPrice } from '../../utils';

type CatalogFilterProps = {
  setSearchParams: (nextInit: URLSearchParamsInit,
    navigateOptions?: { replace?: boolean | undefined; state: any} |
    undefined) => void;
}

function CatalogFilter({setSearchParams}: CatalogFilterProps): JSX.Element {
  const {catalogCards} = useAppSelector(({DATA}) => DATA);
  const [isDisabled4, setIsDisabled4] = useState(false);
  const [isDisabled6, setIsDisabled6] = useState(false);
  const [isDisabled7, setIsDisabled7] = useState(false);
  const [isDisabled12, setIsDisabled12] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const minPrice = getMinPrice(catalogCards);
  const maxPrice = getMaxPrice(catalogCards);

  const priceParamsStart = params.get(ParamsFilter.PriceStart);
  const priceParamsEnd = params.get(ParamsFilter.PriceStart);

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const placeholderMinPrice = (priceParamsStart !== null) ? priceParamsStart : String(minPrice);
  const placeholderMaxPrice = (priceParamsEnd !== null) ? priceParamsEnd : String(minPrice);


  const handleFilterPriceStart = () => {
    if(minPriceRef.current !== null ) {
      const isValid = Number(minPriceRef.current.value) > 0;

      if (isValid) {
        if (Number(minPriceRef.current.value) <= minPrice) {
          minPriceRef.current.value = String(minPrice);
        }
        params.set(ParamsFilter.PriceStart, minPriceRef.current.value);
        setSearchParams(params);
      } else {
        toast('Ввведите положительное число');
        minPriceRef.current.value = '';
      }
    }
  };

  const handleFilterPriceEnd = () => {
    if(maxPriceRef.current !== null) {
      const isValid = Number(maxPriceRef.current.value) > 0;

      if (isValid) {
        if(Number(maxPriceRef.current.value) >= maxPrice || Number(maxPriceRef.current.value) <= Number(minPriceRef.current?.value)) {
          maxPriceRef.current.value = String(maxPrice);
        }
        params.set(ParamsFilter.PriceEnd, maxPriceRef.current.value);
        setSearchParams(params);
      } else {
        toast('Ввведите положительное число');
        maxPriceRef.current.value = '';
      }
    }
  };

  const resetIsDisabledCountString = () => {
    setIsDisabled4(false);
    setIsDisabled6(false);
    setIsDisabled7(false);
    setIsDisabled12(false);
  };

  const handleChangeTypeGuitar = (evt: ChangeEvent<HTMLInputElement>) => {

    const typesGuitar = Array.from(params.getAll(ParamsFilter.Type));
    const typeParams = typesGuitar.find((item) => item === evt.target.value);

    if (typeParams) {
      params.delete(ParamsFilter.Type);
      const filteredTypesGuitar = typesGuitar.filter((item) => item !== typeParams);
      filteredTypesGuitar.map((item) => params.append(ParamsFilter.Type, item));
      setSearchParams(params);

      if (filteredTypesGuitar.length === 0) {
        resetIsDisabledCountString();
      } else {
        setIsDisabled4(!filteredTypesGuitar.find((item) => TypeGuitar.ukulele === item || TypeGuitar.electric === item));
        setIsDisabled6(!filteredTypesGuitar.find((item) => TypeGuitar.acoustic === item || TypeGuitar.electric === item));
        setIsDisabled7(!filteredTypesGuitar.find((item) => TypeGuitar.acoustic === item || TypeGuitar.electric === item));
        setIsDisabled12(!filteredTypesGuitar.find((item) => TypeGuitar.acoustic === item));
      }
    } else {
      params.append(ParamsFilter.Type, evt.target.value);
      setSearchParams(params);
      const updatedParams = Array.from(params.getAll(ParamsFilter.Type));
      if (updatedParams.length === 0) {
        resetIsDisabledCountString();
      } else {
        setIsDisabled4(!updatedParams.find((item) => TypeGuitar.ukulele === item || TypeGuitar.electric === item));
        setIsDisabled6(!updatedParams.find((item) => TypeGuitar.acoustic === item || TypeGuitar.electric === item));
        setIsDisabled7(!updatedParams.find((item) => TypeGuitar.acoustic === item || TypeGuitar.electric === item));
        setIsDisabled12(!updatedParams.find((item) => TypeGuitar.acoustic === item));
      }
    }
  };

  const handleChangeCountString = (evt: ChangeEvent<HTMLInputElement>) => {
    const listCount = Array.from(params.getAll(ParamsFilter.StringCount));
    const countParams = listCount.find((item) => item === evt.target.value);

    if(countParams) {
      params.delete(ParamsFilter.StringCount);
      const filteredCountString = listCount.filter((item) => item !== countParams);
      filteredCountString.map((item) => params.append(ParamsFilter.StringCount, item));
      setSearchParams(params);
    } else {
      params.append(ParamsFilter.StringCount, evt.target.value);
      setSearchParams(params);
    }

  };

  const handleReset = () => {
    params.delete(ParamsFilter.Type);
    params.delete(ParamsFilter.PriceStart);
    params.delete(ParamsFilter.PriceEnd);
    params.delete(ParamsFilter.StringCount);
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
            <input type="number" placeholder={placeholderMinPrice} id="priceMin" name="от" ref={minPriceRef} onBlur={handleFilterPriceStart}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={placeholderMaxPrice} id="priceMax" name="до" ref={maxPriceRef} onBlur={handleFilterPriceEnd}/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          Object.keys(TypeGuitar).map((item) => (
            <div className="form-checkbox catalog-filter__block-item" key={item}>
              <input className="visually-hidden" type="checkbox" id={item} name={item} value={item}
                onChange={handleChangeTypeGuitar}
                checked={params.getAll(ParamsFilter.Type).includes(item)}
              />
              <label htmlFor={item}>{TypeGuitarTranslation.get(item)}</label>
            </div>))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings"
            value={'4'} name="4-strings" disabled={isDisabled4}
            checked={params.getAll(ParamsFilter.StringCount).includes('4')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" value={'6'} name="6-strings"
            disabled={isDisabled6}
            checked={params.getAll(ParamsFilter.StringCount).includes('6')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" value={'7'} name="7-strings"
            disabled={isDisabled7}
            checked={params.getAll(ParamsFilter.StringCount).includes('7')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" value={'12'} name="12-strings"
            disabled={isDisabled12}
            checked={params.getAll(ParamsFilter.StringCount).includes('12')}
            onChange={handleChangeCountString}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={handleReset} >Очистить</button>
    </form>
  );
}

export default React.memo(CatalogFilter);
