import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js";

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

const postRegistrationForm = async ({request, response}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');

    if (password !== verification) {
        response.body = 'The entered passwords did not match';
        return;
    }
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
    if (existingUsers.rowCount > 0) {
      response.body = 'The email is already reserved.';
      console.log(response.body);
      return;
    }

    const hash = await bcrypt.hash(password);
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
    response.body = 'Registration successful!';
    response.redirect('/auth/login');
    console.log(response.body);
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
    console.log(userId);
    const temp = new Date().toISOString().slice(0,10);
    const today = "'%" + temp + "%'";
    const data = {
        morning: false,
        evening: false
    };
    //tää query ei vielä täysin toimi.
    const morningData = await executeQuery("SELECT * FROM morningData WHERE user_id = $1 AND CAST(date AS text) LIKE $2;", userId, today);
    console.log(morningData.rowsOfObjects());
    if (morningData.rowCount > 0) {
        data.morning = true;
    }
    const eveningData = await executeQuery("SELECT * FROM eveningData WHERE user_id = $1 AND CAST(date AS text) LIKE $2;", userId, today);
    if (eveningData.rowCount > 0) {
        data.evening = true;
    }
    return data;
}

export { postLoginForm, postRegistrationForm, authenticateUser, reportCheck };