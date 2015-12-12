Template.dashboard.events({
	// Events
});

Template.dashboard.rendered = function() {
	var self = this;

	// Check if  there are stores
	var StoresCount = Stores.find({}).count();

	if( StoresCount == 0 ){
		Session.set('messages', {"content": "No Learning Record Stores found.", "type": "error"});
	}

	// Subscriptions
	self.autorun(function(){
		var user = Meteor.user();
      	return self.subscribe('stores', user);
	});
}