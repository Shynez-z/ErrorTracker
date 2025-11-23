import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import type { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: NextFunction) {
        const status = error.httpCode || error.status || 500;
        const message = error.message || 'Internal Server Error';

        // Log error details
        console.error('[Error Handler]', {
            status,
            message,
            path: request.path,
            method: request.method,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                body: request.body,
            }),
        });

        // Send error response
        response.status(status).json({
            status,
            message,
            path: request.path,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && {
                stack: error.stack,
                details: error.errors || undefined,
            }),
        });
    }
}
