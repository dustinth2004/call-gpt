/**
 * Places an order for a given model and quantity.
 * @param {object} functionArgs - The arguments for the function.
 * @param {string} functionArgs.model - The model to place an order for.
 * @param {number} functionArgs.quantity - The number of items to order.
 * @returns {string} A JSON string containing the order number and price.
 */
async function placeOrder(functionArgs) {
  const {model, quantity} = functionArgs;
  console.log('GPT -> called placeOrder function');
  
  // generate a random order number that is 7 digits 
  const orderNum = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);

  // check model and return the order number and price with 7.9% sales tax
  if (model?.toLowerCase().includes('pro')) {
    return JSON.stringify({ orderNumber: orderNum, price: Math.floor(quantity * 249 * 1.079)});
  } else if (model?.toLowerCase().includes('max')) {
    return JSON.stringify({ orderNumber: orderNum, price: Math.floor(quantity * 549 * 1.079) });
  }
  return JSON.stringify({ orderNumber: orderNum, price: Math.floor(quantity * 179 * 1.079) });
}

module.exports = placeOrder;