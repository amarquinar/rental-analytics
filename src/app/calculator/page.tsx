'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CalculatorInputs, defaultInputs } from '@/types/calculator';
import { calculateInvestment } from '@/lib/calculator';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { ResultsCard } from '@/components/calculator/ResultsCard';

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  const results = useMemo(() => calculateInvestment(inputs), [inputs]);

  return (
    <div className="min-h-screen bg-background text-zinc-50">
      {/* Header */}
      <header className="border-b border-border-subtle sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center border border-border-subtle group-hover:border-border-hover transition-all duration-150">
              <span className="text-lime font-semibold text-sm">RA</span>
            </div>
            <span className="text-zinc-100 font-medium tracking-tight">Rental Analytics</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150"
            >
              Dashboard
            </Link>
            <Link
              href="/neighborhoods"
              className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150"
            >
              Barrios
            </Link>
            <Link
              href="/calculator"
              className="px-4 py-2 text-zinc-50 text-sm font-medium bg-surface rounded-lg"
            >
              Calculadora
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 text-zinc-400 text-sm hover:text-zinc-100 transition-colors duration-150"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">Calculator</h1>
            <p className="text-zinc-500 text-sm mt-1">
              ROI & cash flow analysis
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 bg-lime/10 border border-lime/20 rounded-lg">
              <span className="text-lime text-xs font-mono uppercase tracking-wider">Real-time</span>
            </div>
          </div>
        </div>

        {/* Calculator grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Form (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-surface/30 rounded-lg border border-border-subtle p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Input Parameters</span>
                <div className="flex-1 h-px bg-border-subtle" />
              </div>
              <CalculatorForm inputs={inputs} onChange={setInputs} />
            </div>
          </div>

          {/* Right: Results (2 cols) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <ResultsCard results={results} />
            </div>
          </div>
        </div>

        {/* Quick Reference - Terminal style */}
        <div className="mt-8 p-5 bg-zinc-900/30 rounded-lg border border-border-subtle">
          <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="uppercase tracking-widest">Reference Benchmarks</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm">
            <div className="flex items-center justify-between p-3 bg-surface/20 rounded border border-border-subtle">
              <span className="text-zinc-500">Good Gross Yield</span>
              <span className="text-lime font-semibold">4-6%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface/20 rounded border border-border-subtle">
              <span className="text-zinc-500">Target Cash-on-Cash</span>
              <span className="text-lime font-semibold">8-10%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface/20 rounded border border-border-subtle">
              <span className="text-zinc-500">1% Rule (Rent/Price)</span>
              <span className="text-lime font-semibold">&ge;1%</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-zinc-500 text-sm">
          Rental Analytics — Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
