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