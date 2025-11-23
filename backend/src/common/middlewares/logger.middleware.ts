import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import type { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

@Middleware({ type: 'before' })
@Service()
export class LoggerMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, response: Response, next: NextFunction): void {
        const start = Date.now();

        // Log request
        console.log('[Request]', {
            method: request.method,
            path: request.path,
            query: request.query,
            timestamp: new Date().toISOString(),
        });

        // Log response when finished
        response.on('finish', () => {
            const duration = Date.now() - start;
            console.log('[Response]', {
                method: request.method,
                path: request.path,
                status: response.statusCode,
                duration: `${duration}ms`,
                timestamp: new Date().toISOString(),
            });
        });

        next();
    }
}
