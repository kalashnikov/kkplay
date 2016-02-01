use latest;
module.exports = function (ctx, done) {
  done(null, 'Hello, ' + ctx.data.name);
}
