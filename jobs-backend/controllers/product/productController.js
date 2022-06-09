const Product = require('../../models/product');
const multer = require('multer');
const path = require('path');
const CustomErrorHandler = require('../../services/customErrorHandler');
const fs = require('fs');
const productSchema = require('../../validators/validators');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single('image'); // 5mb

const productController = {
    async addProduct(req, res, next) {
        // Multipart form data
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            const filePath = req.file.path;
            // validation
            const { error } = productSchema.validate(req.body);
            if (error) {
                // Delete the uploaded file
                // appRoot = root folder
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    if (err) {
                        return next(
                            CustomErrorHandler.serverError(err.message)
                        );
                    }
                });
                return next(error);
                // rootfolder/uploads/filename.png
            }
            console.log(req.file);
            const { name, price, category } = req.body;
            let document;
            try {
                document = await Product.create({
                    name,
                    price,
                    category,
                    image: filePath,
                });
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });
    },
    async updateProduct(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            let filePath;
            if (req.file) {
                filePath = req.file.path;
            }

            // validation
            const { error } = productSchema.validate(req.body);
            if (error) {
                // Delete the uploaded file
                if (req.file) {
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            return next(
                                CustomErrorHandler.serverError(err.message)
                            );
                        }
                    });
                }

                return next(error);
                // rootfolder/uploads/filename.png
            }

            const { name, price, category } = req.body;
            let document;
            try {
                document = await Product.findOneAndUpdate(
                    { _id: req.params.id },//-->this is a query.
                    {
                        name,
                        price,
                        category,
                        ...(req.file && { image: filePath }),
                    },
                    { new: true } //--> return the new updated data.
                ).select('-__v ');
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });
    },
    async products(req, res, next) {
        let products;
        try {
            products = await Product.find();
        } catch (error) {
            next(error);
        }
        res.json(products);
    }
}

module.exports = productController;