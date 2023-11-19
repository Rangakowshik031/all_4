const express= require("express");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const { authenticate } = require("passport");
const app= express();
app.use(express.json());
const port=3000;
const users=[];
const authenticatetoken=(req,res,next)=>{
    const authHeader= req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];
    if(!token)
    {
        console.error("invalid");
        return res.status(401).send("invalid");
    }
    jwt.verify(token,'secret_key',(err,user)=>{
        if(err)
        {
            console.error(" eroror");
            return res.status(403).send("invalid");
        }
        console.log("succ");
        req.user=user;
        next();
    })
}
app.post('/register',async (req,res)=>{
    const {username,password}= req.body;
    const hashedPassword= await bcrypt.hash(password,10);
    users.push({username,password:hashedPassword});
    res.status(201).send("successfully registered");
});

app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const user= users.find((user)=> user.username===username)
    if(user && (await bcrypt.compare(password,user.password)))
    {
        const token= jwt.sign({username},'secret_key');
        res.json({token});
    }
    else
    {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/protected',authenticatetoken,(req,res,next)=>{
    res.send(`verified ${req.body.user}`);
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
