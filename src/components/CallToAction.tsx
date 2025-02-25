import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleConsultationRequest = () => {
    const phoneNumber = '5521999999999' // Replace with actual phone number
    const message = 'Olá! Gostaria de agendar uma consulta gratuita com a VirtualMark.'
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  const handleViewCases = () => {
    const casesSection = document.querySelector('#results')
    if (casesSection) {
      casesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-custom">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto text-center"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-800 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronto para
            <span className="text-gradient"> Transformar </span>
            seu Negócio?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Agende uma consulta gratuita e descubra como podemos ajudar sua empresa a alcançar novos patamares
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleConsultationRequest}
              className="button-primary"
            >
              Agendar Consulta Gratuita
            </button>
            <button
              onClick={handleViewCases}
              className="button-secondary"
            >
              Ver Mais Cases
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CallToAction