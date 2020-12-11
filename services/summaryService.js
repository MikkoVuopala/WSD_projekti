import { executeQuery } from "../database/database.js";

const getAverages = async (w, m) => {
    const data = {
        sleep_duration: null,
        sports_exer: null,
        studying: null,
        sleep_quality: null,
        generic_mood: null,
        email: "",
        sleep_duration_month: null,
        sports_exer_month: null,
        studying_month: null,
        sleep_quality_month: null,
        generic_mood_month: null, 
        week: w,
        month: m
    }
    
    const weekNo = w;
    const monthNo = m;

    const SD = await executeQuery("SELECT AVG(sleep_duration) FROM morningData WHERE weekNo = $1;", weekNo);
    if (SD.rowCount > 0) {
        data.sleep_duration = SD.rowsOfObjects()[0].avg;
    }
    const SQ = await executeQuery("SELECT AVG(sleep_quality) FROM morningData WHERE weekNo = $1;", weekNo);
    if (SQ.rowCount > 0) {
        data.sleep_quality = SQ.rowsOfObjects()[0].avg;
    }
    const S = await executeQuery("SELECT AVG(study_duration) FROM eveningData WHERE weekNo = $1;", weekNo);
    if (S.rowCount > 0) {
        data.studying = S.rowsOfObjects()[0].avg;
    }
    const SE = await executeQuery("SELECT AVG(sport_exer) FROM eveningData WHERE weekNo = $1;", weekNo);
    if (SE.rowCount > 0) {
        data.sports_exer = SE.rowsOfObjects()[0].avg;
    }
    const mood = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE weekNo = $1 UNION SELECT generic_mood FROM eveningData WHERE weekNo = $1) AS g_m;", weekNo);
    if (mood.rowCount > 0) {
        data.generic_mood = mood.rowsOfObjects()[0].avg;
    }

    //monthly
    const SDM = await executeQuery("SELECT AVG(sleep_duration) FROM morningData WHERE monthNo = $1;", monthNo);
    if (SDM.rowCount > 0) {
        data.sleep_duration_month = SDM.rowsOfObjects()[0].avg;
    }
    const SQM = await executeQuery("SELECT AVG(sleep_quality) FROM morningData WHERE monthNo = $1;", monthNo);
    if (SQM.rowCount > 0) {
        data.sleep_quality_month = SQM.rowsOfObjects()[0].avg;
    }
    const SM = await executeQuery("SELECT AVG(study_duration) FROM eveningData WHERE monthNo = $1;", monthNo);
    if (SM.rowCount > 0) {
        data.studying_month = SM.rowsOfObjects()[0].avg;
    }
    const SEM = await executeQuery("SELECT AVG(sport_exer) FROM eveningData WHERE monthNo = $1;", monthNo);
    if (SEM.rowCount > 0) {
        data.sports_exer_month = SEM.rowsOfObjects()[0].avg;
    }
    const moodM = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE monthNo = $1 UNION SELECT generic_mood FROM eveningData WHERE monthNo = $1) AS g_m;", monthNo);
    if (moodM.rowCount > 0) {
        data.generic_mood_month = moodM.rowsOfObjects()[0].avg;
    }


    return data;
}

const getLastSevenDaysData = async () => {
    let d = new Date();
    d.setDate(d.getDate() - 6);

    const data = {
        sleep_duration: null,
        sleep_quality: null,
        studying: null,
        sports_exer: null,
        generic_mood: null
    }

    const SD = await executeQuery("SELECT AVG(sleep_duration) FROM morningData WHERE date >= $1;", d);
    if (SD.rowCount > 0) {
        data.sleep_duration = SD.rowsOfObjects()[0].avg;
    }
    const SQ = await executeQuery("SELECT AVG(sleep_quality) FROM morningData WHERE date >= $1;", d);
    if (SQ.rowCount > 0) {
        data.sleep_quality = SQ.rowsOfObjects()[0].avg;
    }
    const S = await executeQuery("SELECT AVG(study_duration) FROM eveningData WHERE date >= $1;", d);
    if (S.rowCount > 0) {
        data.studying = S.rowsOfObjects()[0].avg;
    }
    const SE = await executeQuery("SELECT AVG(sport_exer) FROM eveningData WHERE date >= $1;", d);
    if (SE.rowCount > 0) {
        data.sports_exer = SE.rowsOfObjects()[0].avg;
    }
    const mood = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE date >= $1 UNION SELECT generic_mood FROM eveningData WHERE date >= $1) AS g_m;", d);
    if (mood.rowCount > 0) {
        data.generic_mood = mood.rowsOfObjects()[0].avg;
    } 

    return data;
}

const getDataDay = async(params) => {
    const data = {
        sleep_duration: null,
        sleep_quality: null,
        studying: null,
        sports_exer: null,
        generic_mood: null
    }
    const y = params.year;
    const m = params.month;
    const d = params.day;

    const date = new Date(y,m-1,d);
    console.log(date);

    const SD = await executeQuery("SELECT AVG(sleep_duration) FROM morningData WHERE date = $1;", date);
    if (SD.rowCount > 0) {
        data.sleep_duration = SD.rowsOfObjects()[0].avg;
    }
    const SQ = await executeQuery("SELECT AVG(sleep_quality) FROM morningData WHERE date = $1;", date);
    if (SQ.rowCount > 0) {
        data.sleep_quality = SQ.rowsOfObjects()[0].avg;
    }
    const S = await executeQuery("SELECT AVG(study_duration) FROM eveningData WHERE date = $1;", date);
    if (S.rowCount > 0) {
        data.studying = S.rowsOfObjects()[0].avg;
    }
    const SE = await executeQuery("SELECT AVG(sport_exer) FROM eveningData WHERE date = $1;", date);
    if (SE.rowCount > 0) {
        data.sports_exer = SE.rowsOfObjects()[0].avg;
    }
    const mood = await executeQuery("SELECT AVG(generic_mood) FROM (SELECT generic_mood FROM morningData WHERE date = $1 UNION SELECT generic_mood FROM eveningData WHERE date = $1) AS g_m;", date);
    if (mood.rowCount > 0) {
        data.generic_mood = mood.rowsOfObjects()[0].avg;
    } 

    return data;
}

export { getAverages, getLastSevenDaysData, getDataDay };