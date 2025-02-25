const serverApi = `http://localhost:3000`;

export const getCategories = async () => {
    try {
        const response = await fetch(`${serverApi}/categories`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Lỗi khi lấy danh mục:", e);
    }
};
