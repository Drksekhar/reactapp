import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { db } from './Conf'
import { MyContext } from '../App'
import { ref } from 'firebase/database'

export default function MyToDoList() {
    const { user } = useContext(MyContext)
    const [text, setText] = useState('')
    const todoRef = ref(db, 'mytodos')

    useEffect(() => {
        console.log(user)

    }, [])
    function addItem() {

    }
    return (
        <div>
            <Input value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={addItem}>ADD</Button>
        </div>
    )
}
