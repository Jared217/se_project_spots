import "./index.css";

import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";
import { handlePendingChange } from "../utils/helpers.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1fbd0f31-fcbb-4a06-be6a-ebe4e6538753",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      renderCard(item, "append");
    });
    profileName.textContent = userInfo.name;
    profileAvatar.src = userInfo.avatar;
    profileDescription.textContent = userInfo.about;
  })
  .catch(console.error);

// Contant Variables from within the User Profile
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newPostButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__avatar");
const editAvatarButton = document.querySelector(".profile__avatar-button");

// All Modals
const closeButtons = document.querySelectorAll(".modal__close-button");
const overlays = document.querySelectorAll(".modal");

// Edit Profile Modal
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = document.forms["edit-profile"];
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// New Post Modal
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = document.forms["new-post"];
const newPostLinkInput = newPostModal.querySelector("#image-link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");

// Edit Avatar Modal
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = document.forms["edit-avatar"];
const editAvatarSubmitButton = editAvatarModal.querySelector(
  ".modal__submit-button"
);
const editAvatarLinkInput = editAvatarModal.querySelector(
  "#profile-avatar-input"
);

// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

// Delete Card Modal
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.forms["delete-form"];
const deleteCancelButton = deleteModal.querySelector(
  ".modal__submit-button_type_cancel"
);

// User Cards
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
let selectedCard, selectedCardId;

// Correlates individual parts of the card element, to the corresponding template
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button ");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardElement._id = data._id;

  if (data.isLiked) {
    cardLikeButton.classList.toggle("card__like-button_liked");
  }

  cardLikeButton.addEventListener("click", (evt) =>
    handleCardLike(evt, data._id)
  );

  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}

// Iterate over the modals to add click event outside of the content
overlays.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal && modal.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
});

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

// Opens the Modal and adds key listener
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
  if (modal === deleteModal) {
    deleteCancelButton.addEventListener("click", handleDeleteCancel);
  }
}

// Closes the Modal without User Form Inputs and removes key listener
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  if (modal == deleteModal) {
    deleteCancelButton.removeEventListener("click", handleDeleteCancel);
  }
}

// Handle Escape Key Closing of Modal
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    if (currentModal) {
      closeModal(currentModal);
    }
  }
}

// Handle Card Deletion
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  handlePendingChange(evt, true);
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      handlePendingChange(evt, false);
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteCancel(evt) {
  evt.preventDefault();
  deleteModal.classList.remove("modal_opened");
}

// Submits Edit Profile Form with User Form Inputs
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  handlePendingChange(evt, true);
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      disableButton(editProfileSubmitButton, settings);
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      handlePendingChange(evt, false);
    });
}

// Submit New Avatar
function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  handlePendingChange(evt, true);
  api
    .editUserAvatar(editAvatarLinkInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      disableButton(editAvatarSubmitButton, settings);
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      handlePendingChange(evt, false);
    });
}

// Submit New Post Form
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  handlePendingChange(evt, true);
  api
    .postNewCard({
      name: newPostCaptionInput.value,
      link: newPostLinkInput.value,
    })
    .then((data) => {
      const inputValues = { name: data.name, link: data.link, _id: data._id };
      renderCard(inputValues);
      evt.target.reset();
      disableButton(newPostSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      handlePendingChange(evt, false);
    });
}

// Handle toggle of Card Like button
function handleCardLike(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api
    .toggleLike(cardId, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_liked");
    })
    .catch(console.error);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent.trim();
  resetValidation(
    editProfileForm,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

editAvatarButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});

editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

// Iterates over all modal close buttons to create a universal event handler for closing modals
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

enableValidation(settings);
