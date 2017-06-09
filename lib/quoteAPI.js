(function(exports) {
  'use strict';

  XMLHttpRequest.prototype.grabARonSwansonQuote = function() {
    this.open('GET', 'https://ron-swanson-quotes.herokuapp.com/v2/quotes', false);
    this.send();
    return this.response;
  };

  exports.XMLHttpRequest = XMLHttpRequest;

})(this);
