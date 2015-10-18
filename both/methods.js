/**
 * xAPI Statement methods
 */
Meteor.methods({
	saveStatement: function(data){
		// Retrieve store
		var store = Stores.find({
			_id: data.user.profile.activeStore
		}).fetch();
		store = store[0];	

		if(store.length == 0 || typeof store == "undefined"){
			// Not part of any learning record store.
			data.response.statusCode = 200;
			data.response.success = false;
			data.response.message = "You are not part of any learning record store";
		}

		// I think we have all the necessary information

		// Statements should live on their own, therefore
		// no information is added about LRS or user
		var statementId = Statements.insert(data.statement);

		// Instead we save statementid connection to the store
		Stores.update(store._id, {
			$push: {
				statements: statementId
			}
		}, function(error, count){
			if(error){
				
			}
		});

		// And at the user
		Meteor.users.update(data.user._id, {
			$push: {
				statements: statementId
			}
		},function(error, count){
			
		});

		data.response.statusCode = 200;
		data.response.success = true;
		data.response.message = "Statement added!";

		return data.response;
	},
	'activateStore': function(storeId) {
		var user = Meteor.user();

		Meteor.users.update({_id: user._id}, { $set: { "profile.activeStore": storeId } });
	}
});