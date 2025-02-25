// BlogAdmin.tsx
import { useState } from 'react'
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
}

const BlogAdmin = () => {
  const { posts, addPost, updatePost, deletePost } = usePosts()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      featured: false
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
    return { isValid: errors.length === 0, errors }
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
    const postToSave = { ...post, imageUrl }
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
      alert('An error occurred while saving the post. Please try again.')
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
        alert('An error occurred while deleting the post. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-custom py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Gerenciar <span className="text-gradient">Blog</span>
          </h1>
          <button
            onClick={handleCreatePost}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <PlusIcon className="w-5 h-5" />
            Novo Post
          </button>
        </div>

        {isEditing ? (
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">
              {selectedPost?.id ? 'Editar Post' : 'Novo Post'}
            </h2>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault()
              selectedPost && handleSavePost(selectedPost)
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Título</label>
                <input
                  type="text"
                  value={selectedPost?.title}
                  onChange={(e) => setSelectedPost(prev => ({ ...prev!, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Resumo</label>
                <textarea
                  value={selectedPost?.excerpt}
                  onChange={(e) => setSelectedPost(prev => ({ ...prev!, excerpt: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white h-24"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Conteúdo</label>
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
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                      'emoticons', 'template', 'paste', 'searchreplace', 'visualchars',
                      'codesample', 'directionality'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media link | emoticons codesample | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    file_picker_types: 'image',
                    images_upload_url: '/api/upload-image'
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Categoria</label>
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
                  <label className="block text-sm font-medium text-gray-400 mb-2">Autor</label>
                  <input
                    type="text"
                    value={selectedPost?.author}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, author: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Data</label>
                  <input
                    type="date"
                    value={selectedPost?.date}
                    onChange={(e) => setSelectedPost(prev => ({ ...prev!, date: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tempo de Leitura</label>
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
                <label className="block text-sm font-medium text-gray-400 mb-2">URL da Imagem</label>
                <input
                  type="text"
                  value={selectedPost?.imageUrl}
                  onChange={(e) => setSelectedPost(prev => ({ ...prev!, imageUrl: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedPost?.featured}
                  onChange={(e) => setSelectedPost(prev => ({ ...prev!, featured: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 border-gray-700 rounded focus:ring-primary-500"
                  disabled={isLoading}
                />
                <label className="text-sm font-medium text-gray-400">Destacar post</label>
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
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={post.imageUrl} alt={post.title} className="w-10 h-10 rounded-lg object-cover mr-3" />
                        <div className="text-sm font-medium text-white">{post.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-500/10 text-primary-500">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{post.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
                      <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-400">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogAdmin
