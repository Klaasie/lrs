Template.storeOverview.helpers({
	statementsCount: function(){
		if(typeof this.statements != "undefined"){
			return this.statements.length;
		} else {
			return 0;
		}
	},
	statementsLastWeek: function(){
		// Get one week ago
		var oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		
		// Query amount
		var statementsCount = Statements.find({ _id: { $in: this.statements } , stored: {$gt: oneWeekAgo.toISOString()} }).count();

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
	},
	activityCount: function() {

		if(this.statements !== undefined){
			// Retrieve statements
			var statements = Statements.find({ _id: { $in: this.statements } }).fetch();

			// Group them by object.id (the unique identifier)
			var grouped = _.countBy(statements, function(statement){
				return statement.object.id;
			})

			// Return count
			return Object.keys(grouped).length;
		}

		return 0;
	},
	activeActivities: function() {

		if(this.statements !== undefined){
			// Get one week ago
			var oneWeekAgo = new Date();
			oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

			// Retrieve statements
			var statements = Statements.find({ _id: { $in: this.statements }, stored: {$gt: oneWeekAgo.toISOString()} }).fetch();

			// Group them by object.id (the unique identifier)
			var grouped = _.countBy(statements, function(statement){
				return statement.object.id;
			})

			// Return count
			return Object.keys(grouped).length;
		}

		return 0;
	}
});