import React from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
function Active({title, setTitle, description,setDescription, layoutState,setlayoutState}) {
    const { tasks } = useContext(TaskContext);
    return ( 
        <div>
        {
            (tasks.length !==0) ? (
                tasks.map((task, index) => {
                    return (
                        !task.completed && <Task
                            key={index}
                            task={task}
                            id={index}
                            title={title}
                            setTitle={setTitle}
                            description={description} 
                            setDescription={setDescription}
                            layoutState={layoutState}
                            setlayoutState={setlayoutState}
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

export default Active;