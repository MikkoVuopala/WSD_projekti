const showLoginForm = ({render}) => {
    render('login.ejs');
}

const showRegistrationForm = ({render}) => {
    render('registration.ejs');
}

export { showLoginForm, showRegistrationForm };

