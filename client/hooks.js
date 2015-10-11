AutoForm.addHooks('insertStoreForm', {
	onSuccess: function(formType, result) {
		Session.set('messages', {"content": "Learning Record Store added.", "type": "success"});

		$('#addStore').closeModal();
	}
});