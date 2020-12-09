import { briefSummary } from "../../services/reportService.js";

const showFrontPage = async ({render}) => {
    const data = await briefSummary();
    render('index.ejs', data);
}

export { showFrontPage };