/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface registrationProps {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  image: string;
}

function SignUp() {
  const [register, setRegister] = useState<registrationProps>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAeFBMVEX///8rLzK3uLgTGR0AAAAnKy68vLshJinl5eUOEBb6+voAAAXX19cLEhfp6ekcISXz8/Q5Oz0ADRPMzMzExMWwsrNzdHZoaWrd3t4+QkRQUVKdnp9fYGEUFhltbnAhIiWLi4yBgoNISUozNDUZHh6VlpdXWFqpqanilQXxAAADiElEQVR4nO2aXbeqIBBAQyBKUdQyK600O/X//+HlfHTrVpbgjKe1Lvupt/aCmQFmHI0cDofD4XA43opIzseeN5fRrxkss0VCuKKUKk6SRbYcXsH3cp7qfz/DVcpzzx/W4cRDQW4RKT8N6DFuKL9z+FqRQzMeyCGuw8cOXx5hHQ8hsVzRVodP6EriS8yn7QvxsxzpHF1CvZLQGhRZQx5eS2iNHeqmTFpy4341JngS/vq+SDxGrPEKRzHtKEFIWmBJyENnCZ2wWKFR7gwsRIkjMVMGEoSoGYpFbmYhcgyJiBlJEBJgXH2KjaEFRUgTv+xWsC6IHL5mRKYSWgN+S+aBsUUAnyXF81vFIxACY9v1CLkgtuAWR/O44Edwi72FxR5awreygE7V97B4jx0ZrS0s1uAW75GpHxZV6wPcwqaCwz9LJibXvW8U/HPANy6evER4DRgHhoIPC70lpjc+hvI+K81yFekpMDbbEorU1TmaLIaAP9a/mZksBsV5FGmq7hqbCkti5CedOwcJYstxuevYRRGozZyOeYKVH2eyLrWLZbgSo5H3utMYetgS+ohvnp+uuwa93fnJ5Jg+kQiOiO29fziRTcu2UHIayEETVeRB55NTUg07NJoUTaDE1ZRGqKAphtqMK2SRJyxIwzBMGWvyYoBRwEP8OJp52SnzZlE87LDKcY2s9l5bKkTevh4iPma5oiJcVfI+EHxZrUJBVY52wfnrwL6uGFyxpM7kZVAXy6xO2PcgSbAS0yNa0Ms1hytFVbIut4ttuU7076u7h9hs0cpXltzdLriuVkoJcVdIVYNzuvuL1OSNyNMtQgmRidlIQC9HAp4tY2LeRdkR4IvfmJk3lPSuMFCNk+lL+QwDvG5k5t2kMxQsVWbPbnivmAIVsGXHgfJj+AHkS5lob54d14g9xAcZC9N52S2bRX8JL+wpQUj/V1Lc4XuLV3DVd09q+yS9QOt+ErJvUPxo9DtRjFpZ7fRrchkO+NvpNfrPYZZCW/QYUixtD7F7mH0F/YDakD6zkthiVtYGt67jvc7SW1Lb+KzhNkTHp2XlshmhtmM71pSQElrDrn4CnKbXWJ6sFWRY6MCorCx63rFuEXaBAbshektsJGLzMe5zApu6ZTwzfIXVTFFCrwWzSdU5ZP3+ZGrTpR9DR+fU5unsLJzF+1p4jMLCbA7VSebBkv3CDMfhcDgcDsd/yx+fnjbUFCWe8wAAAABJRU5ErkJggg==",
  });
  const [login, setLogin] = useState({
    name: "",
    password: "",
  });
  const { data: session } = useSession();
  const route = useRouter();
  const registerChangeHandler = (e: any) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    const { name, email, password, confirmpassword, image } = register;
    if (
      name &&
      email &&
      password &&
      confirmpassword &&
      image &&
      password == confirmpassword
    ) {
      const respons = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          image,
        }),
      });
      console.log(respons)
      if(respons.ok){
        alert("User Register Success");
        const loginUser = await signIn("credentials",{
          redirect:false,
          name,
          password
        })
        console.log(loginUser)
        route.push("/")
      }else{
        if (!respons.ok) return alert("this User Alredy Exist");
      }
    } else {
      console.log("error");
    }
  };
  const loginChangeHandler = (e: any) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const loginHandler = async () => {
    const { name, password } = login;
    if (!name || !password) {
      console.log("inncorect");
    } else {
      try {
        const respons = await signIn("credentials", {
          name,
          password,
          redirect: false,
        });
        console.log(respons);
      } catch (error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (session) {
      route.replace("/");
    }
  }, [session]);

  return (
    <div className="flex justify-center mt-36">
      {/* register */}
      <div className="border-2 p-5 flex flex-col text-center gap-5 rounded-xl">
        <h1 className="font-bold text-white text-xl">Registartion</h1>
        <div className="w-full">
          <input
            className="p-2 outline-none border-2 rounded-xl text-white"
            placeholder="Enter Your UserName"
            type="username"
            value={register.name}
            name="name"
            onChange={registerChangeHandler}
          />
        </div>
        <div className="w-full">
          <input
            className="p-2 outline-none border-2 rounded-xl text-white"
            placeholder="Enter Your Email"
            type="email"
            name="email"
            value={register.email}
            onChange={registerChangeHandler}
          />
        </div>
        <div className="w-full">
          <input
            className="p-2 outline-none border-2 rounded-xl text-white"
            placeholder="Enter Your Password"
            type="Password"
            name="password"
            value={register.password}
            onChange={registerChangeHandler}
          />
        </div>
        <div className="w-full">
          <input
            className="p-2 outline-none border-2 rounded-xl text-white"
            placeholder="Confirm Your Password"
            type="password"
            name="confirmpassword"
            value={register.confirmpassword}
            onChange={registerChangeHandler}
          />
        </div>
        <div className="w-full">
          <input
            className="p-2 outline-none border-2 rounded-xl text-white"
            placeholder="Enter Image Addres"
            name="image"
            value={register.image}
            onChange={registerChangeHandler}
          />
        </div>
        <button
          onClick={() => registerHandler()}
          className="bg-white p-2 rounded-xl "
        >
          Sign Up
        </button>
      </div>
      {/* login */}
      <div className="border-2 p-5 flex flex-col text-center gap-5 rounded-xl">
        <h1 className="font-bold text-white text-xl">Registartion</h1>
        <div className="w-full">
          <input
            className="p-2 outline-none border-2 rounded-xl text-white"
            placeholder="Enter Your UserName"
            type="username"
            value={login.name}
            name="name"
            onChange={loginChangeHandler}
          />
        </div>
        <div className="w-full">
          <input
            className="p-2 outline-none border-2 rounded-xl text-white"
            placeholder="Enter Your Password"
            type="Password"
            name="password"
            value={login.password}
            onChange={loginChangeHandler}
          />
        </div>
        <button
          onClick={() => loginHandler()}
          className="bg-white p-2 rounded-xl "
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default SignUp;
