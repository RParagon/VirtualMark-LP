import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Cases', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contato', href: '#' }
  ]

  const languages = ['PT', 'EN', 'ES']

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-background'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold">
              <span className="text-primary-500">Virtual</span>Mark
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-primary-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Language Selector and CTA Button */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              {languages.map((lang, index) => (
                <span key={lang} className="hover:text-primary-500 cursor-pointer transition-colors">
                  {index > 0 && <span className="mx-2 text-gray-600">|</span>}
                  {lang}
                </span>
              ))}
            </div>
            <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors animate-glow shadow-lg shadow-primary-600/20">
              Entrar em Contato
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-sm"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-primary-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-800">
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    {languages.map((lang, index) => (
                      <span
                        key={lang}
                        className="hover:text-primary-500 cursor-pointer transition-colors"
                      >
                        {index > 0 && <span className="mx-2 text-gray-600">|</span>}
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 px-3">
                  <button className="w-full px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors animate-glow shadow-lg shadow-primary-600/20">
                    Entrar em Contato
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar