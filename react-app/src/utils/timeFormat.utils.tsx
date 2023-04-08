function getDateMsg(date: Date): string {
    const now = new Date();

    if (
        date.getFullYear() === now.getFullYear() ||
        date.getMonth() === now.getMonth()
    ) {
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

export { getDateMsg, getTimeStr};