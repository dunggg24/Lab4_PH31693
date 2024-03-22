const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT||3000;
//de su dung postman
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//tao key
const accessK = '123456';
const refeshK = '123456';
const users = [
    {id: 1,username:'user1',password:'pwd1'},
] ;
//ham sinh ra access token
function sinhAccessToken(user){
    return jwt.sign(user,accessK,{expiresIn: '15m'});

}

function sinhRefreshToken(user){
    return jwt.sign(user,refeshK,{expiresIn: '7d'});

}
//login
app.post('/login',(req,res)=> {
    const {username,password} = req.body
    console.log('Thong tin');
    console.log(username);
    console.log(password);
    //tim user co trong mang  user
    const user = users.find((u)=>u.username===username && u.password===password);
    if(!user){
        return res.status(404).json({message:'khong ton tai user'});

    }
    //lay ve acess token
    const accessToken = sinhAccessToken ({id:user.id,username:user.username});
    const refreshToken = sinhRefreshToken({id:user,username:user.username});
    //tra ve nguoi dung 
    res.json({accessToken,refreshToken});
    console.log("accessToken: "+accessToken);
    console.log("refressToken: "+refreshToken);

});
app.listen(PORT,() =>{
    console.log('server dang chay');
})