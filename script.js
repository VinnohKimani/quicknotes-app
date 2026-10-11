// Query selectors for required elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Array to store note objects
let notes = [];

// Update the note count paragraph with correct grammar
function updateNoteCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// Render function rebuilding the list using createElement and textContent
function render() {
  notesList.textContent = "";
  updateNoteCount(notes.length);

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note-card", `category-${note.category.toLowerCase()}`);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("note-content");

    const textPara = document.createElement("p");
    textPara.textContent = note.text;

    const metaPara = document.createElement("p");
    metaPara.classList.add("note-meta");
    metaPara.textContent = `${note.category} • ${note.createdAt}`;

    contentDiv.appendChild(textPara);
    contentDiv.appendChild(metaPara);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// Function to add a note with validation
function addNote(e) {
  e.preventDefault();
  const text = noteInput.value.trim();

  // Validation checks
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  render();
  noteInput.value = "";
}

// Function to delete a note by ID
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// Event Listeners
noteForm.addEventListener("submit", addNote);
