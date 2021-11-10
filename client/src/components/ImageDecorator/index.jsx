import React from 'react';
import style from './styles.module.css';

const ImageDecorator = ({url,top,bottom,left,right,width,height})=> {
    return(
        <div style = {{
            position: 'absolute',
            top: top,
            bottom: bottom,
            left: left,
            right: right
        }}>
        <img style = {{ width: width, height:height }} src = {url}/>
        </div>
    );
 }
 export default ImageDecorator;