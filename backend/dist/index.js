import app from './app.js';
import initDb from './database/mikro-orm.js';
import { DI } from './di-container.js';
// if (process.env.SWAGGER_ROUTE) {
//   app.use(`${process.env.SWAGGER_ROUTE}`, swaggerUi.serve);
//   app.get(`${process.env.SWAGGER_ROUTE}`, swaggerUi.setup(swaggerSchema));
// }
const port = parseInt(process.env.PORT ?? '3000');
export const init = (async () => {
    const orm = await initDb();
    app.listen(port);
    DI.orm = orm;
    DI.server = app;
})();
//# sourceMappingURL=index.js.map