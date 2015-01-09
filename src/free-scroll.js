(function (window) {
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
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
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

    this.options = FreeScroll._updateOptions(defaults, selector);

    if (this.options.selector) {
      var arrayResult = push.apply(this, slice.call(document.querySelectorAll(this.options.selector))),
      self = this;
      infinity = function(){
        if(FreeScroll._noMore(this, self.options.distance)){
          var request;
          if(self.options.requestData.urlFormat !== '' && !self.finished){
            request = FreeScroll.xhr(self.options.requestData);
            request.error(function(error){
              self.finish(error);
            });
          }
          FreeScroll._fire(EVENT_TO_INFINITY, self, this, request);
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
      if(!eventsCache[FreeScroll._genEventId(this.options.selector, eventId)]){
        eventsCache[FreeScroll._genEventId(this.options.selector, eventId)] = [fn];
      }else{
        eventsCache[FreeScroll._genEventId(this.options.selector, eventId)].push(fn);
      }
    },

    off: function(eventId){
      if(eventsCache[FreeScroll._genEventId(this.options.selector, eventId)]){
        delete eventsCache[FreeScroll._genEventId(this.options.selector, eventId)];
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

  FreeScroll._fire = function(eventId, self){
    var args = [].slice.call(arguments, 2);

    if(!eventsCache[FreeScroll._genEventId(self.options.selector, eventId)]){
      eventsCache[FreeScroll._genEventId(self.options.selector, eventId)] = [];
    }

    for (var i = 0, il = eventsCache[FreeScroll._genEventId(self.options.selector, eventId)].length; i < il; i++) {
      eventsCache[FreeScroll._genEventId(self.options.selector, eventId)][i].apply(null, args);
    }
  };

  FreeScroll._noMore = function(el, startFrom){
    return el.scrollHeight - (el.scrollTop + startFrom) <= el.clientHeight;
  };

  FreeScroll._genEventId = function(objectId, eventId){
    return objectId+'_'+eventId;
  };

  FreeScroll._updateOptions = function(defaultOptions, userOptions){
    var options = defaultOptions;
    if(typeof userOptions === 'object'){
      for(var prop in defaultOptions){
        if(defaultOptions.hasOwnProperty(prop) && toType(defaultOptions[prop]) !== 'object' && defaultOptions[prop] !== userOptions[prop]){
          options[prop] = userOptions[prop] || defaultOptions[prop];
        }else if(defaultOptions.hasOwnProperty(prop) && typeof defaultOptions[prop] === 'object'){
          options[prop] = FreeScroll._updateOptions(defaultOptions[prop], userOptions[prop]);
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

  window.FreeScroll = window.FS = FreeScroll;
}(window));
