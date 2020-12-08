const showMorningReport = ({render}) => {
    render('morning.ejs');
}

const showEveningReport = ({render}) => {
    render('evening.ejs');
}

export { showMorningReport, showEveningReport };