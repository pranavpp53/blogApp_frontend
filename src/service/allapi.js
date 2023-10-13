import BASE_URL from "./baseurl";
import { commonRequest } from "./commonReq";

//register
export const postRegistrationData=async(body)=>{
    return commonRequest('POST',`${BASE_URL}/register`,body)
}

//login
export const loginUser=async(body)=>{
    return commonRequest('POST',`${BASE_URL}/signin`,body)
}

//add new post
export const addNewPost=async(body,headers)=>{
    return commonRequest('POST',`${BASE_URL}/newpost`,body,headers)
}

// to get all posts
export const allPosts=async()=>{
    return commonRequest('GET',`${BASE_URL}/getallposts`,"")
}

// to get single user posts
export const singleUserPosts=async(id)=>{
    return commonRequest('GET',`${BASE_URL}/userposts/${id}`,"")
}

// to get singleposts
export const singlePost=async(id)=>{
    return commonRequest('GET',`${BASE_URL}/singlepost/${id}`,"")
}

// to delete singleposts
export const deletePost=async(id)=>{
    return commonRequest('DELETE',`${BASE_URL}/deletepost/${id}`,"")
}

// edit singleposts
export const editPostContent=async(body,id)=>{
    return commonRequest('PUT',`${BASE_URL}/editpost/${id}`,body)
}
