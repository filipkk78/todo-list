import {myNotes, updateMainBlockHeader, clearPage, mainBlock, note} from "..";

function displayNotes() {
    clearPage();
    updateMainBlockHeader("Notes", notesPopUp, "Note");
    const notes = document.createElement("div");
    notes.classList.add("notes");
    myNotes.forEach(note => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note");
        const noteTitle = document.createElement("h3");
        noteTitle.textContent = note.title;
        noteCard.appendChild(noteTitle);
        const noteDesc = document.createElement("p");
        noteDesc.textContent = note.desc;
        noteCard.appendChild(noteDesc);
        notes.appendChild(noteCard);
    });
    mainBlock.appendChild(notes);
}

const notesPopUp = document.querySelector(".notes-popup");

document.querySelector("#exitnotesform").addEventListener("click", () => {
    notesPopUp.style.visibility = "hidden";
    nForm.reset();
})

const nForm = document.querySelector("#notesform");
nForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(nForm);
    const obj = Object.fromEntries(fd);
    console.log(obj);
    new note(obj.title, obj.desc);
    notesPopUp.style.visibility = "hidden";
    displayNotes();
    updateStorage();
})


document.querySelector("#notes").addEventListener("click", () => {
    displayNotes();
})

export default displayNotes;