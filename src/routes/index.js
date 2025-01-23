const router = require('express').Router();
const productRoutes = require('./ProductRoutes');
const customerRoutes = require('./CustomerRoutes');
const cartRoutes = require('./CartRoutes');

router.use('/product', productRoutes);
router.use('/customer', customerRoutes);
router.use('/cart', cartRoutes);

module.exports = router;