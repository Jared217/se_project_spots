const initialCards = [
  {
    name: "Training with the boys",
    link: "../images/training.jpg",
  },
  {
    name: "Best Bud",
    link: "../images/wesley.jpg",
  },
  {
    name: "Newest Passion",
    link: "../images/deskview.JPG",
  },
  {
    name: "Living in the fast lane",
    link: "../images/flyin.jpg",
  },
  {
    name: "Life requires a leap of courage",
    link: "../images/annie.jpg",
  },
  {
    name: "My first build",
    link: "../images/machine.JPG",
  },
];

// Contant Variables from within the User Profile
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Constant Variables from within the Edit Profile Modal
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileFormElement = editProfileModal.querySelector(".modal__form");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// Constant Variables from within User Cards
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Correlates individual parts of the card element, to the corresponding template
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
}

// Iterates over Initial Card array retrieving data to create element, and adds HTML element to page
for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}

// Opens the Edit Profile Modal
function openEditProfileModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent.trim();
  editProfileModal.classList.add("modal_opened");
}

// Closes the Edit Profile Modal without User Form Inputs
function closeEditProfileModal() {
  editProfileModal.classList.remove("modal_opened");
}

// Submits Edit Profile Form with User Form Inputs
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeEditProfileModal();
}

// Events
profileEditButton.addEventListener("click", openEditProfileModal);
editProfileCloseButton.addEventListener("click", closeEditProfileModal);
editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);
