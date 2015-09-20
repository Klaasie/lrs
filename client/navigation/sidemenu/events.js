Template.sidemenu.events({
	"click .toggle-menu": function(event){
		event.preventDefault();
	},
	"click #dashboard": function(event){
		event.preventDefault();
		$(".toggle-menu").sideNav('hide');
		Router.go('/dashboard');
	},
	"click #stores": function(event){
		event.preventDefault();
		$(".toggle-menu").sideNav('hide');
		Router.go('/stores');
	},
	"click #logout": function(event){
		event.preventDefault();
		$(".toggle-menu").sideNav('hide');
		Meteor.logout();
	}
});

Template.sidemenu.rendered = function(){
	$(".toggle-menu").sideNav({
		edge: 'left',
		// closeOnClick: true
	});
}