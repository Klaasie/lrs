/**
 * Client side security
 */
Stores.permit('insert').apply();
Secrets.permit('insert').apply();

/**
 * Security settings for REST API
 * @TODO  Posts.permit('update').ifLoggedIn().exceptProps(['author', 'date']).apply();
 */
Stores.permit('update').apply();
Meteor.users.permit('update').apply();
Statements.permit('insert').apply();