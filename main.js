import express from 'express';
import cors from 'cors'
import {getAllPosts, createPost, updatePost, deletePost, getPostById} from './db.js';
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = dirname(__filename);
console.log(__dirname)

//const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json()); 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))

//app.use(express.static(join(__dirname, "public")));

app.get("/", async (request, response) => {
    response.sendFile(join(__dirname, "public", "index.html"));
});

  app.get('/posts', async (request, response) => {
    try {
      const posts = await getAllPosts()
      response.status(200).json(posts)
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' })
    }
  })


  app.get('/posts/:postId', async (request, response) => {
    try {
      const { postId } = request.params
      const post = await getPostByID(postId)
      if (post) {
        response.json(post)
      } else {
        response.status(404).json({ error: 'Post not found' })
      }
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' })
    }
  })


app.post('/posts', async (request, response) => {
    try {
      const {title, content, username} = request.body
      const result = await createPost(title,content,username)
      response.status(200).json(response)
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' })
    }
  })

app.delete('/posts/:postId', async (request, response) => {
    const postId = request.params.postId;
    try {
        const result = await deletePost(postId);
        if (!result.affectedRows) {
          response.status(404).json({ error: 'Post not found' });
        } else {
          response.json({ message: 'Post deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
