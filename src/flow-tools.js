var sketch = require('sketch')
// documentation: https://developer.sketchapp.com/reference/api/
// var sketch = context.api()
const doc = sketch.getSelectedDocument()
const Text = require('sketch/dom').Text

export default function() {

  const selection = doc.selectedLayers

  selection.forEach((selected) => {
    var artboardName = selected.name
    var artboardWidth = selected.frame.width


    // Create new text layer: here's where I make it fixedWidth and bottom aligned
    var newText = new Text({
      parent: context.document.currentPage(),
      text: artboardName,
      name: artboardName,
      style:{
        fontFamily: "Bogle",
        fontWeight: "Regular",
        fontSize: "14",
        alignment: "left",
        textColor: '#000000'
      },
      frame: {width: artboardWidth, height: 100}
    });

    // Set Fixed height/width (setTextBehaviour(2)) and bottom alignment
    newText.sketchObject.setTextBehaviour(2)
    newText.style.verticalAlignment = Text.VerticalAlignment.bottom

    // Left align text box with artboard
    selected.selected = true
    newText.selected = true

    // Vertical position of the text layer with the artboard
    newText.frame.y = selected.frame.y - 116
    newText.frame.x = selected.frame.x

  })

  doc.sketchObject.inspectorController().reload()

}
