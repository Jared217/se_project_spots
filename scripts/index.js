const initialCards = [
  {
    name: "Training with the boys",
    link: "./images/training.jpg",
  },
  {
    name: "Best Bud",
    link: "./images/wesley.jpg",
  },
  {
    name: "Newest Passion",
    link: "./images/deskview.JPG",
  },
  {
    name: "Living in the fast lane",
    link: "./images/flyin.jpg",
  },
  {
    name: "Life requires a leap of courage",
    link: "./images/annie.jpg",
  },
  {
    name: "My first build",
    link: "./images/machine.JPG",
  },
];

// Contant Variables from within the User Profile
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newPostButton = document.querySelector(".profile__add-button");

// All Modals
const closeButtons = document.querySelectorAll(".modal__close-button");
const overlays = document.querySelectorAll(".modal");

// Edit Profile Modal
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = document.forms["edit-profile"];
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
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
const newPostModalCloseButton = newPostModal.querySelector(
  ".modal__close-button"
);
const newPostForm = document.forms["new-post"];
const newPostLinkInput = newPostModal.querySelector("#image-link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");

// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = previewModal.querySelector(".modal__close-button");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

// User Cards
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

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

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    const card = cardDeleteButton.closest(".card");
    card.remove();
  });

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

// Iterates over Initial Card array and uses renderCard function to add each card to the end of the page
initialCards.forEach((item) => {
  renderCard(item, "append");
});

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

// Opens the Modal and adds key listener
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

// Closes the Modal without User Form Inputs and removes key listener
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
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

// Submits Edit Profile Form with User Form Inputs
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  disableButton(editProfileSubmitButton, settings);
  closeModal(editProfileModal);
}

// Submit New Post Form
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };
  renderCard(inputValues);
  evt.target.reset();
  disableButton(newPostSubmitButton, settings);
  closeModal(newPostModal);
}

// Events
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

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);

// Iterates over all modal close buttons to create a universal event handler for closing modals
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
