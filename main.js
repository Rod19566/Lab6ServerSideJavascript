import express from 'express';
import { getAllPosts, createPost } from './db.js';

const app = express();
const port = 3000;

app.use(express.json()); // Apply the express.json() middleware

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/posts', async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const { title, content } = req.body; // Extract title and content from request body
    const newPost = await createPost(title, content);
    res.json(newPost);
});

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
