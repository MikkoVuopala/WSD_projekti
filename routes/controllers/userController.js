import { authenticateUser, reportCheck } from "../../services/userService.js";
import { getData } from "../../utils/utils.js";

const showLoginForm = ({render}) => {
    render('login.ejs');
}

const showRegistrationForm = async ({render}) => {
    render('registration.ejs', await getData());
}

const showBehaviorPage = async ({session, response, render}) => {
    if (authenticateUser) {
        const userId = (await session.get('user')).id
        //const data = await reportCheck(userId);
        render('start.ejs', await reportCheck(userId));
    } else {
        response.status = 401;
    }
}

export { showLoginForm, showRegistrationForm, showBehaviorPage };

