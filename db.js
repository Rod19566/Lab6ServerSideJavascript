import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

export async function createPost(title, content) {
    try {
      const [result] = await conn.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content]);
      return result;
    } catch (error) {
      console.error('Error en createPost:', error);
      throw error;
    }
  }

  export async function deletePost(postId) {
    try {
      const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [postId]);
      return result;
    } catch (error) {
      console.error('Error en deletePost:', error);
      throw error;
    }
  }

  export async function getPostById(postId) {
    try {
      const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
      return rows[0]; // Devuelve el primer resultado ya que se espera un único post
    } catch (error) {
      console.error('Error en getPostById:', error);
      throw error;
    }
  }