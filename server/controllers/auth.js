import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const users = await User.find();    
        const lastUserIndex = users[users.length - 1]
        const { name, email, password } = req.body;
        const avatar = req.file.path
        const tmpAvatar = 'https://simg.nicepng.com/png/small/933-9332131_profile-picture-default-png.png'
        console.log(avatar)

        if (!name || !email || !password) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        else{
            const hashedPwd = await bcrypt.hash(password, 10)
            const newUser = new User({
                user_id: lastUserIndex != null && lastUserIndex.user_id != null ? lastUserIndex.user_id + 1 : 1,
                name: name,
                email: email,
                password: hashedPwd,
                avatar: avatar != null ? avatar : tmpAvatar
            })
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
        }
    } 
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ message: "Values can't be empty" });
            return;
        }
        
        const user = await User.findOne({
            email: email
        });    
        
        const isPwdValid = await bcrypt.compare(password, user.password)
        
        console.log(isPwdValid)


        if(user != null && isPwdValid){
            const token = jwt.sign({
                name:user.name,
                email:user.email
            }, 'secretkey1234')

            let response = {
                status: 200,
                token: token
            }
            res.status(200).json(response);
        } 
        else{
            let response = {
                status: 404,
                token: null
            }
            res.status(200).json(response);
        }
        
    } 
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

