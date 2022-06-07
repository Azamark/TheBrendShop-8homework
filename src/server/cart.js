const add = (cart, req) => {
    cart.push(req.body);
    return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
    const find = cart.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
    const find = cart.find(el => el.id_product === +req.params.id);
    cart.splice(cart.indexOf(find), 1);
    return JSON.stringify(cart, null, 4);
};
const clear = (cart, req) => {
    cart.splice(0, cart.length);
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    del,
    clear
};