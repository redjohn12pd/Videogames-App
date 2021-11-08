import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import style from './styles.module.css';
import SimpleCard from '../SimpleCard';
const renderData = (title,data) => {
  return (
      <>
    <h1>{title}</h1>
    <ul className = {style.gridContainer}>
      {data.map((data, index) => {
        return <Link key={index} to = {`/videogame/detail/${data.id}`}><li>
                <SimpleCard name = {data.name} url = {data.backgroundImage} genres = {data.genres}/>
               </li>
               </Link>
      })}
    </ul>
    </>
  );
};

function Pagination(props) {
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(15);

  const [pageNumberLimit, setpageNumberLimit] = useState(8);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(8);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(props.data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? style.active : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {

    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <div className = {style.container}>
      {currentItems.length>0?renderData(props.title,currentItems):null}
      <ul className={style.pagination}>
        <li>
          <button onClick={handlePrevbtn} disabled={currentPage == pages[0] ? true : false}>
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button onClick={handleNextbtn} disabled={currentPage == pages[pages.length - 1] ? true : false}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;