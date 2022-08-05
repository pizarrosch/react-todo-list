import React, {useState} from 'react';
import Input from "../Input/Input";
import s from './ToDoList.module.css';
import cx from 'classnames';
import editIcon from '../../images/edit.png';
import removeIcon from '../../images/trash.png';

export default function ToDoList() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editedId, setEditedId] = useState(null);
  const [editInput, setEditInput] = useState('');

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleEditInputChange(e) {
    setEditInput(e.target.value);
  }

  function addItem() {
    const newItem = {
      id: Math.random(),
      text: input,
      done: false,
      time: new Date(),
    }

    if (input === '') return;
    setItems([...items, newItem]);
    setInput('')
  }


  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      addItem();
    }
  }

  function handleKeyDownOnUpdate(e, id) {
    if (e.key === 'Enter') {
      const index = items.findIndex((item) => item.id === id);
      const part1 = items.slice(0, index);
      const part2 = items.slice(index + 1);

      setItems([
        ...part1,
        {...items[index], text: editInput},
        ...part2
      ])
      setEditInput('');
      setEditedId(null);
    }
  }


  function handleCheckedChange(id) {
    const index = items.findIndex((item) => item.id === id);
    const part1 = items.slice(0, index);
    const part2 = items.slice(index + 1);

    //Alternate solution
    // if (!items[index].done) {
    //   setItems([...part1, {...items[index], done: true}, ...part2])
    // } else {
    //   setItems([...part1, {...items[index], done: false}, ...part2])
    // }

    setItems([
      ...part1,
      {...items[index], done: !items[index].done},
      ...part2
    ])
  }

  function handleRemove(id) {
    const index = items.findIndex((item) => item.id === id);
    const part1 = items.slice(0, index);
    const part2 = items.slice(index + 1);

    setItems([...part1, ...part2]);
  }

  function handleFilterClick(type) {
    setFilter(type);
  }

  function handleDeleteDoneTasks() {
    setItems(items.filter((item) => !item.done));
  }

  function deleteDoneTasksOnMouseOver(e) {
    if(e.target) {
      e.target.style.opacity = 0.5;
    }
  }
  function deleteDoneTasksOnMouseOut(e) {
    if(e.target) {
      e.target.style.opacity = 1;
    }
  }

  function handleEdit(id) {
    const index = items.findIndex((item) => item.id === id)

    setEditedId(items[index].id);

  }

  let filteredItems = items;

  if (filter === 'Done') {
    filteredItems = items.filter(item => item.done);
  } else if (filter === 'Todo') {
    filteredItems = items.filter(item => !item.done);
  }

  return (
    <div>
      <Input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={addItem}
      />
        <h1>Todo List</h1>
        <span className={s.filterButtonsContainer}>
          <button
            className={cx(
              s.filterButtons,
              filter === 'All' ? s.doneFilter : null
            )}
            onClick={() => handleFilterClick('All')}>All</button>
          <button
            className={cx(
              s.filterButtons,
              filter === 'Done' ? s.doneFilter : null
            )}
            onClick={() => handleFilterClick('Done')}>Done</button>
          <button
            className={cx(
              s.filterButtons,
              filter === 'Todo' ? s.doneFilter : null
            )}
            onClick={() => handleFilterClick('Todo')}>Todo</button>
        </span>
      <div className={s.root}>
        {filteredItems.map((todo) => (
          <ul className={s.itemDisplay}>
              <li
                className={cx(
                  s.item,
                  todo.done ? s.isChecked : null
                )}
                key={todo.id}
              >
                {todo.time.toLocaleString('de', {timeStyle: 'medium'})}
                <span className={s.listItemsDistance}>{todo.text}</span>
                <input
                  type="checkbox"
                  className={s.checkBox}
                  onChange={() => handleCheckedChange(todo.id)}
                  checked={todo.done}
                />
                <img
                  src={editIcon}
                  alt=''
                  className={s.checkBox}
                  onClick={() => handleEdit(todo.id)}
                />
                <img
                  src={removeIcon}
                  alt=''
                  className={s.checkBox}
                  onClick={() => handleRemove(todo.id)}
                />
              </li>
              {editedId === todo.id && (
                <input
                  className={cx(
                    s.editInput,
                    todo.id ? s.editShown : null
                  )}
                  value={editInput}
                  onChange={handleEditInputChange}
                  onKeyDown={(e) => handleKeyDownOnUpdate(e, todo.id)}
                />
              )}
          </ul>
        ))}
        <span className={s.deleteButtonsContainer}>
          <button
            className={s.deleteButtons}
            onClick={handleDeleteDoneTasks}
            onMouseOver={deleteDoneTasksOnMouseOver}
            onMouseOut={deleteDoneTasksOnMouseOut}
            >Delete done tasks
          </button>
          <button
            className={s.deleteButtons}
            onClick={() => setItems([])}
            onMouseOver={deleteDoneTasksOnMouseOver}
            onMouseOut={deleteDoneTasksOnMouseOut}
            >Delete all tasks
          </button>
        </span>
      </div>
    </div>
  );
}
