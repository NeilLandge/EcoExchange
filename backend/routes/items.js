const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItemStatus,
  deleteItem
} = require('../controllers/itemController');

router.route('/')
  .get(getAllItems)
  .post(createItem);

router.route('/:id')
  .get(getItemById)
  .put(updateItemStatus)
  .delete(deleteItem);

module.exports = router;
