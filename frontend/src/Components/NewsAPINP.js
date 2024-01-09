import React, { useEffect, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default function NewsAPINP() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [noof, setNoof] = useState(0)

    useEffect(() => {
        const data = {
            _fields: 'id,title,date',
            offset: noof,
            per_page: 10
        }
        const str = new URLSearchParams(data).toString()
        setLoading(true)
        fetch('https://dharshininews.com/wp-json/wp/v2/posts?per_page=10' + str)
            .then(res => res.json())
            .then(json => {
                setList(json)
                setLoading(false)
            })
    }, [noof])
    function showNext() {
        if (noof >= 50) {
            return
        }
        setNoof(noof + 10)
    }
    function showPrev() {
        if (noof <= 0) {
            return

        }
        setNoof(noof - 10)

    }
    return (
        <div>
            <h1> This is the NewsAPIP</h1>
            <Button color='facebook' size='large'> <Icon name='facebook' /> facebook </Button>
            <Button color='google' size='large'> <Icon name='google' /> Google </Button>
            <Button color='twitter' size='large'> <Icon name='twitter' /> Twiter </Button>
            <Button color='youtube' size='large'> <Icon name='youtube' /> You Tube </Button>
            <br /><br />
            {/* Article No: {noof} <br /> */}
            {noof > 0 && <Button inverted color='orange' onClick={showPrev}>PREVIOUS</Button>}

            {noof < 50 && <Button inverted color='yellow' onClick={showNext}>NEXT</Button>
            }
            {loading ?
                <Icon name='spinner' size='big' loading />
                :
                <ol>
                    {list.map((item, index) => <li style={{ fontSize: 20, lineHeight: 2 }}>{item.title.rendered}</li>)}
                </ol>
            }
        </div>
    )
}
