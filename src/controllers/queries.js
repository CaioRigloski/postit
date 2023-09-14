const con = require('../db/dbconfig')

module.exports = {
    // CREATE THE DATABASE
    dbCreate() {
            con.query("CREATE DATABASE postit;", (err, result) => {
                if (err) throw err
                console.log(result)
            })
    },

    // CREATE THE TABLES
    createTable() {
            con.query("CREATE TABLE post (id INT PRIMARY KEY UNIQUE KEY AUTO_INCREMENT NOT NULL, title VARCHAR(45), description VARCHAR(250) NOT NULL);", (err, result) => {
                if (err) throw err
                console.log(result)
            })
    },

    // READ POSTS
    readPosts() {
        return con.promise().query(`SELECT * FROM post;`)
    },


    // INSERT POST
    insertPost(description, title) {
        return con.promise().query(`INSERT INTO post (title, description) VALUES (${title ? `"${title}"` : null}, ${`"${description}"`});`)
    },

    // UPDATE POST
    updatePost(description, title, id) {
        return con.promise().query(`UPDATE post SET description = "${description}", title = "${title}" WHERE id = ${id};`)
    },

    // DELETE POST
    deletePost(id) {
        return con.promise().query(`DELETE FROM post WHERE id = ${id};`)
    },
}