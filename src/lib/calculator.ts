import { CalculatorInputs, CalculatorResults } from '@/types/calculator';

/**
 * Calculate monthly mortgage payment using the standard amortization formula
 */
function calculateMonthlyMortgage(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0) return 0;
  if (annualRate <= 0) return principal / (years * 12);

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return payment;
}

/**
 * Calculate all investment metrics from the inputs
 */
export function calculateInvestment(inputs: CalculatorInputs): CalculatorResults {
  const {
    purchasePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    monthlyRent,
    propertyTaxAnnual,
    insuranceAnnual,
    maintenancePercent,
    vacancyPercent,
  } = inputs;

  // Investment amounts
  const downPayment = purchasePrice * (downPaymentPercent / 100);
  const loanAmount = purchasePrice - downPayment;
  const closingCosts = purchasePrice * 0.03; // Estimate 3% closing costs
  const totalCashInvested = downPayment + closingCosts;

  // Monthly calculations
  const monthlyMortgage = calculateMonthlyMortgage(loanAmount, interestRate, loanTermYears);
  const monthlyPropertyTax = propertyTaxAnnual / 12;
  const monthlyInsurance = insuranceAnnual / 12;
  const monthlyMaintenance = monthlyRent * (maintenancePercent / 100);
  const monthlyExpenses = monthlyPropertyTax + monthlyInsurance + monthlyMaintenance;
  const monthlyVacancyLoss = monthlyRent * (vacancyPercent / 100);
  const effectiveMonthlyRent = monthlyRent - monthlyVacancyLoss;
  const monthlyCashFlow = effectiveMonthlyRent - monthlyMortgage - monthlyExpenses;

  // Annual calculations
  const annualRent = monthlyRent * 12;
  const annualExpenses = monthlyExpenses * 12 + (monthlyVacancyLoss * 12);
  const annualCashFlow = monthlyCashFlow * 12;
  const netOperatingIncome = annualRent - annualExpenses; // NOI excludes mortgage

  // Return metrics
  const grossYield = (annualRent / purchasePrice) * 100;
  const netYield = (netOperatingIncome / purchasePrice) * 100;
  const capRate = (netOperatingIncome / purchasePrice) * 100;
  const cashOnCash = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

  return {
    downPayment,
    loanAmount,
    totalCashInvested,
    monthlyMortgage,
    monthlyExpenses,
    monthlyVacancyLoss,
    effectiveMonthlyRent,
    monthlyCashFlow,
    annualRent,
    annualExpenses,
    annualCashFlow,
    netOperatingIncome,
    grossYield,
    netYield,
    capRate,
    cashOnCash,
  };
}
