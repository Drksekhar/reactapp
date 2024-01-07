import React, { useEffect, useState } from 'react'
import { Button, Input, List, ListContent, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from 'semantic-ui-react'
import { db } from './Conf'
import { onValue, push, ref, set } from 'firebase/database'

export default function TodoSimple() {
    const [text, setText] = useState('')
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)
    const [edittext, setEditText] = useState('')
    const [editkey, setEditKey] = useState(null)
    const [data, setData] = useState(null)
    const todoRef = ref(db, 'todos')
    useEffect(() => {
        onValue(todoRef, (snapshot) => {
            const res = snapshot.val()
            setData(res)
            const newData = Object.entries(res)
            console.log(newData)
            setList(newData)

        })
    }, [])
    function addItem() {
        if (text === '') return
        const newKey = push(todoRef)
        set(newKey, text)
        setText('')
    }
    function deletItem(key) {
        set(ref(db, '/todos/' + key), null)
    }
    function editItem(key) {
        setEditText(data[key])
        setEditKey(key)
        setOpen(true)
    }
    function saveItem() {
        set(ref(db, '/todos/' + editkey), edittext)
        setOpen(false)
        setEditText(null)
        setEditKey(null)
    }

    return (
        <div>
            <Input
                label="To do"
                icon={<Button onClick={addItem}>ADD</Button>}
                value={text} onChange={(e) => setText(e.target.value)}
            />

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <ModalHeader>Edit</ModalHeader>
                <ModalContent>
                    <ModalDescription>
                        <Input fluid value={edittext} onChange={e => setEditText(e.target.value)} />
                    </ModalDescription>
                </ModalContent>
                <ModalActions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button
                        content="SAVE"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={saveItem}
                        positive
                    />
                </ModalActions>
            </Modal>

            <List>
                {list.map((item) => (
                    <List.Item>
                        <ListContent floated='right'>
                            <Button color='blur' onClick={() => editItem(item[0])}>EDIT</Button>
                            <Button color='red' onClick={() => deletItem(item[0])}>DELETE</Button>
                        </ListContent>
                        <List.Content>{item[1]}</List.Content>

                    </List.Item>
                ))}
            </List>
        </div>
    )
}
