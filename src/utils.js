if (!String.prototype.format) {
	String.prototype.format = function() {
	  var args = arguments;
	  return this.replace(/{(\d+)}/g, function(match, number) { 
	    return typeof args[number] != 'undefined' ? args[number] : match;
	  });
	};
}

(function(root, factory){
    if(typeof root.FreeScroll !== 'undefined'){
        root.FreeScroll.helpers = factory();
    }
})(this, function () {
	var helpers = {};
	helpers.typeOf = function(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	};

	return helpers;
});