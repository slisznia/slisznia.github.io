export interface Portfolio {
  schemaVersion: number
  contentVersion: string
  metadata: PortfolioMetadata
  person: Person
  site: Site
  projections: Projection[]
  domains: Domain[]
  capabilities: Capability[]
  projects: Project[]
  consulting: Consulting
  contact: Contact
}

export interface PortfolioMetadata {
  title: string
  description: string
  lastUpdated: string
  notes?: string[]
}

export interface Person {
  name: string
  headline: string
  location?: string
  status?: string
  shortBio?: string
  positioning?: string
  preferredEngagementStyle?: string[]
}

export interface Site {
  defaultProjection: string
  primaryNavigation: NavItem[]
  hero: Hero
  copy: SiteCopy
}

export interface HeadingBlock {
  heading: string
  body?: string
  subhead?: string
}

export interface ConsultingSectionCopy {
  heading: string
  goodFitLabel: string
  poorFitLabel: string
}

export interface SiteCopy {
  home: {
    tour: HeadingBlock
    projectionsSection: HeadingBlock
    selectedProjectsSection: HeadingBlock
    consultingSection: ConsultingSectionCopy
    contactSection: HeadingBlock
  }
  projectionsIndex: HeadingBlock
  projectsIndex: HeadingBlock
}

export interface NavItem {
  label: string
  route: string
}

export interface Hero {
  title: string
  body: string
  tags: string[]
}

export interface Projection {
  id: string
  title: string
  headline: string
  summary: string
  route: string
  priority: number
  tagQuery: TagQuery
}

export interface TagQuery {
  domainsAny: string[]
  capabilitiesAny: string[]
  projectTagsAny: string[]
}

export interface Domain {
  id: string
  label: string
  description?: string
}

export interface Capability {
  id: string
  label: string
  description?: string
}

export interface ProjectEvidence {
  capability: string
  detail: string
}

export interface MediaItem {
  type: string
  src: string
  title?: string
  caption?: string
  alt?: string
}

export interface LinkItem {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  status?: string
  timeframe?: string
  summary: string
  problem?: string
  solution?: string
  outcomes?: string[]
  domains: string[]
  capabilities: string[]
  tags?: string[]
  evidence: ProjectEvidence[]
  projectionHighlights?: Record<string, string[]>
  media?: MediaItem[]
  links?: LinkItem[]
}

export interface Consulting {
  goodFit: string[]
  poorFit: string[]
  engagementNotes?: string[]
}

export interface ContactPhoto {
  src: string
  alt: string
}

export interface Contact {
  preferred?: string
  email?: string
  website?: string
  github?: string
  linkedin?: string
  photo?: ContactPhoto
  notes?: string[]
}
