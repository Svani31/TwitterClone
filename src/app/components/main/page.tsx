/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
interface PostProps {
  id: string;
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
  userId: string;
  postId: string;
  user: UserProps;
}

interface CreatePostProps {
  body: string;
  image: string;
}

function MainPage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [createPost, setCreatePost] = useState<CreatePostProps>({
    body: "",
    image: "",
  });
  const [createComment, setCreateComment] = useState<string>("");
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const respons = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_API_URL}/api/posts`);
      const data = await respons.json();
      setPosts(data);
    };
    fetchData();
  }, []);
  const createPostHandler = (e: any) => {
    setCreatePost({ ...createPost, [e.target.name]: e.target.value });
  };
  //@ts-ignore
  const userId: string = session?.user?.id;
  const uploadPostHandler = async () => {
    const { body } = createPost;
    if (body.length > 1) {
      try {
        const respons = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_API_URL}/api/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: createPost.body,
            image: createPost.image,
            userId: userId,
          }),
        });
        if (respons) {
          window.location.reload();
          // setPosts((prevPost:any) => [...prevPost,respons.json()])

        }
        console.log(respons, "this is respons");
      } catch (error) {
        throw error;
      }
    } else {
      alert("Pleace Enter Something");
    }
  };

  const createCommentHandler = async (postId: string) => {
    try {
      const respons = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_API_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: createComment,
          userId: userId,
          postId: postId,
        }),
      });
      console.log(respons, "this is respons");
      if(respons){
        window.location.reload()
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex justify-center flex-col items-center gap-6 m-6">
      {/* Post Creator Place */}
      <div
        style={{ width: "500px" }}
        className="gap-2 text-center flex-col bg-slate-700 p-5 flex justify-center rounded-xl"
      >
        <h1 className="bg-transparent">Create Your Post</h1>
        <input
          value={createPost.body}
          onChange={createPostHandler}
          name="body"
          className="outline-none border-none rounded-lg p-1"
          placeholder="About Your Post"
        />
        <input
          value={createPost.image}
          onChange={createPostHandler}
          name="image"
          className="outline-none border-none rounded-lg p-1"
          placeholder="Enter Image URL"
        />
        <button
          onClick={() => uploadPostHandler()}
          style={{ width: "50%" }}
          className=" flex justify-center items-center text-center m-auto text-white bg-slate-900 rounded-2xl"
        >
          Upload Your Post
        </button>
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
            <h3
              style={{ width: "600px" }}
              className="pb-4 pt-4 text-ellipsis overflow-hidden bg-transparent text-2xl text-white"
            >
              {eachPost.body}
            </h3>
            {eachPost.image ? (
              <img
                className="rounded-md items-center justify-center flex"
                style={{ width: "100%", height: "400px" }}
                src={eachPost.image}
                alt=""
              />
            ) : (
              ""
            )}
            {/* commentars */}
            {eachPost.comments.map((eachComm) => {
              const commentData = new Date(eachComm.createdAt);

              const formattedData = commentData.toLocaleString();
              return (
                <div
                  key={eachComm.id}
                  style={{ position: "relative" }}
                  className="rounded-xl flex items-center p-2 mt-4 m-auto w-full"
                >
                  <img
                    className="rounded-3xl"
                    style={{ width: "40px", height: "40px" }}
                    src={eachComm.user.image}
                    alt="imsdfgisjf"
                  />
                  <div className="ml-4 mb-4">
                    <h4 className="text-white font-bold">
                      {eachComm.user.name}
                    </h4>
                    <h6 className="flex gap-5 text-white">
                      {eachComm.comment}
                    </h6>
                  </div>
                  <span
                    style={{ position: "absolute", right: "2%", bottom: "8%" }}
                    className="text-white"
                  >
                    {formattedData}
                  </span>
                </div>
              );
            })}
            {/* to Write a commentar */}
            <div className="rounded-xl flex items-center p-4 mt-4 m-auto w-full justify-between">
              <input
                className="w-full border-none outline-none text-white"
                placeholder="Write A Comment Here"
                value={createComment}
                onChange={(e) => setCreateComment(e.target.value)}
              />
              <button
                onClick={(e) => createCommentHandler(eachPost.id)}
                className="border-white p-1"
              >
                Comment
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
