Template.sidemenu.events({
	"click .toggle-menu": function(event){
		event.preventDefault();
	}
});

Template.sidemenu.rendered = function(){
	$(".toggle-menu").sideNav({
		edge: 'left',
		closeOnClick: true
	});
}