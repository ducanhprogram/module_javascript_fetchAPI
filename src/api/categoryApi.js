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

export const addCategory = async (category) => {
    try {
        const response = await fetch(`${serverApi}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.error("Lỗi thêm danh mục: ", e);
    }
};
