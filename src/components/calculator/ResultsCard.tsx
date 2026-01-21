'use client';

import { CalculatorResults } from '@/types/calculator';

interface ResultsCardProps {
  results: CalculatorResults;
}

export function ResultsCard({ results }: ResultsCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE').format(Math.round(value)) + '€';
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const isPositive = results.monthlyCashFlow >= 0;

  return (
    <div className="space-y-4">
      {/* PRIMARY: Monthly Cash Flow */}
      <div className={`rounded-lg p-5 border ${isPositive ? 'bg-lime/5 border-lime/30' : 'bg-red-500/5 border-red-500/30'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wider">Monthly Cash Flow</div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPositive ? 'bg-lime/20' : 'bg-red-500/20'}`}>
            {isPositive ? (
              <svg className="w-4 h-4 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
          </div>
        </div>
        <div className={`font-mono text-4xl font-bold ${isPositive ? 'text-lime' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{formatCurrency(results.monthlyCashFlow)}
        </div>
        <div className="text-zinc-500 text-xs mt-2">
          {isPositive ? 'Positive cash flow' : 'Negative cash flow'}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-px bg-border-subtle rounded-lg overflow-hidden">
        <div className="bg-surface/40 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Gross Yield</div>
          <div className="font-mono text-xl font-semibold text-zinc-100">{formatPercent(results.grossYield)}</div>
        </div>
        <div className="bg-surface/40 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Net Yield</div>
          <div className="font-mono text-xl font-semibold text-zinc-100">{formatPercent(results.netYield)}</div>
        </div>
        <div className="bg-surface/40 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Cap Rate</div>
          <div className="font-mono text-xl font-semibold text-zinc-100">{formatPercent(results.capRate)}</div>
        </div>
        <div className="bg-surface/40 p-4">
          <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Cash-on-Cash</div>
          <div className={`font-mono text-xl font-semibold ${results.cashOnCash >= 0 ? 'text-lime' : 'text-red-400'}`}>
            {formatPercent(results.cashOnCash)}
          </div>
        </div>
      </div>

      {/* Breakdown - Terminal Style */}
      <div className="bg-surface/30 rounded-lg border border-border-subtle p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Breakdown</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between items-center py-2 border-b border-border-subtle/50">
            <span className="text-zinc-500">Effective Rent</span>
            <span className="text-lime">+{formatCurrency(results.effectiveMonthlyRent)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border-subtle/50">
            <span className="text-zinc-500">Mortgage</span>
            <span className="text-red-400">-{formatCurrency(results.monthlyMortgage)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border-subtle/50">
            <span className="text-zinc-500">Expenses</span>
            <span className="text-red-400">-{formatCurrency(results.monthlyExpenses)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border-subtle/50">
            <span className="text-zinc-500">Vacancy</span>
            <span className="text-red-400">-{formatCurrency(results.monthlyVacancyLoss)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-zinc-100 font-medium">Net Cash Flow</span>
            <span className={`font-semibold ${isPositive ? 'text-lime' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{formatCurrency(results.monthlyCashFlow)}
            </span>
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="bg-surface/30 rounded-lg border border-border-subtle p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Investment</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono text-sm">
          <div>
            <span className="text-zinc-500 text-xs">Down Payment</span>
            <div className="text-zinc-100 font-medium">{formatCurrency(results.downPayment)}</div>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Loan Amount</span>
            <div className="text-zinc-100 font-medium">{formatCurrency(results.loanAmount)}</div>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Total Cash In</span>
            <div className="text-zinc-100 font-medium">{formatCurrency(results.totalCashInvested)}</div>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Annual Cash Flow</span>
            <div className={`font-medium ${isPositive ? 'text-lime' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{formatCurrency(results.annualCashFlow)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
