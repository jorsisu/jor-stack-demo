import { Contact } from './components/Contact'
import { Expertise } from './components/Expertise'
import { FeaturedProject } from './components/FeaturedProject'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { ProductCollection } from './components/ProductCollection'

export function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-canvas text-ink-primary">
      <Navigation />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <Hero />
        <ProductCollection />
        <Expertise />
        <FeaturedProject />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
