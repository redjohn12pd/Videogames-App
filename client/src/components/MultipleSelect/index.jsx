import React from 'react';
import {useEffect, useState} from 'react';
import style from './styles.module.css';

const MultipleSelect = ({getAllSelected,data})=>{
    return(
        <>
        <div className = {style.items}>
           
       { 
       data?.map(data=>
           <div className = {style.item}>
            <input key = {data.id} value = {data.id} type = "checkbox" onChange = {(e)=>getAllSelected(e.target.value)}/>
            <label>{data.name}</label>
           </div>
        )}
        </div>
        </>
    );
}

export default MultipleSelect;