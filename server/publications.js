Meteor.publish('stores', function() {
console.log(this);
	if(Roles.userIsInRole(this.userId, 'admin')) {
		return Stores.find({ }, { sort: { createdAt: -1 } });
	}

	return Stores.find({ users: this.userId }, { sort: { createdAt: -1 } });
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