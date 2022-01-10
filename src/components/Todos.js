import React,{useState,useEffect} from 'react'
import Pagination from './Pagination'
import AddPost from './AddPost'

function Todos( {todos,setTodos} ) {

    const [initial,setInitial] = useState(todos)
    const [showAdd,setShowAdd] = useState(true)
    const [disableTrue,setDisableTrue] = useState(false)
    const [disableFalse,setDisableFalse] = useState(false)
    const [showUpdate,setShowUpdate] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [PostPerPage] = useState(10)
    const [currentPost,setCurrentPost] = useState(todos)
    const [ updateTodos, setUpdatedTodos] = useState({
        id:'',
        title:'',
        completed:false
    })

    const deletItem = (id)=>{
            const updatedItems=todos.filter(t =>{
                return t.id !== id
            })
            console.log(updatedItems)
            setTodos(updatedItems)
            setCurrentPost(updatedItems)
    }

    const updateItem = (id)=>{ 
        setShowUpdate(true)
        const updated =todos.filter( t =>{
            return t.id === id
        })
        setUpdatedTodos({
            ...updateTodos,
            id:Math.floor((Math.random() * 80) + 600),
            title:updated[0].title
        })

        const removeItem = todos.filter( t =>{
            return t.id !== id
        })

        setTodos(removeItem)
        setCurrentPost(removeItem)

    }

    const handleChange = (e)=>{
       const {name,value} = e.target
       setUpdatedTodos({
           ...updateTodos,
           id:Math.floor((Math.random() * 80) + 600),
           [name]:value
       })
    }

    const updateSubmit = () =>{
        setCurrentPost([...todos,updateTodos])
        setShowUpdate(false)
    }

    const paginate = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const filterTrue=()=>{
        setDisableFalse(true)
        setShowAdd(false)
        setInitial(todos)

        const alltrue =todos.filter( t =>{
            return t.completed === true
        })

        setTodos(alltrue)
        setCurrentPost(alltrue)
    }

    const filterFalse=()=>{
        setDisableTrue(true)
        setShowAdd(false)
        setInitial(todos)
        
        const allFalse =todos.filter( t =>{
            return t.completed !== true
        })
        
        setTodos(allFalse)
        setCurrentPost(allFalse)
    }

    const removeFilter=()=>{
        setDisableTrue(false)
        setDisableFalse(false)
        setShowAdd(true)
        setTodos(initial)
        setCurrentPost(initial)
    }

    useEffect(() => {
        const indexOfLastPost = currentPage*PostPerPage
        const indexOfFirstPage = indexOfLastPost-PostPerPage
        setCurrentPost(todos.slice( indexOfFirstPage,indexOfLastPost ))
    }, [todos,currentPage])

    return (
        <>
         { !showUpdate ?
         <> {showAdd && <AddPost post={todos} setPost={setTodos} />} 
         <div>
            <button disabled={disableTrue}  onClick={filterTrue} >completed</button>
            <button disabled={disableFalse} onClick={filterFalse} >in completed</button>
            <button onClick={removeFilter} >remove filter</button>
        </div>
         </>
         :
         <>
            <input type='text' value={updateTodos.title} name='title' onChange={ handleChange} />
            <button onClick={updateSubmit} > ok </button>
        </>}
        <div>
            {currentPost.map( p=>(
                <div key={p.id} >

                    <h4> title: {p.title} </h4>
                    <h4> Completed: {p.completed.toString()} </h4>
                    <button onClick={()=> updateItem(p.id)}  > update </button>
                    <button onClick={()=> deletItem(p.id)} > delete </button>
                </div>
                
            )).reverse() }
        </div>
        
        <Pagination postPerPage={PostPerPage} totalPosts={todos.length} paginate={paginate} />
        </>
    )
}

export default Todos
