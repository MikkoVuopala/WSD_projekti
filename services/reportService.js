import { executeQuery } from "../database/database.js";
import { calcWeekNo, getReportDataE, getReportDataM } from "../utils/utils.js";

const postMorningReport = async ({request, response, session}) => {
    const data = await getReportDataM(request);
    const userID = (await session.get('user')).id
    const today = new Date().toISOString().slice(0,10);
    const flag = await executeQuery("SELECT date FROM morningData WHERE user_id = $1 AND date = $2;", userID, today);
    if (flag.rowCount > 0) {
        await executeQuery("UPDATE morningData sleep_duration = $1, sleep_quality = $2, generic_mood = $3 WHERE user_id = $4 AND date = $5;", data.sdur, data.squal, data.mood, userID, data.d);
    } else {

    await executeQuery("INSERT INTO morningData (date, sleep_duration, sleep_quality, generic_mood, user_id, weekNo, monthNo) VALUES ($1, $2, $3, $4, $5, $6, $7);", data.d, data.sdur, data.squal, data.mood, userID, calcWeekNo(new Date(data.d)), new Date().getMonth() + 1);
    response.body = "Report was successfully added."
    response.redirect('/behavior/reporting')
    }
}

const postEveningReport = async ({request, response, session}) => {
    const data = await getReportDataE(request);
    const userID = (await session.get('user')).id;
    const today = new Date().toISOString().slice(0,10);
    const flag = await executeQuery("SELECT date FROM eveningData WHERE user_id = $1 AND date = $2;", userID, today);
    if (flag.rowCount > 0) {
        await executeQuery("UPDATE eveningData sport_exer = $1, study_duration = $2, eating = $3, generic_mood = $4 WHERE user_id = $5 AND date = $6;", data.s_e, data.study, data.eat, data.mood, userID, data.d);
    } else {

    await executeQuery("INSERT INTO eveningData (date, sport_exer, study_duration, eating, generic_mood, user_id, weekNo, monthNo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", data.d, data.s_e, data.study, data.eat, data.mood, userID, calcWeekNo(new Date(data.d)), new Date().getMonth() + 1);
    response.body = "Report was successfully added."
    console.log(response.body);
    response.redirect('/behavior/reporting');
    }
}

const briefSummary = async () => {
    const d = new Date().toISOString().slice(0,10);

    const avgToday = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE date = $1 UNION SELECT generic_mood FROM eveningData WHERE date = $1) AS g_m;", d);
    const todayMood = avgToday.rowsOfObjects()[0];

    let d2 = new Date();
    d2.setDate(d2.getDate() - 1);
    d2.toISOString().slice(0,10);


    const avgYesterday = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE date = $1 UNION SELECT generic_mood FROM eveningData WHERE date = $1) AS g_m;", d2);
    const yesterdayMood = avgYesterday.rowsOfObjects()[0];
    const data = {
        today: todayMood.avg,
        yesterday: yesterdayMood.avg,
        mood: "Things are looking gloomy today.",
        email: ""
    };

    if (avgToday >= avgYesterday) {
        data.mood = "Things are looking bright today."
    }

    return data;
}

export { postMorningReport, postEveningReport, briefSummary };