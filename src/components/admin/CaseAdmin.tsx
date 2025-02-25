import { useState, useEffect } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCases } from '../../contexts/CaseContext'
import { Editor } from '@tinymce/tinymce-react'
import { supabase } from '../../lib/supabase'

interface CaseData {
  id: string
  title: string
  slug: string
  description: string
  challenge: string
  solution: string
  results: string
  client_name: string
  client_industry: string
  client_size: string
  client_testimonial?: string
  client_role?: string
  duration: string
  image_url: string
  featured: boolean
  tools: string[]
  metrics: Array<{ value: string; label: string }>
  gallery?: string[]
  status: 'draft' | 'published'
}

const CaseAdmin = () => {
  const { cases, refreshCases } = useCases()
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [localCases, setLocalCases] = useState<CaseData[]>([])
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0
  })

  useEffect(() => {
    setLocalCases(cases)
    setDashboardStats({
      total: cases.length,
      published: cases.filter(c => c.status === 'published').length,
      draft: cases.filter(c => c.status === 'draft').length,
      featured: cases.filter(c => c.featured).length
    })
  }, [cases])

  const industries = ['technology', 'healthcare', 'finance', 'retail', 'education', 'other']
  const clientSizes = ['small', 'medium', 'large', 'enterprise']

  const handleCreateCase = () => {
    const newCase: CaseData = {
      id: '',
      title: '',
      slug: '',
      description: '',
      challenge: '',
      solution: '',
      results: '',
      client_name: '',
      client_industry: industries[0],
      client_size: clientSizes[0],
      duration: '',
      image_url: '',
      featured: false,
      tools: [],
      metrics: [],
      status: 'draft'
    }
    setSelectedCase(newCase)
    setIsEditing(true)
  }

  const validateCase = (caseData: CaseData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!caseData.title.trim()) errors.push('Title is required')
    if (!caseData.slug.trim()) errors.push('Slug is required')
    if (!caseData.description.trim()) errors.push('Description is required')
    if (!caseData.challenge.trim()) errors.push('Challenge is required')
    if (!caseData.solution.trim()) errors.push('Solution is required')
    if (!caseData.results.trim()) errors.push('Results is required')
    if (!caseData.client_name.trim()) errors.push('Client name is required')
    if (!caseData.duration.trim()) errors.push('Duration is required')
    if (!caseData.image_url.trim()) errors.push('Image URL is required')
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const handleSaveCase = async (caseData: CaseData) => {
    const validation = validateCase(caseData)
    
    if (!validation.isValid) {
      alert('Please fix the following errors:\n' + validation.errors.join('\n'))
      return
    }

    // Sanitize and format the HTML content
    const formattedCase = {
      ...caseData,
      challenge: caseData.challenge.trim(),
      solution: caseData.solution.trim(),
      results: caseData.results.trim(),
      slug: caseData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      tools: caseData.tools || [],
      metrics: caseData.metrics || [],
      status: caseData.status || 'draft'
    }

    setIsLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Authentication required. Please log in again.')
      }

      const { error } = await supabase
        .from('cases')
        .upsert([
          {
            ...formattedCase,
            id: formattedCase.id || undefined,
            created_at: undefined
          }
        ], { defaultToNull: false })

      if (error) {
        if (error.code === '403') {
          throw new Error('You do not have permission to perform this action. Please check your access rights.')
        }
        throw error
      }

      await refreshCases()
      setSelectedCase(null)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving case:', error)
      alert(error instanceof Error ? error.message : 'An error occurred while saving the case. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCase = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this case?')) {
      return
    }
  
    setIsLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Authentication required. Please log in again.')
      }
  
      const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id)
  
      if (error) {
        if (error.code === '403') {
          throw new Error('You do not have permission to delete this case.')
        }
        throw error
      }
  
      await refreshCases()
    } catch (error) {
      console.error('Error deleting case:', error)
      alert(error instanceof Error ? error.message : 'An error occurred while deleting the case. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-custom py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Gerenciar
            <span className="text-gradient"> Cases</span>
          </h1>
          <button
            onClick={handleCreateCase}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <PlusIcon className="w-5 h-5" />
            Novo Case
          </button>
        </div>

        {!isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2">Total Cases</h3>
              <p className="text-3xl font-bold text-primary-500">{dashboardStats.total}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2">Published</h3>
              <p className="text-3xl font-bold text-green-500">{dashboardStats.published}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2">Drafts</h3>
              <p className="text-3xl font-bold text-yellow-500">{dashboardStats.draft}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2">Featured</h3>
              <p className="text-3xl font-bold text-purple-500">{dashboardStats.featured}</p>
            </div>
          </div>
        )}

        {isEditing ? (
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6">
              {selectedCase?.id ? 'Editar Case' : 'Novo Case'}
            </h2>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault()
              selectedCase && handleSaveCase(selectedCase)
            }}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={selectedCase?.title}
                    onChange={(e) => setSelectedCase(prev => ({ ...prev!, title: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={selectedCase?.slug}
                    onChange={(e) => setSelectedCase(prev => ({ ...prev!, slug: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Descrição
                </label>
                <textarea
                  value={selectedCase?.description}
                  onChange={(e) => setSelectedCase(prev => ({ ...prev!, description: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white h-24"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Desafio
                </label>
                <Editor
                  apiKey="mmoe8tis76cco6f84kjw97h64f1h1n5lvi8gejpqvnf0yy4h"
                  value={selectedCase?.challenge}
                  onEditorChange={(content: string) => setSelectedCase(prev => ({ ...prev!, challenge: content }))}
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Solução
                </label>
                <Editor
                  apiKey="mmoe8tis76cco6f84kjw97h64f1h1n5lvi8gejpqvnf0yy4h"
                  value={selectedCase?.solution}
                  onEditorChange={(content: string) => setSelectedCase(prev => ({ ...prev!, solution: content }))}
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  disabled={isLoading}
                />

                <Editor
                  apiKey="mmoe8tis76cco6f84kjw97h64f1h1n5lvi8gejpqvnf0yy4h"
                  value={selectedCase?.results}
                  onEditorChange={(content: string) => setSelectedCase(prev => ({ ...prev!, results: content }))}
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Resultados
                </label>
                <Editor
                  apiKey="mmoe8tis76cco6f84kjw97h64f1h1n5lvi8gejpqvnf0yy4h"
                  value={selectedCase?.results}
                  onEditorChange={(content: string) => setSelectedCase(prev => ({ ...prev!, results: content }))}
                  init={{
                    height: 300,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Nome do Cliente
                  </label>
                  <input
                    type="text"
                    value={selectedCase?.client_name}
                    onChange={(e) => setSelectedCase(prev => ({ ...prev!, client_name: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Indústria
                  </label>
                  <select
                    value={selectedCase?.client_industry}
                    onChange={(e) => setSelectedCase(prev => ({ ...prev!, client_industry: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>
                        {industry.charAt(0).toUpperCase() + industry.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Tamanho do Cliente
                  </label>
                  <select
                    value={selectedCase?.client_size}
                    onChange={(e) => setSelectedCase(prev => ({ ...prev!, client_size: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    disabled={isLoading}
                  >
                    {clientSizes.map(size => (
                      <option key={size} value={size}>
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Duração
                  </label>
                  <input
                    type="text"
                    value={selectedCase?.duration}
                    onChange={(e) => setSelectedCase(prev => ({ ...prev!, duration: e.target.value }))}
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
                  value={selectedCase?.image_url}
                  onChange={(e) => setSelectedCase(prev => ({ ...prev!, image_url: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Métricas Principais
                </label>
                <div className="space-y-4">
                  {selectedCase?.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => {
                          const newMetrics = [...selectedCase.metrics]
                          newMetrics[index] = { ...metric, value: e.target.value }
                          setSelectedCase(prev => ({ ...prev!, metrics: newMetrics }))
                        }}
                        placeholder="Valor"
                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        disabled={isLoading}
                      />
                      <input
                        type="text"
                        value={metric.label}
                        onChange={(e) => {
                          const newMetrics = [...selectedCase.metrics]
                          newMetrics[index] = { ...metric, label: e.target.value }
                          setSelectedCase(prev => ({ ...prev!, metrics: newMetrics }))
                        }}
                        placeholder="Descrição"
                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newMetrics = selectedCase.metrics.filter((_, i) => i !== index)
                          setSelectedCase(prev => ({ ...prev!, metrics: newMetrics }))
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        disabled={isLoading}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newMetrics = [...selectedCase!.metrics, { value: '', label: '' }]
                      setSelectedCase(prev => ({ ...prev!, metrics: newMetrics }))
                    }}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400
                             hover:bg-gray-700 hover:text-white transition-colors flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Métrica
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCase(null)
                    setIsEditing(false)
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {localCases.map(caseItem => (
              <div
                key={caseItem.id}
                className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium">{caseItem.title}</h3>
                  <p className="text-gray-400">{caseItem.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCase(caseItem)
                      setIsEditing(true)
                    }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCase(caseItem.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CaseAdmin