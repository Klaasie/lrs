Stores = new Mongo.Collection("stores");

Stores.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 100
	},
	description: {
		type: String,
		label: "Description",
		max: 1000
	},
	userId: {
		type: String,
		autoform: {
			type: "hidden",
			label: false
		},
		autoValue: function() {
			if (this.isInsert) {
				return this.userId
			}
		}
	},
	users: {
		type: Object,
		optional: true
	},
	'users.$': {
		type: String
	},
	statements: {
		type: Object,
		optional: true
	},
	'statements.$': {
		type: String
	}
}));