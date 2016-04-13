function getAPI(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    var result = txt.value;
    result = JSON.parse(result.slice(1, -1));
    return result;
}