import React from 'react'

function RecentBlogPost({ data }) {
  console.log(data)
  return (
    <div>
      <p>
        {JSON.stringify(data)}
      </p>
      <p>hello world</p>
    </div>
  )
}

export default RecentBlogPost