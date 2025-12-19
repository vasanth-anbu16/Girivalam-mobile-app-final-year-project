export const getFullMoonDate = () => {
    const fullMoonDates = [
        new Date("2025-03-13T10:36:00"),
        new Date("2025-04-12T03:23:00"),
        new Date("2025-05-11T20:02:00"),
    ];
    return fullMoonDates.find(date => date > new Date()) || fullMoonDates[0];
};
