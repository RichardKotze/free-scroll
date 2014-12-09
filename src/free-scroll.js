
(function (window) {
  var document = window.document,
    // helper methods
    push = [].push,
    slice = [].slice,
    splice = [].splice,
    forEach = [].forEach,
    eventsCache = {};

  function FreeScroll(selector) {

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
      var arrayResult = push.apply(this, slice.call(document.querySelectorAll(selector)));
      addEvent(this[0], 'scroll', function(){
        console.log('scroll me');
      });
      return arrayResult;
    }

  };

  function addEvent( obj, type, fn ) {
    if ( obj.attachEvent ) {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
      obj.attachEvent( 'on'+type, obj[type+fn] );
    } else
      obj.addEventListener( type, fn, false );
  }

  function removeEvent( obj, type, fn ) {
    if ( obj.detachEvent ) {
      obj.detachEvent( 'on'+type, obj[type+fn] );
      obj[type+fn] = null;
    } else
      obj.removeEventListener( type, fn, false );
  }

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
    },

  };

  FreeScroll.fn = FreeScroll.prototype;

  FreeScroll.prototype.splice = splice;

  // expose to global object
  window.FreeScroll = window.FS = FreeScroll;
}(window));
