
import Home from "./screens/Home";
import Quotes from "./screens/Quotes";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import InactiveAccount from "./screens/InactiveAccount";

class Route {
    constructor(path, component) {
        this.path = path
        this.component = component
    }
}


export const ROUTES = [
    new Route('/', Home),
    new Route('/quotes', Quotes),
    {path: '/login', component: Login},
    new Route('/signup', Signup),
    new Route('/inactive', InactiveAccount),
]
