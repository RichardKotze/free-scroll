
(function (window) {
  var document = window.document,
    // helper methods
    push = [].push,
    slice = [].slice,
    splice = [].splice,
    forEach = [].forEach,
    eventsCache = {};

  function FreeScroll(selector, callback) {

    if (!(this instanceof FreeScroll)) {
      return new FreeScroll(selector);
    }

    if (!selector) {
      return this;
    }

    if (selector instanceof FreeScroll) {
      return selector;
    }

    if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this;
    }

    if (typeof selector === 'string') {
      return push.apply(this, slice.call(document.querySelectorAll(selector)));
    }

  };


  FreeScroll.prototype = {
    length: 0,

    toInfinity : function(){

    },

    on: function(event){

    },

    off: function(event){

    },

    _fire: function(){

    }

  };

  FreeScroll.fn = FreeScroll.prototype;

  FreeScroll.prototype.splice = splice;

  // expose to global object
  window.FreeScroll = window.FS = FreeScroll;
}(window));
