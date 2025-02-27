import "../../assets/styles/addProduct.css";
import getProducts from "../afterAddProduct";

const addProduct = async () => {
    const categories = await getProducts();

    const categoryOptions =
        `<option value="0" disabled selected style="font-weight: bold;">Select Category</option>` +
        categories
            .map((category) => {
                return `<option value="${category.id}">${category.name}</option>`;
            })
            .join("");
    return /*html*/ `<div class="container-product">
         <h1 class="add-product">Add New Product</h1>
        <form id="form-product" class="form-product">
            <label for="form-name">Product Name:</label>
            <input class="input-add-product" type="text" id="form-name" name="productName" required>

            <label for="form-price">Product Price:</label>
            <input class="input-add-product" type="number" id="form-price" name="productPrice" required>

            <label for="form-description">Product Description:</label>
            <textarea id="form-description" name="productDescription" required></textarea>
            
            <label for="form-category">Category: </label>
            <select class="form-category" id="form-category" name="productCategory" required>
                    ${categoryOptions}
           </select>

            <label for="form-image">Product Image URL:</label>
            <input class="input-add-product" type="url" id="form-image" name="productImage" required>

            <button class="submit-form-product" type="submit">Add Product</button>
        </form>
    </div>`;
};

export default addProduct;
