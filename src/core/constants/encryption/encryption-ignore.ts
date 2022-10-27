export const UserIgnore = ["_id", "password", "level"];
export const AccountIgnore = [
  "_id",
  "acc_number",
  "acc_parents",
  "acc_cashflow_type",
  "acc_balance_type",
];
export const BalanceIgnore = ["_id", "balance_date", "balance_acc"];
export const BalanceCardIgnore = [
  "_id",
  "balance_date",
  "balance_acc",

  "journal_number",
];
export const CurrencyIgnore = ["_id", "currency_code"];
export const JournalIgnore = [
  "_id",
  "journal_date",
  "journal_number",
  "acc_number",
];
export const JournalTemplateIgnore = ["_id", "acc_number"];
export const SystemIgnore = [
  "_id",
  "project_code",
  "project_logo",
  "project_currency",
  "retained_earnings_acc",
  "period_closing_date",
];
export const TransactionLogIgnore = ["_id", "transaction_date"];
