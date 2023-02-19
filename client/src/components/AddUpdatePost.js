import React from 'react'
import axios from 'axios'
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { Posts } from '../components/Posts'

export const AddUpdatePost = ({
  title,
  category,
  id,
  image,
  isEdited,
  setImage,
  setRefreshPosts,
  setTitle,
  setCategory,
  setIsEdited,
  setId,
}) => {
  const api = process.env.REACT_APP_API_KEY

  const createPost = async (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('image', image)
    if (!title || !category || !image) {
      return (alert('Please provide all details'))
    }
    let headers = {
      // "Content-type": "application/json",
      "Content-Type": "multipart/form-data"
    }

    // console.log(config)
    const res = await axios.post(api + 'posts/create', formData, headers)
    console.log(res)
    if (res.status == 200 || res.status == 201) {
      alert('Post created successfully')
      setRefreshPosts(true)
      setTitle('')
      setCategory('')
      setImage(undefined)
      document.getElementById("fileupload").value = "";
    }
  }

  const updatePost = async (e) => {
    console.log('on update')
    e.preventDefault();
    const res = await axios.put(api + 'posts/update', {
      p_id: id,
      title: title,
      category: category
    })
    console.log(res)
    if (res.status == 200 || res.status == 201) {
      alert('Post updated successfully')
      setRefreshPosts(true)
      setId(-1)
      setTitle('')
      setCategory('')
      setIsEdited(false)
    }
  }

  const onChangeFile = event => {
    setImage(event.target.files[0])
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-3 offset-md-4 border mt-4 p-4">
            <form onSubmit={isEdited ? updatePost : createPost} >
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Cover</label>
                <input
                  className="form-control"
                  id="fileupload"
                  type="file"
                  name="image"
                  onChange={onChangeFile}
                />
              </div>
              {
                !isEdited ?
                  <button className="btn btn-success" type='submit'>Submit</button>
                  :
                  <button className="btn btn-info" type='submit'>Update</button>
              }
            </form>
          </div>
        </div>
      </div>
      <Link to="/posts">Posts</Link>
      <Routes>
        <Route path="/posts" element={<Posts/>} />
      </Routes>
    </div>
  )
}
