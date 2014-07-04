/**
 * WrapStream
 * @authors feige05 (hu.feige@gmail.com)
 * @date    2014-07-02 14:16:18
 * @version $Id$
 */

var util      = require('util');
var Transform = require('stream').Transform;

util.inherits(WrapStream, Transform);
/**
 * 包裹原始JSON数据
 * @param {Object} options [Transform options]
 * @return { Stream} [可写/可读 数据流]
 */
function WrapStream(options) {
  if (!(this instanceof WrapStream)) {
    return new WrapStream(options);
  }

  Transform.call(this, options);

  this.once('start', function(err) {
    if (err) {
      this.push('{"success":false,"msg":"请求数据不存在！","data":""}');
      this.push(null);
    } else {
      this.push('{\n"success":true,\n"msg":"请求成功",\n"data":');
    }
  });
  this.on('error', function(err) {
    this.push(null);
  });

}
WrapStream.prototype._transform = function(chunk, encoding, cb) {
  this.push(chunk);
  cb();
};
WrapStream.prototype._flush = function(cb) {
  this.push('\n}');
  cb();
};

module.exports = WrapStream;