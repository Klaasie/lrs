Template.sidemenu.events({
    "click .toggle-menu": function(event){
        event.preventDefault();
    },
    "click #dashboard": function(event){
        event.preventDefault();
        $('.ui.sidebar').sidebar('toggle');
        FlowRouter.go('/dashboard');
    },
    "click #stores": function(event){
        event.preventDefault();
        $('.ui.sidebar').sidebar('toggle');
        FlowRouter.go('/stores');
    },
    "click #logout": function(event){
        event.preventDefault();
        $('.ui.sidebar').sidebar('toggle');
        $('body').removeClass('pushable');
        Meteor.logout();
    }
});

Template.sidemenuOnScreen.events({
    "click .toggle-menu": function(event){
        event.preventDefault();
    },
    "click #dashboard": function(event){
        event.preventDefault();
        FlowRouter.go('/dashboard');
    },
    "click #stores": function(event){
        event.preventDefault();
        FlowRouter.go('/stores');
    },
    "click #logout": function(event){
        event.preventDefault();
        $('body').removeClass('pushable');
        Meteor.logout();
    }
});