import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'

export function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-canvas text-ink-primary">
      <Navigation />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <section id="hero" data-slot="hero" />
        <section id="confidence" data-slot="confidence-strip" />
        <section id="solutions" data-slot="product-collection" />
      </main>

      <Footer />
    </div>
  )
}

export default App
