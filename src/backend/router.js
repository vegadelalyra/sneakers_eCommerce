import { error, home, product, collections, checkout } from './routes.js'

const Routes = {
    404 : error, 
    '/#' : home,
    'collections' : collections,
    'productID' : product,
    'checkout' : checkout,
}

Router()
window.addEventListener('hashchange', Router)

async function Router () {
  let location = window.location.hash.replace('#', '')
  if (location.length == 0) location = '/#'

  // Guard Clause for random fetched products from Home route
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

