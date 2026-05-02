import Preloader from '@/components/preloader'
import { useEffect } from 'react'
import AboutSection from './components/about'
import AspirastionsSection from './components/aspirations'
import CTASection from './components/cta'
import EventsSection from './components/events'
import Footer from './components/footer'
import GallerySection from './components/gallery'
import HeroSection from './components/hero'
import MapSection from './components/map'
import Navbar from './components/navbar'
import NewsSection from './components/news'
import ProgramSection from './components/program'
import StructureSection from './components/structure'
import TableDataSection from './components/table-data'

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
    <div className="min-h-screen bg-golkar-yellow">
      <Preloader />

      <Navbar />

      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ProgramSection />
      <GallerySection />
      <NewsSection />
      <StructureSection />
      <TableDataSection />
      <MapSection />
      <CTASection />
      <AspirastionsSection />

      <Footer />
    </div>
  )
}
