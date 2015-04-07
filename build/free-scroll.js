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

(function (root, factory) {
    root.xhr = factory();
})(FreeScroll || {}, function () {
  'use strict';
  FreeScroll.fn.requestCount = 0;

  return function (context) {
    var methods = {
      success: function () {},
      error: function () {}
    },
    helper = FreeScroll.helper,
    XHR = XMLHttpRequest || ActiveXObject,
    request = new XHR('MSXML2.XMLHTTP.3.0'),
    requestConfig = context.options.requestData;
    context.requestCount += 1;

    request.open('GET', requestConfig.urlFormat.format(requestConfig.pageNumber, requestConfig.pageSize));
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          methods.success.apply(methods, helper.parseJSON(request));
          requestConfig.pageNumber += 1;
          if(requestConfig.maxItems > -1 && requestConfig.maxItems <= (context.requestCount * requestConfig.pageSize)){
            context.finish('Reached maxItems to show');
          }
        } else {
          methods.error.apply(methods, helper.parseJSON(request));
          context.finish('Errored: status code = ' + request.status);
        }
      }
    };
    request.send();
    return {
      success: function (callback) {
        methods.success = callback;
        return methods;
      },
      error: function (callback) {
        methods.error = callback;
        return methods;
      }
    };
  };
});
if (!String.prototype.format) {
	String.prototype.format = function() {
	  var args = arguments;
	  return this.replace(/{(\d+)}/g, function(match, number) { 
	    return typeof args[number] !== 'undefined' ? args[number] : match;
	  });
	};
}

(function(root, factory){
    root.helper = factory();
})(FreeScroll || {}, function () {
	'use strict';
	var helper = {
		typeOf : function(obj) {
			var type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

			// PHANTOMJS bug
			if ('domwindow' === type) {
				if ('object' === typeof obj) {
			    	type = 'null';
			    } else if ('undefined' === typeof obj) {
			    	type = 'undefined';
			    }
			}

			return type;
		},
		parseJSON : function (req) {
		    var result;
		    try {
		      result = JSON.parse(req.responseText);
		    } catch (e) {
		      result = req.responseText;
		    }
		    return [result, req];
		},
		ready: function (fn) {
	      if (/complete/.test(document.readyState)) {
	        fn();
	      } else {
	        document.addEventListener('DOMContentLoaded', function () {
	          fn();
	        }, false);
	      }
	    }
	};

	return helper;
});