import moment from "moment";

export default function timePassed(dateStr: string) {
    const date = moment(dateStr);
    const now = moment();
    const difference = now.diff(date, "minutes");

    if (difference < 1) {
        return "now";
    } else if (difference < 60) {
        return `${difference}m`;
    } else if (difference < 60 * 24) {
        return `${difference / 60}h`;
    } else if (difference < 60 * 24 * 2) {
        return "a day ago";
    } else if (difference < 60 * 24 * 7) {
        return `${Math.floor(difference / (60 * 24))}d`;
    } else if (difference < 60 * 24 * 7 * 52) {
        return `${Math.floor(difference / (60 * 24 * 7))}w`;
    } else {
        return `${Math.floor(difference / (60 * 24 * 365))}y`;
    }
}
