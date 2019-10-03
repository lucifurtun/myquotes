import Quotes from "./screens/Quotes";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import InactiveAccount from "./screens/InactiveAccount";
import Settings from "./screens/Settings";

class Route {
    constructor(path, component, isPublic = false) {
        this.path = path
        this.component = component
        this.isPublic = isPublic
    }
}


export const ROUTES = [
    new Route('/', Quotes, false),
    // new Route('/quotes', Quotes, false),
    new Route('/login', Login, true),
    new Route('/signup', Signup, true),
    new Route('/inactive', InactiveAccount, true),
    new Route('/settings', Settings, false),
    new Route('/:username', Quotes, false),
]
