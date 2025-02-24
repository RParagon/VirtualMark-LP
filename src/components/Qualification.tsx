import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const Qualification = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Opções do formulário (checklist)
  const checklistItems = [
    'Aumentar o retorno dos seus investimentos em anúncios pagos',
    'Atrair leads qualificados e aumentar conversões',
    'Elevar a performance de suas campanhas com estratégias avançadas de tráfego pago',
    'Conectar-se de forma eficaz com seu público-alvo',
    'Criar anúncios que se destaquem e gerem resultados'
  ]

  // Estado que armazena quais itens estão selecionados
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Função para lidar com (des)seleção de cada item
  const handleToggle = (item: string) => {
    setSelectedItems((prevSelected) => {
      // Se o item já estava selecionado, removemos; caso contrário, adicionamos
      if (prevSelected.includes(item)) {
        return prevSelected.filter((it) => it !== item)
      } else {
        return [...prevSelected, item]
      }
    })
  }

  // Verifica se o usuário marcou pelo menos 3 itens
  const hasMinimumSelected = selectedItems.length >= 3

  // Função que gera o link do WhatsApp contendo as respostas
  const handleWhatsAppRedirect = () => {
    if (!hasMinimumSelected) return // opcional, se quiser bloquear caso < 3

    // Monte a mensagem
    const baseMessage = `Olá, tenho interesse em falar com a VirtualMark.\nMarquei as seguintes necessidades:`
    const listItems = selectedItems.map((item) => `\n- ${item}`).join('')
    const finalMessage = `${baseMessage}${listItems}`

    // Substitua pelo número de telefone e texto que desejar
    const phoneNumber = '5521999999999' // Exemplo: +55 (21) 99999-9999
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(finalMessage)}`

    window.open(whatsappURL, '_blank')
  }

  // Animações (iguais às originais)
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-rocket-bg">
      {/* Background translúcido por cima da imagem de foguete */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 z-0" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Título */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Está na dúvida se a
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text">
              {' '}VirtualMark{' '}
            </span>
            é ideal para você?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Marque as alternativas que mais condizem com a sua necessidade atual:
          </p>
        </motion.div>

        {/* Checklists e imagem/flutuação à direita */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Coluna com checkboxes */}
          <div className="space-y-6">
            {checklistItems.map((item, index) => {
              // Item está selecionado?
              const isSelected = selectedItems.includes(item)

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  // Troca a cor da borda se estiver selecionado
                  className={`flex items-center space-x-4 bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border 
                    ${
                      isSelected
                        ? 'border-primary-500/50'
                        : 'border-gray-800 hover:border-primary-500/50'
                    }
                    transition-all duration-300 cursor-pointer
                  `}
                  // Toggle ao clicar
                  onClick={() => handleToggle(item)}
                >
                  {/* Ícone (pode mudar a cor se estiver selecionado) */}
                  <CheckCircleIcon
                    className={`h-6 w-6 flex-shrink-0 
                      ${isSelected ? 'text-primary-500' : 'text-gray-600'}
                    `}
                  />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Coluna da animação/flutuação (apenas em telas médias pra cima) */}
          <motion.div
            variants={itemVariants}
            className="relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent animate-pulse" />
            <div className="h-full flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary-500/20 to-primary-700/20 rounded-full animate-float shadow-2xl" />
            </div>
          </motion.div>
        </motion.div>

        {/* Botão final -> redireciona para WhatsApp */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <button
            className={`px-8 py-3 text-white rounded-lg font-semibold transition-colors animate-glow shadow-lg 
              shadow-primary-600/20 
              ${
                hasMinimumSelected
                  ? 'bg-primary-600 hover:bg-primary-700 cursor-pointer'
                  : 'bg-gray-700 cursor-not-allowed'
              }
            `}
            onClick={handleWhatsAppRedirect}
          >
            Fale Conosco
          </button>
          {/* Opcional: mensagem de aviso se < 3 itens */}
          {!hasMinimumSelected && (
            <p className="text-sm text-gray-500 mt-2">
              Selecione pelo menos 3 opções para continuar.
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Qualification
