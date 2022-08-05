import s from './Input.module.css';
import listIcon from '../../images/list-interface-symbol.png'
import React from "react";

export default function Input(props) {

  return (
    <div className={s.root} >
      <div className={s.iconAndInput} >
        <img
          className={s.listIcon}
          src={listIcon}
          alt=''
        />
        <input
          className={s.input}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
        />
      </div>
      <button className={s.addNewTaskButton} onClick={props.onClick}>Add new task</button>
    </div>
  )
}