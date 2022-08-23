import React from 'react'
import './style.scss';

export default function ErrorMsg({error,onClick}) {
  return (
    <div className='error_msg'>
        <h5>
            {error}
        </h5>
        <i className="fa fa-times" onClick={onClick}></i>
    </div>
  )
}
