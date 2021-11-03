import React from 'react';
import style from './styles.module.css';
const Card = ({name, url})=>{
    return(
            <div className = {style.card}>
                <div className = {style.bodyCard} style = {{
                     backgroundImage: "url(" + `${url}` + ")",
                     backgroundPosition: "center",
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
                }}
                >
                    <div className = {style.title}>
                    <h4>{name}</h4>
                    </div>
                    
                </div>
            </div>
    );
};

export default Card;