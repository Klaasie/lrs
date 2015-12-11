Template.index.events({
	"click #login": function(event){
		event.preventDefault();
		FlowRouter.go('login');
	},
	"click #menu-login": function(event){
		event.preventDefault();
		FlowRouter.go('login');
	},
	"click #start-app": function(event){
		event.preventDefault();
		FlowRouter.go('login');
	}
})

Template.index.rendered = function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
}