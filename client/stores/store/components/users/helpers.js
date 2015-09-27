Template.storeUsers.helpers({
	name: function(){

		var user = Meteor.users.findOne(this.valueOf());

		return user.fullName()
	},
	statementsCount: function(){
		var user = Meteor.users.findOne(this.valueOf());

		return user.statements.length;
	}
})