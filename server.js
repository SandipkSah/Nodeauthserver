const express = require("express");
const app = express();
const bcrypt = require('bcrypt')

app.use(express.json());
const users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send()
    }
    catch{
        res.status(500).send()
    }

  
});

app.post('/users/login', async(req, res)=>{
    const user = users.find(user =>user.name =req.body.name)
    if (user == null){
        return res.status(400).send("Not allowed")
    }
    try{
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send('Login success')
        }
        else{
            res.sent('Wrong username')
        }
    }
    catch{
        res.statue(500).send("error")
    }
})
app.listen(3000, () => {
  console.log("server running");
});
