(function(exports) {
  'use strict';

  var formatXHRQuoteToArray = function(xhrResponse) {
    return xhrResponse.slice(2,-2).removeCurlyQuotes().split(' ');
  };

  String.prototype.removeCurlyQuotes = function() {
    return this.replace(/[\u2018\u2019]/g, '\'').replace(/[\u201C\u201D]/g, '"');
  };

  var displayWords = function(wordsArray) {
    wordsArray.forEach(function(word, index) {
      document.getElementById('paragraph').insertAdjacentHTML('beforeEnd','<span ' + 'id="' + index + '">' + word + ' </span>');
    });
  };

  var markWordAsTyped = function(wordsToType, completedWords){
    document.getElementById(completedWords.length).style.color='rgb(234, 234, 234)';
    completedWords.push(wordsToType[completedWords.length]);
  };

  var markWordAsIncorrect = function(wordsToType, completedWords){
    document.getElementById(completedWords.length).style.color='rgb(189, 57, 57)';
  };

  var assessWord = function(word, target) {
    return word === target;
  };

  var evaluateKeypress = function(keypress, wordsToType, completedWords, userInput) {
    if (keypress === 32) {
      if (assessWord(userInput.value, wordsToType[completedWords.length])) {
        markWordAsTyped(wordsToType, completedWords);
        userInput.value = '';
      } else {
        markWordAsIncorrect(wordsToType, completedWords);
      }
      if (completedWords.length === wordsToType.length) {
        stopTimer(completedWords.join(' ').length);
      }
    }
  };
  var removeInitialWhitespace = function(userInput) {
    if (userInput.value === ' ') {
      userInput.value = '';
    }
  };

  exports.formatXHRQuoteToArray = formatXHRQuoteToArray;
  exports.displayWords = displayWords;
  exports.markWordAsTyped = markWordAsTyped;
  exports.markWordAsIncorrect = markWordAsIncorrect;
  exports.assessWord = assessWord;
  exports.evaluateKeypress = evaluateKeypress;
  exports.removeInitialWhitespace = removeInitialWhitespace;
}(this));
