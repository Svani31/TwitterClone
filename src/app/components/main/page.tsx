/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
interface PostProps {
  id: string;
  title: string;
  body: string;
  image: string;
  userId: string;
  createdAt: string;
  user: UserProps;
  comments: CommentProps[];
}
interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
}

interface CommentProps {
  comment: string;
  createdAt: string;
  id: string;
  postId: string;
  user: UserProps;
}
function MainPage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const respons = await fetch("http://localhost:3000/api/posts");
      const data = await respons.json();
      setPosts(data);
    };
    fetchData();
  }, []);

  // const commentHandler = async () =>{
  //   try{
  //     const respons = await fetch("http://localhost:3000/api/comments",{

  //     })
  //   }catch(error){
  //     throw error
  //   }
  // }


  return (
    <div className="flex justify-center flex-col items-center gap-6 m-6">
      {/* Post Creator Place */}
        <div>
          Post Creator
        </div>
      {/* eachpsot map */}
      {posts.map((eachPost) => {
        return (
          <div
            key={eachPost.id}
            style={{ width: "700px" }}
            className="p-4 rounded-md items-start flex flex-col bg-slate-700"
          >
            <div className="bg-transparent pt-3 pb-3 flex gap-3 item-center text-center">
              <img
                className="rounded-3xl"
                style={{ width: "30px", height: "30px" }}
                src={eachPost.user.image}
                alt="User Image"
              />
              <h3 className="bg-transparent text-white text-2xl font-bold">
                {" "}
                - {eachPost.user.name}
              </h3>
            </div>
            <h1 className="bg-transparent text-white text-4xl">
              {eachPost.title}
            </h1>
            <h3
              style={{ width: "600px" }}
              className="pb-4 pt-4 text-ellipsis overflow-hidden bg-transparent text-2xl text-white"
            >
              {eachPost.body}
            </h3>
            {eachPost.image ? ( <img
              className="rounded-md items-center justify-center flex"
              style={{ width: "100%", height: "400px" }}
              src={eachPost.image}
              alt=""
            />) : ("")}
            {/* commentars */}
            {eachPost.comments.map((eachComm)=>{
              const commentData = new Date(eachComm.createdAt)

              const formattedData = commentData.toLocaleString()
              return(
                <div key={eachComm.id} style={{position:"relative"}} className="rounded-xl flex items-center p-2 mt-4 m-auto w-full">
              <img
              className="rounded-3xl"
                style={{ width: "40px", height: "40px" }}
                src={eachComm.user.image}
                alt="imsdfgisjf"
              />
              <div className="ml-4 mb-4">
                <h4 className="text-white font-bold">{eachComm.user.name}</h4>
                <h6 className="flex gap-5 text-white">
                  {eachComm.comment}
                </h6>
            </div>
            <span style={{position:"absolute",right:"2%",bottom:"8%"}} className="text-white">{formattedData}</span>
            </div>
              )
            })}
            {/* to Write a commentar */}
            <div className="rounded-xl flex items-center p-4 mt-4 m-auto w-full justify-between">
              <input
                className="w-full border-none outline-none text-white"
                placeholder="Write A Comment Here"
              />
              <button className="border-white p-1">Comment</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;