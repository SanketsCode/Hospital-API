import React from 'react'
import './style.scss';

export default function SelectInput({values,onChange,value,label}) {
  return (
    <div className="select-group" >
    <label className='label'>{label}</label>
    <select className="select-selected" value={value} onChange={onChange}>
       {
        values.map(value => 
            <option key={value} value={value}>{value}</option>
            )
       }
     </select>
    </div>
  )
}
