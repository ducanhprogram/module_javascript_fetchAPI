import { addCategory } from "../../api/categoryApi";
import "../../assets/styles/addCategory.css";
const AddCategory = () => {
    return /*html*/ `
        <div class="container-addCategory">
            <h2>Thêm danh mục mới</h2>
            <form id="category-form">
            
             <div class="mb-3">
                <label for="category-name">Tên danh mục: </label>
                <input type="text" id="category-name" name="category-name" required>
                </div>

            <div class="mb-3">
                  <label for="category-image">URL hình ảnh: </label>
                <input type="text" id="category-image"
                name="category-image" required>
            </div>
                <button type="submit">Thêm danh mục</button>
            </form>
        </div>
    `;
};

export default AddCategory;
