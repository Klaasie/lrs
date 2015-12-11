Accounts.onLogin(function() {
    var path = FlowRouter.current().path;

    // we only do it if the user is in the login page
    if(path === "/login"){
        FlowRouter.go("/dashboard");
    }
});

AutoForm.addHooks('insertStoreForm', {
    onSuccess: function(formType, result) {
        // Add user to store
        var userId = Meteor.userId();

        Stores.update(result, {
            $push: {
                users: userId
            }
        });

        // Give feedback
        Materialize.toast('Learning Record Store added!', 4000);

        // Close modal
        $('#addStore').closeModal();
    }
});

AutoForm.addHooks('updateStoreForm', {
    onSuccess: function(formType, result) {
        // Give feedback
        Materialize.toast('Learning Record Store updated!', 4000);

        // Close modal
        $('#updateStore').closeModal();
    }
});