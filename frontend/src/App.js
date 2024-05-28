import './App.css';
import { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Active from './components/Active';
import Completed from './components/Completed';
import AllTask from './components/AllTask';
import Layout from './components/Layout';
import TaskContext from './context/TaskContext';
import TokenContext from './context/TokenContext';
import taskReducer from './reducer/taskReducer';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';
import Header from './components/Header/Header';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import axios from './Axios/axios.js';
import ChatBot from 'react-simple-chatbot';
function App() {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const [tasks, dispatch] = useReducer(taskReducer, [])
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token)
  const [user, userDispatch] = useReducer(userReducer, {})
  const [layoutState, setlayoutState] = useState(1)
  useEffect(() => {
    console.log("App.js");
    const fetchUser = async () => {
      try {
        console.log("fetchUser");
        const res = await axios.get("/user/getUser", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        //tokenDispatch({type: "SET_TOKEN", payload: res.token})
        console.log("res.data: ", res.data);
        userDispatch({ type: "SET_USER", payload: res.data.user })
      } catch (error) {
        console.log(error);
      }
    }
    if (userToken) {
      fetchUser()
    }
  }, [userToken])
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("fetchTasks");
        const res = await axios.get("/task/getTask", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        dispatch({ type: "SET_TASK", payload: res.data })
      } catch (error) {
        console.log(error);
      }
    }
    if (userToken) {
      fetchTasks()
    }
  }, [userToken,layoutState])

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [editorId, setEditorId] = useState("")

  // useEffect(() => {

  
  //   return () => {
      
  //   }
  // }, [layoutState])
  

  return (
    <BrowserRouter>
      <TokenContext.Provider value={{ userToken, tokenDispatch, user, userDispatch }}>
        <TaskContext.Provider value={{ tasks, dispatch }}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path='/' element={token ? <Layout title={title} setTitle={setTitle} description={description} setDescription={setDescription} layoutState={layoutState} setlayoutState={setlayoutState} editorId={editorId}  /> : <Login />}>
                <Route index element={<AllTask title={title} setTitle={setTitle} description={description} setDescription={setDescription} layoutState={layoutState} setlayoutState={setlayoutState} setEditorId={setEditorId} />} />
                <Route path="active" element={<Active title={title} setTitle={setTitle} description={description} setDescription={setDescription} layoutState={layoutState} setlayoutState={setlayoutState} setEditorId={setEditorId} />} />
                <Route path="completed" element={<Completed />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
            </Route>
          </Routes>
          <ChatBot
            steps={[
              {
                id: '1',
                message: 'What is your name?',
                trigger: '2',
              },
              {
                id: '2',
                user: true,
                trigger: '3',
              },
              {
                id: '3',
                message: 'Hi {previousValue}, nice to meet you!',
                trigger: '4',
              },
              {
                id: '4',
                message: 'Do you need help or Question?',
                trigger: '5',
              },
              {
                id: '5',
                options: [
                  { value: 1, label: 'Number 1, What is the purpose of this todo app?', trigger: '6' },
                  { value: 2, label: 'Number 2, How Can I Contact the admins here?', trigger: '7' },
                  { value: 3, label: 'Number 3, Can I add todos anytime?', trigger: '8' },
                ],
              },
              {
                id: '6',
                message: 'The purpose of this Todo app is to save time for the user if they forgot what task they want todo they just come here in check the task',
                trigger: '5',
              },
              {
                id: '7',
                options: [
                  { value: 1, label: 'Admin 1, https://www.facebook.com/alsonfred.leyva.1', trigger: '9' },
                  { value: 2, label: 'Admin 2, https://www.facebook.com/chinito.property', trigger: '10' },
                  { value: 3, label: 'Admin 3, https://www.facebook.com/johnmark.tingcay', trigger: '11' },
                  { value: 4, label: 'Admin 4, https://www.facebook.com/Arjeeyorong22', trigger: '12' },
                ],
              },
              {
                id: '8',
                message: 'Yes, you can add up todos anytime anywhere',
                trigger: 5,
              },
              {
                id: '9',
                message: 'fb/alsonfred.leyva.1',
                trigger: 5,
              },
              {
                id: '10',
                message: 'fb/chinito.property',
                trigger: 5,
              },
              {
                id: '11',
                message: 'fb/johnmark.tingcay',
                trigger: 5,
              },
              {
                id: '12',
                message: 'fb/Arjeeyorong22',
                trigger: 5,
              },
            ]}
            floating={true}
          />
        </TaskContext.Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
