//imports
import { authenticateUser } from "../services/userService.js";

const errorMiddleware = async(context, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
    }
};

const requestTimingMiddleware = async({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
};

const serveStaticFiles = async (context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);

    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });

  } else {
    await next();
  }
};

const accessMiddleware = async (context, next) => {
  let flag = false;
  if (context.request.url.pathname === '/' || context.request.url.pathname.startsWith('/auth') || context.request.url.pathname.startsWith('/api')) {
    flag = true;
  } else if (await context.session.get('authenticated')) {
    flag = true;
  }
  if (!flag) {
    context.response.redirect('/auth/login');
  } else {
    await next();
  }
}

//exports
export { errorMiddleware, serveStaticFiles, requestTimingMiddleware, accessMiddleware };

