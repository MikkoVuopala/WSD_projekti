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

export { postMorningReport, postEveningReport };