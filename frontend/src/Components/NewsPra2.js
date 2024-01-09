import React, { useEffect, useState } from 'react'

export default function NewsPra2() {
    const [list, setList] = useState([])
    useEffect(() => {
        fetch('https://dharshininews.com/wp-json/wp/v2/posts?per_page=20')
            .then(res => res.json())
            .then(json => {
                setList(json)
            })
    })
    return (
        <div>
            <h1>This is the News API Practice 2</h1>
            {list.map((item, index) => <li>{item.title.rendered}</li>)}

        </div>
    )
}
