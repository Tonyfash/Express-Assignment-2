const express = require('express');
const {createGrocery, getGrocery, updateGrocery, deleteAGrocery} = require('../controller/grocerycontroller');

const router = express.Router();

router.post('/grocery', createGrocery);
router.get('/grocery', getGrocery);
router.put('/grocery/:id', updateGrocery);
router.delete('/grocery/:id', deleteAGrocery);


module.exports = router;