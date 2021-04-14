const _ = require('lodash')
function appendData(dic, value) {
  var maxKey = Number(_.max(Object.keys(dic), o => dic[o] ));
  var newKey = maxKey + 1
	dic[newKey] = value
  return {
    dictonary: dic[newKey],
    value: value
  }
}

exports.run = async function(added, db) {
  var addedUser = added;
  const ref = await db.collection("Test").doc("articles");
  const doc = await ref.get();
  var whitelist = doc.data().whitelist;
    appendData(whitelist, Number(addedUser));
    await ref.update({
      whitelist
    })
    console.log("successfully added user " + added)
  
  
}
