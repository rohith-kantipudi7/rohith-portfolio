// =====================================================================
//  ONLY FILE YOU NEED TO EDIT.
//  Fill in your name, email and CV link. Everything else is optional.
// =====================================================================

export const profile = {
  // --- required -------------------------------------------------------
  name: 'Rohith Kantipudi',
  email: 'rohith.kantipudi4@gmail.com',
  cv: '#',                           // TODO: link to your CV (e.g. '/cv.pdf' in /public, or a Drive/Notion URL)

  // --- optional -------------------------------------------------------
  photo: '/me.png',                  // hero portrait in /public (set to '' to hide)
  location: '',                    // optional, e.g. 'Hyderabad, IN' (shown in the footer when set)
  socials: {
    github: '',                      // https://github.com/<you>
    linkedin: '',                    // https://linkedin.com/in/<you>
    x: '',                           // https://x.com/<you>
    scholar: '',                     // https://scholar.google.com/citations?user=<id>
  },
}

export const initials = () =>
  profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'AI'
