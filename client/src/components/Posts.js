import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useHistory, Routes, Route, Link } from "react-router-dom";
import { AddUpdatePost } from './AddUpdatePost';
import { decodeToken } from "react-jwt";
import './Post.css'


export const Posts = ({
        refreshPosts,
        setRefreshPosts,
        setTitle,
        setCategory,
        setIsEdited,
        setId 
    }) => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState(null)

    const api = process.env.REACT_APP_API_KEY
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const user = decodeToken(token)
            console.log(user)
            if(!user){
                // localStorage.removeItem('token')
                // navigate('/login')
            }
            else{
                getData()
            }
        }
        
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (refreshPosts && token) {
            console.log('on refresh')
            getData()
            setRefreshPosts(false)
        }
        else{
            // navigate('/login')
        }
    }, [refreshPosts])

    const getData = async () => {
        const auth = {
            headers: {'x-access-token':localStorage.getItem('token')} 
        }
        const res = await axios.get(api + 'posts', auth)
        console.log(res.data)
        setPosts(res.data)
    }

    const editPost = (data) => {
        if (data) {
            setId(data.p_id)
            setTitle(data.title)
            setCategory(data.category)
            setIsEdited(true)
            navigate('/create-update');
        }
    }

    const deletePost = async (id) => {
        if (id) {
            const res = await axios.delete(api + `posts/delete/${id}`)
            if (res.status == 200 || res.status == 201) {
                alert('Post deleted successfully')
                setRefreshPosts(true)
            }
            else {
                alert('An error occurred')
            }
        }
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-4">
                        {
                            posts != null && posts.length > 0 ?
                                <table className='table-responsive table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sno.</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Attachments</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            posts ?
                                                posts.map((item, key) => {
                                                    return <tr key={key}>
                                                        <td>{item.p_id}</td>
                                                        <td className='w-25'>{item.title}</td>
                                                        <td className='w-25'>{item.category}</td>
                                                        <td className='w-25'>
                                                            <img src={api + item.image} alt="" width="50" height="50" style={{borderRadius: '50%'}} />
                                                        </td>
                                                        <td className='w-25'>
                                                            <button className='btn-info' onClick={() => editPost(item)}>Edit</button>
                                                            <button className='ml-2 btn-danger' onClick={() => deletePost(item.p_id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                })

                                                :
                                                []
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className='border'>
                                    No Data Available
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
