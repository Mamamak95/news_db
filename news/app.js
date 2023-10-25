import express from 'express';
import newsRouter from './router/news.js';
import replyRouter from './router/reply.js';

const app = express();

app.use('/news', newsRouter);
app.use('/reply', replyRouter);

app.listen(8080);
