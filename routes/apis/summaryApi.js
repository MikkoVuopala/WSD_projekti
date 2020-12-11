import {getLastSevenDaysData, getDataDay} from "../../services/summaryService.js";

const serveData = async ({response}) => {
    const data = await getLastSevenDaysData();
    response.body = data;
}

const ServeDataForOneDay = async ({response, params}) => {
    const data = await getDataDay(params);
    response.body = data;
}

export { serveData, ServeDataForOneDay };