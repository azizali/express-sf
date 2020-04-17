const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.listen(2222, ()=>{
  console.log('App is being served');
})

app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/',
  (req, res, next)=>{
    console.log('First middleware');
    const isAuth = false;
    if(isAuth){
      return next()
    }
    return res.send('You are not authorized')
  },
  (req, res)=>{
    console.log('Second middleware');
    res.send('Hello world')
  }
);

app.get('/user',
  (req, res, next)=>{
    console.log('First user middleware');
    res.send('You are on /user route');
    next();
  }
);

app.post('/user',
  (req, res, next)=>{
    console.log(req.body.name, req.body.location);
    res.send('Saving a new user');
  }
);

app.get('/user/:id',
  (req, res, next)=>{
    res.send(`You are user ${req.params.id}`);
    next();
  }
);

app.use((req, res, next)=>{
  console.log(req.body, req.params, req.query)
  console.log('use middleware');
  next();
})