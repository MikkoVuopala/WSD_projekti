import { authenticateUser } from "../../services/userService.js";

const showLoginForm = ({render}) => {
    render('login.ejs');
}

const showRegistrationForm = ({render}) => {
    render('registration.ejs');
}

const showBehaviorPage = ({response, render}) => {
    if (authenticateUser) {
        //do stuff
    } else {
        response.status = 401;
    }
}

export { showLoginForm, showRegistrationForm };

