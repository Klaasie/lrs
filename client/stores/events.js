Template.stores.events({
	"click #openModal": function(event){
		event.preventDefault()
		$('#addStore').openModal();
	},
	"click .collection-item": function(event){
		event.preventDefault();
		Router.go('/store/' + this._id);
	},
	"click .editStore": function(event){
		event.preventDefault();
		event.stopPropagation(); // Prevent going to the store
	},
	"click #activate": function(event){
		event.preventDefault();
		event.stopPropagation(); // Prevent going to the store

		Meteor.call('activateStore', this._id);
		Materialize.toast('Store activated!', 4000);
	},
	"click .storesActivate": function(event){
		event.preventDefault();
		event.stopPropagation(); // Prevent going to the store

		Meteor.call('activateStore', this._id);
		Materialize.toast('Store activated!', 4000);
	},
	"click .storesEdit": function(event){
		event.preventDefault();
		event.stopPropagation(); // Prevent going to the store

		//Meteor.call('activateStore', this._id);
	},
	"click .storesRemove": function(event){
		event.preventDefault();
		event.stopPropagation(); // Prevent going to the store

		//Meteor.call('activateStore', this._id);
	}
});

Template.stores.rendered = function(){
	$('.editStore').dropdown({
		constrainwidth: false,
		beloworigin: true,
		alignment: "right",
		closeOnClick: true
	});
}