import React, { useEffect, useState } from 'react'

const DisplayUsers = () => {
    const [users,setUsers]=useState([])

    useEffect(()=>{
        //fetch
    })
  return (
    <div className='display-container'>
        <div className='user-info'>
            <h3>hocine mechkak</h3>
            <h4>last login : 3/7/2024 7:51 am</h4>
            <h4>access: user</h4>
        </div>
        <div className='user-info'>
            <h3>hocine mechkak</h3>
            <h4>last login : 3/7/2024 7:51 am</h4>
            <h4>access: user</h4>
        </div>
        <div className='user-info'>
            <h3>hocine mechkak</h3>
            <h4>last login : 3/7/2024 7:51 am</h4>
            <h4>access: admin</h4>
        </div>
        <div className='user-info'>
            <h3>hocine mechkak</h3>
            <h4>last login : 3/7/2024 10:51 am</h4>
            <h4>access: user</h4>
        </div>
    </div>
  )
}

export default DisplayUsers
