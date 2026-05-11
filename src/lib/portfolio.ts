import type {
  Capability,
  Domain,
  Portfolio,
  Project,
  Projection,
} from '@/types/portfolio'

export function findProjection(
  portfolio: Portfolio,
  id: string,
): Projection | undefined {
  return portfolio.projections.find((p) => p.id === id)
}

export function findProject(
  portfolio: Portfolio,
  id: string,
): Project | undefined {
  return portfolio.projects.find((p) => p.id === id)
}

export function findDomain(
  portfolio: Portfolio,
  id: string,
): Domain | undefined {
  return portfolio.domains.find((d) => d.id === id)
}

export function findCapability(
  portfolio: Portfolio,
  id: string,
): Capability | undefined {
  return portfolio.capabilities.find((c) => c.id === id)
}

export function projectionScore(project: Project, projection: Projection): number {
  const { domainsAny, capabilitiesAny, projectTagsAny } = projection.tagQuery
  const domainMatches = project.domains.filter((d) => domainsAny.includes(d)).length
  const capabilityMatches = project.capabilities.filter((c) => capabilitiesAny.includes(c)).length
  const tagMatches = (project.tags ?? []).filter((t) => projectTagsAny.includes(t)).length
  return domainMatches + capabilityMatches * 2 + tagMatches
}

export function projectMatchesProjection(
  project: Project,
  projection: Projection,
): boolean {
  return projectionScore(project, projection) > 0
}

export function projectsForProjection(
  portfolio: Portfolio,
  projectionId: string,
): Project[] {
  const projection = findProjection(portfolio, projectionId)
  if (!projection) return []
  return portfolio.projects
    .map((project) => ({ project, score: projectionScore(project, projection) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.project)
}

export function projectionsForProject(
  portfolio: Portfolio,
  project: Project,
): Projection[] {
  return portfolio.projections.filter((projection) =>
    projectMatchesProjection(project, projection),
  )
}

export function sortedProjections(portfolio: Portfolio): Projection[] {
  return [...portfolio.projections].sort((a, b) => a.priority - b.priority)
}

export function domainLabel(portfolio: Portfolio, id: string): string {
  return findDomain(portfolio, id)?.label ?? id
}

export function capabilityLabel(portfolio: Portfolio, id: string): string {
  return findCapability(portfolio, id)?.label ?? id
}
