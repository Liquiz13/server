const express = require ('express');
const router = express.Router();
const usersController = require ('../controllers/users');
const checkAuth = require ('../middleweare/check-auth');

router.post('/', usersController.users_create);

router.put('/:id', checkAuth, usersController.users_change);

router.get('/', usersController.users_get_all);

router.get('/:id', usersController.users_get_one);

router.delete('/:id', checkAuth, usersController.users_delete);


router.post ('/:id/friends/', checkAuth, usersController.users_friendReq);
    
router.put ('/:id/friends/', checkAuth, usersController.users_friendAdd);
    
    

module.exports = router;