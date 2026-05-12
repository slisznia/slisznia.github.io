import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/projections',
    name: 'projections',
    component: () => import('@/views/ProjectionsView.vue'),
  },
  {
    path: '/projections/:id',
    name: 'projection-detail',
    component: () => import('@/views/ProjectionDetailView.vue'),
    props: true,
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    props: true,
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/views/ResumeView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // top: 80 leaves room for the sticky header (~60-65px) so the section heading
    // doesn't sit under it. Adjust if the header height changes.
    if (to.hash) return { el: to.hash, top: 80 }
    return { top: 0 }
  },
})
