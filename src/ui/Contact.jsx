import Reveal from './Reveal'
import { contact, profile } from '../data/content'

export default function Contact() {
  const socials = [
    ['GitHub', profile.socials.github],
    ['LinkedIn', profile.socials.linkedin],
    ['X', profile.socials.x],
  ].filter(([, url]) => url)

  return (
    <section id="contact" className="contact" data-stage="6">
      <div className="wrap contact__inner">
        <Reveal>
          <p className="eyebrow">
            <b>10</b> Contact
          </p>
          <h2 className="contact__title">{contact.title}</h2>
          <p className="lead">{contact.lead}</p>
          <a className="contact__mail" href={`mailto:${profile.email}`} data-cursor>
            {profile.email}
            <span>↗</span>
          </a>
          {socials.length > 0 && (
            <div className="contact__social">
              {socials.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer">
                  {label} ↗
                </a>
              ))}
            </div>
          )}
          <p className="contact__oss">{contact.oss}</p>
        </Reveal>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.roles}</span>
      </footer>
    </section>
  )
}
