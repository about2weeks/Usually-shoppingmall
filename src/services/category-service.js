import { categoryModel } from '../db';

class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    //상품 카테고리를 받음
    async getCategories() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }

    //상세 카테고리 정보를 받음
    async getCategory(categoryId) {
        const category = await this.categoryModel.findById(categoryId);
        return category;
    }

    //카테고리를 생성함
    async AddCategory(categoryInfo) {
        const createNewCategory = await this.categoryModel.create(categoryInfo);
        return createNewCategory;
    }

    //카테고리를 수정함
    async setCategory(categoryId, toUpdate) {
        let category = await this.categoryModel.findById(categoryId);

        if (!category) {
            throw new Error(
                '카테고리 내역이 없습니다. 다시 한 번 확인해 주세요.'
            );
        }

        category = await this.categoryModel.update({
            categoryId,
            update: toUpdate,
        });

        return category;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
