import Post from '../models/post.js'
import jwt from 'jsonwebtoken'

export const fetchPosts = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    try {
        if(token){
            const decoded = jwt.verify(token,'secretkey1234')
            if(decoded){
                const posts = await Post.find()
                console.log(posts , 'posts')
                res.status(200).json(posts);
            }
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const fetchPostById = async (req, res) => {
    try {   
        const { id } = req.params
        const post = await Post.find({ p_id: id })
        res.send(post);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    try {
        const posts = await Post.find();    
        const lastPost = posts[posts.length - 1]
        const { title, category } = req.body;
        const image = req.file.path

        console.log(image)

        if (!title || !category) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        else{
            const newPost = new Post({
                p_id: lastPost != null && lastPost.p_id != null ? lastPost.p_id + 1 : 1,
                title: title,
                category: category,
                image: image
            })
            const savePost = await newPost.save();
            res.status(201).json(savePost);
        }
    } 
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { p_id, title, category } = req.body;

        if (!p_id || !title || !category) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        else{
           const updatePost = await Post.findOneAndUpdate({p_id: p_id}, {$set:{title:title, category: category}}, {new: true});
            res.status(200).json(updatePost)
        }
    } 
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        else{
           const deletePost = await Post.findOneAndDelete({p_id: id});
            res.status(200).json(deletePost)
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
