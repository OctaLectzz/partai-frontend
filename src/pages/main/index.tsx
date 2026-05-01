import { useEffect } from 'react'
import About from './components/About'
import Agenda from './components/Agenda'
import Aspirasi from './components/Aspirasi'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import MapSection from './components/MapSection'
import Navbar from './components/Navbar'
import News from './components/News'
import Preloader from './components/Preloader'
import Program from './components/Program'
import Structure from './components/Structure'
import TableData from './components/TableData'

export default function Main() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-golkar-yellow min-h-screen">
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Agenda />
      <Program />
      <Gallery />
      <News />
      <Structure />
      <TableData />
      <MapSection />
      <CTA />
      <Aspirasi />
      <Footer />
    </div>
  )
}
