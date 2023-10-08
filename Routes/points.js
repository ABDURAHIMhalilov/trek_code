var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const pool = require("../db")

// Create (POST) operation
router.post('/points', async (req, res) => {
    try {
      const { status, zakaz_id } = req.body;
      const client = await pool.connect();
      const query = 'INSERT INTO points (status, zakaz_id) VALUES ($1, $2) RETURNING *';
      const values = [status, zakaz_id];
      const result = await client.query(query, values);
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Read (GET) operation
  router.get('/points', async (req, res) => {
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM points';
      const result = await client.query(query);
      client.release();
      res.json(result.rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update (PUT) operation
  router.put('/points/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status, zakaz_id } = req.body;
      const client = await pool.connect();
      const query = 'UPDATE points SET status = $2, zakaz_id = $3, time_update = current_timestamp WHERE id = $1 RETURNING *';
      const values = [id, status, zakaz_id];
      const result = await client.query(query, values);
      client.release();
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete (DELETE) operation
  router.delete('/points/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await pool.connect();
      const query = 'DELETE FROM points WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await client.query(query, values);
      client.release();
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;