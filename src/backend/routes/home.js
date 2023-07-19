import { PageTitle } from './pageTitle.js'

export function home () {
    console.log('Hello from HOME')

    return {
        template: "/src/backend/templates/home.html",
        title: `Home | ${PageTitle}`,
        description: "Sneakers Gallery"
    }   
}
