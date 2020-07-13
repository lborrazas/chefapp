function muiChangePageEvent($page){
    let event = new Event('end-page-new-page');
    event.page = $page;
    window.dispatchEvent(event);
}

module.exports = muiChangePageEvent;