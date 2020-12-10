import { getAverages } from "../../services/summaryService.js";
import { calcWeekNo } from "../../utils/utils.js";

const showSummaryPage = async ({render, session}) => {
    const data = await getAverages(calcWeekNo(new Date()) - 1, new Date().getMonth() + 1);
    const email = (await session.get('user')).email;
    data.email = email;
    console.log(calcWeekNo(new Date()) - 1);
    render('summary.ejs', data);
}

const changeWeek = async ({request, render, session}) => {
    const body = request.body();
    const params = await body.value;
    const w = params.get('week');
    const week = Number(w.slice(6));
    const data = await getAverages(week, new Date().getMonth() + 1);
    const email = (await session.get('user')).email;
    data.email = email;
    render('summary.ejs', data);
}

const changeMonth = async ({request, session, render}) => {
    const body = request.body();
    const params = await body.value;
    const m = params.get('month');
    const month = Number(m.slice(5));
    const data = await getAverages(calcWeekNo(new Date()) - 1, month);
    const email = (await session.get('user')).email;
    data.email = email;
    render('summary.ejs', data);
}

export { showSummaryPage, changeWeek, changeMonth };