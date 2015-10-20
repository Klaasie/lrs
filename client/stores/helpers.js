Template.stores.helpers({
	stores: function() {
		return Stores.find({}, { sort: { createdAt: 1 } });
	},
	statusClass: function() {
		var user = Meteor.user();

		if(user.profile.activeStore == this._id){
			return "green white-text";
		}

		return "";
	},
	status: function() {
		var user = Meteor.user();

		if(user.profile.activeStore == this._id){
			return "Active";
		}

		return "Inactive";
	}
});