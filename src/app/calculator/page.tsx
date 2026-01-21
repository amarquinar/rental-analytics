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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-sm">RA</span>
            </div>
            <span className="text-white font-medium">Rental Analytics</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Barrios
            </Link>
            <Link
              href="/calculator"
              className="text-lime font-medium"
            >
              Calculadora
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Investment Calculator</h1>
          <p className="text-zinc-400 mt-1">
            Calculate ROI, cash flow, and returns for any rental property
          </p>
        </div>

        {/* Calculator grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div>
            <CalculatorForm inputs={inputs} onChange={setInputs} />
          </div>

          {/* Right: Results */}
          <div>
            <ResultsCard results={results} />
          </div>
        </div>

        {/* Tips section */}
        <div className="mt-12 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Investment Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-lime font-medium mb-2">Gross Yield</div>
              <p className="text-zinc-400">
                A good gross yield in Barcelona is typically 4-6%. Higher yields may indicate higher risk areas.
              </p>
            </div>
            <div>
              <div className="text-lime font-medium mb-2">Cash-on-Cash Return</div>
              <p className="text-zinc-400">
                Aim for at least 8-10% cash-on-cash return to outperform other investments.
              </p>
            </div>
            <div>
              <div className="text-lime font-medium mb-2">1% Rule</div>
              <p className="text-zinc-400">
                Monthly rent should be at least 1% of purchase price for a good cash-flowing property.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          Rental Analytics - Data-driven investment decisions
        </div>
      </footer>
    </div>
  );
}
