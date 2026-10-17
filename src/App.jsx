import { useEffect, useState } from 'react'
import { profile, services, experience, projects, skills, certificates } from './data.js'

const year = new Date().getFullYear()

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--line' : ''}`}>
      <div className="wrap header__row">
        <a href="#top" className="header__name">
          Abhay Upadhyay
        </a>
        <nav className="header__nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="header__cv">
            Résumé
          </a>
        </nav>
      </div>
    </header>
  )
}

function Intro() {
  return (
    <section className="intro wrap" id="top">
      <div className="intro__text">
        <p className="small-label">Web developer · {profile.city}</p>
        <h1>
          Hi, I'm Abhay. I make websites and chatbots for small businesses and anyone who needs one done{' '}
          <em>properly</em>.
        </h1>
        <p className="intro__lead">
          I'm a BCA student at United University, and I've done two internships building and designing for the web. If you need a site for your business, a chatbot for your customers or just some help with a
          project, I'd be happy to hear about it.
        </p>
        <div className="intro__actions">
          <a href={`mailto:${profile.email}`} className="button">
            Email me
          </a>
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="link">
            or message on WhatsApp
          </a>
        </div>
        <p className="intro__status">
          <span className="dot" /> Taking on freelance work and internships for 2026
        </p>
      </div>

      <figure className="intro__photo">
        <div className="photo-frame">
          <picture>
            <source srcSet={profile.photo} type="image/webp" />
            <img src={profile.photoFallback} alt="Abhay Upadhyay" width="486" height="763" fetchpriority="high" />
          </picture>
        </div>
        <figcaption>That's me, in Prayagraj.</figcaption>
      </figure>
    </section>
  )
}

function Services() {
  return (
    <section className="block wrap" id="work">
      <div className="block__side">
        <h2>What I can help with</h2>
      </div>
      <div className="block__main">
        <ol className="services">
          {services.map((s, i) => (
            <li key={s.title} className="fade">
              <span className="services__no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="block wrap">
      <div className="block__side">
        <h2>Things I've built</h2>
        <p className="block__note">Mostly from college and courses so far. Client work is what I'm after next.</p>
      </div>
      <div className="block__main">
        {projects.map((p) => (
          <article key={p.name} className="project fade">
            <div className="project__head">
              <h3>{p.name}</h3>
              <span>{p.kind}</span>
            </div>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="block wrap">
      <div className="block__side">
        <h2>Experience</h2>
      </div>
      <div className="block__main">
        {experience.map((e) => (
          <div key={e.role} className="row fade">
            <span className="row__when">{e.when}</span>
            <div>
              <h3>
                {e.role}, <span className="muted">{e.place}</span>
              </h3>
              <p>{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="block wrap" id="about">
      <div className="block__side">
        <h2>A bit more about me</h2>
      </div>
      <div className="block__main about">
        <p className="fade">
          I write mostly in Python, Java and C++, and I enjoy the point where the logic underneath meets a
          design people actually like using. Right now most of my time goes into front-end work and chatbots,
          and I'm getting deeper into machine learning through my IBM coursework.
        </p>
        <p className="fade">
          When I'm not coding I'm usually playing cricket. It's taught me more about working in a team than any
          class has, and I try to bring the same attitude to projects: show up, communicate, and don't leave
          anyone waiting.
        </p>

        <dl className="skills fade">
          {skills.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="sub-head">Certificates</h3>
        <ul className="certs fade">
          {certificates.map((c) => (
            <li key={c.name}>
              <span>
                {c.name} <span className="muted">· {c.from}</span>
              </span>
              <span className="certs__when">{c.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard not available */
    }
  }

  const openMailApp = () => {
    const subject = `Hello from ${form.name}`
    const body = `${form.message}

${form.name}
${form.email}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  // Sends straight to Abhay's inbox through Web3Forms. Without an access key
  // (see .env.example) it falls back to opening the visitor's mail app.
  const send = async (e) => {
    e.preventDefault()
    const key = import.meta.env.VITE_WEB3FORMS_KEY
    if (!key) return openMailApp()

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `Portfolio enquiry from ${form.name}`,
          from_name: 'Portfolio website',
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap contact__grid">
        <div>
          <h2>
            Have something in mind? <br />
            <em>Let's talk.</em>
          </h2>
          <p className="contact__text">
            Tell me a little about what you need. I read everything that comes in and get back to you quickly.
          </p>
          <div className="contact__mail">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button onClick={copy} className="copy">
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <ul className="contact__links">
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </li>
            <li>
              <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>

        <form className="note" onSubmit={send}>
          <label>
            Your name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
          </label>
          <label>
            Your email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </label>
          <label>
            What are you working on?
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button type="submit" className="button button--light" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          {status === 'sent' && (
            <p className="note__msg" role="status">
              Thanks, got it. I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="note__msg note__msg--error" role="alert">
              That didn't go through. Please email me directly at {profile.email}.
            </p>
          )}
        </form>
      </div>

      <footer className="wrap footer">
        <span>© {year} Abhay Upadhyay</span>
        <span>Designed and built by me, in Prayagraj.</span>
      </footer>
    </section>
  )
}

export default function App() {
  // Gentle fade-in for content as it scrolls into view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('shown')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.fade').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Intro />
        <Services />
        <Projects />
        <Experience />
        <About />
      </main>
      <Contact />
    </>
  )
}
