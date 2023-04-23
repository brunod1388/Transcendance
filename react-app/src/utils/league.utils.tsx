export function getLeague(points: number): string {
    if (points < 5) return "Noob";
    if (points < 10) return "Bronze";
    if (points < 20) return "Silver";
    if (points < 30) return "Gold";
    return "Diamond";
}
