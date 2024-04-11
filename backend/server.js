const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const cartRoute = require('./routes/cartRoutes');
const categoryRoute = require('./routes/categoryRoutes');
const notificationRoute = require('./routes/notificationRoutes');
const colorRoute = require('./routes/colorRoutes');
const sizeRoute = require('./routes/sizeRoutes');
const port = process.env.PORT || 3000;
const mongoDB = process.env.MONGODB_URL || 'mongodb://localhost/ecommerce';

const app = express();

// Connect to MongoDB
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:',err));

// Initialize multer
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }}),
    limits: { fileSize: 1000000 }, // Set a file size limit (optional)
});


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/reviews', reviewRoute);
app.use('/api/cart', cartRoute);
app.use('/api/notification', notificationRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/colors', colorRoute);
app.use('/api/sizes', sizeRoute);


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
console.log(`Example app listening on port ${port}!`);