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
		Session.set('messages', {"content": "Learning Record Store added.", "type": "success"});
		$('#addStore').closeModal();
	}
});