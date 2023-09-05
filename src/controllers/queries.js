const con = require('../db/dbconfig')

module.exports = {
    dropncreate() {
    // CREATE THE DATABASE
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                "CREATE DATABASE postit;",
                function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            });
        })
    },

    // CREATE THE TABLES
    createTable() {
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                "CREATE TABLE post (id INT PRIMARY KEY UNIQUE KEY AUTO_INCREMENT NOT NULL, title VARCHAR(45), description VARCHAR(250) NOT NULL);",
                function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            });
        })
    },

    // INSERT POST
    insertPost(description, title) {
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                `INSERT INTO post (title, description) VALUES (${title ? `"${title}"` : null}, ${`"${description}"`});`,
                function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            });
        })
    },

    // READ POSTS
    readPosts() {
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                `SELECT * FROM post;`,
                function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            });
        })
    },

    // UPDATE POST
    updatePost(id, description, title) {
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                `UPDATE post SET description = ${description}, title = ${title} WHERE id = ${id};`,
                function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            });
        })
    },

    // DELETE POST
    deletePost(id) {
        con.connect(function(err) {
            if (err) throw err;
            con.query(
                `DELETE FROM post WHERE id = ${id};`,
                function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            });
        })
    },
}