export function handlePendingChange(evt, isPending) {
  let message;
  if (evt.target.name === "delete-form") {
    message = isPending ? "Deleting..." : "Delete";
  } else {
    message = isPending ? "Saving..." : "Save";
  }
  evt.submitter.textContent = message;
}
