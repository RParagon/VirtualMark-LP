import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Post, NewPost, UpdatePost } from '../types/supabase'

type BlogPost = Omit<Post, 'created_at' | 'read_time' | 'image_url'> & {
  readTime: string
  imageUrl: string
}

interface PostContextType {
  posts: BlogPost[]
  addPost: (post: Omit<BlogPost, 'id'>) => void
  updatePost: (post: BlogPost) => void
  deletePost: (id: string) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
      return
    }

    if (data) {
      const formattedPosts: BlogPost[] = data.map((post: Post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        date: post.date,
        readTime: post.read_time,
        imageUrl: post.image_url,
        featured: post.featured
      }))
      setPosts(formattedPosts)
    }
  }

  useEffect(() => {
    fetchPosts()

    const postsSubscription = supabase
      .channel('posts-channel')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          const newPost = payload.new as Post
          setPosts(currentPosts => [{
            id: newPost.id,
            title: newPost.title,
            excerpt: newPost.excerpt,
            content: newPost.content,
            category: newPost.category,
            author: newPost.author,
            date: newPost.date,
            readTime: newPost.read_time,
            imageUrl: newPost.image_url,
            featured: newPost.featured
          }, ...currentPosts])
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        (payload) => {
          const updatedPost = payload.new as Post
          setPosts(currentPosts =>
            currentPosts.map(post =>
              post.id === updatedPost.id
                ? {
                    id: updatedPost.id,
                    title: updatedPost.title,
                    excerpt: updatedPost.excerpt,
                    content: updatedPost.content,
                    category: updatedPost.category,
                    author: updatedPost.author,
                    date: updatedPost.date,
                    readTime: updatedPost.read_time,
                    imageUrl: updatedPost.image_url,
                    featured: updatedPost.featured
                  }
                : post
            )
          )
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'posts' },
        (payload) => {
          const deletedPostId = payload.old.id
          setPosts(currentPosts =>
            currentPosts.filter(post => post.id !== deletedPostId)
          )
        }
      )
      .subscribe()

    return () => {
      postsSubscription.unsubscribe()
    }
  }, [])

  const addPost = async (post: Omit<BlogPost, 'id'>): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      console.error('Authentication required')
      return false
    }

    const newPost: NewPost = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      date: post.date,
      read_time: post.readTime,
      image_url: post.imageUrl,
      featured: post.featured
    }

    const { error } = await supabase.from('posts').insert(newPost)

    if (error) {
      console.error('Error adding post:', error)
      return false
    }

    return true
  }

  const updatePost = async (post: BlogPost): Promise<boolean> => {
    const updatedPost: UpdatePost = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      date: post.date,
      read_time: post.readTime,
      image_url: post.imageUrl,
      featured: post.featured
    }

    const { error } = await supabase
      .from('posts')
      .update(updatedPost)
      .eq('id', post.id)

    if (error) {
      console.error('Error updating post:', error)
      return false
    }

    return true
  }

  const deletePost = async (id: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
      return false
    }

    return true
  }

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider')
  }
  return context
}