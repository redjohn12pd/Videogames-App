import React from 'react';
import style from './styles.module.css';

const LoadingPage = () => {
    return (
        <div className={style.loadingPage}>
             <img src={'https://i.gifer.com/8CbL.gif'}
                    alt={'Loading'} />
        </div>
    );
}
export default LoadingPage;