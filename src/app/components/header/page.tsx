/* eslint-disable @next/next/no-img-element */

"use client";
import React from "react";

import { signOut, useSession } from "next-auth/react";
export default function Header() {

  const { data: session, status } = useSession();
  
  return (
    <div className="flex justify-between p-2">
      <div className="flex text-center justify-center gap-3 text-white font-bold text-2xl">
        <img
          style={{ width: "40px", height: "40px", borderRadius: "50px" }}
          src={session?.user?.image || ""}
          alt=""
        />
        <h1 className="flex justify-end text-center items-center">
          {session?.user?.name}
        </h1>
      </div>
      <button
        className="text-white bg-emerald-900 p-3 rounded-xl font-bold cursor-pointer"
        onClick={() => signOut()}
      >
        Log Out
      </button>
    </div>
  );
}
