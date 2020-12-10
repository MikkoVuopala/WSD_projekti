import { briefSummary } from "../../services/reportService.js";

const showFrontPage = async ({render, session}) => {
    const data = await briefSummary();
    if (await session.get('authenticated')) {
        const email = (await session.get('user')).email
         data.email = email;
    }
    render('index.ejs', data);
}

export { showFrontPage };