Template.storeUsers.helpers({
	users: function (){
		var storeId = FlowRouter.getParam('storeId');
		var store = Stores.findOne(storeId);


		return Meteor.users.find({ _id: { $in: store.users } });
	},
	name: function(){

		var user = Meteor.users.findOne(this.valueOf());

		return user.fullName()
	},
	statementsCount: function(){
		// Retrieve the user
		var user = Meteor.users.findOne(this.valueOf());

		var storeId = FlowRouter.getParam('storeId');
		var store = Stores.findOne(storeId);

		// Find how many statement ids are in both arrays
		// This is how we determine how many statements from the user belong to the store
		var intersection = _.intersection(store.statements, user.statements);

		// Return the count
		return intersection.length;
	}
})