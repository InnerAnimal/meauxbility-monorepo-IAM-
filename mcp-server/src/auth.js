/**
 * Authentication utilities for MCP server
 */

export function requireAdmin(context) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    throw new Error('ADMIN_SECRET not configured');
  }

  // In production, validate context.auth or similar
  // For now, we trust stdio transport
  const providedSecret = context?.auth?.secret;
  if (providedSecret && providedSecret !== adminSecret) {
    throw new Error('Unauthorized: Invalid admin credentials');
  }

  return true;
}

export function isAdmin(context) {
  try {
    requireAdmin(context);
    return true;
  } catch {
    return false;
  }
}
