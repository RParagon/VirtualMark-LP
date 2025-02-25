import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { DocumentTextIcon, GlobeAltIcon, MegaphoneIcon } from '@heroicons/react/24/outline'

const ContentMarketing = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  // Content types data
  const contentTypes = [
    { icon: DocumentTextIcon, title: 'Blog Posts', description: 'Conteúdo otimizado para SEO' },
    { icon: GlobeAltIcon, title: 'Redes Sociais', description: 'Engajamento e autoridade' },
    { icon: MegaphoneIcon, title: 'Email Marketing', description: 'Nutrição de leads' }
  ]

  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Marketing de
              <span className="text-gradient"> Conteúdo </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Atraia, engaje e converta seu público-alvo com conteúdo relevante e estratégico.
              Construa autoridade e gere resultados orgânicos consistentes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contentTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center"
              >
                <type.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-400">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Strategy Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Estratégia de Conteúdo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Planejamento Editorial</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Pesquisa de Palavras-chave</li>
                  <li>• Calendário Editorial</li>
                  <li>• Personas</li>
                  <li>• Jornada do Cliente</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Produção e Distribuição</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Criação de Conteúdo</li>
                  <li>• Otimização SEO</li>
                  <li>• Social Media</li>
                  <li>• Email Marketing</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Benefícios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Autoridade</h3>
                <p className="text-gray-400">Estabeleça-se como referência no seu segmento</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Tráfego Orgânico</h3>
                <p className="text-gray-400">Atraia visitantes qualificados sem investir em mídia paga</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Engajamento</h3>
                <p className="text-gray-400">Construa relacionamentos duradouros com sua audiência</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Pronto para Criar Conteúdo que Converte?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Descubra como nossa estratégia de conteúdo pode transformar
              visitantes em clientes fiéis.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold
                       hover:bg-gray-100 transition-colors duration-300 transform hover:-translate-y-1"
            >
              Fale com um Especialista
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default ContentMarketing