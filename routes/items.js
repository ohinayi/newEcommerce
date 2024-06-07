const express = require('express');
const router = express.Router();
const items = require('../controllers/itemsController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file,cb) {
        const itemName = (file.originalname?? 'unknown');
        cb(null, `${itemName}`);
    }
})

const upload = multer({storage:storage});

router.route('/items').get(items.getItems);
router.route('/items/purchasedList').get(items.viewBoughtItems);
router.route('/items/soldList').get(items.viewSoldItems);
router.route('/items/create').post(upload.single('image') ,items.addItems);
router.route('/items/:id').get(items.getItem);
router.route('/items/:id').delete(items.deleteItem);
router.route('/items/:id').put(upload.single('image'), items.updateItem);
router.route('/items/purchase/:id').post(items.buyItem);
// router.route('/*').get(items.notFound);
// router.route('/*').post(items.notFound);

module.exports = router;