import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {
  const user=useSelector((store)=>store?.user?.data)
  return (
    
      user && (
        <div className='flex justify-center my-10'>
        <div className="card glass w-96">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="car!" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{</h2>
          <p>How to park your car at your garage?</p>
          <div className='mt-2 flex justify-between '>
          <div className="card-actions justify-start me-3">
            <button className="btn btn-primary">Dislike</button>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Like</button>
          </div>
          </div>
        </div>
      </div>
      </div>
      )
    
   
  )
}

export default Feed