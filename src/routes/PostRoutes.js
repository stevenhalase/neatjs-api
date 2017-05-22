import * as express from 'express';
import * as PostController from '../controllers/PostController.js';
let router = express.Router();

/*
 * GET
 */
router.get('/', PostController.list);

/*
 * GET
 */
router.get('/recent', PostController.recent);

/*
 * GET
 */
router.get('/user/:id', PostController.user);

/*
 * GET
 */
router.get('/:id', PostController.show);

/*
 * POST
 */
router.post('/', PostController.create);

/*
 * PUT
 */
router.put('/:id', PostController.update);

/*
 * DELETE
 */
router.delete('/:id', PostController.remove);

module.exports = router;
