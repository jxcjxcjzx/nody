var stream = require('stream')

var piping = require('./piping')
var piped = require('./piped')

//public
/**
 * the cons stream inherits from stream.Transform
 * public methods:
 *   .pack( vararg... )
 *       accept variable amount of arguments. buffers them for the next .submit()
 *   .submit()
 *       creates a payload from the args passed to .pack()
 */
module.exports = function cons(){
  return new Cons()
}

/**
 * for inheritance
 */
module.exports.Cons = Cons

//private
var _slice = Array.prototype.slice


function Cons(){
  if( ! (this instanceof Cons) ) return new Cons()
  stream.Transform.call( this, { objectMode: true } )
  this.packed = null
}

require('util').inherits( Cons, stream.Transform )

piping( Cons.prototype )

Cons.prototype._transform = function( item, ignore, callback ) {
  this.push( item )
  callback()
};

Cons.prototype._flush = function(callback){
  this.push(null)
  this.packed = null
  callback()
}

Cons.prototype.pack = function () {
  var args = _slice.call(arguments)
  if( ! this.packed )
    this.packed = args
  else
    this.packed = this.packed.concat(args)
}

Cons.prototype.submit = function(callback) {
  if ( this.packed ) {
    this.protoWrite( piped.apply( null, this.packed ), null, callback)
    this.packed = null
  }
}

Cons.prototype.protoWrite = Cons.prototype.write

Cons.prototype.write = function(chunk, encoding, callback) {
  return this.protoWrite( piped(chunk),encoding, callback)
}
