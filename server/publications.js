Meteor.publish('stores', function () {
	return Stores.find({});
});

Meteor.publish("users", function () {
    return Meteor.users.find({});
});

Meteor.publish("statements", function (storeId){
	check(storeId, String);

	var store = Stores.findOne(storeId);

	return Statements.find({_id: {$in: store.statements}});
});