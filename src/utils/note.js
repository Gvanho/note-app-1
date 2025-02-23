const NOTE_ID = 'note_id'
const NOTE_LIST = 'notesapp-notes'
const NOTE_CONTENT = 'note-content'

// save current note id
const setNoteID = (noteID) => {
  localStorage.setItem(NOTE_ID, noteID)
}
const getNoteID = () => {
  return localStorage.getItem(NOTE_ID)
}
const removeNoteID = () => {
  localStorage.removeItem(NOTE_ID)
}

const setNoteList = (noteList) => {
  localStorage.setItem(NOTE_LIST, noteList)
}
const getNoteList = () => {
  return JSON.parse(localStorage.getItem(NOTE_LIST))
}
const removeNoteList = () => {
  localStorage.removeItem(NOTE_LIST)
}
// save current note content
const setNoteContent = (content) => {
  localStorage.setItem(NOTE_CONTENT, JSON.stringify(content))
}
const getNoteContent = () => {
  return JSON.parse(localStorage.getItem(NOTE_CONTENT))
}
const removeNoteContent = () => {
  localStorage.removeItem(NOTE_CONTENT)
}


export {
  setNoteID,
  getNoteID,
  removeNoteID,
  setNoteList,
  getNoteList,
  removeNoteList,
  setNoteContent,
  getNoteContent,
  removeNoteContent
}