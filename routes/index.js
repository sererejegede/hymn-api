const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Set up connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hymns'
});
db.connect((err) => {
  if (err) throw err;
  console.log('DB connected');
});

const getHymns = () => {
  let sql = 'SELECT * FROM lyrics';
  let query = db.query(sql, (err, data) => {
    if (err) throw err;
    return data;
  })
};

router.get('/', (req, res, next) => {
  let sql = 'SELECT * FROM lyrics';
  let query = db.query(sql, (err, data) => {
    if (err) throw err;
    res.status(200).json({
      message: 'Hello GET',
      data: data
    });
  });
});

router.get('/:hymn_id', (req, res, next) => {
  const hymn_id = req.params.hymn_id;
  const sql = `SELECT * FROM verses WHERE lyric_id = ${hymn_id}`;
  let query = db.query(sql, (err, data) => {
    if (err) throw err;
    res.status(200).json({
      message: 'Hello GET one Hymn',
      hymn_id: hymn_id,
      data: data
    });
  });
});

router.post('/', (req, res, next) => {
  const hymn = {
    title: req.body.title
  };
  const sql = `INSERT INTO lyrics (title) VALUES ('${hymn.title}')`;
  const query = db.query(sql, (err, data) => {
    if (err) throw err;
    const new_sql = `SELECT * FROM lyrics WHERE id = ${data.insertId}`;
    db.query(new_sql, (err, data) => {
      res.status(201).json(data[0]);
    })
  });
});

router.patch('/:hymn_id', (req, res, next) => {
  const hymn_id = req.params.hymn_id;
  res.status(200).json({
    message: 'Hello PATCH',
    hymn_id: hymn_id
  });
});

router.delete('/:hymn_id', (req, res, next) => {
  const hymn_id = req.params.hymn_id;
  res.status(300).json({
    message: 'Hello DELETE',
    hymn_id: hymn_id
  });
});

module.exports = router;