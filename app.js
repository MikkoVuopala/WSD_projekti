//imports
import { Application } from "./deps.js";
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import * as middleware from './middlewares/middlewares.js';
import { router } from './routes/routes.js';
import { Session } from "./deps.js";

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));
const session = new Session({ framework: "oak" });
await session.init();
app.use(session.use()(session));

app.use(middleware.errorMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.accessMiddleware);
app.use(middleware.serveStaticFiles);

app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
    app.listen({ port: 7777 });
}

export { app };
