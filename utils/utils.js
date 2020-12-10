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
        data.verification = params.get('verification');
    }

    return data;
};

const getReportDataE = async (request) => {
    const data = {
        d: new Date(),
        s_e: null,
        study: null,
        eat: null,
        mood: null,
        email: ""
    }
    if (request) {
        const body = request.body();
        const params = await body.value;
        data.d = params.get('date');
        data.s_e = params.get('s_e');
        data.study = params.get('study');
        data.eat = params.get('eat');
        data.mood = params.get('mood');
    }
    return data;
};

const getReportDataM = async (request) => {
    const data = {
        d: new Date(),
        sdur: null,
        squal: null,
        mood: null,
        email: ""
    }
    if (request) {
        const body = request.body();
        const params = await body.value;
        data.d = params.get('date');
        data.sdur = params.get('sdur');
        data.squal = params.get('squal');
        data.mood = params.get('mood');
    }
    return data;
};

const calcWeekNo = (date) => {
    var tdt = new Date(date.valueOf());
    var dayn = (date.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
        tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

export { getData, getReportDataE, getReportDataM, calcWeekNo };