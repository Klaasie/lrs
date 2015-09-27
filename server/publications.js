Meteor.publish('stores', function () {
	return Stores.find({});
});

Meteor.publish("users", function () {
    return Meteor.users.find({});
});