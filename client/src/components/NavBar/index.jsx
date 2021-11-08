import React from 'react';
import style from './styles.module.css';
import Search from '../SearchBar/';
import {Link} from 'react-router-dom';
     const Nav = ()=>{
    return(
        <nav className = {style.nav}>
            <ul className = {style.navItems}>
                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to = "/home"><li><div className={style.logo}></div></li></Link>
                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to = "/home"><li>Home</li></Link>
                <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to = "/videogames/create"><li>Create Videogame</li></Link>
            </ul>
            <Search/>
           
        </nav>
    );
}
export default Nav;