
export default {
    formatDate(date) {
        const d = new Date(date);
        if ( !d.valueOf() ) {
            return date;
        }
        return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    }
}