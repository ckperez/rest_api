'use strict';

const express = require('express');
const mongoose = require('mongoose');
const snakeRouter = require(__dirname + '/snakeRouter.js');
const weaselRouter = require(__dirname + '/weaselRouter.js');
const app = express();

mongoose.connect('mongodb://localhost/dev_db');

app.use('/snakes', snakeRouter);
app.use('/weasels', weaselRouter);

app.get('/*', (req, res)=>{
  res.status(404).json({message:'not found'});
});

app.listen(2222, ()=>{console.log('Server up on quadruple-deuce!')});