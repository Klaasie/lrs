Meteor.users.helpers({
	fullName: function(){
		return this.profile.firstname + ' ' + this.profile.lastname;
	}
});