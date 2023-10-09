var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const pool = require("../db");
const auth = require('../middleware/auth');


// Create (POST) operation
router.post('/zakaz',auth.authenticateToken, async (req, res) => {
    try {
      const { status, menegerid, deckription, creator, oredersid } = req.body;
     
      const query = 'INSERT INTO zakaz (status, menegerid, deckription, creator, oredersid) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [status, menegerid, deckription, creator, oredersid];
      const result = await pool.query(query, values);
     
      res.status(201).json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Read (GET) operation
  router.get('/zakaz',auth.authenticateToken, async (req, res) => {
    try {
     
      const query = 'SELECT * FROM zakaz';
      const query2= 'SELECT * FROM points'
      const result = await pool.query(query);
      const result2 = await pool.query(query2);
for (let i = 0; i < result.rows.length; i++) {
  result.rows[i].ponts=[]
for (let j = 0; j < result2.rows.length; j++) {
if(result.rows[i].id==result2.rows[j].zakaz_id){
  result.rows[i].ponts.push(result2.rows[j])
}}}
res.json(result.rows);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.get('/myzakaz',auth.authenticateToken, async (req, res) => {
    try {
     
      const query = 'SELECT * FROM zakaz';
      const query2= 'SELECT * FROM points'
      const result = await pool.query(query);
      const result2 = await pool.query(query2);
for (let i = 0; i < result.rows.length; i++) {
  result.rows[i].ponts=[]
for (let j = 0; j < result2.rows.length; j++) {
if(result.rows[i].id==result2.rows[j].zakaz_id){
  result.rows[i].ponts.push(result2.rows[j])
}}}
var a=result.rows.filter(item=>item.creator==req.user.userId)
res.json(a);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.get('/mezakaz',auth.authenticateToken, async (req, res) => {
    try {
      const query = 'SELECT * FROM zakaz';
      const query2= 'SELECT * FROM points'
      const result = await pool.query(query);
      const result2 = await pool.query(query2);
for (let i = 0; i < result.rows.length; i++) {
  result.rows[i].ponts=[]
for (let j = 0; j < result2.rows.length; j++) {
if(result.rows[i].id==result2.rows[j].zakaz_id){
  result.rows[i].ponts.push(result2.rows[j])
}}}
var a=result.rows.filter(item=>item.menegerid==req.user.userId)
res.json(a);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Update (PUT) operation
  router.put('/zakaz/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, menegerid, deckription, creator, oredersid } = req.body;
     
      const query = 'UPDATE zakaz SET status = $2, menegerid = $3, deckription = $4, creator = $5, oredersid = $6, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, status, menegerid, deckription, creator, oredersid];
      const result = await pool.query(query, values);
     
      res.json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete (DELETE) operation
  router.delete('/zakaz/:id',auth.authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
     
      const query = 'DELETE FROM zakaz WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
     
      res.json(result.rows[0]);
    } catch (error) {
     
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  










module.exports = router;