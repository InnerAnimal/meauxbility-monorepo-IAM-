/**
 * Centralized configuration for MCP server
 */

export const config = {
  // Project Configuration
  projects: {
    meauxbility: {
      name: 'meauxbility-org',
      domain: 'meauxbility.org',
      vercelProjectId: 'prj_AemccTFEjP7ztRJivI4wtysSyEfi',
      repoPath: 'apps/meauxbility-org',
      port: 3000,
    },
    admin: {
      name: 'admin-portal-production',
      domain: 'iaudodidact.com',
      vercelProjectId: 'prj_LQ9Z9xKZUt4qV5phrTGaYFw6GcWY',
      repoPath: 'apps/admin-portal-production',
      port: 3001,
    },
    shop: {
      name: 'inneranimals-shop',
      domain: 'inneranimals.com',
      vercelProjectId: 'prj_u5sO1Zibc1mhNRk0Bs8ijbwakIoR',
      repoPath: 'apps/inneranimals-shop',
      port: 3002,
    },
    media: {
      name: 'inneranimalmedia',
      domain: 'inneranimalmedia.com',
      vercelProjectId: null, // To be created
      repoPath: 'apps/inneranimalmedia',
      port: 3003,
    },
  },

  // Cloudflare Workers
  workers: {
    api: {
      name: 'meauxbility-api',
      url: 'https://meauxbility-api.red-flower-200d.workers.dev',
      accountId: 'ede6590ac0d2fb7daf155b35653457b2',
      kvNamespaceId: '5a156c2799884edd9490c09cedcda117',
    },
  },

  // Render Services
  render: {
    meauxbility: {
      serviceId: 'srv-d4045v6uk2gs739ordk0',
      url: 'https://meauxbility-501-c-3.onrender.com',
      branch: 'main',
    },
  },

  // GitHub
  github: {
    repo: 'InnerAnimal/meauxbility-monorepo-IAM-',
    defaultBranch: 'main',
  },

  // Supabase
  supabase: {
    url: process.env.SUPABASE_URL,
    projectRef: 'ghiulqoqujsiofsjcrqk',
  },

  // Health Check Endpoints
  healthChecks: [
    { name: 'Meauxbility.org', url: 'https://meauxbility.org' },
    { name: 'Admin Portal', url: 'https://iaudodidact.com' },
    { name: 'Inner Animals Shop', url: 'https://inneranimals.com' },
    { name: 'Cloudflare Worker API', url: 'https://meauxbility-api.red-flower-200d.workers.dev/health' },
    { name: 'Render Service', url: 'https://meauxbility-501-c-3.onrender.com' },
  ],
};

export function getProject(name) {
  return config.projects[name] || null;
}

export function getAllProjects() {
  return Object.values(config.projects);
}

export function getWorker(name) {
  return config.workers[name] || null;
}
