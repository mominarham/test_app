import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Todos from './Todos'

function Main() {
    const [todos,setTodos] = useState([])
    const [loading,setLoading] = useState(true) 
 

    const fetchTodos = async()=>{
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
        console.log(res.data)
        setTodos(
            res.data
        )
    }

    useEffect(()=>{
        fetchTodos()
        setLoading(false)
    },[])


    return (
        <div>
            {loading ? <h1>loading....</h1>  :  <Todos todos={todos} setTodos={setTodos} /> }
        </div>
    )
}

export default Main
