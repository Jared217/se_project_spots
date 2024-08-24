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

// Edit Profile Modal
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
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
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostLinkInput = newPostModal.querySelector("#image-link-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

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

  previewCloseButton.addEventListener("click", () => {
    closeModal(previewModal);
  });

  return cardElement;
}

// Iterates over Initial Card array retrieving data to create element, and adds HTML element to page
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

// Opens the Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Closes the Modal without User Form Inputs
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Submits Edit Profile Form with User Form Inputs
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editProfileModal);
}

// Submit New Post Form
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };
  const newCard = getCardElement(inputValues);
  cardsList.prepend(newCard);
  closeModal(newPostModal);
}

// Events
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent.trim();
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostModalCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);
