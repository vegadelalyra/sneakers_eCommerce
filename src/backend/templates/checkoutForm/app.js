import { server } from '../../routes/pageTitle&dbURL.js'

console.log('HELLO FROM AXIOS-BASED APP')

await axios.get(server.endPoint)
.then(x => console.log(x.data.products))
    


