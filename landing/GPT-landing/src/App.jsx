import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

const navItems = [
  { label: 'WORK', href: '#work' },
  { label: 'PHILOSOPHY', href: '#philosophy' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CONTACT', href: '#contact' },
]

const projects = [
  {
    index: '01',
    title: 'Aster House',
    category: 'BRAND IDENTITY',
    year: '2024',
    summary:
      'A cultural residence reopened its brutalist wing with a new verbal identity, donor materials, and a wayfinding system engineered for attention at every threshold.',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    spanClass: 'md:col-span-7',
    shiftClass: 'md:-translate-y-6',
  },
  {
    index: '02',
    title: 'Nomae',
    category: 'DIGITAL PRODUCT',
    year: '2025',
    summary:
      'Launch platform for an architecture-led skincare label where clinical precision met editorial softness, built around storytelling, commerce, and ritual pacing.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    spanClass: 'md:col-span-5',
    shiftClass: 'md:translate-y-10',
  },
  {
    index: '03',
    title: 'Kite Bureau',
    category: 'SPATIAL CAMPAIGN',
    year: '2023',
    summary:
      'Exhibition graphics, title sequences, and a kinetic signage language for a research summit that refused to look like a conference.',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
    spanClass: 'md:col-span-5',
    shiftClass: 'md:-translate-y-16',
  },
  {
    index: '04',
    title: 'Helio No. 7',
    category: 'MOTION SYSTEM',
    year: '2025',
    summary:
      'Brand film language and launch choreography for a lighting manufacturer turning technical documentation into a cinematic sales instrument.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    spanClass: 'md:col-span-7',
    shiftClass: 'md:translate-y-4',
  },
]

const disciplines = ['BRANDING', 'DIGITAL', 'SPATIAL', 'MOTION']

const processSteps = [
  {
    number: '01',
    title: 'DISCOVERY',
    range: 'WEEKS 01-02',
    description:
      'We audit the category, interview the room, and locate the tension nobody else is willing to name. Research becomes raw material, not a PDF graveyard.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '02',
    title: 'STRATEGY',
    range: 'WEEKS 03-04',
    description:
      'Language, positioning, and sequencing lock into a single editorial proposition. Every decision is calibrated against what deserves the audience’s attention.',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '03',
    title: 'CRAFT',
    range: 'WEEKS 05-08',
    description:
      'Typography, motion, interfaces, and environments are composed as one system. We chase friction where it sharpens memory and remove it where it slows conviction.',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
  },
  {
    number: '04',
    title: 'LAUNCH',
    range: 'WEEKS 09-12',
    description:
      'Delivery is staged for impact: rollout films, launch assets, sales decks, social cuts, and a governance kit that keeps the work alive after the premiere.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
]

const clients = [
  'ATLAS UNION',
  'NOVA MUSEUM',
  'FORM & CO.',
  'MIRELLE',
  'CINDER LAB',
  'LITHIC',
  'NORTHLINE',
  'ORBITAL',
]

const initialForm = {
  name: '',
  email: '',
  scope: '',
}

function App() {
  const appRef = useRef(null)
  const cursorRef = useRef(null)
  const ghostCursorRef = useRef(null)
  const quoteRef = useRef(null)
  const cursorState = useRef({
    x: 0,
    y: 0,
    ghostX: 0,
    ghostY: 0,
    targetX: 0,
    targetY: 0,
    hover: false,
    visible: false,
  })
  const [activeStep, setActiveStep] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formValues, setFormValues] = useState(initialForm)
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    let split

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { clipPath: 'inset(0 0 100% 0)', yPercent: 16 },
        {
          clipPath: 'inset(0 0 0% 0)',
          yPercent: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.15,
        },
      )

      gsap.from('.hero-panel', {
        scale: 1.06,
        duration: 1.5,
        ease: 'power3.out',
      })

      gsap.utils.toArray('.section-reveal').forEach((section) => {
        gsap.from(section, {
          y: 72,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        })
      })

      gsap.utils.toArray('.work-card').forEach((card) => {
        gsap.from(card, {
          y: 80,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        })
      })

      split = SplitText.create(quoteRef.current, {
        type: 'words',
        wordsClass: 'split-word',
      })

      gsap.from(split.words, {
        y: 60,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
        },
      })

      gsap.from('.discipline-item', {
        x: 24,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.discipline-list',
          start: 'top 80%',
        },
      })
    }, appRef)

    return () => {
      if (split) {
        split.revert()
      }
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    if (!mediaQuery.matches) {
      return undefined
    }

    const state = cursorState.current
    state.x = window.innerWidth / 2
    state.y = window.innerHeight / 2
    state.ghostX = state.x
    state.ghostY = state.y
    state.targetX = state.x
    state.targetY = state.y

    gsap.set([cursorRef.current, ghostCursorRef.current], {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    })

    const handleMouseMove = (event) => {
      state.targetX = event.clientX
      state.targetY = event.clientY
      state.visible = true
    }

    const handleMouseLeave = () => {
      state.visible = false
      state.hover = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    let frameId = 0

    const renderCursor = () => {
      state.x += (state.targetX - state.x) * 0.22
      state.y += (state.targetY - state.y) * 0.22
      state.ghostX += (state.x - state.ghostX) * 0.15
      state.ghostY += (state.y - state.ghostY) * 0.15

      gsap.set(cursorRef.current, {
        x: state.x,
        y: state.y,
        scale: state.hover ? 2.66 : 1,
        autoAlpha: state.visible ? 1 : 0,
      })

      gsap.set(ghostCursorRef.current, {
        x: state.ghostX,
        y: state.ghostY,
        scale: state.hover ? 1.4 : 1,
        autoAlpha: state.visible ? 0.28 : 0,
      })

      frameId = window.requestAnimationFrame(renderCursor)
    }

    frameId = window.requestAnimationFrame(renderCursor)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const setCursorHover = (value) => {
    cursorState.current.hover = value
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))

    setFormErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formValues.name.trim()) {
      nextErrors.name = 'Tell us who we should reply to.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      nextErrors.email = 'Add a working email so we can respond.'
    }

    if (formValues.scope.trim().length < 24) {
      nextErrors.scope = 'Give us a little more detail on the brief.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus('Please tighten the marked fields and try again.')
      return
    }

    setFormStatus('Message staged. Void Studio will reply within 48 hours.')
    setFormValues(initialForm)
  }

  const handleMagneticMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16

    setMagneticOffset({ x: offsetX, y: offsetY })
    setCursorHover(true)
  }

  const resetMagnetic = () => {
    setMagneticOffset({ x: 0, y: 0 })
    setCursorHover(false)
  }

  return (
    <div ref={appRef} className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div
        ref={ghostCursorRef}
        className="custom-cursor custom-cursor-ghost hidden md:block"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? 'border-[var(--acid)] bg-[var(--ink)] text-[var(--paper)]'
            : 'border-[color:rgba(13,13,13,0.16)] bg-[var(--paper)] text-[var(--ink)]'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-8">
          <a
            href="#top"
            className="font-['DM_Mono'] text-[12px] tracking-[0.38em]"
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            VOID®
          </a>

          <div className="flex items-center gap-3 md:gap-6">
            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="blink-badge border border-current px-3 py-2 text-[10px] tracking-[0.4em]">
              [ OPEN FOR WORK ]
            </div>
          </div>
        </div>
      </header>

      <main className="overflow-hidden">
        <section
          id="top"
          className="relative min-h-dvh border-b border-[var(--ink)] pt-14"
        >
          <div className="grid min-h-[calc(100dvh-56px)] grid-cols-1 lg:grid-cols-5">
            <div className="flex flex-col justify-end px-5 pb-8 pt-16 md:px-8 lg:col-span-3 lg:px-14 lg:pb-14">
              <div className="hero-line overflow-hidden">
                <p className="ui-label mb-6">[ STUDIO — 2019 ]</p>
              </div>

              <div className="space-y-2 md:space-y-3">
                <div className="hero-line overflow-hidden">
                  <h1 className="hero-display text-[clamp(4.6rem,12vw,10rem)]">
                    We build
                  </h1>
                </div>
                <div className="hero-line overflow-hidden">
                  <h1 className="hero-display text-[clamp(4.6rem,12vw,10rem)]">
                    things that
                  </h1>
                </div>
                <div className="hero-line overflow-hidden">
                  <h1 className="hero-display hero-accent text-[clamp(4.4rem,11vw,9.6rem)]">
                    cannot be ignored.
                  </h1>
                </div>
              </div>

              <p className="section-reveal mt-8 max-w-[44rem] text-sm leading-7 text-[color:rgba(13,13,13,0.72)] md:text-base">
                Void Studio builds identities, digital experiences, and launch
                systems with editorial discipline and architectural restraint.
                The goal is simple: make the work impossible to skim past.
              </p>

              <div className="section-reveal mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="cta-link"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <span>START A CONVERSATION</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-3 border-b border-[var(--ink)] pb-2 text-[11px] tracking-[0.38em]"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <span>VIEW THE ARCHIVE</span>
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="hero-panel relative min-h-[48vh] border-t border-[var(--ink)] lg:col-span-2 lg:border-l lg:border-t-0">
              <img
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"
                alt="Black and white architectural facade"
                className="h-full w-full object-cover object-center grayscale [mix-blend-mode:multiply]"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.08),rgba(13,13,13,0.38))]" />

              <div className="absolute left-5 top-5 border border-[rgba(245,240,232,0.5)] px-3 py-2 text-[10px] tracking-[0.4em] text-[var(--paper)] md:left-8 md:top-8">
                [ IMAGE PANEL ]
              </div>

              <div className="absolute bottom-5 left-5 max-w-xs text-[10px] leading-5 tracking-[0.34em] text-[rgba(245,240,232,0.82)] md:bottom-8 md:left-8">
                EDITORIAL BRUTALISM / INK &amp; ARCHITECTURE / BUILT FOR HIGH
                CONVICTION BRANDS
              </div>
            </div>
          </div>
        </section>

        <section className="ticker border-b border-[var(--ink)] bg-[var(--ink)] py-4 text-[var(--acid)]">
          <div className="ticker-track flex min-w-max items-center gap-5 whitespace-nowrap text-[clamp(1rem,2vw,1.35rem)] tracking-[0.36em]">
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center gap-5">
                {Array.from({ length: 8 }).map((_, itemIndex) => (
                  <span key={`${groupIndex}-${itemIndex}`}>
                    VOID STUDIO <span className="px-3">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section
          id="work"
          className="section-reveal border-b border-[var(--ink)] px-5 py-14 md:px-8 md:py-20 lg:px-14"
        >
          <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:items-end">
            <div>
              <p className="ui-label mb-4">[ SELECTED WORK ]</p>
              <h2 className="section-title text-[clamp(3rem,7vw,6rem)]">
                The archive is arranged like evidence.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[color:rgba(13,13,13,0.72)] md:text-base">
              We don&apos;t separate brand, interface, and motion into different
              departments. The system lands harder when every surface speaks in
              the same voice.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {projects.map((project) => (
              <a
                key={project.index}
                href="#contact"
                className={`work-card group relative col-span-12 overflow-hidden border border-[var(--ink)] bg-[var(--paper)] ${project.spanClass} ${project.shiftClass}`}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <div className="relative aspect-[5/6] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-image h-full w-full object-cover object-center grayscale transition duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.04),rgba(13,13,13,0.62))]" />

                  <div className="absolute left-4 top-4 text-[11px] tracking-[0.38em] text-[var(--paper)] md:left-6 md:top-6">
                    {project.index}
                  </div>
                  <div className="absolute right-4 top-4 text-[11px] tracking-[0.32em] text-[rgba(245,240,232,0.8)] md:right-6 md:top-6">
                    {project.year}
                  </div>

                  <div className="project-overlay absolute inset-x-0 bottom-0 translate-y-6 p-4 opacity-0 transition duration-500 ease-out md:p-6">
                    <div className="card-underline mb-4 h-[2px] origin-left bg-[var(--vermillion)] transition duration-500 ease-out" />
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="mb-2 text-[11px] tracking-[0.34em] text-[rgba(245,240,232,0.74)]">
                          {project.category} — {project.year}
                        </p>
                        <h3 className="font-['Playfair_Display'] text-4xl leading-none tracking-[-0.05em] text-[var(--paper)]">
                          {project.title}
                        </h3>
                      </div>
                      <ArrowUpRight
                        className="mt-1 shrink-0 text-[var(--paper)]"
                        size={18}
                        strokeWidth={1.6}
                      />
                    </div>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-[rgba(245,240,232,0.8)]">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="philosophy"
          className="border-b-[6px] border-t-[6px] border-[var(--acid)] bg-[var(--ink)] px-5 py-14 text-[var(--paper)] md:px-8 md:py-24 lg:px-14"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)] lg:items-start">
            <div className="section-reveal">
              <p className="ui-label mb-6 text-[rgba(245,240,232,0.72)]">
                [ PHILOSOPHY ]
              </p>
              <blockquote
                ref={quoteRef}
                className="editorial-quote text-[clamp(3rem,8vw,7.5rem)]"
              >
                Design is not decoration. It is the architecture of attention.
              </blockquote>
            </div>

            <div className="discipline-list section-reveal border-t border-[rgba(245,240,232,0.24)] pt-6 lg:pt-0">
              {disciplines.map((item) => (
                <div
                  key={item}
                  className="discipline-item border-b border-[rgba(245,240,232,0.16)] py-4 text-right text-[11px] tracking-[0.4em] text-[rgba(245,240,232,0.74)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="process"
          className="border-b border-[var(--ink)] bg-[var(--ink)] px-5 py-14 text-[var(--paper)] md:px-8 md:py-20 lg:px-14"
        >
          <div className="section-reveal mb-10">
            <p className="ui-label mb-4 text-[rgba(245,240,232,0.72)]">
              [ PROCESS ]
            </p>
            <h2 className="section-title max-w-4xl text-[clamp(3rem,7vw,5.6rem)]">
              Four chapters. No dead air between strategy and execution.
            </h2>
          </div>

          <div className="space-y-3">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <div
                  key={step.number}
                  className={`process-row overflow-hidden border border-[rgba(245,240,232,0.18)] transition-all duration-500 ${
                    isActive
                      ? 'border-l-[4px] border-l-[var(--acid)] bg-[rgba(245,240,232,0.04)]'
                      : 'border-l border-l-[var(--ash)]'
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left md:px-6"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="font-['Playfair_Display'] text-5xl leading-none md:text-[5rem]">
                        {step.number}
                      </span>
                      <div>
                        <div className="text-[11px] tracking-[0.34em] text-[rgba(245,240,232,0.7)]">
                          {step.range}
                        </div>
                        <div className="mt-2 text-xl tracking-[0.24em] md:text-2xl">
                          {step.title}
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] tracking-[0.38em] text-[rgba(245,240,232,0.68)]">
                      {isActive ? 'OPEN' : 'EXPAND'}
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out ${
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-6 border-t border-[rgba(245,240,232,0.12)] px-4 py-6 md:grid-cols-[minmax(0,1fr)_320px] md:px-6">
                        <p className="editorial-quote text-[clamp(1.7rem,3.4vw,2.8rem)] text-[rgba(245,240,232,0.92)]">
                          {step.description}
                        </p>
                        <img
                          src={step.image}
                          alt={step.title}
                          className="h-64 w-full object-cover object-center grayscale"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="section-reveal border-b border-[var(--ink)] bg-[var(--paper)] px-5 py-14 md:px-8 md:py-20 lg:px-14">
          <p className="ui-label mb-6">[ TRUSTED BY ]</p>
          <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {clients.map((client) => (
              <div
                key={client}
                className="client-chip shrink-0 border border-[var(--ink)] px-6 py-4 text-[1rem] tracking-[0.26em] text-[var(--ash)] transition duration-300 hover:scale-[1.05] hover:text-[var(--ink)]"
              >
                {client}
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="relative isolate min-h-screen overflow-hidden bg-[var(--paper)] px-5 py-16 md:px-8 md:py-24 lg:px-14"
        >
          <div className="rotating-degree pointer-events-none absolute right-[-3rem] top-1/2 -z-10 -translate-y-1/2 font-['Playfair_Display'] text-[18rem] leading-none text-[rgba(13,13,13,0.04)] md:right-[-5rem] md:text-[38rem]">
            °
          </div>

          <div className="grid gap-12 lg:min-h-[80vh] lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-center">
            <div className="section-reveal contact-title">
              <p className="ui-label mb-6">[ CONTACT ]</p>
              <h2 className="section-title text-[clamp(5rem,12vw,11rem)]">
                Let&apos;s talk.
              </h2>
              <p className="mt-8 max-w-xl text-sm leading-7 text-[color:rgba(13,13,13,0.72)] md:text-base">
                If the brief needs more nerve, more clarity, or simply a point
                of view strong enough to carry the room, we should talk.
              </p>
            </div>

            <form
              className="section-reveal contact-form space-y-8 border border-[var(--ink)] bg-[rgba(245,240,232,0.75)] p-5 backdrop-blur-sm md:p-8"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="ui-label mb-3 block" htmlFor="name">
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formValues.name}
                  onChange={handleFieldChange}
                  className="input-field w-full pb-3"
                  data-invalid={Boolean(formErrors.name)}
                  placeholder="Your name"
                />
                {formErrors.name ? (
                  <p className="mt-2 text-[11px] tracking-[0.22em] text-[var(--vermillion)]">
                    {formErrors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="ui-label mb-3 block" htmlFor="email">
                  EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleFieldChange}
                  className="input-field w-full pb-3"
                  data-invalid={Boolean(formErrors.email)}
                  placeholder="name@company.com"
                />
                {formErrors.email ? (
                  <p className="mt-2 text-[11px] tracking-[0.22em] text-[var(--vermillion)]">
                    {formErrors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="ui-label mb-3 block" htmlFor="scope">
                  PROJECT OUTLINE
                </label>
                <textarea
                  id="scope"
                  name="scope"
                  rows="5"
                  value={formValues.scope}
                  onChange={handleFieldChange}
                  className="input-field w-full resize-none pb-3"
                  data-invalid={Boolean(formErrors.scope)}
                  placeholder="What are we building, and what needs to change?"
                />
                {formErrors.scope ? (
                  <p className="mt-2 text-[11px] tracking-[0.22em] text-[var(--vermillion)]">
                    {formErrors.scope}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="submit-shell group relative w-full overflow-hidden border border-[var(--ink)] bg-[var(--acid)] px-5 py-4 text-[11px] tracking-[0.38em] text-[var(--ink)] transition duration-300 hover:text-[var(--acid)]"
                style={{
                  transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                }}
                onMouseMove={handleMagneticMove}
                onMouseLeave={resetMagnetic}
              >
                <span className="button-fill absolute inset-0 translate-y-full bg-[var(--ink)] transition duration-[400ms] ease-out" />
                <span className="relative z-10 flex items-center justify-between">
                  <span>SEND INQUIRY</span>
                  <ArrowRight size={16} strokeWidth={1.6} />
                </span>
              </button>

              <p
                className={`min-h-5 text-[11px] tracking-[0.22em] ${
                  formStatus.includes('48 hours')
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--vermillion)]'
                }`}
              >
                {formStatus}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--acid)] bg-[var(--ink)] px-5 py-10 text-[var(--paper)] md:px-8 lg:px-14">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="footer-column">
            <div className="font-['DM_Mono'] text-[12px] tracking-[0.38em]">
              VOID®
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[rgba(245,240,232,0.72)]">
              Design systems, launch films, and digital surfaces built with
              obsession rather than politeness.
            </p>
          </div>

          <div className="footer-column">
            <div className="ui-label mb-4 text-[rgba(245,240,232,0.68)]">
              NAVIGATION
            </div>
            <div className="space-y-3 text-[11px] tracking-[0.34em]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block w-fit transition duration-300 hover:text-[var(--acid)]"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column md:text-right">
            <div className="ui-label mb-4 text-[rgba(245,240,232,0.68)]">
              STATUS
            </div>
            <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.34em] text-[var(--acid)]">
              <span className="system-dot h-2.5 w-2.5 rounded-full bg-[var(--acid)]" />
              [ SYSTEM ONLINE ]
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[rgba(245,240,232,0.12)] pt-4 text-[10px] tracking-[0.34em] text-[rgba(245,240,232,0.58)]">
          © 2025 VOID STUDIO — ALL RIGHTS RESERVED — MADE WITH OBSESSION
        </div>
      </footer>
    </div>
  )
}

export default App
