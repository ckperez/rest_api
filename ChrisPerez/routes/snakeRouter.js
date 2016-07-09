'use strict';

const express = require('express');
const Snake = require(__dirname + '/../model/snake');
const bodyParser = require('body-parser').json();
const jwt = require(__dirname + '/../lib/jwt');

const snakeRouter = module.exports = exports = express.Router();

snakeRouter.get('/', (req, res)=>{
  Snake.find({}, (err, snakeData)=>{
    if (err) return res.json({message: 'Error getting'});
    res.json(snakeData);
  });
});

snakeRouter.post('/', bodyParser, jwt, (req, res)=>{
  let aSnake = new Snake({
    name: req.body.name,
    weaselKiller: req.body.weaselKiller,
    size: req.body.size
  });
  aSnake.save((err, snakeData)=>{
    if (err) return res.json({message: 'Error posting'});
    res.json(snakeData);
  });
});

snakeRouter.put('/', bodyParser, jwt, (req, res)=>{
  let _id = req.body._id;
  Snake.findOneAndUpdate({_id}, req.body, (err, data)=>{
    if (err) return res.json({message: 'Error updating'});
    res.json({message: 'Update successful', data:data});
  });
});

snakeRouter.delete('/:id', jwt, (req, res)=>{
  let _id = req.params.id;
  Snake.findOneAndRemove({_id}, (err, data)=>{
    if (err) return res.json({message: 'Error deleting'});
    res.json({message: 'Deletion successful', data:data});
  });
});
