textselect.js
=============

`textselect.js` is a simple script that depends on jQuery and adds a
`textselect` event to the document that triggers whenever any text is selected.

This event will contain information about the selected text in the form of
an object:

+ Text: the selected text content
+ Top: the top offset of the selection relative to the viewport
+ Bottom: the bottom offset
+ Left: the left offset
+ Right: the right offset
+ Width: the width of the selection in pixels
+ Height: the height of the selection in pixels

## How to use `textselect.js`

Using `textselect.js` is simple. Just add an event listener to the element
you want to listen on:

```javascript
$(function() {
  $('#my-element').on('textselect', function(e, selection) {
    alert(selection.text);
  });
});
```

You're of course going to need to make sure that jQuery is loaded on the page
first.

## Why is this useful?

Why isn't it useful? Here's an example of it's use: http://codepen.io/declandewet/full/kuohv

## Known Issues

If any of the following issues bother you, but you are eager for them to be fixed,
you are more than welcome to submit a pull request or discuss them on the issues page.

1. Selecting text, unselecting it and then selecting the exact same text doesn't
  trigger the event.
  + This is being worked on. In the meantime, it is potentially trivial to simply
    cache the last known selection's information and use that.
2. Coordinates and size are returning `undefined` in browser <x>
  + This is because `getBoundingClientRect()` won't work on `window.getSelection.`
    Research is being done on alternative methods for other browsers.
3. This doesn't work with my module system
  + This is because the script checks for the presence of `$` on the `window` object.
    This will be changed in a later commit, but the way it works is fine for now,
    as I do not consider this script to be stable just yet.
