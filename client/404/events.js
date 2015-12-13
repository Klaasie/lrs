Template.notFound.events({
    "click #toDashboard": function(event){
        event.preventDefault();

        FlowRouter.go('/dashboard');
    }
});