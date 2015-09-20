Template.dashboard.events({
	// Events
});

Template.dashboard.rendered = function() {
	// Check if  there are stores
	var StoresCount = Stores.find({}).count();

	if( StoresCount == 0 ){
		Session.set('messages', {"content": "No Learning Record Stores found.", "type": "error"});
	}
}