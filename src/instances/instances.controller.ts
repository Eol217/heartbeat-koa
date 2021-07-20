import * as Koa from 'koa';
import * as Router from 'koa-router';
import { StatusCodes } from 'http-status-codes';
import { InstancesService } from './instances.service';


const router: Router = new Router();

router.post('/:group/:id', async (ctx: Koa.Context) => {
  const {params, request: {body: meta}} = ctx
  const dateNow = Date.now();
  let status = StatusCodes.CREATED;
  let doesInstanceExist = await InstancesService.doesExist(params)

  if (doesInstanceExist) {
    const updater = {
      ...params,
      meta,
      updatedAt: dateNow,
    };
    await InstancesService.updateTimestampAndMeta(updater);
    status = StatusCodes.OK;
  } else {
    const instance = {
      ...params,
      meta,
      createdAt: dateNow,
      updatedAt: dateNow,
    };

    await InstancesService.create(instance);
  }

  ctx.status = status;
  ctx.body = await InstancesService.findOne(params);
});

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = await InstancesService.getGroups();
});

router.get('/:group', async (ctx: Koa.Context) => {
  ctx.body = await InstancesService.getGroupInstances(ctx.params.group);
});

router.delete('/:group/:id', async (ctx: Koa.Context) => {
  ctx.body = await InstancesService.remove(ctx.params);
});


export default router;
