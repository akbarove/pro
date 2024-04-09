import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/products/products.actions";
import "./ProductSearch.css";

const ProductSearch = () => {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  let searchTimeout;

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value); // Обновляем состояние searchVal при изменении значения поля ввода
    clearTimeout(searchTimeout); // Очищаем предыдущий таймаут, чтобы избежать множественных запросов
    searchTimeout = setTimeout(() => {
      dispatch(getProducts(e.target.value.trim())); // Выполняем поиск продуктов с использованием текущего значения поля ввода
    }, 100); // Задержка в 500 мс для оптимизации запросов
  };

  return (
    <form className="search-form">
      <input
        className="search-input"
        value={searchVal}
        onChange={handleSearchChange} // Добавляем обработчик события onChange для поля ввода
        placeholder="Search products..."
      />
    </form>
  );
};

export default ProductSearch;
