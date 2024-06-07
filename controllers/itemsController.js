const Itemsdb = require('../models/itemsModel');
const purchasedDb = require('../models/purchasedModel');
const UserDb = require('../models/userModel');

const getItems = async (req, res) => {
    const items = await Itemsdb.find();
    return res.status(200).json(items);
}

const getItem = async (req, res) => {
    const id = req.params.id;
    const item = await Itemsdb.findById(id);
    if (!item) {
        return res.status(400).json({ "message": "item doesn't exist" });
    }
    return res.status(200).json(item);

}

const addItems = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ 'message': 'file must be included...' });
    }
    const baseUrl = "http://localhost:3003";
    const newItem = {
        name: req.body.name,
        cost: req.body.cost,
        category: req.body.category,
        size: req.body.size,
        path: req.file.path.replace("public\\", `${baseUrl}/`)
    }
    if (!newItem.name || !newItem.cost || !newItem.category || !newItem.path || !newItem.size) {
        return res.status(400).json({ 'message': 'All details are essential' });
    } else {
        Itemsdb.create(newItem)
        return res.status(200).json(newItem);
    }
}

const updateItem = async (req, res) => {
    const item = req.params.id;
    const exist = await Itemsdb.findById(item);
    if (!exist) {
        return res.status(400).json({ 'message': 'item not found' });
    }
    const updateData = {
        name: req.body.name,
        cost: req.body.cost,
        size: req.body.size,
        category: req.body.category,
        description: req.body.description,
    };
    if (req.file) {
        updateData.image = req.file.path;
    }
    const updated = await Itemsdb.findByIdAndUpdate(
        item,
        updateData,
        { new: true }
    );
    return res.status(200).json(updated);
};


const deleteItem = async (req, res) => {
    const item = req.params._id;
    const exist = await Itemsdb.findById(item);
    if (!exist) {
        return res.status(400).json({ 'message': 'user not found' })
    } else {
        await Itemsdb.findByIdAndDelete(item)
    }
}

const buyItem = async (req, res) => {
    const item = req.params.id;
    const exist = await Itemsdb.findById(item);
    if (!exist) {
        return res.status(400).json({ 'message': 'item not found' })
    }
    const data = {
        user_id: req.user.id,
        product_id: item
    }
    const create = await purchasedDb.create(data);
    return res.status(200).json(create)
}

const viewBoughtItems = async (req, res) => {
    const user = req.user.id;
    
    // const data = await purchasedDb.find({user_id:user}, null, {lean: true});
    const data = await purchasedDb.find({ user_id: user }).lean();
    const products = [];
    for (let i of data) {
        const item = await Itemsdb.findById(i.product_id);
        const product = i;
        //    product.set('item', item, {strict: false})
        //    const product = JSON.parse(JSON.stringify(i));
        product.item = item;
        products.push(product);
    }
    if (data < 1) {
        return res.status(400).json({ 'message': 'no item found' })
    }
    return res.status(200).json(products);
}

const viewSoldItems = async (req, res) => {
    const data = await purchasedDb.find().lean();
    // const results = {}
    const results = await Promise.all(data.map(async (ele) => {
        const item = await Itemsdb.findById(ele.product_id);
        const user = await UserDb.findById(ele.user_id);
        ele.user = user;
        ele.item = item;
        return ele;
    }))
    return res.status(200).json(results);
}

// const notFound = (req,res) => {
//     res.status(400).json({'message':'page not found'});
// }

module.exports = { addItems, getItem, viewBoughtItems, viewSoldItems, deleteItem, updateItem, getItems, buyItem }