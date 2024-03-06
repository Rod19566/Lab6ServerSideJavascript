import express from 'express';
import {getAllPosts, createPost, updatePost, deletePost, getPostById} from './db.js';

const app = express();
const port = 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error getting all posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await getPostById(postId);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json(post);
        }
    } catch (error) {
        console.error('Error getting post by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await createPost(title, content);
        res.json(result);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
    try {
        const result = await updatePost(postId, title, content);
        if (!result.affectedRows) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const result = await deletePost(postId);
        if (!result.affectedRows) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json({ message: 'Post deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});