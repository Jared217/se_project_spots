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

// Contant Variables from within the Page
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

// Opens the Edit Profile Modal
function openEditProfileModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent.trim();
  editProfileModal.classList.add("modal__opened");
}

// Closes the Edit Profile Modal without User Form Inputs
function closeEditProfileModal() {
  editProfileModal.classList.remove("modal__opened");
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
