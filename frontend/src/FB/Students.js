import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, set, push } from "firebase/database";

import { Button, Input } from 'semantic-ui-react';

const firebaseConfig = {
    apiKey: "AIzaSyAZhDA9Ch6ZHYLCwh0QRRfTNP42HSusoZY",
    authDomain: "ethlnagbox.firebaseapp.com",
    databaseURL: "https://ethlnagbox-default-rtdb.firebaseio.com",
    projectId: "ethlnagbox",
    storageBucket: "ethlnagbox.appspot.com",
    messagingSenderId: "715856553378",
    appId: "1:715856553378:web:a9623dda8c3d27088bfefb",
    measurementId: "G-YF5CT7C60B"
};
export default function Students() {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app)
    const studentRef = ref(db, 'students')

    const [list, setList] = useState([])
    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    useEffect(() => {
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val()
            const newData = Object.entries(data)
            setList(newData)
        })
    }, [])

    function additem() {
        const newKey = push(studentRef)
        set(newKey, { name, age })

    }


    return (
        <div>
            <Input value={name} onChange={e => setName(e.target.value)} />
            <Input value={age} onChange={e => setAge(e.target.value)} />
            <Button onClick={additem}>Add Student</Button>
            <ul>
                {list.map((item) => (<li>{item[1].name}</li>))}

            </ul>
        </div>
    )
}
