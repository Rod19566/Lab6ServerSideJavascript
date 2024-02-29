import express from 'express';
import { getAllPosts, createPost, deletePost, getPostById } from './db.js';

const app = express();
app.use(express.json());

app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error en /posts:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`);
});
// Endpoint para borrar un post
app.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await deletePost(postId);
    res.json(result);
  } catch (error) {
    console.error('Error en /posts/:id (DELETE):', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para ver un post individual
app.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error en /posts/:id (GET):', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Otro código de configuración o endpoints...
