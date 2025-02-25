import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ChartBarIcon, ArrowTrendingUpIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline'

const PerformanceMarketing = () => {
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

  // KPIs data
  const kpis = [
    { icon: ChartBarIcon, value: '45%', label: 'Aumento em CTR' },
    { icon: ArrowTrendingUpIcon, value: '2.5x', label: 'ROI Médio' },
    { icon: PresentationChartLineIcon, value: '-35%', label: 'Redução de CPA' }
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
              <span className="text-gradient"> Performance </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Otimize suas campanhas com base em dados e alcance resultados mensuráveis.
              Aumente seu ROI com estratégias orientadas por performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kpis.map((kpi, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center"
              >
                <kpi.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <p className="text-3xl font-bold text-primary-500 mb-2">{kpi.value}</p>
                <p className="text-gray-400">{kpi.label}</p>
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
          {/* Optimization Strategies */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Estratégias de Otimização</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Testes A/B</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Otimização de Títulos</li>
                  <li>• Testes de Imagens</li>
                  <li>• Variações de CTA</li>
                  <li>• Landing Pages</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Análise de Dados</h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Tracking Avançado</li>
                  <li>• Análise de Funil</li>
                  <li>• Segmentação</li>
                  <li>• Relatórios Personalizados</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Performance Pillars */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Pilares de Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Métricas</h3>
                <p className="text-gray-400">Acompanhamento detalhado de KPIs relevantes para seu negócio</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Otimização</h3>
                <p className="text-gray-400">Ajustes contínuos baseados em dados para maximizar resultados</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Escalabilidade</h3>
                <p className="text-gray-400">Estratégias para crescimento sustentável e resultados consistentes</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Quer Melhorar seus Resultados?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Descubra como nossa abordagem orientada por dados pode transformar
              suas campanhas em máquinas de resultados.
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

export default PerformanceMarketing