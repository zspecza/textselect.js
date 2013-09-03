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
    }
  }).apply(this);

  // the below 3 variables are used to prevent triggering the event
  // when selected text is deselected on mouse click, as well as to
  // ensure that text is actually selected before triggering the event

  // stores selection text content
  var selectionText = '',
  // used to determine active state of selection
  isTextSelected = false,
  // used to ensure current selection content is not same as the previous one
  previousSelection;

  /**
   * @function triggerSelectedTextEvent
   * @param  {Object} $el [a jQuery element object]
   * @returns nothing
   *
   * Determines current state of the selection and triggers the `textselect`
   * event on the element passed to it
   */
  var triggerSelectedTextEvent = function($el) {

    // get the selection text
    selectionText = getSelectedTextContent();

    // store the selection coords/size in this
    var selectionInformation;

    // sugary syntax for easy reading
    var selectionNotEmpty = (selectionText !== ''),
        uniqueSelection = (selectionText !== previousSelection);

    // we do not want to trigger the `textselect` event if the selection
    // is empty, if the user is clicking off a selection, or if the user
    // is clicking on a selection to unselect it
    if (selectionNotEmpty && uniqueSelection) {

      // get the coordinates and size of the selection
      selectionInformation = getSelectionInformation();

      // trigger the event
      $el.trigger('textselect', {
        top: selectionInformation.top,
        bottom: selectionInformation.bottom,
        left: selectionInformation.left,
        right: selectionInformation.right,
        width: selectionInformation.width,
        height: selectionInformation.height,
        text: selectionText
      });

    }

    // store the most recent selection for the next check
    previousSelection = selectionText;

    // reset selection content
    selectionText = '';

  };

}).call(this);
