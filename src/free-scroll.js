'use strict';

(function (window) {
  var document = window.document,
    // helper methods
    push = [].push,
    slice = [].slice,
    splice = [].splice,
    eventsCache = {};

  function isFreeScroll(obj){
    return obj instanceof FreeScroll;
  }

  function FreeScroll(selector) {

    if (!isFreeScroll(this)) {
      return new FreeScroll(selector);
    }

    if (!selector) {
      return this;
    }

    if (isFreeScroll(selector)) {
      return selector;
    }

    if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this;
    }

    if (typeof selector === 'string') {
      var arrayResult = push.apply(this, slice.call(document.querySelectorAll(selector)));
      this.addEvent('scroll', function(){
        if(FreeScroll._noMore(this))
          FreeScroll._fire('toInfinity', this);
      });
      return arrayResult;
    }

  };

  FreeScroll.prototype = {
    length: 0,

    on: function(eventId, fn){
      if(!eventsCache[eventId]){
        eventsCache[eventId] = [fn];
      }else{
        eventsCache[eventId].push(fn);
      }
    },

    off: function(eventId){

    },

    addEvent: function(type, fn) {
      var _self = this;
      if(isFreeScroll(_self)){
        _self.forEach(function(index, el){
          if (el.attachEvent) {
            el['e'+type+fn] = fn;
            el[type+fn] = function(){el['e'+type+fn](window.event);}
            el.attachEvent('on'+type, el[type+fn]);
          } else
            el.addEventListener(type, fn, false);
        });
      }
    },

    removeEvent: function(type, fn) {
      var _self = this;
      if(isFreeScroll(_self)){
        _self.forEach(function(index, el){
           if (el.detachEvent) {
            el.detachEvent('on'+type, el[type+fn]);
            el[type+fn] = null;
          } else
            el.removeEventListener(type, fn, false);
        });
      }
     
    },

    forEach: function(callback) {
      var _self = this;
      for (var i = 0; i < _self.length; i++) {
        callback(i, _self[i]);
      };
    }

  };

  FreeScroll._fire = function(eventId){
    var args = [].slice.call(arguments, 1);

    if(!eventsCache[eventId]){
      eventsCache[eventId] = [];
    }

    for (var i = 0, il = eventsCache[eventId].length; i < il; i++) {
      eventsCache[eventId][i].apply(null, args);
    };
  };

  FreeScroll._noMore = function(el){
    return el.scrollHeight - el.scrollTop === el.clientHeight;
  };

  FreeScroll.fn = FreeScroll.prototype;

  FreeScroll.prototype.splice = splice;

  // expose to global object
  window.FreeScroll = window.FS = FreeScroll;
}(window));
