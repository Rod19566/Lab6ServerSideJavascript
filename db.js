import conn from './conn.js';
/*
POST /posts
GET /posts
GET /posts/:postId
PUT /posts/:postId
DELETE /posts/:postId
*/
export async function getAllPosts() {
    try {
        const [rows] = await conn.query('SELECT * FROM blog_posts');
        return rows;
    } catch (error) {
        console.error('Error executing getAllPosts:', error);
        throw error;
    }
}

export async function createPost(title, content) {
    try {
        const [result] = await conn.query('INSERT INTO blog_posts (title, content) VALUES (?, ?)', [title, content]);
        return result;
    } catch (error) {
        console.error('Error executing createPost:', error);
        throw error;
    }
}
