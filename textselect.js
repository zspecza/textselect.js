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

}).call(this);
