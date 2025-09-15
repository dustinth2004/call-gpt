/**
 * Checks the inventory for a given model.
 * @param {object} functionArgs - The arguments for the function.
 * @param {string} functionArgs.model - The model to check inventory for.
 * @returns {string} A JSON string containing the stock information.
 */
async function checkInventory(functionArgs) {
  const model = functionArgs.model;
  console.log('GPT -> called checkInventory function');
  
  if (model?.toLowerCase().includes('pro')) {
    return JSON.stringify({ stock: 10 });
  } else if (model?.toLowerCase().includes('max')) {
    return JSON.stringify({ stock: 0 });
  } else {
    return JSON.stringify({ stock: 100 });
  }
}

module.exports = checkInventory;