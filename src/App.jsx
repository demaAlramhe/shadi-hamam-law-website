import { LanguageProvider } from './context/LanguageProvider'
import { AccessibilityProvider } from './context/AccessibilityProvider'
import { useScrollSpy } from './hooks/useScrollSpy'
import { SkipLink } from './components/SkipLink'
import { AccessibilityWidget } from './components/AccessibilityWidget'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { WhyChooseUs } from './components/WhyChooseUs'
import { Process } from './components/Process'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { BackToTop } from './components/BackToTop'
import { JsonLd } from './components/JsonLd'

const SECTION_IDS = ['hero', 'about', 'services', 'why', 'process', 'faq', 'contact']

function AppContent() {
  const activeId = useScrollSpy(SECTION_IDS)

  return (
    <>
      <SkipLink />
      <JsonLd />
      <Header activeId={activeId} />
      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none [&:focus]:ring-2 [&:focus]:ring-gold-500/55 [&:focus]:ring-offset-4 [&:focus]:ring-offset-charcoal-950"
      >
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
      <AccessibilityWidget />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider defaultLocale="he">
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </LanguageProvider>
  )
}
