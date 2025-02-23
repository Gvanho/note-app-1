import { setNoteID, getNoteID, setNoteList, getNoteList } from "./utils/note";

const getAllNotes = () => {
  const notes = getNoteList() || [];
  return notes.sort((a, b) => {
    return new Date(a?.note_update_time) > new Date(b?.note_update_time) ? -1 : 1;
  })
}

const saveNotes = (noteToSave) => {
  const notes = getAllNotes();
  const existing = notes.find(item => item?.note_id === Number(noteToSave?.note_id));
  
  if (existing) {
    existing.note_title = noteToSave.note_title;
    existing.note_content = noteToSave.note_content;
    existing.note_update_time = new Date().toISOString();
  } else {
    noteToSave.note_id = Math.floor(Math.random() * 1000000);
    noteToSave.note_update_time = new Date().toISOString();
    notes.push(noteToSave);
  }
  setNoteID(noteToSave.note_id);
  setNoteList(JSON.stringify(notes));

  return noteToSave
}

const deleteNotes = (noteToDelete) => {
  const notes = getAllNotes();
  const notesAfterDelete = notes.filter(item => item?.note_id !== Number(noteToDelete?.note_id))
  setNoteList(JSON.stringify(notesAfterDelete));
  return notesAfterDelete;
}

export { getAllNotes, saveNotes, deleteNotes };