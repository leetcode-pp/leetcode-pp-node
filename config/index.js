const startTime = new Date();

startTime.setMonth(5);
startTime.setDate(1);
startTime.setHours(0);
startTime.setMinutes(0);
startTime.setSeconds(0);

module.exports = {
  startTime: startTime.getTime(),
  secre: process.env.secret,
  clientId: "c16b80e7b58a5a007157",
  db: [
    {
      login: "azl397985856123",
    },
    {
      login: "Yueqi-19",
    },
  ],
};
