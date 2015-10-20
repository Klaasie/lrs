Template.storeOverview.helpers({
	statementsCount: function(){
		if(typeof this.statements !== "undefined"){
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
		if(typeof this.statements !== "undefined"){
			return Statements.find({ _id: { $in: this.statements } , stored: {$gt: oneWeekAgo.toISOString()} }).count();
		}else{
			return 0;
		}

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


		if(statementIds.length > 0){
			return Meteor.users.find({statements: {$in: statementIds}}).count();
		}else{
			return 0;
		}
	},
	activityCount: function() {

		if(typeof this.statements !== "undefined"){
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

		if(typeof this.statements !== "undefined"){
			// Get one week ago
			var oneWeekAgo = new Date();
			oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

			// Retrieve statements
			if(typeof this.statements !== undefined){
				var statements = Statements.find({ _id: { $in: this.statements }, stored: {$gt: oneWeekAgo.toISOString()} }).fetch();

				// Group them by object.id (the unique identifier)
				var grouped = _.countBy(statements, function(statement){
					return statement.object.id;
				})

				// Return count
				return Object.keys(grouped).length;
			}
		}

		return 0;
	}
});