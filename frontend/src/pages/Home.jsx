import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
     <div className="min-h-screen flex-col items-center justify-center p-4">
        <Link
          to={"/signup"}
          className={`w-3xs h-10  mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
        >
          Sign up
        </Link>
        <Link
          to={"/signin"}
          className={`w-3xs h-10  mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
        >
          Sign in
        </Link>
        <Link
          to={"/forgot-password"}
          className={`w-3xs h-10  mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
        >
          Forgot Password
        </Link>
      </div>
  )
}

export default Home