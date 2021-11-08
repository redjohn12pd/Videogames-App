import React from 'react';
import {useState, useEffect} from 'react';
import style from './styles.module.css';

const MultipleSelect = ({getAllSelected,data})=>{
    const onChange = (e)=>{
        getAllSelected(e.target.value)
    }
    return(
        <>
        <div className = {style.items}>
           
       { 
       data?.map(data=>
           <div className = {style.item}>
            <input key = {data.id} value = {data.id} type = "checkbox" name = {data.name}
            onChange = {(e)=>onChange(e)}/>
            <label>{data.name}</label>
           </div>
        )}
        </div>
        </>
    );
}

export default MultipleSelect;