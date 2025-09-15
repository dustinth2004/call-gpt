/**
 * Checks the price for a given model.
 * @param {object} functionArgs - The arguments for the function.
 * @param {string} functionArgs.model - The model to check the price for.
 * @returns {string} A JSON string containing the price information.
 */
async function checkPrice(functionArgs) {
  let model = functionArgs.model;
  console.log('GPT -> called checkPrice function');
  if (model?.toLowerCase().includes('pro')) {
    return JSON.stringify({ price: 249 });
  } else if (model?.toLowerCase().includes('max')) {
    return JSON.stringify({ price: 549 });
  } else {
    return JSON.stringify({ price: 149 });
  }
}

module.exports = checkPrice;