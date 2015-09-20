AutoForm.addHooks('insertAnswerForm', {
	onSuccess: function(formType, result) {
		$('#addStore').closeModal();
	}
});