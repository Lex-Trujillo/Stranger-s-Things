import React,  { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Posts = (props) => {


    const posts = props.posts;
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filter, setFiltered] = useState('');

useEffect(
    () => {
        if (filter === '')
        {
            setFilteredPosts(posts);
        } 
    }
)

//    console.log('this is posts', posts, filteredPosts)





    return (
        <div>
            <div  className='post-container'>
                <h1 className='post-title'>Posts</h1>
                <input placeholder='search' className='searchbar' type="text" onChange={ (event)=> {
                setFiltered(event.target.value);
                const newFilteredPosts = posts.filter(
                    (post) => {
                        let found = false;
                        const composite = post.title.toLowerCase() + post.author.username.toLowerCase() + post.description.toLowerCase() + post.location.toLowerCase();
                        const search = event.target.value.toLowerCase();
                        
                        if (composite.search(search) > -1)
                        {
                            found = true;
                        }
                        return found;
                    }
                );
                setFilteredPosts(newFilteredPosts)
                } }></input>
            </div>
            <table className='post-table' >
                <thead>
                    <tr>
                    <th>User Name</th>
                    <th>Title</th>
                    <th>Description</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                                       <tbody> 
                {
                    filteredPosts.map(post => {
                        return (
                            <tr key = {post._id}>
                                         <td>
                                     { post.author.username }
                                         </td>
                                         <td>
                                     { post.title }
                                         </td>
                                         <td>
                                     { post.description }
                                         </td>

                                         <td>
                                     { post.location }
                                         </td>

                                        <td>
                                         <Link to={`/posts/${post._id}`}>View Post</Link>
                                         </td>
                            </tr>
                        )
                    })
                }
                                     </tbody>
                                </table>
        </div>
    )
}

export default Posts