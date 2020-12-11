import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js";
import { getData } from "../utils/utils.js";
import { isEmail, validate, minLength, required } from "../deps.js";

const postLoginForm = async ({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    //check if username exists in the database
    const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (res.rowCount === 0) {
        response.status = 401;
        return;
    }
    
    const usr = res.rowsOfObjects()[0];
    const hash = usr.password;

    const correctPW = await bcrypt.compare(password, hash);
    if (!correctPW) {
        response.status = 401;
        return;
    }


    //setup session
    await session.set('authenticated', true);
    await session.set('user', {
        id: usr.id,
        email: usr.email
    });
    response.body = 'Authentication successful!';
    response.redirect('/behavior/reporting')
}

const postRegistrationForm = async ({request, response, render}) => {
    const data = await getData(request);
    const validationRules = {
        email: [required, isEmail],
        password: [required, minLength(4)]
    }
    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        data.errors = errors;
        render('registration.ejs', data);
    } else {

    if (data.password !== data.verification) {
        response.body = 'The entered passwords did not match';
        return;
    }
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", data.email);
    if (existingUsers.rowCount > 0) {
      response.body = 'The email is already reserved.';
      console.log(response.body);
      return;
    }

    const hash = await bcrypt.hash(data.password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", data.email, hash);
    response.body = 'Registration successful!';
    response.redirect('/auth/login');   
    console.log(response.body);
    }
}

const authenticateUser = async ({session}) => {
    if (!(await session.get('authenticated'))) {
        return false;
    }
    return true;
}

const reportCheck = async (uID) => {
    //check wheter user has already done reports for today.
    const userId = uID;
    const today = new Date().toISOString().slice(0,10);
    
    const data = {
        morning: false,
        evening: false,
        email: ""
    };
    
    const morningData = await executeQuery("SELECT * FROM morningData WHERE user_id = $1 AND date = $2;", userId, today);

    if (morningData.rowCount > 0) {
        data.morning = true;
    }
    const eveningData = await executeQuery("SELECT * FROM eveningData WHERE user_id = $1 AND date = $2;", userId, today);
    if (eveningData.rowCount > 0) {
        data.evening = true;
    }

    return data;
}

const postLogOut = async ({response, session}) => {
    await session.set('authenticated', false);
    await session.set('user', null);
    response.redirect('/');
}

export { postLoginForm, postRegistrationForm, authenticateUser, reportCheck, postLogOut };