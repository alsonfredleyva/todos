import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
function Layout({title,setTitle, description, setDescription,layoutState,setlayoutState,editorId}) {
    
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <CreateTask title={title} setTitle={setTitle} description={description} setDescription={setDescription} layoutState={layoutState} setLayoutState={setlayoutState} editorId={editorId}/>
                <div className='task-container w-auto mx-5 md:w-1/3 mt-3'>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    <div className='indicator'>
                        <TaskIndicator />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;