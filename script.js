// Query selectors for required elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Array to store note objects
let notes = [];

// Load stored notes from localStorage
function loadNotes() {
  const saved = localStorage.getItem("quicknotes_data");
  if (saved) {
    notes = JSON.parse(saved);
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("quicknotes_data", JSON.stringify(notes));
}

// Update the note count paragraph
function updateNoteCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// Render function with filtering and search match check
function render() {
  notesList.textContent = "";

  const query = searchInput.value.toLowerCase().trim();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query),
  );

  updateNoteCount(filteredNotes.length);

  if (filteredNotes.length === 0 && query !== "") {
    const noResults = document.createElement("li");
    noResults.textContent = "No notes match your search.";
    notesList.appendChild(noResults);
    return;
  }

  filteredNotes.forEach((note) => {
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
  saveNotes();
  render();

  noteInput.value = "";
}

// Function to delete a note by ID
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Clear all notes function with confirmation
function clearAllNotes() {
  if (notes.length === 0) return;

  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
}

// Event Listeners
noteForm.addEventListener("submit", addNote);
searchInput.addEventListener("input", render);

// Safely bind clear button if present in index.html
if (clearAllBtn) {
  clearAllBtn.addEventListener("click", clearAllNotes);
}

// Initial load
loadNotes();
render();
