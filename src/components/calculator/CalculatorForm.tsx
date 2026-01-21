'use client';

import { CalculatorInputs } from '@/types/calculator';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

export function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  const handleChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...inputs, [field]: numValue });
  };

  const inputClass =
    'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime/50 focus:border-lime';
  const labelClass = 'block text-sm font-medium text-zinc-400 mb-2';

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Investment Details</h2>

      <div className="space-y-6">
        {/* Property Section */}
        <div>
          <h3 className="text-sm font-medium text-lime mb-4 uppercase tracking-wider">
            Property
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Purchase Price (€)</label>
              <input
                type="number"
                value={inputs.purchasePrice || ''}
                onChange={(e) => handleChange('purchasePrice', e.target.value)}
                className={inputClass}
                placeholder="300000"
              />
            </div>
            <div>
              <label className={labelClass}>Expected Monthly Rent (€)</label>
              <input
                type="number"
                value={inputs.monthlyRent || ''}
                onChange={(e) => handleChange('monthlyRent', e.target.value)}
                className={inputClass}
                placeholder="1200"
              />
            </div>
          </div>
        </div>

        {/* Financing Section */}
        <div>
          <h3 className="text-sm font-medium text-lime mb-4 uppercase tracking-wider">
            Financing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Down Payment (%)</label>
              <input
                type="number"
                value={inputs.downPaymentPercent || ''}
                onChange={(e) => handleChange('downPaymentPercent', e.target.value)}
                className={inputClass}
                placeholder="20"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className={labelClass}>Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={inputs.interestRate || ''}
                onChange={(e) => handleChange('interestRate', e.target.value)}
                className={inputClass}
                placeholder="3.5"
              />
            </div>
            <div>
              <label className={labelClass}>Loan Term (years)</label>
              <input
                type="number"
                value={inputs.loanTermYears || ''}
                onChange={(e) => handleChange('loanTermYears', e.target.value)}
                className={inputClass}
                placeholder="25"
              />
            </div>
          </div>
        </div>

        {/* Expenses Section */}
        <div>
          <h3 className="text-sm font-medium text-lime mb-4 uppercase tracking-wider">
            Annual Expenses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Property Taxes (€/year)</label>
              <input
                type="number"
                value={inputs.propertyTaxAnnual || ''}
                onChange={(e) => handleChange('propertyTaxAnnual', e.target.value)}
                className={inputClass}
                placeholder="1500"
              />
            </div>
            <div>
              <label className={labelClass}>Insurance (€/year)</label>
              <input
                type="number"
                value={inputs.insuranceAnnual || ''}
                onChange={(e) => handleChange('insuranceAnnual', e.target.value)}
                className={inputClass}
                placeholder="600"
              />
            </div>
            <div>
              <label className={labelClass}>Maintenance (% of rent)</label>
              <input
                type="number"
                value={inputs.maintenancePercent || ''}
                onChange={(e) => handleChange('maintenancePercent', e.target.value)}
                className={inputClass}
                placeholder="5"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className={labelClass}>Vacancy Rate (%)</label>
              <input
                type="number"
                value={inputs.vacancyPercent || ''}
                onChange={(e) => handleChange('vacancyPercent', e.target.value)}
                className={inputClass}
                placeholder="5"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
