import express from 'express';
import dbConfig from '../db/database.js';

const conn = dbConfig.init();
dbConfig.connect(conn);

const router = express.Router();
const replyList = [];

router.use(express.json());
router.use(express.urlencoded());

router.get('/:nid', (req, res, next) => {
  const nid = req.params.nid;
  const sql = 'select rid, replyContent, nid, redate from reply where nid=?';
  conn.query(sql,nid, (err,rows,fields) => {
    if(err) console.log(err)
    else res.json(rows);
  });
  
});

router.post('/', (req, res, next) => {
  const {nid, content} = req.body;
  const sql = 'insert into reply(replyContent,nid,redate) values(?,?,sysdate())';
  const params =[content, nid];
  conn.query(sql,params, (err) => {
    if(err) console.log(err)
    else res.status(201).send('create success!');
  });
  
});

export default router;