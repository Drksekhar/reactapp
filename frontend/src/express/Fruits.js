import React, { useEffect, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'

export default function Fruits() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [list, setList] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        getItmes()
    }, [refresh])
    async function addItem() {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "name": name,
            "price": price
        });

        let response = await fetch("http://localhost:4000/api/fruits", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setName('')
        setPrice('')
        setRefresh(!refresh)
    }
    async function getItmes() {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
        let response = await fetch("http://localhost:4000/api/fruits", {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setList(data)
    }
    async function deleteItem(id) {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let response = await fetch("http://localhost:4000/api/fruits/" + id, {
            method: "DELETE",
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setRefresh(!refresh)
    }
    async function editItem(id) {
        setEditId(id)
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let response = await fetch("http://localhost:4000/api/fruits/" + id, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setName(data[0].name)
        setPrice(data[0].price)
    }

    async function saveItem() {
        if (name === '' || price === '') {
            return
        }
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "name": name,
            "price": price
        });

        let response = await fetch("http://localhost:4000/api/fruits/" + editId, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);
        setName('')
        setPrice('')
        setRefresh(!refresh)
    }

    return (
        <div>
            <Input value={name} onChange={e => setName(e.target.value)} /> <br></br>
            <Input value={price} onChange={e => setPrice(e.target.value)} /> <br></br>

            {editId ?
                <Button color='blue' onClick={saveItem}>SAVE</Button>
                :
                <Button color='blue' onClick={addItem}>ADD</Button>
            }
            <hr />
            <ol>
                {
                    list.map((item) => <>
                        <li>{item.id}{item.name} - {item.price}
                            <Button onClick={() => deleteItem(item.id)}>DELETE </Button>
                            <Button onClick={() => editItem(item.id)}>EDIT</Button>

                        </li>
                    </>)
                }
            </ol>

        </div>
    )
}
