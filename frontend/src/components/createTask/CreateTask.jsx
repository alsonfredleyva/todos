import React, { useReducer, useState } from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from '../../Axios/axios.js';
import './createTask.css';

function CreateTask({title, setTitle, description, setDescription, layoutState, setLayoutState,editorId}) {
  const { dispatch,  } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  // const [title, setTitle] = useState('');
  
  // const [toast, setToast] = useState();
  const handleAdd = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/task/addTask',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      //setToast(res.data)
      // showToast();
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: 'ADD_TASK',
      title,
      description,
    });
    setTitle('');
    setDescription('');

    alert("Task added!");
  };

  const handleEdit = async (e)=>
  {
    console.log("klklkl")
    e.preventDefault();
    try {
      const res = await axios.post(
        `/task/updatetask?id=${editorId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      
    } catch (error) {
      
    }
    dispatch({
      type: 'EDIT_TASK',
      id:editorId
    });
    setTitle("")
    setDescription("")
    setLayoutState(1)

      
  }

  // const showToast = () => {
  //     const toast = document.getElementById('toast');
  //     toast.style.display = "block"
  //     setTimeout(hideToast,2000)
  // }
  // const hideToast = () => {
  //     const toast = document.getElementById('toast');
  //     toast.style.display = "none"
  // }
  return (
    <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
      <div className="w-11/12">
        <form onSubmit={handleAdd}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              required
              onChange={e => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-3">
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              name="description"
              id="description"
              value={description}
              required
              onChange={e => setDescription(e.target.value)}
              style={{ resize: 'none' }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            {layoutState==1 && <button
              type="submit"
              className=" bg-blue-700 rounded-md text-white px-5 py-1 "
            >
              Add
              {/* {layoutState==2?"Edit" : "Add"} */}
            </button>}

            {layoutState==2 && <button
              onClick={handleEdit}
              className=" bg-blue-700 rounded-md text-white px-5 py-1 "
            >
              Edit
              {/* {layoutState==2?"Edit" : "Add"} */}
            </button>}
            {layoutState==2 && <button
              type="cancel"
              className=" bg-red-700 rounded-md text-white px-5 py-1 mx-2 "
              onClick={()=>
              {
                setTitle("")
                setDescription("")
                setLayoutState(1)
              }}
            >
              Cancel
            </button>}
          </div>
        </form>
        <div
          className="toast bg-green-600 text-white p-3 rounded-xl shadow-2xl text-center absolute bottom-4 left-1/2 -translate-x-1/2"
          id="toast"
        >
          <p>This is test</p>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
