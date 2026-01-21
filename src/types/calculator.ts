export interface CalculatorInputs {
  purchasePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  monthlyRent: number;
  propertyTaxAnnual: number;
  insuranceAnnual: number;
  maintenancePercent: number;
  vacancyPercent: number;
}

export interface CalculatorResults {
  // Investment amounts
  downPayment: number;
  loanAmount: number;
  totalCashInvested: number;

  // Monthly figures
  monthlyMortgage: number;
  monthlyExpenses: number;
  monthlyVacancyLoss: number;
  effectiveMonthlyRent: number;
  monthlyCashFlow: number;

  // Annual figures
  annualRent: number;
  annualExpenses: number;
  annualCashFlow: number;
  netOperatingIncome: number;

  // Returns
  grossYield: number;
  netYield: number;
  capRate: number;
  cashOnCash: number;
}

export const defaultInputs: CalculatorInputs = {
  purchasePrice: 300000,
  downPaymentPercent: 20,
  interestRate: 3.5,
  loanTermYears: 25,
  monthlyRent: 1200,
  propertyTaxAnnual: 1500,
  insuranceAnnual: 600,
  maintenancePercent: 5,
  vacancyPercent: 5,
};
