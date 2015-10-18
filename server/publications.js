Meteor.publish('stores', function (user) {
	check(user, Object);

	console.log(Roles.userIsInRole(user, 'owner'));

	console.log(user._id);

	return Stores.find({ users: user._id }, { sort: { createdAt: 1 } });
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