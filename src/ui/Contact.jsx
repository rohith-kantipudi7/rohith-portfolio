import Reveal from './Reveal'
import { profile } from '../data/profile'
import { contact, roleLine } from '../data/content'

export default function Contact() {
  const socials = [['GitHub', profile.socials.github], ['LinkedIn', profile.socials.linkedin], ['X', profile.socials.x], ['Scholar', profile.socials.scholar]].filter(([, u]) => u)

  return (
    <section id="contact" className="contact">
      <div className="split contact__inner" data-stage="knot" data-side="1">
        <div className="wrap">
          <Reveal className="split__col">
            <p className="kicker">{contact.kicker}</p>
            <h2 className="contact__title">{contact.title}</h2>
            <p className="lead">{contact.lead}</p>
            <div className="contact__links">
              <a className="contact__mail" href={`mailto:${profile.email}`} data-cursor>
                {profile.email} <span>↗</span>
              </a>
              <a className="btn btn--solid" href={profile.cv} target="_blank" rel="noreferrer" data-cursor>
                Download CV <span>↓</span>
              </a>
            </div>
            {socials.length > 0 && (
              <div className="contact__social mono">
                {socials.map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer">
                    {label} ↗
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
      <footer className="footer mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{roleLine}</span>
        {profile.location && <span>{profile.location}</span>}
      </footer>
    </section>
  )
}
