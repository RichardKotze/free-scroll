(function (root, factory) {
    root.FreeScroll.xhr = root.FS.xhr = factory(root);
})(this, function (root) {

  'use strict';

  var parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  };

  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  }

  

  return function (context) {
    var methods = {
      success: function () {},
      error: function () {}
    },
    XHR = root.XMLHttpRequest || ActiveXObject,
    request = new XHR('MSXML2.XMLHTTP.3.0'),
    requestConfig = context.options.requestData;

    request.open('GET', requestConfig.urlFormat.format(requestConfig.pageNumber, requestConfig.pageSize));
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          requestConfig.pageNumber += 1;
          methods.success.apply(methods, parse(request));
        } else {
          methods.error.apply(methods, parse(request));
          context.finish();
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