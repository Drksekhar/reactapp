import React, { useState } from 'react'

export default function States() {
    const [x, setx] = useState(0)
    const [y, sety] = useState(0)
    const [a, seta] = useState(0)
    const [b, setb] = useState(0)
    function handleX(e) {
        setx(e.target.value)
    }
    function handleY(e) {
        sety(e.target.value)

    }
    return (
        <div>
            <br />
            X: <input type='number' value={x} onChange={handleX} /> <br />
            Y: <input type='number' value={y} onChange={handleY} /><br /><br />
            <hr />
            <br />
            A: <input type='number' value={a} onChange={(e) => seta(e.target.value)} />
            B: <input type='number' value={b} onChange={(e) => setb(e.target.value)} />
            <hr />
            <h1>X Value is : {x}</h1>
            <h1>Y Value is : {y}</h1>
            <h2>Addition : {Number(x) + Number(y)}</h2>
            <h2>Substraction : {Number(x) - Number(y)}</h2>
            <h2>Multiplication : {Number(x) * Number(y)}</h2>
            <h2>Division : {Number(x) / Number(y)}</h2>
            <hr />
            <h1>Calling without the function</h1>

            <h1>A Value is : {a}</h1>
            <h1>B Value is : {b}</h1>
            <h2>Addition : {Number(a) + Number(b)}</h2>
            <h2>Substraction : {Number(a) - Number(b)}</h2>
            <h2>Multiplication : {Number(a) * Number(b)}</h2>
            <h2>Division : {Number(a) / Number(b)}</h2>
        </div>
    )
}
