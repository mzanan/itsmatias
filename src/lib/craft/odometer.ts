export type OdometerMonth = {
  label: string;
  balance: number;
  income: number;
  expense: number;
};

export const TICKER_DURATION_S = 6;
export const TICKER_FIRST_HOLD = 0.28;

export const TICKER_KEYFRAMES = `@keyframes craft-ticker {
  0%, 28% { transform: translateY(0); }
  33%, 61% { transform: translateY(-33.333%); }
  66%, 94% { transform: translateY(-66.666%); }
  100% { transform: translateY(0); }
}`;

export const tickerDelay = (skipFirstHold: boolean) =>
  skipFirstHold ? `-${TICKER_DURATION_S * TICKER_FIRST_HOLD}s` : "0s";

export const formatMoney = (
  amount: number,
  currency: string,
  options: { signed?: boolean } = {},
) => {
  const num = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  const sign = amount < 0 ? "-" : options.signed ? "+" : "";
  return `${sign}${num}`;
};

export const odometerTickers = (months: OdometerMonth[], currency: string) => ({
  labels: months.map((month) => month.label),
  balances: months.map((month) => formatMoney(month.balance, currency, { signed: true })),
  incomes: months.map((month) => `+${formatMoney(month.income, currency)}`),
  expenses: months.map((month) => `-${formatMoney(month.expense, currency)}`),
});

export const nextIndex = (index: number, length: number) => (index + 1) % length;
