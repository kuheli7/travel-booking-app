export function getNextNDates(n: number): string[] {
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i < n; i++) {
    const next = new Date(today);
    next.setDate(today.getDate() + i);
    dates.push(next.toISOString().split("T")[0]); // "YYYY-MM-DD"
  }
  return dates;
}
