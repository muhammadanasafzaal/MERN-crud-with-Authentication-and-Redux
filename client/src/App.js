
import './App.css';
import { AddUpdatePost } from './components/AddUpdatePost'
import { useState, useEffect } from 'react';
import { Posts } from './components/Posts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  Navigate
} from "react-router-dom";
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Header } from './components/Header';
import { useSelector, useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [refreshPosts, setRefreshPosts] = useState(true)
  const [isEdited, setIsEdited] = useState(false)
  const [id, setId] = useState(-1)
  const [image, setImage] = useState(undefined)

  // const token = localStorage.getItem('token')
  const [isLoggedIn, setisLoggedIn] = useState(false)

  const tokenUpdate = useSelector((state) => state.isTokenUpdated);
  useEffect(() => {
    setisLoggedIn(tokenUpdate)
    console.log(isLoggedIn, 'token update')
  }, [tokenUpdate])


  return (
    <Router>
      <div className="App">
        { isLoggedIn ? <Header/> : null}
        <Routes>
          <Route
            path="/login"
            exact
            element={
              !isLoggedIn ? 
              <Login />
              :
              <Navigate replace to={"/"} />
          }
          />
          <Route
            path="/register"
            exact
            element={
              !isLoggedIn ? 
              <Register />
              :
              <Navigate replace to={"/"} />
            }
          />
          {/* <Route
            path="/"
            element={
              <Posts
                refreshPosts={true}
                setRefreshPosts={setRefreshPosts}
                setTitle={setTitle}
                setCategory={setCategory}
                setIsEdited={setIsEdited}
                setId={setId}
              />}
          /> */}
          <Route
            path="/"
            element={
              isLoggedIn ?
              <Posts
                refreshPosts={true}
                setRefreshPosts={setRefreshPosts}
                setTitle={setTitle}
                setCategory={setCategory}
                setIsEdited={setIsEdited}
                setId={setId}
              />
              :
              <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/create-update"
            element={
              isLoggedIn ?
              <AddUpdatePost
                title={title}
                category={category}
                id={id}
                image={image}
                isEdited={isEdited}
                setRefreshPosts={setRefreshPosts}
                setTitle={setTitle}
                setCategory={setCategory}
                setIsEdited={setIsEdited}
                setId={setId}
                setImage={setImage}
              />
              : 
              <Navigate replace to={"/login"} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
