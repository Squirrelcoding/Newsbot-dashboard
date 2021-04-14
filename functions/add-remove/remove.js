const _ = require('lodash')
exports.run = async function (db, admin, removed) {
  var ref = await db.collection("Test").doc("articles");
  var doc = await ref.get();
  var whitelist = doc.data().whitelist;
  var length = 1 + Number(_.max(Object.keys(whitelist), o => whitelist[o] ));
  var removedUser = removed
  for (var i=0;i<length;i++) {
    if (whitelist[i] == removedUser) {
      console.log({
        a: i,
        b: removedUser,
        c: length
      })
      const FieldValue = admin.firestore.FieldValue
        await ref.set({
          whitelist: {
            [i]: FieldValue.delete()
          }
        }, {merge:true})
        console.log("Successfully removed user " + removed)
      }
      if (i == (length - 1) && whitelist[i] != removedUser) {
        console.log("Failed to find user: " + removedUser)
      }
      else {
        continue;
      } 
    }
  }
