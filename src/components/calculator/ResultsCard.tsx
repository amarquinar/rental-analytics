'use client';

import { CalculatorResults } from '@/types/calculator';

interface ResultsCardProps {
  results: CalculatorResults;
}

export function ResultsCard({ results }: ResultsCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const isPositive = results.monthlyCashFlow >= 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Investment Returns</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Gross Yield */}
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="text-zinc-400 text-sm mb-1">Gross Yield</div>
            <div className="text-2xl font-bold text-white">
              {formatPercent(results.grossYield)}
            </div>
            <div className="text-zinc-500 text-xs mt-1">Annual rent / Price</div>
          </div>

          {/* Net Yield */}
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="text-zinc-400 text-sm mb-1">Net Yield</div>
            <div className="text-2xl font-bold text-white">
              {formatPercent(results.netYield)}
            </div>
            <div className="text-zinc-500 text-xs mt-1">After expenses</div>
          </div>

          {/* Cap Rate */}
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="text-zinc-400 text-sm mb-1">Cap Rate</div>
            <div className="text-2xl font-bold text-white">
              {formatPercent(results.capRate)}
            </div>
            <div className="text-zinc-500 text-xs mt-1">NOI / Price</div>
          </div>

          {/* Cash on Cash */}
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="text-zinc-400 text-sm mb-1">Cash-on-Cash</div>
            <div className={`text-2xl font-bold ${results.cashOnCash >= 0 ? 'text-lime' : 'text-red-400'}`}>
              {formatPercent(results.cashOnCash)}
            </div>
            <div className="text-zinc-500 text-xs mt-1">Annual return on cash</div>
          </div>
        </div>
      </div>

      {/* Monthly Cash Flow */}
      <div className={`rounded-xl p-6 ${isPositive ? 'bg-lime/10 border border-lime/30' : 'bg-red-500/10 border border-red-500/30'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zinc-400 text-sm mb-1">Monthly Cash Flow</div>
            <div className={`text-3xl font-bold ${isPositive ? 'text-lime' : 'text-red-400'}`}>
              {formatCurrency(results.monthlyCashFlow)}
            </div>
          </div>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isPositive ? 'bg-lime/20' : 'bg-red-500/20'}`}>
            {isPositive ? (
              <svg className="w-8 h-8 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
          </div>
        </div>
        <div className="mt-2 text-zinc-400 text-sm">
          {isPositive ? 'Positive cash flow - Good investment!' : 'Negative cash flow - Consider adjusting terms'}
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Breakdown</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Effective Rent</span>
            <span className="text-lime font-medium">+{formatCurrency(results.effectiveMonthlyRent)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Mortgage Payment</span>
            <span className="text-red-400 font-medium">-{formatCurrency(results.monthlyMortgage)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Operating Expenses</span>
            <span className="text-red-400 font-medium">-{formatCurrency(results.monthlyExpenses)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-400">Vacancy Loss</span>
            <span className="text-red-400 font-medium">-{formatCurrency(results.monthlyVacancyLoss)}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-white font-semibold">Net Cash Flow</span>
            <span className={`font-bold text-lg ${isPositive ? 'text-lime' : 'text-red-400'}`}>
              {formatCurrency(results.monthlyCashFlow)}
            </span>
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Investment Summary</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-400">Down Payment</span>
            <div className="text-white font-medium">{formatCurrency(results.downPayment)}</div>
          </div>
          <div>
            <span className="text-zinc-400">Loan Amount</span>
            <div className="text-white font-medium">{formatCurrency(results.loanAmount)}</div>
          </div>
          <div>
            <span className="text-zinc-400">Total Cash Invested</span>
            <div className="text-white font-medium">{formatCurrency(results.totalCashInvested)}</div>
          </div>
          <div>
            <span className="text-zinc-400">Annual Cash Flow</span>
            <div className={`font-medium ${isPositive ? 'text-lime' : 'text-red-400'}`}>
              {formatCurrency(results.annualCashFlow)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
