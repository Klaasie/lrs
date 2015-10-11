Secrets = new Mongo.Collection("secrets");

Secrets.attachSchema(new SimpleSchema({
	userId: {
		type: String
	},
	secret: {
		type: String
	}
}));