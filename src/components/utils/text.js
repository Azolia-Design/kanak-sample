import * as prismicH from "@prismicio/client";

const convertHighlight = (field) => {
    let htmlString = prismicH.asHTML(field)
        .replace(/^<[^>]+>|<[^>]+>$/g, '')
        .replace(/<p[^>]*>|<\/p>/g, ' ')
    const replacer = (match, p1) => {
        let replacedString =  p1
             .split(/\b(\w+-\w+)\b|\s+/) // Tách thành từng từ, bao gồm các từ có gạch nối
             .filter(part => typeof part === 'string' && part.trim().length > 0) // Loại bỏ các phần tử không phải chuỗi và rỗng
             .map(word => `<span class="txt-green">${word}</span>`) // Bọc từng từ trong thẻ <span>
             .join(' '); // Kết hợp lại thành chuỗi
        if (replacedString.length > 0) {
            replacedString += ' ';
        }
        return replacedString;
    };
    // Thực hiện thay thế

    return htmlString.replace(/<span class="Highlight">(.*?)<\/span>/g, replacer);
}

const parseLabelsRichtext = (field, transformClass) => {
    const { inputLabel, outputClass } = transformClass;
    let htmlString = prismicH.asHTML(field)
        .replace(/^<[^>]+>|<[^>]+>$/g, '')
        .replace(/<p[^>]*>|<\/p>/g, ' ')
    const replacer = (match, p1) => {
        let replacedString =  p1
            .split(/\b(\w+-\w+)\b|\s+/)
            .filter(part => typeof part === 'string' && part.trim().length > 0)
            .map(word => `<span class="${outputClass}">${word}</span>`)
            .join(' ');
        if (replacedString.length > 0) {
            replacedString += ' ';
        }
        return replacedString;
    };
    // Thực hiện thay thế
    const regex = new RegExp(`<span class="${inputLabel}">(.*?)<\/span>`, 'g');
    return htmlString.replace(regex, replacer);
}

function convertDate(data) {
    let dateObject = new Date(data)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[dateObject.getMonth()];
    let day = dateObject.getDate();
    let year = dateObject.getFullYear();
    return month + " " + day + ", " + year;
}

function cleanText(text) {
    if (typeof (text) === "string") {
        return cleanText(document.querySelectorAll(text));
    } else if (text[0] && text[0].innerHTML) {
        for (var i = 0; i < text.length; i++) {
            cleanText(text[i]);
        }
        return;
    }
    text.innerHTML = text.innerHTML.replace(/\-/g, "&#8209;").replace(/V/g, "&zwnj;V&zwnj;").replace(/\./g, "&zwnj;.&zwnj;").replace(/,/g, "&zwnj;,&zwnj;").replace(/A/g, "&zwnj;A&zwnj;").replace(/fi/g, "f&zwnj;i");
}

function isEmpty(data) {
    if
        (data === null
        || (typeof data === 'undefined')
        || (typeof data === 'string' && data.trim().length === 0)
        || (typeof data === 'object' && Object.keys(data).length === 0)
        || (typeof data === 'number' && isNaN(data))
        || (typeof data === 'number' && !isFinite(data))
        || (Array.isArray(data) && data.length === 0))
        return true;

    return false;

}
function formatData(data) {
    return data && data.toLowerCase().replace(/ /g, "-").replace("&", "")
}
export { convertHighlight, parseLabelsRichtext, convertDate, cleanText, isEmpty, formatData }


