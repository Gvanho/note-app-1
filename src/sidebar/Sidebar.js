import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getAllNotes, deleteNotes } from '../Api';
import { eventBus } from '../utils/eventBus';
import { getNoteID, removeNoteID, removeNoteContent } from '../utils/note';
import dayjs from 'dayjs';
require('dayjs/locale/zh');
import './index.css';

const cardStyle = {
  width: '100%',
  height: '250px',
  cursor: 'pointer',
  marginBottom: '10px',
  textAlign: 'center',
}
const cardActiveStyle = {
  width: '100%',
  height: '250px',
  cursor: 'pointer',
  marginBottom: '10px',
  border: '2px solid #223c55',
  color: '#F34212',
  textAlign: 'center',
}

const Sidebar = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [noteList, setNoteList] = useState([])
  const [activeNote, setActiveNote] = useState(getNoteID())

  // monitoring changing of nodeList
  const handleNoteUpdate = (value) => {
    if (value) {
      setActiveNote(value.note_id)
    }
    setNoteList(getAllNotes())
  }
  useEffect(() => {
    eventBus.on('note-update', handleNoteUpdate)
    setNoteList(getAllNotes())

    return () => {
      eventBus.off('note-update', handleNoteUpdate)
    };
  }, [])

  const addNoteHandler = () => {
    navigate('/editPanel')
    eventBus.emit('note-add', { text: 'addNote'})
  }

  const deleteNoteHandler = (value) => {
    deleteNotes(value);
    const currentNoteID = getNoteID()
    handleNoteUpdate()
    if (Number(currentNoteID) === Number(value.note_id)) {
      navigate('/')
      removeNoteID();
      removeNoteContent();
    }
    messageApi.success('删除成功')
  }

  // switch activated note
  const switchNote = (value) => {
    setActiveNote(value.note_id)
    navigate(`/editPanel?id=${value.note_id}`)
  }

  return (<div>
    <Button color='cyan' variant="solid" block onClick={addNoteHandler}>添加新的笔记</Button>
    {contextHolder}
    {noteList.map((item) => (
      <Card style={item.note_id === activeNote ? cardActiveStyle : cardStyle} key={item.note_id} actions={[
        <Popconfirm
          title='删除笔记'
          description='确认要删除吗？'
          onConfirm={() => deleteNoteHandler(item)}
          okText='确认'
          cancelText='取消'
        ><DeleteOutlined key='delete' /></Popconfirm>]}>
        <div onClick={() => switchNote(item)}>
          <p className='card-title'>{item.note_title}</p>
          <p className='card-content'>{item.note_content}</p>
          <p>{dayjs(item.note_update_time).locale('zh').format('YYYY年MM月DD日 dddd HH:mm')}</p>
        </div>
      </Card>
    ))}
    
  </div>)
}

export default Sidebar;