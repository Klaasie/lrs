Meteor.startup(function(){
	var user = Meteor.users.findOne("GLm47HTJDSW8bnZNC");
	if (user) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(user, ['admin']);
    }
});