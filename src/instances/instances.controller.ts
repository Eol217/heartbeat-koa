import * as Koa from 'koa';
import * as Router from 'koa-router';
import { StatusCodes } from 'http-status-codes';
import { instancesService } from './instances.service';


const router: Router = new Router();

router.post('/:group/:id', async (ctx: Koa.Context) => {
  const { params, request: { body: meta } } = ctx
  let status = StatusCodes.CREATED;
  const doesInstanceExist = await instancesService.doesExist(params)

  if (doesInstanceExist) {
    const updater = {
      ...params,
      meta,
    };
    await instancesService.updateTimestampAndMeta(updater);
    status = StatusCodes.OK;
  } else {
    const instance = {
      ...params,
      meta,
    };

    await instancesService.create(instance);
  }

  ctx.status = status;
  ctx.body = await instancesService.findOne(params);
});

// I do not think I should throw an error from the root route even if it is empty in the DB,
// an empty array will be returned in that case
router.get('/', async (ctx: Koa.Context) => {
  ctx.status = StatusCodes.OK;
  ctx.body = await instancesService.getGroups();
});

// On the other hand, if someone asking for a non existent group
// using concrete group name, it's better to return 404
router.get('/:group', async (ctx: Koa.Context) => {
  const groupInstances = await instancesService.getGroupInstances(ctx.params.group);

  if (!groupInstances.length) ctx.throw(StatusCodes.NOT_FOUND)

  ctx.status = StatusCodes.OK;
  ctx.body = groupInstances
});

// same here, removing a non existent instance isn't ok
router.delete('/:group/:id', async (ctx: Koa.Context) => {
  const isRemoved = await instancesService.remove(ctx.params);

  if (!isRemoved) ctx.throw(StatusCodes.NOT_FOUND)

  ctx.status = StatusCodes.NO_CONTENT;
});


export default router;
