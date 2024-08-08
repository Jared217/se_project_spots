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

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalCloseButton = editProfileModal.querySelector("#modal-close-button");

function openModal() {
  editProfileModal.classList.add("modal__opened");
}

function closeModal() {
  editProfileModal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", openModal);

modalCloseButton.addEventListener("click", closeModal);
