const getData = async (request) => {
    const data = {
        email: "",
        password: "",
        verification: "",
        errors: null
    }

    if(request) {
        const body = request.body();
        const params = await body.value;
        data.email = params.get('email');
        data.password = params.get('password');
    }

    return data;
};

export { getData };