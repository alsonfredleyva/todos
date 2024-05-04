import React, { useReducer } from 'react';
import moment from 'moment';
import './task.css';
import axios from 'axios';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import tokenReducer from '../../reducer/tokenReducer';
function Task({ task, id, title,setTitle, description,setDescription, layoutState,setlayoutState,setEditorId }) {
  const token = JSON.parse(localStorage.getItem('authToken'));
  const { dispatch } = useContext(TaskContext);
  const [userToken] = useReducer(tokenReducer, token);
  const handleRemove = async e => {
    e.preventDefault();
    alert("Task Deleted!");
    await axios.delete('http://localhost:8000/api/task/removeTask', {
      headers: { Authorization: `Bearer ${userToken}` },
      data: { id: task._id },
    });
    dispatch({
      type: 'REMOVE_TASK',
      id,
    });
  };

  const handleEdit = async e => {
    e.preventDefault();
    console.log(task?.description)

    setTitle(task?.title)
    setDescription(task?.description)
    setlayoutState(2)
    setEditorId(task?._id)

    alert("Editing Task...");
    
    // await axios.post(`http://localhost:8000/api/task/updatetask?id=${task._id}`, {
    //   headers: { Authorization: `Bearer ${userToken}` },
    //   title: "Nishant",
    //     description: "hindu College",

      
    // });
    // dispatch({
    //   type: 'EDIT_TASK',
    //   title: task.title,
    //   description: task.description,
    // });
  };

  const handleMarkDone = e => {
    dispatch({
      type: 'MARK_DONE',
      id,
    });
  };
  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
      <div className="mark-done">
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleMarkDone}
          checked={task.completed}
        />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className=" italic opacity-60">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
      <span className="remove-task text-sm text-white">
        <EditIcon
          style={{ fontSize: 30, cursor: 'pointer' }}
          size="large"
          onClick={handleEdit}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
        />
        <DeleteIcon
          style={{ fontSize: 30, cursor: 'pointer' }}
          size="large"
          onClick={handleRemove}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
        />
      </span>
    </div>
  );
}

export default Task;
