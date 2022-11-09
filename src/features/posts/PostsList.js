import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { allPosts, getPostsStatus, getPostsError, fetchPosts } from "./postsSlice"
import PostsExcerpt from "./PostsExcerpt"

const PostsList = () => {
    const dispatch = useDispatch()

    const posts = useSelector(allPosts)
    const status = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
      if (status === 'idle') {
          dispatch(fetchPosts())
      }
  }, [status, dispatch])

    let content
    if (status === 'loading') {
      content = <p>"Loading..."</p>
    } else if (status === 'succeeded') {
      const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)
    } else if (status === 'failed') {
      content = <p>{error}</p>
    }

  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList