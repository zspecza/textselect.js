/*---------------------------------------------------------------------------/
 *
 *  textselect.js
 *
 *  Author: Declan de Wet <declandewet@me.com>
 *
 *  This script will trigger an event `textselect` when text is highlighted
 *  on the page. It's only dependency is jQuery.
 *
 *--------------------------------------------------------------------------*/

// enclose code in top-level function scope to prevent creation of globals
(function() {

  /**
   * @function getSelectedTextContent
   * @return {String} Content within a highlighted selection, if any present.
   *
   * Immediately-invoked self-modifying function.
   * Executes instantly and uses feature detection to determine the text
   * selection method the browser supports, then modifies itself to return
   * the value returned by that method any time it is manually called.
   */
  var getSelectedTextContent = (function() {
    if (window.getSelection) {
      return function() {
        return window.getSelection.toString();
      };
    } else if (document.getSelection) {
      return function() {
        return document.getSelection();
      };
    } else if (document.selection) {
      return function() {
        return document.selection.createRange().text;
      };
    }
  }).apply(this);

  /**
   * @function getSelectionInformation
   * @return {Object} Contains coordinate and size properties of selection.
   *
   * Immediately-invoked self-modifying function.
   * Executes instantly and uses feature detection to determine the
   * method to use to get location and size information about the current
   * selection, if any - then modifes itself to return the output of
   * that method.
   *
   * N.B. - Temporary implementation until more research is done on
   * supporting more browsers.
   */
  var getSelectionInformation = (function(){
    if (window.getSelection) {
      return function() {
        return window.getSelection().getRangeAt(0).getBoundingClientRect();
      };
    } else {
      return function() {
        var message = "Selection coordinates are not supported in this browser";
        throw new Error(message);
      };
    }
  }).apply(this);

}).call(this);
