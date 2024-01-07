import React, { useContext } from 'react'
import { MyContext } from '../App'
import { useState } from 'react'

export default function OTPLogin() {
    const { user, setUser } = useContext(MyContext)
    //const [user, setUser] = useState(55)
    return (
        <div>
            {user}
        </div>
    )
}
