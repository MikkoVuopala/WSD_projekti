import { executeQuery } from "../database/database.js";

const postMorningReport = async ({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const d = params.get('date');
    const sdur = params.get('sdur');
    const squal = params.get('squal');
    const mood = params.get('mood');
    const userID = (await session.get('user')).id

    await executeQuery("INSERT INTO morningData (date, sleep_duration, sleep_quality, generic_mood, user_id) VALUES ($1, $2, $3, $4, $5);", d, sdur, squal, mood, userID);
    response.body = "Report was successfully added."
    response.redirect('/behavior/reporting')
}

const postEveningReport = async ({request, response, session}) => {
    const body = request.body();
    const params = await body.value;

    const d = params.get('date');
    const s_e = params.get('s_e');
    const study = params.get('study');
    const eat = params.get('eat');
    const mood = params.get('mood');
    const userID = (await session.get('user')).id;

    await executeQuery("INSERT INTO eveningData (date, sport_exer, study_duration, eating, generic_mood, user_id) VALUES ($1, $2, $3, $4, $5, $6);", d, s_e, study, eat, mood, userID);
    response.body = "Report was successfully added."
    response.redirect('/behavior/reporting');
}

const briefSummary = async () => {
    const d = new Date().toISOString().slice(0,10);
    const today = "'%" + d + "%'";

    const avgToday = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE CAST(date AS text) LIKE $1 UNION SELECT generic_mood FROM eveningData WHERE CAST(date AS text) LIKE $1) AS g_m;", today);
    console.log(avgToday);
    const todayMood = avgToday.rowsOfObjects()[0];

    let d2 = new Date();
    d2.setDate(d2.getDate() - 1);
    d2.toISOString().slice(0,10);
    const yesterday = "'%" + d2 + "%'";

    const avgYesterday = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE CAST(date AS text) LIKE $1 UNION SELECT generic_mood FROM eveningData WHERE CAST(date AS text) LIKE $1) AS g_m;", yesterday);
    const yesterdayMood = avgYesterday.rowsOfObjects()[0];
    console.log(yesterdayMood);
    console.log(todayMood);
    const data = {
        today: todayMood,
        yesterday: yesterdayMood,
        mood: "Things are looking gloomy today."
    };

    if (avgToday >= avgYesterday) {
        data.mood = "Things are looking bright today."
    }

    return data;
}

export { postMorningReport, postEveningReport, briefSummary };