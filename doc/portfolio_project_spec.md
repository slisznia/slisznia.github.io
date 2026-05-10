# Portfolio project specification

## Working title

**Capability graph portfolio**

## Purpose

This project is a personal portfolio system for Sławomir Liszniański. It is not intended to be a traditional resume or job-seeking document. The goal is to showcase a broad, cross-disciplinary body of work in a way that feels coherent, professional, and useful to potential consulting clients, collaborators, or organizations that need help solving complex technical problems.

The portfolio should communicate one central idea:

> Sławomir builds complex systems where correctness, reliability, physical constraints, and failure modes matter.

The site should support multiple audience-specific views of the same underlying experience. For example, a visitor interested in software architecture should see software, backend, distributed systems, financial correctness, frontend architecture, and programming language design. A visitor interested in physical systems should see aircraft building, off-grid infrastructure, wells, solar, vehicles, fabrication, electrical work, and facility systems. These are not separate identities; they are projections of the same underlying capability graph.

## Core concept

The portfolio is organized as a **capability graph**, not as a chronological resume.

Traditional resume model:

```text
Job → responsibilities → skills
```

This project uses:

```text
Project → problems solved → capabilities demonstrated → projections supported
```

Projects are evidence. Capabilities are the meaning extracted from those projects. Projections are audience-specific views of the same person.

## Design principles

### One person, multiple projections

There should be one master identity:

> Independent systems builder

The site may then expose multiple projections, such as:

- Software systems architect
- Programming language designer
- Embedded and field systems builder
- Physical systems builder
- Off-grid and infrastructure systems designer
- Cross-disciplinary systems builder

These projections should not feel like fake personas. They should feel like different camera angles on the same body of work.

### Content first, presentation second

The portfolio should be driven by structured content stored in JSON. The single-page app should render that JSON. This makes the content portable, versionable, reviewable, and easy to update without rewriting page components.

The JSON file is the source of truth.

The application is a renderer.

### Projects should not be forced into one category

Many projects are naturally interdisciplinary. For example, building an RV-10 aircraft is not only an aviation project. It may demonstrate:

- Aviation
- Metal fabrication
- Systems integration
- Electrical wiring
- CAN bus / avionics debugging
- Upholstery and interior work
- Documentation discipline
- Long-horizon project execution
- Safety-critical workmanship
- Tooling and inspection discipline

The data model must allow one project to support many capabilities and many projections.

### Separate domains from capabilities

A domain answers:

> Where did this happen?

A capability answers:

> What does this prove?

Examples of domain tags:

- software
- aviation
- vehicles
- solar
- off-grid
- wells
- construction
- embedded
- financial systems
- programming languages

Examples of capability tags:

- systems integration
- failure-mode analysis
- financial correctness
- distributed workflow design
- debugging
- fabrication
- wiring and routing
- sensor calibration
- documentation discipline
- long-horizon execution
- safety-critical workmanship
- maintainability planning

Capability tags are more important than domain tags because they connect unrelated-looking work into one coherent professional story.

## Chosen software stack

### Frontend framework

Use **Vue 3**.

Reasons:

- Fits existing frontend direction.
- Good for componentized rendering of structured content.
- Easy to deploy as a static site.
- Works well with JSON-driven views.
- Can later share patterns with other Vue work.

### Build tool

Use **Vite**.

Reasons:

- Fast development server.
- Simple static build output.
- Natural default for modern Vue projects.

### Language

Use **TypeScript** if the project is intended to grow beyond a quick prototype.

The JSON schema should eventually be represented as TypeScript interfaces so invalid content can be caught early.

### Styling

Use **Tailwind CSS**.

Reasons:

- Fast layout iteration.
- Easy to create projection cards, project grids, tag chips, and responsive sections.
- Avoids over-investing in custom CSS too early.

Optional later addition: DaisyUI or custom UI primitives if the site grows.

### Data source

Start with a static JSON file:

```text
src/content/portfolio.json
```

This is bundled into the app at build time.

Later, if content should be editable without rebuilding the app, move the JSON to:

```text
public/portfolio.json
```

and fetch it at runtime.

### Deployment target

The site should be static and CDN-friendly.

Suitable deployment targets:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel
- S3-compatible static hosting
- Any CDN-backed static file host

The app should not require a backend for the first version.

## Repository structure

Proposed initial structure:

```text
portfolio/
  README.md
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  src/
    main.ts
    App.vue
    content/
      portfolio.json
    data/
      portfolioTypes.ts
      portfolioQueries.ts
    components/
      HeroSection.vue
      ProjectionPicker.vue
      ProjectionCard.vue
      CapabilitySection.vue
      CapabilityBadge.vue
      ProjectGrid.vue
      ProjectCard.vue
      ProjectDetail.vue
      ConsultingFit.vue
      TagList.vue
    views/
      HomeView.vue
      ProjectionView.vue
      ProjectView.vue
      CapabilityView.vue
      ResumeView.vue
    router/
      index.ts
    styles/
      main.css
  public/
    media/
      projects/
        rv10/
        off-grid-home/
        water-monitor/
```

For a very small first version, Vue Router can be skipped and the site can be rendered as a single page with internal filtering. If multiple URLs are desired from the beginning, use Vue Router.

## Route model

The site should support these routes eventually:

```text
/                         curated overview
/projections/software      software-focused portfolio
/projections/language      programming language design view
/projections/embedded      embedded and field systems view
/projections/physical      physical systems builder view
/projections/off-grid      off-grid infrastructure view
/projections/all           full cross-disciplinary view
/projects/:id              project detail page
/capabilities/:id          capability detail page
/resume                    compact printable/exportable view
```

The first version may only implement:

```text
/
/projections/:id
/projects/:id
```

## Data model

The portfolio JSON should contain these top-level sections:

```json
{
  "version": 1,
  "person": {},
  "masterPositioning": {},
  "projections": [],
  "domains": [],
  "capabilities": [],
  "projects": [],
  "consulting": {},
  "contact": {}
}
```

### Person

```json
{
  "person": {
    "name": "Sławomir Liszniański",
    "headline": "Independent systems builder",
    "location": "Polson, Montana",
    "status": "Self-employed; open to selective consulting"
  }
}
```

### Master positioning

```json
{
  "masterPositioning": {
    "title": "I build complex systems where correctness, reliability, and real-world constraints matter.",
    "summary": "My work spans software systems, financial workflows, programming language design, embedded devices, aircraft building, vehicles, off-grid infrastructure, water systems, solar, and hands-on construction.",
    "corePattern": "The common thread is systems thinking: understanding how pieces interact, where failure can happen, and how to build something maintainable enough to survive real use."
  }
}
```

### Projections

A projection is an audience-specific view of the same portfolio.

```json
{
  "id": "software-systems-architect",
  "title": "Software systems architect",
  "headline": "Distributed systems, financial correctness, backend architecture, frontend architecture, and language design.",
  "summary": "For organizations needing reliable software systems, clear architecture, durable workflows, and correctness-focused design.",
  "domainFilter": [
    "software",
    "financial-systems",
    "programming-languages"
  ],
  "capabilityFilter": [
    "distributed-workflow-design",
    "financial-correctness",
    "database-design",
    "frontend-architecture",
    "language-semantics"
  ]
}
```

Recommended initial projections:

```text
software-systems-architect
programming-language-designer
embedded-field-systems-builder
physical-systems-builder
off-grid-infrastructure-designer
cross-disciplinary-systems-builder
```

### Domains

Domains describe the area where work happened.

```json
{
  "id": "aviation",
  "label": "Aviation",
  "description": "Aircraft construction, avionics, wiring, inspection discipline, and safety-critical workmanship."
}
```

### Capabilities

Capabilities describe what the project proves.

```json
{
  "id": "systems-integration",
  "label": "Systems integration",
  "description": "Combining mechanical, electrical, software, operational, safety, and serviceability constraints into a working system."
}
```

### Projects

A project is written once and connected to many domains, capabilities, and projections.

```json
{
  "id": "rv10-build",
  "title": "RV-10 experimental aircraft build",
  "status": "In progress",
  "summary": "A long-horizon aircraft build involving structural assembly, fabrication, wiring, avionics, interior work, documentation, and safety-critical workmanship.",
  "domains": [
    "aviation",
    "fabrication",
    "electrical",
    "avionics",
    "interior"
  ],
  "capabilities": [
    "systems-integration",
    "metal-fabrication",
    "wiring-and-routing",
    "canbus-debugging",
    "safety-critical-workmanship",
    "documentation-discipline",
    "long-horizon-project-execution"
  ],
  "evidence": [
    {
      "capability": "metal-fabrication",
      "detail": "Assembled and fit aircraft components requiring precision, repeatability, tooling discipline, and careful inspection."
    },
    {
      "capability": "systems-integration",
      "detail": "Integrated airframe, electrical, avionics, fuel, control, interior, and serviceability constraints into one coherent aircraft build."
    },
    {
      "capability": "canbus-debugging",
      "detail": "Worked through avionics/data-bus troubleshooting where wiring, protocol behavior, termination, and device configuration all matter."
    }
  ],
  "projectionHighlights": {
    "physical-systems-builder": [
      "Metal fabrication, fitting, drilling, riveting, assembly, and inspection discipline.",
      "Hands-on integration of structure, wiring, fuel, interior, and serviceability constraints."
    ],
    "embedded-field-systems-builder": [
      "Avionics and CAN/data-bus debugging across wiring, devices, configuration, and termination behavior.",
      "Practical troubleshooting where electrical symptoms may come from mechanical routing, grounding, or configuration."
    ],
    "cross-disciplinary-systems-builder": [
      "Managed dependencies across airframe, electrical, avionics, fuel, controls, upholstery, tooling, and documentation.",
      "Demonstrates the ability to keep a complex system coherent over a long build cycle."
    ]
  },
  "media": [],
  "links": []
}
```

## Initial project inventory

The first content pass should include these project candidates.

### Software and systems projects

- Queue-backed financial workflow architecture
- GAAP-style ledger/payment system design
- Vue application modernization architecture
- Asynchronous mutation/request-ID polling model
- S3-compatible queue design with MinIO support
- MariaDB deployment and durability architecture
- Programming language design work
- Reader/writer lock design exploration

### Embedded and field systems projects

- ESP32 water-level monitoring system
- BLE command interface and compact JSON reporting
- Sensor calibration and refill detection
- Future field instrumentation projects

### Aviation and physical systems projects

- RV-10 experimental aircraft build
- Aircraft wiring and avionics integration
- CAN bus / avionics debugging
- Upholstery/interior work
- Tooling, inspection, and long-horizon build process

### Off-grid and infrastructure projects

- Off-grid home infrastructure
- Solar system design and planning
- Wells and water system planning
- Water booster/pump system design
- Radiant heating systems
- Hangar/workshop infrastructure
- Septic/excavation planning
- Electrical service/subpanel planning

### Automotive and mechanical projects

- Vehicle transformations
- Diesel diagnostics and ECU research
- Ford truck repair/diagnostics
- Salvage vehicle evaluation and repair planning
- Heavy equipment/Deutz engine work

## Rendering methodology

### Homepage

The homepage should explain the unifying story first, then offer projection choices.

Suggested homepage flow:

1. Hero section
2. Short explanation of the capability graph concept
3. Projection picker cards
4. Selected flagship projects
5. Capability clusters
6. Consulting fit
7. Contact / inquiry section

### Projection pages

A projection page should:

1. Use projection-specific headline and summary.
2. Show projects matching the projection filters.
3. Emphasize projection-specific highlights when available.
4. Show related capabilities.
5. Link back to the full cross-disciplinary view.

### Project cards

Project cards should show:

- Title
- Short summary
- Status
- Domain tags
- Capability tags
- Projection-specific highlight if the page is filtered
- Link to full project page

### Project detail pages

Project detail pages should show:

- Summary
- Problem / context
- Constraints
- Solution / approach
- Capabilities demonstrated
- Evidence by capability
- Media/photos when available
- Related projects
- Related projections

### Capability pages

Capability pages should show:

- Capability definition
- Projects that demonstrate it
- Evidence snippets grouped by project

This is useful because it lets someone browse the portfolio by ability, not just by project.

## Filtering logic

A projection matches a project when:

- The project has at least one matching domain from the projection domain filter, or
- The project has at least one matching capability from the projection capability filter.

A stronger scoring model can be added later:

```text
score = matchingDomains + matchingCapabilities * 2 + explicitProjectionBoost
```

This would allow the UI to sort highly relevant projects first.

## TypeScript interface draft

```ts
export interface Portfolio {
  version: number
  person: Person
  masterPositioning: MasterPositioning
  projections: Projection[]
  domains: Domain[]
  capabilities: Capability[]
  projects: Project[]
  consulting: Consulting
  contact: Contact
}

export interface Person {
  name: string
  headline: string
  location?: string
  status?: string
}

export interface MasterPositioning {
  title: string
  summary: string
  corePattern: string
}

export interface Projection {
  id: string
  title: string
  headline: string
  summary: string
  domainFilter: string[]
  capabilityFilter: string[]
}

export interface Domain {
  id: string
  label: string
  description?: string
}

export interface Capability {
  id: string
  label: string
  description: string
}

export interface ProjectEvidence {
  capability: string
  detail: string
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
  evidence: ProjectEvidence[]
  projectionHighlights?: Record<string, string[]>
  technologies?: string[]
  media?: MediaItem[]
  links?: LinkItem[]
}

export interface MediaItem {
  type: 'image' | 'video' | 'document'
  src: string
  alt?: string
  caption?: string
}

export interface LinkItem {
  label: string
  href: string
}

export interface Consulting {
  goodFit: string[]
  poorFit: string[]
}

export interface Contact {
  preferred?: string
  email?: string
  website?: string
  github?: string
  linkedin?: string
}
```

## Query helper examples

Create query helpers instead of embedding filtering logic directly inside Vue components.

```ts
import type { Portfolio, Projection, Project } from './portfolioTypes'

export function findProjection(portfolio: Portfolio, id: string): Projection | undefined {
  return portfolio.projections.find((projection) => projection.id === id)
}

export function findProject(portfolio: Portfolio, id: string): Project | undefined {
  return portfolio.projects.find((project) => project.id === id)
}

export function projectMatchesProjection(project: Project, projection: Projection): boolean {
  const domainMatch = project.domains.some((domain) => projection.domainFilter.includes(domain))
  const capabilityMatch = project.capabilities.some((capability) => projection.capabilityFilter.includes(capability))

  return domainMatch || capabilityMatch
}

export function projectsForProjection(portfolio: Portfolio, projectionId: string): Project[] {
  const projection = findProjection(portfolio, projectionId)

  if (!projection) {
    return []
  }

  return portfolio.projects.filter((project) => projectMatchesProjection(project, projection))
}
```

## Content methodology

When adding a new project, answer these questions:

1. What was the project?
2. What problem did it solve?
3. What constraints made it difficult?
4. What domains did it touch?
5. What capabilities does it prove?
6. What evidence supports each capability?
7. Which projections should this project strengthen?
8. Are there photos, diagrams, code snippets, documents, or artifacts that support it?

Avoid writing projects as vague accomplishments. Prefer concrete evidence.

Weak:

```text
Worked on aircraft systems.
```

Stronger:

```text
Integrated airframe, wiring, avionics, fuel, controls, interior, and serviceability constraints in a long-horizon experimental aircraft build.
```

Weak:

```text
Good at backend systems.
```

Stronger:

```text
Designed an asynchronous request workflow using durable queue states, request IDs, per-customer serialization, retry metadata, and completion polling.
```

## Visual style direction

The visual style should be clean, technical, and practical.

Avoid looking like a flashy startup landing page. The site should feel like a portfolio from someone who builds serious systems.

Recommended style:

- Dark or neutral theme
- Clear typography
- Strong section hierarchy
- Tag chips for domains and capabilities
- Project cards with concise evidence
- Optional diagrams for capability graph and project relationships
- Minimal animation
- High readability

## Development phases

### Phase 1: Content schema and seed data

- Create `portfolio.json`.
- Define projections, domains, capabilities, and 5-8 seed projects.
- Add TypeScript interfaces.
- Add query helpers.

### Phase 2: Basic renderer

- Render homepage.
- Render projection cards.
- Render project grid.
- Filter projects by selected projection.
- Display domain and capability tags.

### Phase 3: Detail pages

- Add Vue Router.
- Add `/projects/:id`.
- Add `/projections/:id`.
- Add project detail layout.
- Render projection-specific highlights.

### Phase 4: Polish and media

- Add photos and diagrams.
- Add project timelines.
- Add capability pages.
- Add better sorting/scoring.
- Improve responsive layout.

### Phase 5: Publishing

- Deploy static build.
- Add custom domain if desired.
- Add printable `/resume` view.
- Optionally generate PDF from the same content.

## Initial implementation commands

```bash
npm create vue@latest portfolio
cd portfolio
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

Recommended Vue project options:

- TypeScript: yes
- Vue Router: yes, if implementing multiple pages immediately
- Pinia: no, not needed for the first version
- Vitest: optional
- ESLint/Prettier: yes

## README positioning snippet

This repository contains a JSON-driven portfolio SPA. The portfolio models experience as a capability graph: projects demonstrate capabilities, capabilities support audience-specific projections, and projections render focused views of the same person.

The purpose is to showcase cross-disciplinary systems work without flattening it into a traditional resume format.

## Future ideas

- Capability graph visualization
- Project relationship map
- Printable one-page resume view
- Public/private project visibility flags
- Media galleries per project
- Markdown long-form project writeups
- Runtime-loaded JSON for content updates without rebuilding
- JSON schema validation
- Static PDF export
- Search/filter by domain, capability, or projection
- Timeline view for long-horizon projects

## Summary

This project should present broad experience without making it look scattered. The organizing idea is that each project is a dense combination of capabilities. The site should let different audiences see the projection of Sławomir that is most relevant to them while still preserving the larger picture: a cross-disciplinary systems builder who understands software, machines, infrastructure, failure modes, and real-world execution.
