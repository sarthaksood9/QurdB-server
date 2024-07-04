import productMod from "../models/productModel.js";
import ApiFeatures from "../utils/apiFetatures.js";


//---------------- Admin -------------------------------//

export const create = async (req, res) => {
    try {
        const product = await productMod.create(req.body);
        return res.status(200).json({
            success: true,
            product
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export const updateProduct = async (req, res) => {
    try {
        let product = await productMod.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        product = await productMod.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            product,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteProduct = async (req, res, next) => {

    try {
        const product = await productMod.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }



        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product Delete Successfully",
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//---------------- USER -------------------------------//

export const products = async (req, res) => {
    try {

        const apiFeature=new ApiFeatures(productMod.find(),req.query).search().filter()
        const products = await apiFeature.query;
        res.status(201).json({ success: true, products });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const productDetail = async (req, res) => {
    try {
        const product =  await productMod.findById(req.params.id);
        res.status(201).json({ success: true, product });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




