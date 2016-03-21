define(["jquery", "jqueryui", "models/dragItemModel", "collections/dragGroup", "views/dragGroupView", "models/dropItemModel", "collections/dropGroup", "views/dropGroupView"], 
function($, ui, DragItemModel, DragGroup, DragGroupView, DropItemModel, DropGroup, DropGroupView) {    //, "routers/router"
    
    'use strict';

//    // Add your modules routing here
//    router.route("/*", "home", function () {
//        this.loadModule("bundles/todos/main");
//    });
    
    return {
        initialize: function() {

            var dragGroup = new DragGroup();
            dragGroup.add( new DragItemModel({object: "block"}) );
            dragGroup.add( new DragItemModel({object: "block", top: "60"}) );
            var dragGroupView = new DragGroupView( { el: $("#drag-targets"), collection: dragGroup} );

            var dropGroup = new DropGroup();
            dropGroup.add( new DropItemModel({object: "drop here 1"}) );
            dropGroup.add( new DropItemModel({object: "drop here 2"}) );
            dropGroup.add( new DropItemModel({object: "drop here 4"}) );
            var dropGroupView = new DropGroupView( { el: $("#drop-area"), collection: dropGroup} );
            
        }
    };
});