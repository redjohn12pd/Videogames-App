import React from 'react';
import { useEffect, useState} from 'react';
import style from './styles.module.css';
const DinamicBanner = ({data})=>{
  const [state, setState] = useState(0);
  const generatePosition = ()=>{
    return Math.floor( Math.floor(Math.random()*data.length));
  }
  useEffect(()=>{
    const pos = generatePosition();
    if(pos>data.length)
    setState(0)
    else{
      setState(pos);
    }
  },[data])
    return(
        <div className={style.cover} style = {{
            backgroundImage: "url(" + `${state<=data.length ? data[state].backgroundImage ? data[state].backgroundImage:data[state+1].backgroundImage:data[0].backgroundImage}` + ")",
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