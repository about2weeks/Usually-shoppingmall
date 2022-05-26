import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('category', CategorySchema);

export class CategoryModel {
    async findAll() {
        const categories = await Category.find({});
        return categories;
    }

    async findById(categoryId) {
        const category = await Category.findOne({ categoryId });
        return category;
    }

    async create(categoryInfo) {
        const createdNewCategory = await Category.create(categoryInfo);
        return createdNewCategory;
    }

    async update({ categoryId, update }) {
        const filter = { categoryId };
        const option = { returnOriginal: false };

        const updateCategory = await Category.findOneAndUpdate({
            filter,
            update,
            option,
        });
        return updateCategory;
    }

    async delete({ categoryId }) {
        const filter = { categoryId };

        const deleteCategory = await Category.deleteOne(filter);
        return deleteCategory;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel };