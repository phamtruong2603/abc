import React, { useContext, useState } from 'react';
import './CreatePostCss.css';
import { createPost } from '../../auth/post';
import { ProviderPosts } from '../../contextAPI/ProviderPost';
import { Providers } from '../../contextAPI/Provider';
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { RiCloseFill } from "react-icons/ri";

const CreatePost = () => {
    const [post, setPost] = useState({});
    const [result, setResult] = useState("");
    const [file, setFile] = useState()
    const { posts, setPosts } = useContext(ProviderPosts)
    const { user } = useContext(Providers)
    // biến avatar người dùng
    let avatar = user?.data?.avatar
        ? user.data.avatar
        : 'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'

    // lấy dữ liệu từ form tạo mới bài post
    const setPrams = (e) => {
        let name = e.target.name
        let value = e.target.value
        setPost({
            ...post,
            [name]: value
        })
    }

    // xem ảnh trước khi post. chưa gửi lên server
    const uploader = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setResult(e.target.result);
        };
        setFile(e.target.files[0])
        reader.readAsDataURL(e.target.files[0]);
    }

    // sự kiện tạo mới bài post
    const submit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', post.content)
        formData.append('postImg', file)
        let data = await createPost(formData);
        setPosts([
            data.data,
            ...posts
        ])
        setPost({})
        setResult('')
    }

    return (
        <div className='formCreatePost'>
            <div className='headerCreateFormPost'>
                <div className='createPostAvatar'>
                    <img src={avatar} alt="" />
                </div>
            </div>
            <div className='createContentPost'>
                <input
                    type="text"
                    name='content'
                    value={post.content || ''}
                    placeholder='What is happening???'
                    onChange={setPrams}
                />
                <div className='importFilePost'>
                    <div className='createImgPost' style={{ color: "var(--photo)" }}>
                        <input
                            type="file"
                            id='browseImg'
                            onChange={(e) => uploader(e)}
                            name='postImg'
                        />
                        <label htmlFor="browseImg">
                            <HiOutlinePhotograph />Photo
                        </label>

                    </div>
                    <div style={{ color: "var(--video)" }}>
                        <label htmlFor="">
                            <MdOutlineSlowMotionVideo />video
                        </label>

                    </div>
                    <div style={{ color: "var(--location)" }}>
                        <label htmlFor="">
                            <IoLocationOutline />Location
                        </label>
                    </div>
                    <div style={{ color: "var(--shedule)" }}>
                        <label htmlFor="">
                            <CgCalendarDates />Shedule
                        </label>
                    </div>
                    <button className='button if-button' onClick={submit}>Share</button>
                </div>
                <div className='dataFile'>

                    {result &&
                        <div className='previewImg'>
                            <RiCloseFill onClick={() => setResult('')} />
                            <img src={result} alt="" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreatePost;
