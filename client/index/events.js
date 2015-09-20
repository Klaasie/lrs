Template.index.events({
	"click #login": function(event){
		event.preventDefault();
		Router.go('login');
	}
})

Template.index.rendered = function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
}