import PRODUCTS from '../../data/dummy-data';

const initState = {
    availableProducts: PRODUCTS ,
    userProducts: PRODUCTS .filter(product => product.id === 'u1')
}

export default (state=initState, action) => {
    return state;
}