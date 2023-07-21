import { error, home, product, collections, women, men } from './routes.js'

const Routes = {
    404 : error, 
    '/#' : home,
    'collections' : collections,
    'productID' : product,
    'collections/women': women,
    'collections/men': men,
}

Router()
window.addEventListener('hashchange', Router)

async function Router () {
  let location = window.location.hash.replace('#', '')

  // [GUARD CLAUSES]
  // Home Route Guard Clause
  if (location.length == 0) location = '/#'

  // Picked products from changing URL or clicking collection
  const pickedProduct = location.match(/\d+/g) 
  if (!!pickedProduct) localStorage
  .setItem('fetched product', pickedProduct.map(Number))  
  
  // Random fetched products from Home Route
  const productID = `product/${localStorage.getItem('fetched product')}` 
  if (location == productID) return Routes['productID']()

  // Default behaviour: render standard routes
  const route = Routes[location] || Routes[404]
  route();
}
/**********************
 * HISTORY PUSH STATE *
 **********************/
/**
 * 
// Function to navigate to a new URL and update the browser history
function navigateTo(url) {
  // Use the pushState method to navigate to the new URL and update the browser history
  history.pushState(null, null, url);

  // Trigger the route change manually
  handleRouteChange();
}

// Example usage to navigate to a product page
navigateTo("/products/1"); 

 */

