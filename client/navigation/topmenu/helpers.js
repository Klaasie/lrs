Template.topmenu.helpers({
    "rightMenu": function() {
        var name = FlowRouter.getRouteName();
        if(name === "store"){
            return true;
        }
    }
});