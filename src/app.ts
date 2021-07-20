import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';

import { cron } from './cron';
import instancesController from './instances/instances.controller';
import MongoDB from './database';


const app: Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = {error};
    ctx.app.emit('error', error, ctx);
  }
});

// Middleware
app.use(bodyParser());

// Route middleware.
app.use(instancesController.routes());
app.use(instancesController.allowedMethods());

// Register cron job to do any action needed
cron.start();

// Connecting to MongoDB
MongoDB.init();

// Application error logging.
app.on('error', console.error);

export default app;
