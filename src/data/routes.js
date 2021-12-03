const  { Router } = require('express');
const controller = require('./controller')

const router = Router();

//get all data
router.get('/', controller.getData)

// add new data
router.post('/',controller.addData);

// retrieve data
router.get('/:id', controller.getDataById)

// delete
router.delete('/:id', controller.deleteData);

//update
router.put('/:id', controller.updateData)

module.exports = router;