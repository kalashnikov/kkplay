var MongoClient = require('mongodb').MongoClient;
var utf8        = require('utf8');

function save_tweet(user, text, link, db, cb) {
  var doc       = {
    user: user,
    text: text,
    link: link
  };
  
  console.log('doc: %s', JSON.stringify(doc));

  db
    .collection('likedTweet')
    .insert(doc, function (err) {
      if(err) return cb(err);

      console.log('Successfully saved one tweet. | User:%s, Text:%s, Link:%s', user, text.substring(0,30), link);

      cb(null);
    });
}

module.exports = function (ctx, done) {
  MongoClient.connect(ctx.data.MONGO_URL, function (err, db) {
    if(err) return done(err);

    save_tweet(ctx.data.user, ctx.data.text, ctx.data.link, db, function (err) {
      if(err) return cb(err);

      done(null, 'Success.');
    });
  });
};
