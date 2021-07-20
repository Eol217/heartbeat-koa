import * as Koa from 'koa';
import * as Router from 'koa-router';
// import instanceEntity from './instance.entity';
import * as HttpStatus from 'http-status-codes';


const router: Router = new Router();

router.get('/', async (ctx: Koa.Context) => {
  // // Get the instance repository from TypeORM.
  // const instanceRepo: Repository<instanceEntity> = getRepository(instanceEntity);
  //
  // // Find the requested instance.
  // const instances = await instanceRepo.find();

  ctx.body = {
    instances: [],
  };
});

// router.get('/:instance_id', async (ctx: Koa.Context) => {
//   // Get the instance repository from TypeORM.
//   const instanceRepo: Repository<instanceEntity> = getRepository(instanceEntity);
//
//   // Find the requested instance.
//   const instance = await instanceRepo.findOne(ctx.params.instance_id);
//
//   // If the instance doesn't exist, then throw a 404.
//   // This will be handled upstream by our custom error middleware.
//   if (!instance) {
//     ctx.throw(HttpStatus.NOT_FOUND);
//   }
//
//   // Respond with our instance data.
//   ctx.body = {
//     data: {instance},
//   };
// });
//
// router.post('/', async (ctx: Koa.Context) => {
//   // Get the instance repository from TypeORM.
//   const instanceRepo: Repository<instanceEntity> = getRepository(instanceEntity);
//
//   // Create our new instance.
//   const instance: instanceEntity = instanceRepo.create(ctx.request.body);
//
//   // Persist it to the database.
//   await instanceRepo.save(instance);
//
//   // Set the status to 201.
//
//   // Respond with our instance data.ctx.status = HttpStatus.CREATED;
//   ctx.body = {
//     data: {instance},
//   };
// });
//
// router.delete('/:instance_id', async (ctx: Koa.Context) => {
//   // Get the instance repository from TypeORM.
//   const instanceRepo: Repository<instanceEntity> = getRepository(instanceEntity);
//
//   // Find the requested instance.
//   const instance = await instanceRepo.findOne(ctx.params.instance_id);
//
//   // If the instance doesn't exist, then throw a 404.
//   // This will be handled upstream by our custom error middleware.
//   if (!instance) {
//     ctx.throw(HttpStatus.NOT_FOUND);
//   }
//
//   // Delete our instance.
//   await instanceRepo.delete(instance);
//
//   // Respond with no data, but make sure we have a 204 response code.
//   ctx.status = HttpStatus.NO_CONTENT;
// });
//
// router.patch('/:instance_id', async (ctx: Koa.Context) => {
//   // Get the instance repository from TypeORM.
//   const instanceRepo: Repository<instanceEntity> = getRepository(instanceEntity);
//
//   // Find the requested instance.
//   const instance: instanceEntity = await instanceRepo.findOne(ctx.params.instance_id);
//
//   // If the instance doesn't exist, then throw a 404.
//   // This will be handled upstream by our custom error middleware.
//   if (!instance) {
//     ctx.throw(HttpStatus.NOT_FOUND);
//   }
//
//   // Merge the existing instance with the new data.
//   // This allows for really simple partial (PATCH).
//   const updatedInstance = await instanceRepo.merge(instance, ctx.request.body);
//
//   // Save the new data.
//   instanceRepo.save(updatedInstance);
//
//
//   // Respond with our instance data.// Response with the updated content.
//   ctx.body = {
//     data: {instance: updatedInstance},
//   };
// });

export default router;
