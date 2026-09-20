import "server-only";

// Kept on the server. Only the computed age is rendered in the page.
export function currentAge(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", year: "numeric", month: "numeric", day: "numeric" }).formatToParts(now);
  const number = (type: string) => Number(parts.find(part => part.type === type)?.value);
  const beforeBirthday = number("month") < 10 || (number("month") === 10 && number("day") < 9);
  return number("year") - 2007 - Number(beforeBirthday);
}
