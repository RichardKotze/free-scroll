
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

    on: function(eventId, fn){
      if(!eventsCache[eventId]){
        eventsCache[eventId] = [fn];
      }else{
        eventsCache[eventId].push(fn);
      }
    },

    off: function(eventId){

    },

    _fire: function(eventId){
      var args = [].slice.call(arguments, 1);

      if(!eventsCache[eventId]){
        eventsCache[eventId] = [];
      }

      for (var i = 0, il = eventsCache[eventId].length; i < il; i++) {
        eventsCache[eventId][i].apply(null, args);
      };
    }

  };

  FreeScroll.fn = FreeScroll.prototype;

  FreeScroll.prototype.splice = splice;

  // expose to global object
  window.FreeScroll = window.FS = FreeScroll;
}(window));
