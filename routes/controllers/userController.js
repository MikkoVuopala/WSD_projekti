import { authenticateUser, reportCheck } from "../../services/userService.js";

const showLoginForm = ({render}) => {
    render('login.ejs');
}

const showRegistrationForm = ({render}) => {
    render('registration.ejs');
}

const showBehaviorPage = async ({session, response, render}) => {
    if (authenticateUser) {
        const userId = (await session.get('user')).id
        const data = await reportCheck(userId);
        render('start.ejs', data);
    } else {
        response.status = 401;
    }
}

export { showLoginForm, showRegistrationForm, showBehaviorPage };

