/**
 * NoSQL Injection Protection Middleware
 * Recursively cleans user-supplied objects (body, query, params)
 * by stripping keys containing prohibited characters ('$' operator prefix or '.' path traversal).
 */

function sanitize(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = sanitize(obj[i]);
    }
    return obj;
  }

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else {
      obj[key] = sanitize(obj[key]);
    }
  }

  return obj;
}

export function mongoSanitize(req, res, next) {
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
}

export default mongoSanitize;
