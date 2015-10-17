Template.notFound.events({
	"click #toDashboard": function(event){
		event.preventDefault();

		Router.go('/dashboard');
	}
});