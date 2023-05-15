const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

function saveToLocalStorage() {
  try {
    const feedback = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedback));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

form.addEventListener('input', throttle(saveToLocalStorage, 500));

window.addEventListener('load', () => {
  try {
    const prevVal = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (prevVal) {
      emailInput.value = prevVal.email;
      messageInput.value = prevVal.message;
    }
  } catch (e) {
    console.error('Error reading from localStorage:', e);
  }
});

function validateForm() {
  if (!messageInput.value.trim() || !emailInput.value.trim()) {
    alert('Please complete both fields');
    return false;
  }
  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  if (!validateForm()) {
    return;
  }
  const feedback = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.removeItem(LOCALSTORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
  console.log(feedback);
}

form.addEventListener('submit', handleSubmit);
