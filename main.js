import express from 'express';
import {getAllPosts, createPost, updatePost, deletePost, getPostById} from './db.js';
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = dirname(__filename);
console.log(__dirname)

const app = express();
const port = 3000;
// var cors = require('cors');

app.use(express.json()); 
// app.use(cors());

app.use(express.static(join(__dirname, "public")));

app.get("/", async (request, response) => {
   // response.sendFile(join(__dirname, "public", "index.html"));
   try {
    const rows = await getAllPosts()
    response.json(rows);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

  app.get('/posts', async (req, res) => {
    try {
      const posts = await getAllPosts()
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })


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
