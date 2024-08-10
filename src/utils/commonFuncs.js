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
                    originalPrice: '',
                    ship: '',
                },
            ];
        }
    });

    return data;
};

export { virtualProductItem };
