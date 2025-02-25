import { useState } from 'react'
import { motion } from 'framer-motion'
import BlogAdmin from './BlogAdmin'
import CaseAdmin from './CaseAdmin'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blog')

  return (
    <div className="min-h-screen bg-gradient-custom py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'blog' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Blog
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'cases' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Cases
          </button>
        </div>
        {activeTab === 'blog' ? <BlogAdmin /> : <CaseAdmin />}
      </motion.div>
    </div>
  )
}

export default AdminDashboard