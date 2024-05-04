import React from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
function AllTask({title, setTitle, description,setDescription, layoutState,setlayoutState,setEditorId}) {
    const { tasks } = useContext(TaskContext);
    return (
        <div>
            {
                (tasks.length !==0) ? (
                    tasks.map((task, index) => {
                        return (
                            <Task
                                key={index}
                                task={task}
                                id={index}
                                title={title}
                                setTitle={setTitle}
                                description={description} 
                                setDescription={setDescription}
                                layoutState={layoutState}
                                setlayoutState={setlayoutState}
                                setEditorId={setEditorId}
                            />
                        )
                    })
                ) : (
                    <h1>No Task Found</h1>
                )
            }
        </div>
    );
}

export default AllTask;