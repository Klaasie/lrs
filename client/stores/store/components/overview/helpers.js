Template.storeOverview.helpers({
	statementsCount: function(){
		return this.statements.length;
	},
	statementsLastWeek: function(){
		// Get one week ago
		var oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		
		// Query amount
		var statementsCount = Statements.find({stored: {$gt: oneWeekAgo.toISOString()}}).count();

		// Return it
		return statementsCount;
	},
	usersCount: function() {
		return this.users.length;
	},
	activeUsers: function() {
		// Get one week ago
		var oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		
		// Query amount
		var statementIds = Statements.find({stored: {$gt: oneWeekAgo.toISOString()}}).map(function(item){ return item._id; });

		var userCount = Meteor.users.find({statements: {$in: statementIds}}).count();

		return userCount;
	}
});