import { Router } from 'express';
import { categoryService, productService } from '../services';

const adminRouter = Router();

adminRouter.get('/', (req, res, next) => {
    res.send('admin main page');
});

//전체 카테고리 목록을 가져옴
adminRouter.get('/category', async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

//선택한 카테고리의 상세 정보를 가져옴
adminRouter.get('/category/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategory(categoryId);

        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
});

//카테고리 생성
adminRouter.post('/category/create', async (req, res, next) => {
    try {
        const { name, gender, recommendAge } = req.body;
        const newCategory = await categoryService.AddCategory({
            name,
            gender,
            recommendAge,
        });

        res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
});

//카테고리 수정
adminRouter.patch('/category/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const { name, gender, recommendAge } = req.body;
        const UpdatedCategoryInfo = {
            ...(name && { name }),
            ...(gender && { gender }),
            ...(recommendAge && { recommendAge }),
        };

        const UpdatedCategory = await categoryService.setCategory(
            categoryId,
            UpdatedCategoryInfo
        );

        res.status(200).json(UpdatedCategory);
    } catch (error) {
        next(error);
    }
});

//카테고리 삭제
adminRouter.delete('/category/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await categoryService.deleteCategory(
            categoryId
        );

        res.status(200).json(deletedCategory);
    } catch (error) {
        next(error);
    }
});

//전체 상품 목록을 가져옴
adminRouter.get('/product', async (req, res, next) => {
    try {
        const products = await productService.getProducts();

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

//선택한 상품의 상세 정보를 가져옴
adminRouter.get('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productService.getProduct(productId);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

//상품 생성
adminRouter.post('/product/create', async (req, res, next) => {
    try {
        const {
            // categoryId,
            name,
            price,
            gender,
            description,
            madeBy,
            inventory,
            sellCount,
            src,
        } = req.body;
        console.log(req.body.name);
        // const newProduct = await productService.addProduct({
        //     // categoryId,
        //     name,
        //     price,
        //     gender,
        //     description,
        //     madeBy,
        //     inventory,
        //     sellCount,
        //     src,
        // });

        // res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

//상품 수정
adminRouter.patch('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;

        const {
            categoryId,
            name,
            price,
            description,
            madeBy,
            inventory,
            sellCount,
            mainImage,
        } = req.body;

        const updatedProductInfo = {
            ...(categoryId && { categoryId }),
            ...(name && { name }),
            ...(price && { price }),
            ...(description && { description }),
            ...(madeBy && { madeBy }),
            ...(inventory && { inventory }),
            ...(sellCount && { sellCount }),
            ...(mainImage && { mainImage }),
        };

        const updatedProduct = await productService.setProduct(
            productId,
            updatedProductInfo
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

//상품 삭제
adminRouter.delete('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;

        const deletedProduct = await productService.deleteProduct(productId);

        res.status(200).json(deletedProduct);
    } catch (error) {
        next(error);
    }
});

export { adminRouter };
