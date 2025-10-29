// utils/dateUtils.js
exports.getNextNDatesISO = function (n) {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
  }
  return dates;
};
