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