import "../../assets/styles/ProductDetails.css";

const ProductDetail = (id) => {
    return /*html*/ `
        <h1>Chi tiết sản phẩm</h1>
        <div id="product-detail" class="detail">
            <img id="product-image" src="" alt="Product Image" />
            <h2 id="product-name"></h2>
            <p id="product-price"></p>
            <p id="product-description"></p>
          <div class="buttons">
                    <button>Check Out</button>
                    <button id="add-to-cart">Add To Cart 
                        <span>
                            <svg class="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
                            </svg>
                        </span>
                    </button>
                </div>
        </div>
        <h3>Sản phẩm tương tự</h3>
        <div id="similar-products"></div>
    `;
};

export default ProductDetail;
