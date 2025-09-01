// Reducing balance EMI calculator + schedule
export function computeEmi({ principal, annualRate, months }) {
  const r = (annualRate / 12) / 100;
  if (r === 0) {
    const emi = +(principal / months).toFixed(2);
    const schedule = Array.from({ length: months }, (_, i) => ({
      month: i + 1, principal: +emi.toFixed(2), interest: 0, balance: +(principal - emi * (i + 1)).toFixed(2)
    }));
    return { emi, schedule };
  }
  const pow = Math.pow(1 + r, months);
  const emi = +(principal * r * pow / (pow - 1)).toFixed(2);
  let balance = principal;
  const schedule = [];
  for (let m = 1; m <= months; m++) {
    const interest = +(balance * r).toFixed(2);
    const principalPart = +(emi - interest).toFixed(2);
    balance = +(balance - principalPart).toFixed(2);
    schedule.push({ month: m, principal: principalPart, interest, balance: Math.max(balance, 0) });
  }
  return { emi, schedule };
}
