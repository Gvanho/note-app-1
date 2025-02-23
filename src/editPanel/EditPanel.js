import { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { debounce } from 'lodash';
import { getAllNotes, saveNotes } from '../Api';
import { eventBus } from '../utils/eventBus';
import { getNoteID, setNoteID, removeNoteID, getNoteList, setNoteContent, getNoteContent, removeNoteContent } from "../utils/note";

const { TextArea } = Input;

const EditPanel = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    paddingTop: '50px',
  }

  const [formDisabled, setFormDisabled] = useState(true)
  const [searchParams] = useSearchParams()
  const noteId = searchParams.get('id') // note id from route params
  const noteSavedID = getNoteID();  //get note id from localStorage

  // create a new note
  const addNoteHandler = () => {
    form.resetFields();
    setFormDisabled(false);
    removeNoteID();
    debounceNoteUpdate(form.getFieldsValue());
  }

  useEffect(() => {
    if (!noteId && !noteSavedID) {
      addNoteHandler()  // for the first time to create a note
    }
    eventBus.on('note-add', addNoteHandler) // monitoring for initializing a new note
    return () => {
      eventBus.off('note-add', addNoteHandler)
    }
  }, [])

  // data editing and display
  useEffect(() => {
    const noteData = getAllNotes().filter(item => item.note_id === Number(noteId));
    if (noteId) {
      form.setFieldsValue({ note_title: '', note_content: '' });
      setFormDisabled(true);
      setNoteID(noteId);
      setNoteContent(noteData[0]);
    }
    form.setFieldsValue(noteData[0]);
  }, [noteId, form])

  // debounce update and saving data
  const debounceNoteUpdate = useRef(
    debounce((note) => {
      const noteRes = saveNotes(note);
      setNoteContent(noteRes);
      eventBus.emit('note-update', noteRes);
      return noteRes;
    }, 500), []
  ).current

  const noteValueChange = (changedValues, allValues) => {
    const getBeforeUpdateNote = getNoteContent();
    const note = {...getBeforeUpdateNote, ...changedValues};
    debounceNoteUpdate(note);
  }
  const closeNote = () => {
    navigate('/');
    removeNoteID();
    removeNoteContent();
    eventBus.emit('note-update', {note_id: null});
  }

  // use side effect to cancel redundant debounce
  useEffect(() => {
    return () => {
      debounceNoteUpdate.cancel();
    };
  }, [debounceNoteUpdate]);

  return (<div style={pageStyle}>
    <div>
    <Form {...formLayout} form={form} style={{minWidth: 1000}} disabled={formDisabled} onValuesChange={noteValueChange} initialValues={{note_title:'新建笔记名称', note_content: '新建笔记内容'}}>
      <Form.Item name='note_title' label='笔记名称'><Input allowClear maxLength={20} /></Form.Item>
      <Form.Item name='note_content' label='笔记内容'><TextArea showCount maxLength={200} style={{height: 200, resize: 'none'}} /></Form.Item>
    </Form>
    </div>
    <div>
      <Button shape="circle" style={{marginRight: '100px'}} icon={<EditOutlined />} onClick={() => setFormDisabled(false)} />
      <Button shape="circle" color="danger" variant="outlined" icon={<CloseOutlined />} onClick={closeNote} />
    </div>
    
  </div>)
}

export default EditPanel;