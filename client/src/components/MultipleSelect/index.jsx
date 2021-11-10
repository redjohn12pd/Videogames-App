import React from 'react';
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
           <div key = {data.id}className = {style.item}>
            <input value = {data.id} type = "checkbox" name = {data.name}
            onChange = {(e)=>onChange(e)}/>
            <label>{data.name}</label>
           </div>
        )}
        </div>
        </>
    );
}

export default MultipleSelect;