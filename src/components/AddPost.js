import React,{useState} from 'react'

function AddPost( {post,setPost} ) {
    const [newPost,setNewPost] = useState({
        id:'',
        title:'',
        completed:false
        })

    const handleChange = (e)=>{
        const {name,value} = e.target
        setNewPost({
            ...newPost,
            id:Math.floor((Math.random() * 80) + 600),
            [name]:value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setPost([
            ...post,
            newPost
        ])

        setNewPost({
            id:'',
            title:'',
            completed:false
            })
    }
    

    return (
        <div>
            <form>
                <input type='text' value={newPost.title} name='title' onChange={handleChange} />
                <button onClick={handleSubmit}> Add Post </button>
            </form>

        </div>
    )
}

export default AddPost
