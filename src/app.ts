import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';

import instancesController from './instances/instances.controller';


const app: Koa = new Koa();

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
  }
});

app.use(bodyParser());

app.use(instancesController.routes());
app.use(instancesController.allowedMethods());

app.on('error', console.error);

export default app;
