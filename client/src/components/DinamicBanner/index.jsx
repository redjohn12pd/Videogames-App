import React from 'react';
import style from './styles.module.css';
const DinamicBanner = ({data})=>{
    return(
        <div className={style.cover} style = {{
            backgroundImage: "url(" + `${data.backgroundImage}` + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
       }}>
            <div className={style.overlay}></div>
            <div className={style.textCover}>
                <h4 className={style.titleCover}>Welcome</h4>
                <h4 className={style.titleCover}>to</h4>
                <h2 className={style.titleCover}>Henry Games</h2>
            </div>
        </div>
    );
};

export default DinamicBanner;