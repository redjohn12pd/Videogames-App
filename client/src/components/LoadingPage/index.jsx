import React from "react";
import style from "./styles.module.css";

const LoadingPage = ({ isEmpty }) => {
  return (
    <div className={style.loadingPage}>
      <img src={"https://i.gifer.com/8CbL.gif"} alt={"Loading"} />
      { isEmpty &&
        <div className={style.empty}>
          <h1>¡Sorry there are no matches with any game!</h1>
        </div>
      }
    </div>
  );
};
export default LoadingPage;
