const closeButton = document.querySelector('.close-button');

closeButton.addEventListener("click", () => {
  document.querySelector('.modal-container').classList.add('hidden');
});