import { getReportDataE, getReportDataM } from "../../utils/utils.js";

const showMorningReport = async ({render, session}) => {
    const data = await getReportDataM();
    const email = (await session.get('user')).email;
    data.email = email;
    render('morning.ejs', data);
}

const showEveningReport = async ({render, session}) => {
    const data = await getReportDataE();
    const email = (await session.get('user')).email;
    data.email = email;
    render('evening.ejs', data);
}

export { showMorningReport, showEveningReport };