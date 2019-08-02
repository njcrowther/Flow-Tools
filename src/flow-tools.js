var sketch = require('sketch')
// documentation: https://developer.sketchapp.com/reference/api/
// var sketch = context.api()
const doc = sketch.getSelectedDocument()
const Text = require('sketch/dom').Text

export default function() {

  const selection = doc.selectedLayers

  selection.forEach((selected) => {
    var artboardName = selected.name
    var artboardWidth = selected.width

    // sketch.UI.message("Program gets here")

    // Create new text layer: here's where I make it fixedWidth and bottom aligned
    try {
      var newText = new Text({
        parent: context.document.currentPage(),
        text: artboardName,
        name: artboardName,
        // fixedWidth: true,
        style:{
          alignment: "left",
          // verticalAlignment: 3,
          textColor: '#000000'
        },
        frame: {width: selected.frame.width, height: 100}
      });
    }
    catch (error) {
      console.error(error)
    }

    newText.sketchObject.setTextBehaviour(2)
    newText.sketchObject.verticalAlignment = 3


    // // Set Width and position of text layer, and align it with artboard
    // newText.frame.width = selected.frame.width
    // newText.frame.height = 100
    //
    // newText.style.verticalAlignment = 1
    // newText.fixedWidth = true
    // newText.frame.height = 100
    // newText.style.verticalAlignment = 3



    selected.selected = true
    newText.selected = true

    actionWithType(context, "MSAlignLayersLeftAction").doPerformAction(nil);

    newText.frame.y = selected.frame.y - 148


  })

  doc.sketchObject.inspectorController().reload()

}


function actionWithType(context,type) {
	var controller = context.document.actionsController();

	if (controller.actionWithName) {
		return controller.actionWithName(type);
	} else if (controller.actionWithID) {
		return controller.actionWithID(type);
	} else {
		return controller.actionForID(type);
	}
}

// See text style code:
// console.log(JSON.stringify(selection))

// console.log("Artboard's y is: " + selected.frame.y)
// console.log("newText's y is: " + newText.frame.y)


// console.log("Style is:" + JSON.stringify(newText.style))
// console.log("FixedWidth is:" + newText.fixedWidth)
// console.log("VerticalAlignment is: " + newText.style.verticalAlignment)
