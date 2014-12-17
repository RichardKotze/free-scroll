'use strict';

(function (window) {
  var document = window.document,
    // helper methods
    push = [].push,
    slice = [].slice,
    splice = [].splice,
    eventsCache = {},
    defaults = {
      selector: null,
      distance: 100,
      requestDataUrl: null,
      templateUrl: null
    };

  function isFreeScroll(obj){
    return obj instanceof FreeScroll;
  }

  function forEach(arr, fn){
    for (var i = 0; i < arr.length; i++) {
      fn(i, arr[i]);
    };
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

    var options = FreeScroll._updateOptions(defaults, selector);

    if (options.selector) {
      var arrayResult = push.apply(this, slice.call(document.querySelectorAll(options.selector)));
      this.addEvent('scroll', function(){
        if(FreeScroll._noMore(this, options.distance))
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
      this.forEach(function(index, el){
        if (el.attachEvent) {
          el['e'+type+fn] = fn;
          el[type+fn] = function(){el['e'+type+fn](window.event);}
          el.attachEvent('on'+type, el[type+fn]);
        } else
          el.addEventListener(type, fn, false);
      });
    },

    removeEvent: function(type, fn) {
      this.forEach(function(index, el){
         if (el.detachEvent) {
          el.detachEvent('on'+type, el[type+fn]);
          el[type+fn] = null;
        } else
          el.removeEventListener(type, fn, false);
      });
    },

    forEach: function(fn) {
      var _self = this;
      forEach(_self, fn);
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

  FreeScroll._noMore = function(el, startFrom){
    return el.scrollHeight - (el.scrollTop + startFrom) <= el.clientHeight;
  };

  FreeScroll._updateOptions = function(defaultOptions, userOptions){
    if(typeof userOptions === 'object'){
      for(var prop in defaultOptions){
        if(userOptions.hasOwnProperty(prop) && defaultOptions[prop] !== userOptions[prop]){
          defaultOptions[prop] = userOptions[prop];
        }
      }
    }else if(typeof userOptions === 'string'){
      defaultOptions.selector = userOptions;
    }

    return defaultOptions;
  };

  FreeScroll.fn = FreeScroll.prototype;

  FreeScroll.prototype.splice = splice;

  window.FreeScroll = window.FS = FreeScroll;
}(window));
