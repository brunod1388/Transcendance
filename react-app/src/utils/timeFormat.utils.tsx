function getDateMsg(date: Date): string {
    const now = new Date();

    if (date.getFullYear() === now.getFullYear() || date.getMonth() === now.getMonth()) {
        if (date.getDate() === now.getDate()) return "Today at";
        if (date.getDate() === now.getDate() - 1) return "Yesterday at";
    }
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 2000}`;
}

function getTimeStr(date: Date, withSeconds: boolean): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

    let time = `${hoursStr}:${minutesStr}`;
    if (withSeconds) time += `:${secondsStr}`;
    return time;
}

function dateDiffStr(date1: Date, date2: Date): String {
    const diff = date1.getTime() - date2.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
    const diffMinutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (diffDays > 0) {
        return diffDays + "d";
    } else if (diffHours > 0) {
        return diffHours + "h";
    } else if (diffMinutes > 0) {
        return diffMinutes + "m";
    } else {
        return diffSeconds + "s";
    }
}

export { getDateMsg, getTimeStr, dateDiffStr };
