import GeostrophicWindCalculator from '@/components/calculators/GeostrophicWindCalculator';

export const metadata = {
  title: 'Геострофический ветер — Калькуляторы',
};

export default function GeostrophicWindPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-900 mb-6">
        Калькулятор геострофического ветра
      </h1>
      <p className="text-slate-600 mb-6">
        Расчёт скорости и направления геострофического ветра по градиенту давления и широте места.
      </p>
      <GeostrophicWindCalculator />
    </div>
  );
}
