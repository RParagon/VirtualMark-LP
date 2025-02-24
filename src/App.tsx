import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

// Components will be imported here as they are created
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Results from './components/Results'
import Qualification from './components/Qualification'
import Services from './components/Services'
import Expertise from './components/Expertise'
import Assessment from './components/Assessment'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main content */}
      <main className="relative">
        <Navbar />
        <Hero />
        <Results />
        <Qualification />
        <Services />
        <Expertise />
        <Assessment />
        <Testimonials />
        <CallToAction />
        <Footer />
      </main>
    </div>
  )
}

export default App