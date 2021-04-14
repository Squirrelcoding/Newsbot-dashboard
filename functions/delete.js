const _ = require('lodash')

exports.run = async function (admin, id, db) {
  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var allArticles = doc.data().allArticles;
  var length = 1 + Number(_.max(Object.keys(allArticles), o => allArticles[o] ));
  var removedArticle = id
  console.log({
    a: removedArticle,
    b: length
  })

  var list = doc.data().list;
  var length2 = 1 + Number(_.max(Object.keys(list), o => list[o] ));
  for (var a=0;a<length2;a++){
    const FieldValue = admin.firestore.FieldValue
    if (list[a][a] == id) {
      await ref.set({
        list: {
          [a]: FieldValue.delete()
        }
      }, {merge:true})
    }
    else if (a==length2) {
      console.log("failed to find article in list")
    }
  }

  var queue = doc.data().queue;
  var length3 = 1 + Number(_.max(Object.keys(queue), o => queue[o] ));
  for (var a=0;a<length3;a++){
    const FieldValue = admin.firestore.FieldValue
    if (queue[a].id == id) {
      await ref.set({
        queue: {
          [a]: FieldValue.delete()
        }
      }, {merge:true})
    }
    else if (a==length3) {
      console.log("failed to find article in list")
    }
  }


  for (var i=0;i<length;i++) {
    console.log(allArticles[i])
    console.log(i)

    if (allArticles[i].id == removedArticle) {
      console.log({
        a: i,
        b: removedArticle,
        c: length
      })
      const FieldValue = admin.firestore.FieldValue
      await ref.set({
        allArticles: {
          [i]: FieldValue.delete()
        }
      }, {merge:true})
      console.log("successfully removed article")
    }
    else {
      console.log("Failed to find article.")
      continue;
    }
  }
}