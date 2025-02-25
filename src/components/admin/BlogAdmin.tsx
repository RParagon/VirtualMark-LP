import { useState, useEffect } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { usePosts } from '../../contexts/PostContext'
import { Editor } from '@tinymce/tinymce-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  imageUrl: string
  featured: boolean
  status: 'draft' | 'published'
}

const BlogAdmin = () => {
  const { posts, addPost, updatePost, deletePost } = usePosts()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [localPosts, setLocalPosts] = useState<BlogPost[]>([])
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0
  })

  useEffect(() => {
    const filteredPosts = posts.filter(p => p.status === 'published' || p.status === 'draft')
    setLocalPosts(filteredPosts)
    setDashboardStats({
      total: filteredPosts.length,
      published: filteredPosts.filter(p => p.status === 'published').length,
      draft: filteredPosts.filter(p => p.status === 'draft').length,
      featured: filteredPosts.filter(p => p.featured).length
    })
  }, [posts])

  const categories = ['marketing', 'social media', 'seo', 'analytics']

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: '',
      title: '',
      excerpt: '',
      content: '',
      category: categories[0],
      author: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      imageUrl: '/blog/default-post.jpg',
      featured: false,
      status: 'draft'
    }
    setSelectedPost(newPost)
    setIsEditing(true)
  }

  const validatePost = (post: BlogPost): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!post.title.trim()) errors.push('Title is required')
    if (!post.excerpt.trim()) errors.push('Excerpt is required')
    if (!post.content.trim()) errors.push('Content is required')
    if (!post.author.trim()) errors.push('Author is required')
    if (!post.imageUrl.trim()) errors.push('Image URL is required')
    
    if (post.imageUrl.trim() && !post.imageUrl.match(/^(\/blog\/|https?:\/\/).+/)) {
      errors.push('Image URL must start with "/blog/" or be a valid HTTP(S) URL')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const handleSavePost = async (post: BlogPost) => {
    const validation = validatePost(post)
    
    if (!validation.isValid) {
      alert('Please fix the following errors:\n' + validation.errors.join('\n'))
      return
    }

    setIsLoading(true)

    let imageUrl = post.imageUrl.trim()
    if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/blog/')) {
      imageUrl = `/blog/${imageUrl}`
    }

    const postToSave = {
      ...post,
      imageUrl
    }

    try {
      if (post.id) {
        await updatePost(postToSave)
      } else {
        const { id, ...postWithoutId } = postToSave
        await addPost(postWithoutId)
      }

      setSelectedPost(null)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving post:', error)
      alert(error instanceof Error ? error.message : 'An error occurred while saving the post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsLoading(true)
      try {
        await deletePost(postId)
      } catch (error) {
        console.error('Error deleting post:', error)
        alert(error instanceof Error ? error.message : 'An error occurred while deleting the post. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col">
      <div className="flex-1 p-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-sm">Total Posts</h3>
            <p className="text-2xl font-bold">{dashboardStats.total}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-sm">Published</h3>
            <p className="text-2xl font-bold text-green-500">{dashboardStats.published}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-sm">Drafts</h3>
            <p className="text-2xl font-bold text-yellow-500">{dashboardStats.draft}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-sm">Featured</h3>
            <p className="text-2xl font-bold text-primary-500">{dashboardStats.featured}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            Gerenciar
            <span className="text-gradient"> Blog</span>
          </h1>
          <button
            onClick={handleCreatePost}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <PlusIcon className="w-5 h-5" />
            Novo Post
          </button>
        </div>

        {isEditing ? (
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              {selectedPost?.id ? 'Editar Post' : 'Novo Post'}
            </h2>
            <form className="space-y-4 sm:space-y-6" onSubmit={(e) => {
              e.preventDefault()
              selectedPost && handleSavePost(selectedPost)
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={selectedPost?.title}
                  onChange={(e) => setSelectedPost(prev => ({ ...prev!, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Resumo
                </label>
                <textarea
                  value={selectedPost?.excerpt}
                  onChange={(e) => setSelectedPost(prev => ({ ...prev!, excerpt: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white h-24"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Conteúdo
                </label>
                <Editor
                  apiKey="mmoe8tis76cco6f84kjw97h64f1h1n5lvi8gejpqvnf0yy4h"
                  value={selectedPost?.content}
                  onEditorChange={(content: string) => setSelectedPost(prev => ({ ...prev!, content }))}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'help', 'wordcount',
                      'emoticons', 'visualchars', 'codesample', 'directionality'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | image media link | emoticons codesample | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    file_picker_types: 'image',
                    images_upload_url: '/api/upload-image' // You'll need to implement this endpoint
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Categoria
                  </label>
                  <select
                    value={selectedPost?.category}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, category: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={selectedPost?.author}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, author: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={selectedPost?.date}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, date: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Tempo de Leitura
                  </label>
                  <input
                    type="text"
                    value={selectedPost?.readTime}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, readTime: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  value={selectedPost?.imageUrl}
                  onChange={(e) => setSelectedPost(prev => ({ ...prev!, imageUrl: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  disabled={isLoading}
                />
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Publishing Options</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={selectedPost?.status}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, status: e.target.value as 'draft' | 'published' }))}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedPost?.featured}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, featured: e.target.checked }))}
                    className="w-5 h-5 text-primary-600 border-gray-700 rounded bg-gray-900/50 focus:ring-primary-500"
                    id="featured"
                    disabled={isLoading}
                  />
                  <label htmlFor="featured" className="text-sm text-gray-300 select-none cursor-pointer">Featured Post</label>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPost(null)
                    setIsEditing(false)
                  }}
                  className={`px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Featured</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                {localPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{post.title}</div>
                      <div className="text-sm text-gray-400">{post.excerpt.substring(0, 50)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-500/10 text-primary-500">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.featured ? (
                        <span className="text-primary-500">✓</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedPost(post)
                          setIsEditing(true)
                        }}
                        className="text-primary-500 hover:text-primary-400 mr-3"
                        disabled={isLoading}
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
            ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="sm:hidden space-y-4 p-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-medium text-white">{post.title}</h3>
                          <span className="text-xs text-gray-400">{post.author}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPost(post)
                            setIsEditing(true)
                          }}
                          className="p-2 text-primary-500 hover:text-primary-400 bg-gray-900/50 rounded-lg"
                          disabled={isLoading}
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-500 hover:text-red-400 bg-gray-900/50 rounded-lg"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2 py-1 rounded-full bg-primary-500/10 text-primary-500 font-semibold">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default BlogAdmin