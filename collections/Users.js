Meteor.users.helpers({
	fullName: function(){
		if(typeof this.profile == "undefined"){
			return this.emails[0].address;
		}

		return this.profile.firstname + ' ' + this.profile.lastname;
	}
});