Meteor.startup(function(){

    // For install
    var usersCount = Meteor.users.find().count();
    if(usersCount == 0){
        // Generate secret
        var secret = 'admin@lrs.nl:1@Password';
        var secretArray = CryptoJS.enc.Utf8.parse(secret);
        var secretBase64 = CryptoJS.enc.Base64.stringify(secretArray);

        // Insert key
        Secrets.insert({
            userId: "empty",
            secret: secretBase64
        });

        /**
         * Create admin user
         */
        var userId = Accounts.createUser({
            username: "admin",
            email: "admin@lrs.nl",
            password: "1@Password",
            profile: {
                firstname: "Admin",
                lastname: "User"
            }
        });
    
        // Give role
        var user = Meteor.users.findOne(userId);
        if (user) {
          // Need _id of existing user record so this call must come 
          // after `Accounts.createUser` or `Accounts.onCreate`
          Roles.addUsersToRoles(user, ['admin']);
        }
    }
});