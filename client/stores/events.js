Template.stores.events({
	"click #openModal": function(event){
		event.preventDefault()
		$('#addStore').openModal();
	},
	"click #goStore": function(event){
		event.preventDefault();
		Router.go('/store/' + this._id);
	}
});