;(function(root, factory){
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals (root is window)
    root.FreeScroll = factory();
  }
})(this, function () {
  'use strict';
  var document = window.document,
    push = [].push,
    slice = [].slice,
    defaults = {
      selector: null,
      distance: 100,
      requestData: {
        urlFormat: null,
        pageNumber: 1,
        pageSize: 10,
        maxItems: -1
      },
      templateUrl: null
    },
    instanceIds = [], 
    instanceEventRef = {};

  var uniqueId = function(){
    var prefix = 'freeScroll',
    newInstanceId = prefix + '_' + (instanceIds.length + 1);
    instanceIds.push(newInstanceId);
    return newInstanceId;
  };

  var isFreeScroll = function(obj){
    return obj instanceof FreeScroll;
  };

  var Promises = function(){
    this.more = function(){};
  };

  var forEach = function(arr, fn){
    for (var i = 0; i < arr.length; i++) {
      fn(i, arr[i]);
    }
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
    this.promise = new Promises();
    this.instanceId = uniqueId();

    if (this.options.selector) {
      var elementList = document.querySelectorAll(this.options.selector);
      if(FreeScroll.helper.typeOf(elementList) === 'nodelist' && elementList.length > 0){
        var arrayResult = push.apply(this, slice.call(elementList)),
        $this = this;
        infinity = function(){
          var el = this;
          if(FreeScroll.noMore(el, $this.options.distance)){
            var request;
            if($this.options.requestData.urlFormat !== null && !$this.finished){
              request = FreeScroll.xhr($this);
            }
            $this.promise.more.call($this, el, request);
          }
        };
        $this.addEvent('scroll', infinity);

        FreeScroll.helper.ready(function(){
          infinity.call($this[0]);
        });

        return arrayResult;
      }else{
        new Error('Element(s) not found');
      }
      return;
    }

  }

  FreeScroll.prototype = {
    options: {},

    finished: false,

    finish: function(reason){
      this.removeEvent('scroll', infinity);
      this.finished = true;
      console.log(reason);
    },

    more: function(fn){
      this.promise.more = fn;
    },

    addEvent: function(type, fn) {
      var $this = this;
      instanceEventRef[$this.instanceId] = fn;
      $this.each(function(index, el){
        if (el.attachEvent) {
          el['e'+type+instanceEventRef[$this.instanceId]] = instanceEventRef[$this.instanceId];
          el[type+instanceEventRef[$this.instanceId]] = function(){
            el['e'+type+instanceEventRef[$this.instanceId]](window.event);
          };
          el.attachEvent('on'+type, el[type+instanceEventRef[$this.instanceId]]);
        }else{
          el.addEventListener(type, instanceEventRef[$this.instanceId], false);
        }
      });
    },

    removeEvent: function(type, fn) {
      var $this = this;
      $this.each(function(index, el){
         if (el.detachEvent) {
          el.detachEvent('on'+type, el[type+instanceEventRef[$this.instanceId]]);
          el[type+instanceEventRef[$this.instanceId]] = null;
        }else{
          el.removeEventListener(type, instanceEventRef[$this.instanceId], false);
        }
      });

      delete instanceEventRef[$this.instanceId];
    },

    each: function(fn) {
      var $this = this;
      forEach($this, fn);
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
        if(defaultOptions.hasOwnProperty(prop) && FreeScroll.helper.typeOf(defaultOptions[prop]) !== 'object' && defaultOptions[prop] !== userOptions[prop]){
          options[prop] = userOptions[prop] !== null && FreeScroll.helper.typeOf(userOptions[prop]) !== 'undefined' ? userOptions[prop] : defaultOptions[prop];
        }else if(defaultOptions.hasOwnProperty(prop) && FreeScroll.helper.typeOf(defaultOptions[prop]) === 'object'){
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

  return FreeScroll;
});
