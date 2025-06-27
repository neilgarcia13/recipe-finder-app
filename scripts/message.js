const messageArea = document.querySelector('.message-area');

export function showMessage(message, isError = false, isLoading = false) {
  
  messageArea.textContent = message;

  if (isError) messageArea.classList.add('error');
  if (isLoading) messageArea.classList.add('loading');

}

export function clearMessage() {

  messageArea.textContent = "";
  messageArea.className = "message-area";

}