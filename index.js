const Vue = require('vue')
const express = require('express')
const app = express();
const admin = require('firebase-admin')
const serviceAccount = require('./key.json')
const fs = require('fs')
const jsonARTICLES = require('./articles.json')

app.set('views', 'website');
app.use(express.urlencoded({ extended: true }));
//Will not use vuefire because realtime is not really a priority

const template = require('fs').readFileSync('./website/index.html', 'utf-8');

const renderer = require('vue-server-renderer').createRenderer({
  template,
});

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "==YOUR FB URL HERE=="
});
const db = admin.firestore();

async function downloadArticles() {
  const ref = await db.collection("Test").doc("articles");
  const doc = await ref.get();  
  var articles = doc.data().allArticles;

    fs.writeFile('articles.json', JSON.stringify(articles), function (err) {
      if (err) {
        console.log("Failed to write to file.")
        throw err;
      }
      else {
        console.log('Saved articles successfully.');
      }
    });
}
downloadArticles()

app.get('*', async (req, res) => {
  const ref = await db.collection("Test").doc("articles");
  const doc = await ref.get();
  const whitelisted = doc.data().whitelist;
  const articles = doc.data().list;
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div></div>`,
  });


  const context = {
    title: 'vue ssr',
    metas: `
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta name="keyword" content="vue,ssr">
        <link rel="stylesheet" href="style.css">
    `,
    main: doc.data().main,
    whitelisted: Object.keys(whitelisted).map(k => whitelisted[k]).join('<pre>ㅤ'),
    ids: Object.keys(articles).map(k => articles[k][k]).join('<pre>ㅤ'),
    path: __dirname
};

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error') 
      return;
    }
    res.end(html);
  });
})

app.post("/newArticle", (req, res) => {
  const contents = {
    title: req.body.title,
    url: req.body.url,
    des: req.body.des,
    day: req.body.day,
    time: req.body.hour,
    ampm: req.body.ampm,
    anonymous: req.body.anonymous,
    author: req.body.author
  }
  const newarticle = require('./functions/publish.js');
  newarticle.run(db, contents)
	res.writeHead(301, { Location: 'http://localhost:8080/' });
	res.end("");
})

app.post('/removeUser', async (req, res) => {
  const removedUser = req.body.userid;
  const remove = require('./functions/add-remove/remove.js');
  await remove.run(db, admin, removedUser);
	res.writeHead(301, { Location: 'http://localhost:8080/' });
	res.end("");
})

app.post('/addUser', async (req, res) => {
  const addedUser = req.body.userid;
  const add = require('./functions/add-remove/add.js');
  await add.run(addedUser, db)
	res.writeHead(301, { Location: 'http://localhost:8080/' });
	res.end("");
})

app.post('/delete', async (req, res) => {
  const deletedArticle = req.body.articleID;
  const deleteArticle = require('./functions/delete.js');
  deleteArticle.run(admin, deletedArticle, db)
	res.writeHead(301, { Location: 'http://localhost:8080/' });
	res.end("");
})

app.listen(8080)
console.log('listening on port 8080')
