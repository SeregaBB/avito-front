export default class SaverFilters {

    setFilters(data) {
        localStorage.setItem('filters', JSON.stringify(data));
    }

    getFilters() {
        return JSON.parse(localStorage.getItem('filters'))
    }
}