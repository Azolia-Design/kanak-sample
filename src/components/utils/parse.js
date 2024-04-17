import { isEmpty } from "@utils/text";

const normalize = (mousePos, maxDis) => (mousePos / maxDis - 0.5) * 2;

const updateQueryParam = (data) => {
    const { origin: wOrigin, pathname: wPath, search: wSearch, hash: wHash } = window.location;
    let searchParams = new URLSearchParams(wSearch);

    data.forEach((item) => {
        const { key, value } = item;
        if (isEmpty(value)) {
            searchParams.delete(key);
        } else {
            if (searchParams.has(key)) {
                searchParams.set(key, value);
            } else {
                searchParams.append(key, value);
            }
        }
    })

    let new_url = `${wOrigin}${wPath}?${searchParams.toString()}${wHash}`
    return new_url;
}


export { normalize, updateQueryParam };