import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { v4 as randomid } from 'uuid';


export default function Users({bodyRef}) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [duplicatedUsers, setduplicatedUsers] = useState([])
    const inputRef = useRef('')
   useEffect(() => {
    setLoading(true)

        const getUsers = async () =>{

            const response = await axios.get('https://randomuser.me/api?&results=25')
            setLoading(false)

            const results = response.data.results;
           
            setUsers(results)
            setduplicatedUsers(results)
            
        }
        getUsers();
        

   }, [])

   const handleForms = (e) =>{
        e.preventDefault();
        
        const filteredUsers = users.filter(user => user.name.first.includes(searchValue))
        if(filteredUsers.length<=0){
            alert('user Not Found');
            inputRef.current.value=''
            inputRef.current.focus()
            setUsers(users);
        }else if(filteredUsers.length>0){
            setUsers(filteredUsers);
        }

   }
   const handleClear = (e) =>{
    e.preventDefault();
 
    setUsers([...duplicatedUsers])
    inputRef.current.value=''
    inputRef.current.focus()

   }
   
   if(loading){
    return <h1 id='loader'>Loading!...</h1>
   }
  return (
    <div className='userApp'>
       
        <h1>Random Users</h1>
        <button onClick={()=>{window.location.reload()}} > Generate new Users</button>
    <form className='searchform' >
        <input ref={inputRef} type="text" placeholder="Enter name..."  onChange={(e)=>setSearchValue(e.target.value)} />
        <button type="submit" onClick={handleForms}>Search</button>
        <button onClick={handleClear} >Clear</button>
    </form>


    { users.length <=0 ? <div>No Users Found</div> : <div className='userContainer'>
        
        {users.map((user) => {
           return (
            <div className='user' key={randomid()} >
                <img className='userimage' src={user.picture.large} alt={user.name.first+user.name.last}/>
                <h1 className='username'>{user.name.first}</h1>
            
                <h4 className='userdob'>D.O.B: {user.dob.date.substring(0,10).split('-').reverse().join('-')}</h4>
            </div>
            )
        })}
    </div> }
    
    </div>
  )
}
