import React, { useContext, useEffect, useCallback } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from '../../Axios/axios.js';
import './createTask.css';

function CreateTask({ title, setTitle, description, setDescription, layoutState, setLayoutState, editorId }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);

  // useCallback to memoize handlers to avoid unnecessary re-renders
  const handleAdd = useCallback(async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/task/addTask',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch({
        type: 'ADD_TASK',
        title,
        description,
      });
      setTitle('');
      setDescription('');
      alert('Task added!');
    } catch (error) {
      console.log(error);
    }
  }, [title, description, userToken, dispatch, setTitle, setDescription]);

  const handleEdit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/task/updatetask?id=${editorId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch({
        type: 'EDIT_TASK',
        id: editorId,
      });
      setTitle('');
      setDescription('');
      setLayoutState(1);
    } catch (error) {
      console.log(error);
    }
  }, [title, description, userToken, editorId, dispatch, setTitle, setDescription, setLayoutState]);

  // useEffect for cleanup
  useEffect(() => {
    return () => {
      // Perform any necessary cleanup here
      // e.g., cancel ongoing async operations if applicable
    };
  }, []);

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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'none' }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            {layoutState === 1 && (
              <button type="submit" className="bg-blue-700 rounded-md text-white px-5 py-1">
                Add
              </button>
            )}
            {layoutState === 2 && (
              <>
                <button onClick={handleEdit} className="bg-blue-700 rounded-md text-white px-5 py-1">
                  Edit
                </button>
                <button
                  type="button"
                  className="bg-red-700 rounded-md text-white px-5 py-1 mx-2"
                  onClick={() => {
                    setTitle('');
                    setDescription('');
                    setLayoutState(1);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
