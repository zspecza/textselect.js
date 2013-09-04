/*---------------------------------------------------------------------------/
 *
 *  textselect.js
 *
 *  Author: Declan de Wet <declandewet@me.com>
 *  Version: 0.0.1
 *  License: MIT
 *
 *  This script will trigger an event `textselect` when text is highlighted
 *  on the page. It's only dependency is jQuery.
 *
 *--------------------------------------------------------------------------*/

// enclose code in top-level function scope to prevent creation of globals
(function() {

  'use strict';

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
        return window.getSelection().toString();
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
    } else if (document.selection) {
      return function() {
        var rect = document.selection.createRange().getBoundingClientRect(),
            obj = {
              top: rect.top,
              bottom: rect.bottom,
              left: rect.left,
              right: rect.right,
              width: rect.right - rect.left,
              height: rect.bottom - rect.top
            };

        return obj;
      };
    }
  }).apply(this);

  // the below 2 variables are used to prevent triggering the event
  // when selected text is deselected on mouse click, as well as to
  // ensure that text is actually selected before triggering the event

  // stores selection text content
  var selectionText = '',
  // used to ensure current selection content is not same as the previous one
  previousSelection;

  /**
   * @function triggerSelectedTextEvent
   * @param  {Object} $el [a jQuery DOM Element object]
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

      // trigger the event and attach selection object parameters
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

  /**
   * @function attachSelectedTextEvent
   * @param  {Object} event
   *
   * This is a jQuery event callback that listens for mouseup/keyup events and
   * passes an element to triggerSelectedTextEvent which then determines
   * whether or not to trigger a `textselect` event.
   */
  var attachSelectedTextEvent = function(event) {

    var keyup = (event.type === 'keyup'),
        shiftKey = (event.which === 16),
        mouseup = (event.type === 'mouseup'),
        $el = $(event.target);

    // if the event was a keyup, and that key was the shift key,
    // or if the event was a mouseup, call triggerSelectedTextEvent
    // and pass the element the event was triggered on as a parameter
    if ((keyup && shiftKey) || mouseup) {
      triggerSelectedTextEvent($el);
    }

  };

  // check if jQuery is loaded
  if (window.$) {

    // jQuery is loaded, let's wait until the dom is ready...
    $(function() {

      // ...and attach the selected text event listener to the document
      $(document).on('mouseup keyup', attachSelectedTextEvent);

    });

  // uhoh, jQuery isn't loaded.
  } else {

    // we'd better warn the user
    var errorMessage = "textselect.js depends on jQuery in order to " +
                       "function. Please ensure that you have loaded " +
                       "jQuery and that this script is loaded afterwards.";

    throw new Error(errorMessage);

  }

}).call(this);
