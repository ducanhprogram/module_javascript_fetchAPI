const serverApi = `http://localhost:3000`;

export const getAll = async () => {
    try {
        const response = await fetch(`${serverApi}/products`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getProduct = async (id) => {
    try {
        const response = await fetch(`${serverApi}/prducts/${id}`);
        const data = await response.json();
    } catch (e) {
        console.error(e);
    }
};

export const createProduct = async (product) => {
    try {
        const response = await fetch(`${serverApi}/prducts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
};
