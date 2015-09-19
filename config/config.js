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
AccountsTemplates.addField({
    _id: 'firstname',
    type: 'text',
    placeholder: {
        signUp: "Firstname"
    },
    required: true,
});

AccountsTemplates.addField({
    _id: 'lastname',
    type: 'text',
    placeholder: {
        signUp: "Lastname"
    },
    required: true,
});