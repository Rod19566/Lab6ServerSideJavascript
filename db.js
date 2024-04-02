import conn from './conn.js'
/*
POST /posts
GET /posts
GET /posts/:postId
PUT /posts/:postId
DELETE /posts/:postId
*/

export async function getPostById(postId) {
    try {
        const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
        return rows.length ? rows[0] : null
    } catch (error) {
        console.error('Error executing getPostById:', error);
        throw error;
    }
}

export async function getAllPosts() {
    try {
        const [rows] = await conn.query('SELECT * FROM blog_posts');
        return rows;
    } catch (error) {
        console.error('Error executing getAllPosts:', error);
        throw error;
    }
}

export async function createPost(title, content, username) {
    try {
        const [result] = await conn.query('INSERT INTO blog_posts (title, content, username) VALUES (?, ?)', [title, content, username]);
        
        const insertedRow = await getPostByID(result.insertId)
        return insertedRow;
    } catch (error) {
        console.error('Error executing createPost:', error);
        throw error;
    }
}

export async function updatePost(postId, title, content) {
    try {
        const [result] = await conn.query('UPDATE blog_posts SET title = ?, content = ? WHERE id = ?', [title, content, postId]);
        return result;
    } catch (error) {
        console.error('Error executing updatePost:', error);
        throw error;
    }
}

export async function deletePost(postId) {
    try {
        const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [postId]);
        return result;
    } catch (error) {
        console.error('Error executing deletePost:', error);
        throw error;
    }
}