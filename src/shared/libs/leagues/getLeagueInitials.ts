export const getLeagueInitials = (leagueName: string): string => {
    return leagueName
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
};
