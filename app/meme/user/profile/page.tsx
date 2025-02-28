"use client"

import React from 'react'
import { useSession } from 'next-auth/react'


const Profile = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (status === "unauthenticated" || !session) {
    return <div className="flex justify-center items-center min-h-screen">Please sign in to view your profile</div>
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:shrink-0">
          {session.user?.image ? (
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={session.user.image}
              alt={session.user.name || "Profile picture"}
              width={192}
              height={192}
            />
          ) : (
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center md:h-full md:w-48">
              <span className="text-gray-500 text-2xl">No Image</span>
            </div>
          )}
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Profile</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{session.user?.name || "User"}</h2>
          <p className="mt-2 text-slate-500">{session.user?.email || "No email provided"}</p>
          {session.user?.role && (
            <p className="mt-2 text-slate-500">Role: {session.user.role}</p>
          )}
          {session.expires && (
            <p className="mt-4 text-xs text-gray-400">Session expires: {new Date(session.expires).toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile