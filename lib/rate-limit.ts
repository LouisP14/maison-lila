// Rate limiting simple en mémoire (pour la prod, utiliser Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export function rateLimit(config: RateLimitConfig) {
  return (
    identifier: string
  ): { success: boolean; limit: number; remaining: number; reset: Date } => {
    const now = Date.now();
    const key = identifier;

    const record = rateLimitMap.get(key);

    if (!record || now - record.lastReset > config.windowMs) {
      // Nouvelle fenêtre ou premier appel
      rateLimitMap.set(key, { count: 1, lastReset: now });
      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - 1,
        reset: new Date(now + config.windowMs),
      };
    }

    if (record.count >= config.maxRequests) {
      // Limite atteinte
      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        reset: new Date(record.lastReset + config.windowMs),
      };
    }

    // Incrémenter le compteur
    record.count++;
    rateLimitMap.set(key, record);

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - record.count,
      reset: new Date(record.lastReset + config.windowMs),
    };
  };
}

// Configurations prédéfinies
export const apiRateLimit = rateLimit({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
});

export const reservationRateLimit = rateLimit({
  maxRequests: 3,
  windowMs: 10 * 60 * 1000, // 10 minutes
});

export const contactRateLimit = rateLimit({
  maxRequests: 2,
  windowMs: 5 * 60 * 1000, // 5 minutes
});

// Helper pour obtenir l'IP du client
export function getClientIP(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const xRealIp = request.headers.get("x-real-ip");
  const connectionRemoteAddress = request.headers.get(
    "connection-remote-address"
  );

  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  if (xRealIp) {
    return xRealIp.trim();
  }

  if (connectionRemoteAddress) {
    return connectionRemoteAddress.trim();
  }

  return "unknown";
}
