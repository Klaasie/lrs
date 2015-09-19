Template.sidemenu.helpers({
	userId: function(){
		return Meteor.userId();
	},
	fullname: function(){
		return Meteor.user().fullName();
	}
})