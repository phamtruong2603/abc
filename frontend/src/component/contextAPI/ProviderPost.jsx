import React, { useEffect, useRef, useState } from 'react';
import { getAllPost } from '../auth/post';

export const ProviderPosts = React.createContext()

const ProviderPost = ({ children }) => {

    const [posts, setPosts] = useState([])
    // const [page, setPage] = useState(0)
    const page = useRef(0)

    useEffect(() => {
        (async function () {
            let data = await getAllPost(page)
            setPosts(data)
        })()
    }, [])
    
    const data = { posts, setPosts, page }

    return (
        <ProviderPosts.Provider value={data}>
            {children}
        </ProviderPosts.Provider>
    )
}

export default ProviderPost