import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1BOv6-tHs77DRnXK1cvpVpZ-iqSS_bog",
  authDomain: "flabs-tasks.firebaseapp.com",
  databaseURL: "https://flabs-tasks-default-rtdb.firebaseio.com",
  projectId: "flabs-tasks",
  storageBucket: "flabs-tasks.appspot.com",
  messagingSenderId: "831343552471",
  appId: "1:831343552471:web:eb98ba1a7cb04cd2f20d92",
  measurementId: "G-24LVH2088R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to toggle visibility of elements based on user authentication state
function toggleSignInButtonAndUserContainer(user) {
  const signInButton = document.getElementById('sign-in-button');
  const userContainer = document.getElementById('user-container');

  if (user) {
    // User is signed in, hide sign-in button, show user container
    signInButton.style.display = 'none';
    userContainer.style.display = 'block';
    document.getElementById('user-name').textContent = user.displayName;
  } else {
    // User is signed out, show sign-in button, hide user container
    signInButton.style.display = 'block';
    userContainer.style.display = 'none';
  }
}

// Listen for changes in user authentication state
onAuthStateChanged(auth, (user) => {
  toggleSignInButtonAndUserContainer(user);
});

// Function to handle Google Sign-In
function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorCode, errorMessage, email, credential);
    });
}

window.addEventListener('load', () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task_el = document.createElement('div');
    task_el.classList.add('task');

    // Checkbox
    const task_checkbox_el = document.createElement('input');
    task_checkbox_el.type = 'checkbox';
    task_checkbox_el.classList.add('checkbox');

    // Append checkbox to task_el
    task_el.appendChild(task_checkbox_el);

    // Task content
    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');

    // Task input
    const task_input_el = document.createElement('div');
    task_input_el.classList.add('text');
    task_input_el.textContent = input.value;
    task_input_el.setAttribute('contenteditable', 'true');

    task_content_el.appendChild(task_input_el);

    // Task actions
    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

    // Edit button with pencil icon
    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    task_actions_el.appendChild(task_edit_el);

    // Save button with check icon
    const task_save_el = document.createElement('button');
    task_save_el.classList.add('save');
    task_save_el.innerHTML = '<i class="fas fa-check"></i>';
    task_actions_el.appendChild(task_save_el);

    // Delete button with trash icon
    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerHTML = '<i class="fas fa-trash"></i>';
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_content_el);
    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    input.value = '';

    task_checkbox_el.addEventListener('change', () => {
      if (task_checkbox_el.checked) {
        list_el.removeChild(task_el);
      }
    });

    task_edit_el.addEventListener('click', () => {
      task_input_el.focus();
      task_edit_el.style.display = 'none';
      task_save_el.style.display = 'inline-block';
      // Set new task input text
    });

    task_save_el.addEventListener('click', () => {
      task_edit_el.style.display = 'inline-block';
      task_save_el.style.display = 'none';
    });

    task_delete_el.addEventListener('click', () => {
      list_el.removeChild(task_el);
    });
  });
});

