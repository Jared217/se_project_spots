export function handlePendingChange(
  isPending,
  button,
  initialText = "Save",
  loadingText = "Saving..."
) {
  isPending
    ? (button.textContent = loadingText)
    : (button.textContent = initialText);
}

export function handleSubmit(request, evt, loadingText = "Saving...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  handlePendingChange(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      handlePendingChange(false, submitButton, initialText);
    });
}
