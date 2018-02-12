const express= require('express');
const mysql = require('mysql');

//Create connection
const db=mysql.createConnection({
    //connectionLimit: 50, 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql1'
});

//connect
db.connect((err)=>{
    if(err){
         console.log('DB Connection Error');
         console.log(err);
    }
    else{
        console.log('MySQL connected');
    }
});

const app=express();

//Create DB
app.get('/createdb',(req,res) => {
    let sql='CREATE DATABASE nodemysql1';
    db.query(sql,(err,result)=>{
        if(err){
            console.log('DB Create Error');
            console.log(err);
        }
        else{
            console.log(result);
            res.send('Database Created');
        }
    })
});

//Create Table
app.get('/createtable',(req,res)=> {
    res.send('DB Table Create Call');
    console.log('DB Table Create Call');

    let sql='CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(250),body VARCHAR(50), PRIMARY KEY (id))';
    db.query(sql,(err,result)=>{
        if(err){
            console.log('Table Create Error');
            console.log(err);
        }
        else{
            console.log(result);
            res.send('Post Table Created');
        }
    });
});


//Insert posts
app.get('/addpost',(req,res)=> {
    let post = {
        title: 'Post 3',
        body: 'MY third POST'
    };
    let sql='INSERT INTO posts SET ?';
    let query= db.query(sql,post,(err,result)=>{
        if(err){
            console.log('Table Insertion Error');
        }
        else{
            console.log(result);
            res.send('Data Successfully Inserted');
        }
    });
}); 

//Get posts
app.get('/getpost',(req,res)=> {
    let sql='SELECT * from posts';
    let query= db.query(sql,(err,results)=>{
        if(err){
            console.log('Get DATA Error');
        }
        else{
            console.log(results);
            res.send('Data fetched');
           // console.log(results[1].body);
        }
    });
}); 

//GET by value
app.get('/getpost/:id',(req,res)=> {
    var myid= req.params.id;
    let query= db.query('SELECT * from posts WHERE id =?',myid,(err,result)=>{
        if(err){
            console.log('Get DATA Error');
            console.log(err);
        }
        else{
            console.log(result);
            res.send('Requested Post fetched');
        }
    });
}); 


//Update Post
app.get('/updatepost/:id',(req,res)=> {
    let newTitle ='Updated Title';
    let sql=`Update posts SET TITLE = ${newTitle} WHERE id =${req.param.id}`;
    let query= db.query(sql,(err,results)=>{
        if(err){
            console.log('Table Update Error');
        }
        console.log(results);
        res.send('Post Updated');
        
    });
}); 

//Delete Post
app.get('/updatepost/:id',(req,res)=> {
    let sql=`DELETE FROM posts WHERE id =${req.param.id}`;
    let query= db.query(sql,(err,results)=>{
        if(err){
            console.log('Table Deletion Error');
        }
        console.log(results);
        res.send('Post Deleted');
        
    });
}); 


/* Connection Pool
app.get('/',(req,res)=> {
    db.getConnection((err,tempConnect)=>{
       if(err)
           {
               tempConnect.release();
               console.log('Error')
           }
        else{
            console.log('Connected!')
            tempConnect.query('SELECT * from posts',(err,results)=>{
            tempConnect.release();
            if(err){
                    console.log('Error in the query');
                }
            else{
                res.send(results);
            }    
            });
        }
    });
});  */


app.listen('3800',()=> {
    console.log('Server Started');
});
