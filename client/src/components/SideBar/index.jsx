import React from 'react';
import {useState, useEffect} from 'react';
import style from './styles.module.css';
import {ReactComponent as BurgerMenu} from './resources/burger_menu.svg';
const SideBar = ({title, width, height, children})=>{
    const [sideBar, setsideBar] = useState({
        position:-width,
        width: 300
    });
    const handleClick = () => {
      if (sideBar.position < 0) {
        setsideBar({
            ...sideBar,
            position: 0,
            width: 300
        });
      } else {
        setsideBar({
            ...sideBar,
            position: -width,
            width: 0
        });
      }
    };
    useEffect(() => {
      setsideBar({
        ...sideBar,
        position: -width,
        width:0
      });
    }, []);
    return (
        <div className={style.sideBar} style={{
            transform: `translatex(${sideBar.position}px)`,
            width:sideBar.width,
            minHeight: height
          }}
        >
          <h2>{title}</h2>
          <div onClick={() => handleClick()} className={style.close} style={{ transform: `translate(${width}px, 20vh)`}}>
          <BurgerMenu/>
          </div>
          <div className={style.items}>{children}</div>
        </div>
    );
}

export default SideBar;