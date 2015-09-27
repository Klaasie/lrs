Secrets = new Mongo.Collection("secrets");

Secrets.attachSchema(new SimpleSchema({
	userid: {
		type: String
	},
	secret: {
		type: String
	}
}));