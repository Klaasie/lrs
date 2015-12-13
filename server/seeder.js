function runSeeder(){

    /**
     * Create test accounts
     */
    for (index = 0; index < 30; index++) {
        accountDetails = {
            "username": "test" + index,
            "email": "test" + index +"@gmail.com",
            "password": "1@Password"
        }
        Accounts.createUser(accountDetails);
    }

    /**
     * Add users to LRS
     */
    var users = Meteor.users.find({}).fetch();
    var store = Stores.find();

    var i = 0
    _.each(users, function(value, index){

        if(i > 1 && i < 20){
            Stores.update(store._id, {
                $push: {
                    users: value._id
                }
            });
        }

        i++;
    });
    
    /**
     * Generate secrets for users
     */
    var users = Meteor.users.find({}).fetch();

    var i = 0
    _.each(users, function(value, index){

        var secret = value.emails[0].address + ":1@Password";
        var secretArray = CryptoJS.enc.Utf8.parse(secret);
        var secretBase64 = CryptoJS.enc.Base64.stringify(secretArray);

        if(i == 0){
            var secret = value.emails[0].address + ":*******";
            var secretArray = CryptoJS.enc.Utf8.parse(secret);
            var secretBase64 = CryptoJS.enc.Base64.stringify(secretArray);

            // me
            Secrets.insert({
                userId: value._id,
                secret: secretBase64
            });
            
        }else{
            Secrets.insert({
                userId: value._id,
                secret: secretBase64
            });
        }

        i++;
    }); 
}