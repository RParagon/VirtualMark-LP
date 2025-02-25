// Services.tsx
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { RocketLaunchIcon, ChartBarIcon, GlobeAltIcon, DocumentChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline'

const Services = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.3, duration: 0.8, ease: "easeOut" }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.05, rotateZ: 1, transition: { duration: 0.3, ease: "easeInOut" } }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, rotateY: -15 },
    visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: {
      scale: 1.03,
      rotateY: 5,
      boxShadow: "0 25px 35px -5px rgba(239, 68, 68, 0.2), 0 15px 15px -5px rgba(239, 68, 68, 0.1)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  const pillarVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { x: 5, transition: { duration: 0.3, ease: "easeInOut" } }
  }

  // Removida a variável "services" não utilizada

  const consultingBlocks = [
    {
      title: 'Consultoria',
      description: 'Análise estratégica personalizada para identificar oportunidades de crescimento e otimizar processos.'
    },
    {
      title: 'Dados',
      description: 'Transformação de dados brutos em insights acionáveis para decisões mais precisas e estratégicas.'
    },
    {
      title: 'Tecnologia',
      description: 'Implementação de soluções inovadoras para automatizar processos e ampliar eficiência.'
    }
  ]

  const pillars = [
    {
      title: 'Tráfego',
      description: 'Atração vai além de anúncios, envolve diversas ações como otimização de site e parcerias.'
    },
    {
      title: 'Engajamento',
      description: 'Acompanhamos a interação do usuário em todos os pontos de contato para otimizar resultados.'
    },
    {
      title: 'Conversão',
      description: 'Análise completa do funil de conversão para maximizar resultados e reduzir custos.'
    },
    {
      title: 'Retenção',
      description: 'Estratégias personalizadas de pós-venda para garantir a fidelização e recorrência.'
    }
  ]

  const metrics = [
    { label: 'Vendas', value: 'R$ 618.000,91' },
    { label: 'Conversões', value: '14.322' }
  ]

  const chartPathVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: "loop" }
    }
  }

  return (
    <section ref={containerRef} className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-custom overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent pointer-events-none"
      />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-24">
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4 border border-primary-500/20 backdrop-blur-sm"
          >
            <SparklesIcon className="w-4 h-4" />
            Nossos Serviços
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            O que a <span className="text-gradient">Virtual Mark</span> pode fazer por você?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transforme sua presença digital com soluções personalizadas e resultados mensuráveis
          </p>
        </motion.div>

        {/* Mockup de celular e cards */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <motion.div variants={itemVariants} className="relative flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-gray-900/50 backdrop-blur-sm rounded-[40px] border-4 border-gray-800 overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />
              <div className="absolute inset-0 top-6 p-4">
                <div className="w-full h-full bg-black/90 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-700">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 600">
                    <line x1="30" y1="100" x2="270" y2="100" stroke="#374151" strokeWidth="2" />
                    <line x1="30" y1="300" x2="270" y2="300" stroke="#374151" strokeWidth="2" />
                    <line x1="30" y1="500" x2="270" y2="500" stroke="#374151" strokeWidth="2" />
                  </svg>
                  <motion.svg className="w-[80%] h-[80%]" viewBox="0 0 300 300">
                    <motion.path
                      d="M 20 280 Q 60 220 100 200 Q 140 180 180 120 Q 220 80 280 90"
                      stroke="url(#gradientChart)"
                      strokeWidth="4"
                      fill="none"
                      variants={chartPathVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <defs>
                      <linearGradient id="gradientChart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </div>
              </div>
            </div>
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`absolute ${index === 0 ? 'top-1/4 -left-4' : 'bottom-1/4 -right-4'} bg-gray-900/90 backdrop-blur-sm p-4 rounded-xl border border-gray-800 shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
              >
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className="text-xl font-bold text-primary-500">{metric.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={containerVariants} className="flex flex-col gap-8">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 transform transition-all duration-300"
            >
              <RocketLaunchIcon className="w-12 h-12 text-primary-500 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Tráfego Pago</h3>
              <p className="text-gray-400">
                Gestão dos seus anúncios online no Google, Instagram, Linkedin, Pinterest, YouTube e mais. Atraímos seus clientes para seu funil de vendas com estratégias otimizadas.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 transform transition-all duration-300"
            >
              <ChartBarIcon className="w-12 h-12 text-primary-500 mb-6" />
              <h3 className="text-xl font-semibold mb-4">CRM</h3>
              <p className="text-gray-400">
                Gerencie o relacionamento com seu cliente em um só lugar. Visualize todo o seu funil de vendas e mantenha conexão com seus clientes para vender mais.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Outros serviços, consultoria, pilares, etc. seguem igual */}
        {/* ... */}
      </motion.div>
    </section>
  )
}

export default Services
