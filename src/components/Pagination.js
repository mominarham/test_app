import React from 'react'

function Pagination({postPerPage,totalPosts, paginate } ) {
    const pageNumber = []
    for(let i =1;i<=Math.ceil(totalPosts/postPerPage);i++){
        pageNumber.push(i)
    }
    return (
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center' }}>
            {pageNumber.map( (number)=>(
                    <div key={number} >
                    <button  onClick={ ()=>paginate(number) } >
                        {number}
                    </button>
                    </div>
            ) )}
        </div>
    )
}

export default Pagination
 