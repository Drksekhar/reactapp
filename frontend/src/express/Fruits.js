import React, { useEffect, useState } from 'react'
import { Container, Form, FormField, Input, List } from 'semantic-ui-react'
import {
    ModalHeader,
    Button,
    Modal,
} from 'semantic-ui-react'
export default function Fruits() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [list, setList] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [editId, setEditId] = useState(null)
    const [box, setBox] = useState(false)
    const [box2, setBox2] = useState(false);

    useEffect(() => {
        getItmes()
    }, [refresh])

    // Add Item
    async function addItem() {
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

        let response = await fetch("http://localhost:4000/api/fruits/", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setName('')
        setPrice('')
        setRefresh(!refresh)
        setBox(false)
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
    // Delete one fruit by id
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
    // Delete all Fruits
    async function deleteAllItems() {
        console.log('Deleting all items...');
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
        let response = await fetch("http://localhost:4000/api/fruits", {
            method: "DELETE",
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        setBox2(false)
        setRefresh(!refresh)
    }

    async function editItem(id) {
        setBox(true)
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
        setBox(false)
    }
    function closeBox() {
        setBox(false)
        setName('')
        setPrice('')
        setEditId(null)

    }
    return (
        <div>
            <Container>

                <Button color="green" onClick={() => setBox(true)}>ADD</Button>
                <Button color="red" onClick={() => setBox2(true)}>DELETE ALL</Button>

                <Modal
                    size='small'
                    open={box}
                    onOpen={() => setBox(true)}
                    onClose={closeBox}
                    closeIcon
                >
                    <ModalHeader>Add New fruit</ModalHeader>
                    <Modal.Content>
                        <Form>
                            <FormField>
                                <label>Fruit Name</label>
                                <Input value={name} onChange={e => setName(e.target.value)} placeholder='Fruit Name' />
                            </FormField>
                            <FormField>
                                <label>Fruit Price</label>
                                <Input value={price} onChange={e => setPrice(e.target.value)} placeholder='Fruit Price' />
                            </FormField>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        {editId ?
                            <Button color='blue' onClick={saveItem}>SAVE</Button>
                            :
                            <Button color='blue' onClick={addItem}>ADD</Button>
                        }
                    </Modal.Actions>
                </Modal>

                <Modal
                    open={box2}
                    onOpen={() => setBox2(true)}
                    onClose={() => setBox2(false)}
                >
                    <Modal.Header>Do you want to delete all ?</Modal.Header>
                    <Modal.Actions>
                        <Button color='red' onClick={deleteAllItems}>DELETE ALL</Button>
                        <Button color='yellow' onClick={() => setBox2(false)}> NO</Button>
                    </Modal.Actions>


                </Modal>

                <hr />

                <List divided verticalAlign='middle'>
                    {
                        list.map((item) =>
                            <List.Item>
                                <List.Content floated='right'>
                                    <Button color='red' onClick={() => deleteItem(item.id)}>DELETE </Button>
                                    <Button color='blue' onClick={() => editItem(item.id)}>EDIT</Button>
                                </List.Content>
                                <List.Content>{item.id} - {item.name} - {item.price}</List.Content>
                            </List.Item>

                        )
                    }
                </List>
            </Container>

        </div >
    )
}
