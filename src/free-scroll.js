(function(root, factory){
  root.FreeScroll = root.FS = factory(root);
})(this, function (root) {
  'use strict';
  var document = window.document,
    // helper methods
    push = [].push,
    slice = [].slice,
    splice = [].splice,
    eventsCache = {},
    defaults = {
      selector: null,
      distance: 100,
      requestData: {
        urlFormat: null,
        pageNumber: 1,
        pageSize: 10
      },
      templateUrl: null
    };
  var EVENT_TO_INFINITY = 'toInfinity';

  var isFreeScroll = function(obj){
    return obj instanceof FreeScroll;
  };

  var forEach = function(arr, fn){
    for (var i = 0; i < arr.length; i++) {
      fn(i, arr[i]);
    }
  };

  var toType = function(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  };

  var infinity = function(){};

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

    this.options = FreeScroll.updateOptions(defaults, selector);

    if (this.options.selector) {
      var arrayResult = push.apply(this, slice.call(document.querySelectorAll(this.options.selector))),
      self = this;
      infinity = function(){
        if(FreeScroll.noMore(this, self.options.distance)){
          var request;
          if(self.options.requestData.urlFormat !== null && !self.finished){
            request = FreeScroll.xhr(self);
          }
          FreeScroll.fire(EVENT_TO_INFINITY, self, this, request);
        }
      };
      self.addEvent('scroll', infinity);
      return arrayResult;
    }

  }

  FreeScroll.prototype = {
    options: {},

    finished: false,

    finish: function(reason){
      this.removeEvent('scroll', infinity);
      this.off(EVENT_TO_INFINITY);
      this.finished = true;
      console.log(reason);
    },

    on: function(eventId, fn){
      if(!eventsCache[FreeScroll.genEventId(this.options.selector, eventId)]){
        eventsCache[FreeScroll.genEventId(this.options.selector, eventId)] = [fn];
      }else{
        eventsCache[FreeScroll.genEventId(this.options.selector, eventId)].push(fn);
      }
    },

    off: function(eventId){
      if(eventsCache[FreeScroll.genEventId(this.options.selector, eventId)]){
        delete eventsCache[FreeScroll.genEventId(this.options.selector, eventId)];
      }
    },

    addEvent: function(type, fn) {
      this.each(function(index, el){
        if (el.attachEvent) {
          el['e'+type+fn] = fn;
          el[type+fn] = function(){
            el['e'+type+fn](window.event);
          };
          el.attachEvent('on'+type, el[type+fn]);
        } else
          el.addEventListener(type, fn, false);
      });
    },

    removeEvent: function(type, fn) {
      this.each(function(index, el){
         if (el.detachEvent) {
          el.detachEvent('on'+type, el[type+fn]);
          el[type+fn] = null;
        } else
          el.removeEventListener(type, fn, false);
      });
    },

    each: function(fn) {
      var self = this;
      forEach(self, fn);
    }

  };

  FreeScroll.fire = function(eventId, self){
    var args = [].slice.call(arguments, 2);

    if(!eventsCache[FreeScroll.genEventId(self.options.selector, eventId)]){
      eventsCache[FreeScroll.genEventId(self.options.selector, eventId)] = [];
    }

    for (var i = 0, il = eventsCache[FreeScroll.genEventId(self.options.selector, eventId)].length; i < il; i++) {
      eventsCache[FreeScroll.genEventId(self.options.selector, eventId)][i].apply(null, args);
    }
  };

  FreeScroll.noMore = function(el, startFrom){
    return el.scrollHeight - (el.scrollTop + startFrom) <= el.clientHeight;
  };

  FreeScroll.genEventId = function(objectId, eventId){
    return objectId+'_'+eventId;
  };

  FreeScroll.updateOptions = function(defaultOptions, userOptions){
    var options = JSON.parse(JSON.stringify(defaultOptions));//clone defaultOptions (no functions allowed)
    if(typeof userOptions === 'object'){
      for(var prop in defaultOptions){
        if(defaultOptions.hasOwnProperty(prop) && toType(defaultOptions[prop]) !== 'object' && defaultOptions[prop] !== userOptions[prop]){
          options[prop] = userOptions[prop] || defaultOptions[prop];
        }else if(defaultOptions.hasOwnProperty(prop) && typeof defaultOptions[prop] === 'object'){
          options[prop] = FreeScroll.updateOptions(defaultOptions[prop], userOptions[prop]);
        }else{
          options[prop] = defaultOptions[prop];
        }
      }
    }else if(typeof userOptions === 'string'){
      options = defaultOptions;
      options.selector = userOptions;
    }

    return options;
  };

  FreeScroll.fn = FreeScroll.prototype;

  FreeScroll.prototype.splice = splice;

  return FreeScroll;
});
