$(function(){
  $('#test').on('textselect', function(e, selection) {
    var t = "<p>Top: " + selection.top + "</p>",
        b = "<p>Bottom: " + selection.bottom + "</p>",
        l = "<p>Left: " + selection.left + "</p>",
        r = "<p>Right: " + selection.right + "</p>",
        w = "<p>Width: " + selection.width + "</p>",
        h = "<p>Height: " + selection.height + "</p>",
        tx = "<p>Text: " + selection.text + "</p>";
    $('#output').html(t+b+l+r+w+h+tx);
  });
});
