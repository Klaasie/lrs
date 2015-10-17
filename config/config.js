/**
 * Set debug variable
 * @todo  make it do something
 */
var debug = false;

/**
 * Configuring avatar plugin
 */
Avatar.setOptions({
	fallbackType: "default image",
	gravatarDefault: "identicon"
});

/**
 * Extending user object
 */
AccountsTemplates.addFields([
    {
        _id: 'firstname',
        type: 'text',
        placeholder: {
            signUp: "Firstname"
        },
        required: true,
    },
    {
        _id: 'lastname',
        type: 'text',
        placeholder: {
            signUp: "Lastname"
        },
        required: true
    }
]);

/**
 * Handling user signup
 */

AccountsTemplates.configure({
    preSignUpHook: function(password, info){

        // Generate secret
        var secret = info.email + ':' + password;
        var secretArray = CryptoJS.enc.Utf8.parse(secret);
        var secretBase64 = CryptoJS.enc.Base64.stringify(secretArray);

        Secrets.insert({
            userId: "empty",
            secret: secretBase64
        });
    }
});