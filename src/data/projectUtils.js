// Helpers terpusat untuk data project — menghindari duplikasi normalisasi
// repoLinks vs githubUrl di Card/Modal.

export function getRepos(project) {
  if (!project) return [];
  if (Array.isArray(project.repoLinks) && project.repoLinks.length > 0) {
    return project.repoLinks.filter((r) => r && r.url);
  }
  if (project.githubUrl) {
    return [{ label: 'Source', url: project.githubUrl }];
  }
  return [];
}

export function getProjectBySlug(projects, slug) {
  if (!Array.isArray(projects) || !slug) return null;
  return projects.find((p) => p.slug === slug) ?? null;
}

// Normalisasi nomor tel: pertahankan angka dan '+' di depan saja.
export function normalizeTel(phone) {
  if (typeof phone !== 'string') return '';
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Pastikan hanya satu '+' di depan
  return cleaned.replace(/(?!^)\+/g, '');
}
