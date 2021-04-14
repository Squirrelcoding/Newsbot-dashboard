var _ = require('lodash')
function appendData(dic, value) {
  var maxKey = Number(_.max(Object.keys(dic), o => dic[o] ));
  var newKey = maxKey + 1
	dic[newKey] = value
  return {
    dictonary: dic[newKey],
    value: value
  }
}

function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getNewestKey(dic) {
  var maxKey = Number(_.max(Object.keys(dic), o => dic[o] ));
  var newKey = maxKey + 1
  return newKey
}


exports.run = async function(db, articlecontents) {
  var article = articlecontents
  console.log(article)
  var ref = await db.collection('Test').doc('articles');
  var doc = await ref.get();
  var newArticle = "article" + randint(1, 99999)

  var allArticles = doc.data().allArticles; 
  var key = getNewestKey(allArticles, _);
  console.log(appendData(allArticles, {
    title: article.title,
    imgURL: article.url,
    des: article.des,
    day: article.day,
    time: article.time,
    am_pm: article.ampm,
    id: newArticle,
    published: false
  }, _))
  var list = doc.data().list;
  appendData(list, {[Number(getNewestKey(list))]: newArticle})
  var queue = doc.data().queue;
  //Add Article to queue
  


  const whitelist = doc.data().whitelist;
  const main = doc.data().main
  appendData(queue, {
    id: newArticle,
    time: {
      day: article.day,
      time: article.time,
      am_pm: article.ampm
    },
    article: key,
    published: false
  })

    await ref.set({
      allArticles, queue, whitelist, list, main
    })
  

}