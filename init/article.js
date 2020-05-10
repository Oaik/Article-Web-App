const mongoose = require('mongoose');
const Article = require('../models/articles');

Article.find({}, (err, articles) => {
    if (err) throw new Error();
    if (!!articles.length) {
        console.log("Article Found");
        return;
    }
    const data = {
        title: "Test article",
        author: "Test Author",
        body: "Test Body Content"
    };
    const startArticle = new Article(data);
    startArticle.save().then(() => console.log("The starter article added"));
})
