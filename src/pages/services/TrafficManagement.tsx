import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useService } from '../../contexts/ServiceContext'
import { useContact } from '../../contexts/ContactContext'
import {
  ChartBarIcon,
  RocketLaunchIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const TrafficManagement = () => {
  const { setCurrentService } = useService()
  const { } = useContact()

  useEffect(() => {
    setCurrentService('Gestão de Tráfego')
    return () => setCurrentService('')
  }, [setCurrentService])

  // Enhanced container variants with spring animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
        staggerChildren: 0.2
      }
    }
  }

  // Animação genérica para itens que surgem com fade + slide
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  // Animação para seções que “pulsam” ou flutuam levemente ao passar o mouse
  const hoverVariants = {
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  }

  // Dados de métricas (para a Seção de Métricas)
  const metrics = [
    { icon: ChartBarIcon, value: '350%', label: 'ROI Médio' },
    { icon: RocketLaunchIcon, value: '10x', label: 'Aumento em Leads' },
    { icon: ArrowTrendingUpIcon, value: '-40%', label: 'Redução de CPA' }
  ]

  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col relative">
      {/* Fundo animado adicional (opcional) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(239,68,68,0.2), transparent 40%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.2), transparent 30%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        {/* Radial de fundo (hero) */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Gestão de
              <span className="text-gradient"> Tráfego </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Na VirtualMark, impulsionamos suas campanhas de anúncios para o
              próximo nível, combinando inteligência de dados e estratégias
              altamente segmentadas. Converta tráfego em <strong>resultados reais</strong>
              e maximize seu ROI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Métricas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={{...itemVariants, hover: hoverVariants.hover}}
                whileHover="hover"
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center relative overflow-hidden"
              >
                {/* Efeito sutil de “brilho” atrás do ícone */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(239,68,68,0.05), transparent 60%)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: 'linear'
                  }}
                />
                <metric.icon className="w-12 h-12 text-primary-500 mx-auto mb-4 relative z-10" />
                <p className="text-3xl font-bold text-primary-500 mb-2 relative z-10">
                  {metric.value}
                </p>
                <p className="text-gray-400 relative z-10">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Plataformas e Processo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Plataformas */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-extrabold mb-8 text-white">
              Domínio em Diversas Plataformas
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Nós da <strong>VirtualMark</strong> utilizamos as principais
              plataformas de anúncios para garantir abrangência máxima e
              resultados sólidos. Seja no Google, Meta ou outras redes,
              desenvolvemos campanhas que conversam com o público certo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Google Ads
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Campanhas de Search</li>
                  <li>• Display Network</li>
                  <li>• YouTube Ads</li>
                  <li>• Performance Max</li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Meta Ads
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li>• Facebook Ads</li>
                  <li>• Instagram Ads</li>
                  <li>• Messenger Ads</li>
                  <li>• Remarketing</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Processo */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-extrabold mb-8 text-white">
              Nosso Processo de Excelência
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 relative overflow-hidden"
                whileHover="hover"
                variants={hoverVariants}
              >
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Análise</h3>
                <p className="text-gray-400">
                  Dissecamos seu negócio, o mercado e a concorrência para traçar um
                  plano exato de ação.
                </p>
                {/* Luz suave no fundo */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(239,68,68,0.05), transparent 60%)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: 'linear'
                  }}
                />
              </motion.div>

              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 relative overflow-hidden"
                whileHover="hover"
                variants={hoverVariants}
              >
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Estratégia</h3>
                <p className="text-gray-400">
                  Desenvolvemos campanhas customizadas, do público-alvo aos
                  criativos, para impactar o cliente certo no momento exato.
                </p>
                {/* Luz suave no fundo */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(239,68,68,0.05), transparent 60%)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: 'linear'
                  }}
                />
              </motion.div>

              <motion.div
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 relative overflow-hidden"
                whileHover="hover"
                variants={hoverVariants}
              >
                <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Otimização
                </h3>
                <p className="text-gray-400">
                  Acompanhamento contínuo, testes e ajustes para manter o
                  desempenho lá em cima — e os custos sob controle.
                </p>
                {/* Luz suave no fundo */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(239,68,68,0.05), transparent 60%)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: 'linear'
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Final */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-extrabold mb-6 text-white">
              Pronto para Inovar seu Tráfego?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Fale com um de nossos especialistas aqui da{' '}
              <span className="font-bold">VirtualMark</span> e descubra como
              nossa abordagem futurista de anúncios pode levar seu negócio a
              resultados extraordinários.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold
                         hover:bg-gray-100 transition-colors duration-300 transform hover:-translate-y-1
                         shadow-lg shadow-primary-700/30"
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

export default TrafficManagement
