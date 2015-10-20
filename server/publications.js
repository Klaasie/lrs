Meteor.publish('stores', function() {

	if(Roles.userIsInRole(this.userId, 'admin')) {
		return Stores.find({});
	}

	return Stores.find({ users: this.userId });
});

Meteor.publish('store', function (id) {
	check(id, String);

	return Stores.find({_id: id});
});

Meteor.publish("users", function () {
	return Meteor.users.find({});
});

Meteor.publish("statements", function (storeId){
	check(storeId, String);

	var store = Stores.findOne(storeId);

	if(store.statements !== undefined) {
		return Statements.find({},{_id: {$in: store.statements}});
	}

	return this.ready();
});