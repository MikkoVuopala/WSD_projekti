import { executeQuery } from "../database/database.js";
import { bcrypt } from "../deps.js";

const postLoginForm = async ({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    //check if username exists in the database
    const res = await executeQuery("SELECT FROM users WHERE email = $1;", email);
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
    //response.redirect()
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

export { postLoginForm, postRegistrationForm };