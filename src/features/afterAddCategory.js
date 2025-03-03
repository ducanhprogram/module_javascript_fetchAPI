import { addCategory } from "../api/categoryApi";

const afterAddCategory = () => {
    const form = document.querySelector("#category-form");
    if (!form) {
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document
            .querySelector("#category-name")
            .value.toUpperCase()
            .trim();
        const image = document.querySelector("#category-image").value.trim();

        if (!name || !image) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const newCategory = { name, image };
        try {
            await addCategory(newCategory); // Gọi API để thêm danh mục
            alert("Thêm danh mục thành công!");
            form.reset(); // Xóa form sau khi thêm thành công
        } catch (error) {
            console.error("Lỗi khi thêm danh mục:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    });
};

export default afterAddCategory;
