const virtualProductItem = (data) => {
    data.forEach((page) => {
        while (page.items.length < page.maxItem) {
            page.items = [
                ...page.items,
                {
                    image: '',
                    description: '',
                    rating: '',
                    saleOff: 0,
                    price: '',
                    typicalPrice: '',
                    ship: '',
                },
            ];
        }
    });

    return data;
};

const getSearchPageBrands = (data) => {
    let brandList = [];

    data.forEach((page) => {
        page.items.forEach((item) => {
            if (!brandList.includes(item.brand)) {
                brandList.push(item.brand);
            }
        });
    });

    return brandList;
};

export { virtualProductItem, getSearchPageBrands };
