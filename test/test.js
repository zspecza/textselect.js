$(function(){
  $('#test').on('textselect', function(e, selection) {
    var t = "<p>Top: " + selection.top + "</p>",
        b = "<p>Bottom: " + selection.bottom + "</p>",
        l = "<p>Left: " + selection.left + "</p>",
        r = "<p>Right: " + selection.right + "</p>",
        w = "<p>Width: " + selection.width + "</p>",
        h = "<p>Height: " + selection.height + "</p>",
        tx = "<p>Text: " + selection.text + "</p>",
        el = "<p>Triggered By: (element): " +
             selection.triggeredBy.element.get(0).nodeName.toLowerCase() +
             " and (event): " + selection.triggeredBy.eventType +
             "</p>";
    $('#output').html(t+b+l+r+w+h+tx+el);
  });
});
