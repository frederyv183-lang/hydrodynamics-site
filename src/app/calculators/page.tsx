import Card from "@/components/ui/Card";

const calculators = [
  {
    slug: "reynolds",
    title: "Число Рейнольдса",
    description: "Расчёт Re = ρ·v·L / μ и определение режима течения.",
    badge: "Основы"
  },
  {
    slug: "hygro",
    title: "Гигрометрические характеристики",
    description:
      "Упругость пара, относительная влажность, точка росы, абсолютная и удельная влажность, плотность влажного воздуха, барическая ступень.",
    badge: "Атмосфера"
  },
  {
    slug: "pressure-to-sea",
    title: "Приведение давления к уровню моря",
    description:
      "Формула Лапласа: расчёт давления на уровне моря по давлению, высоте и температуре станции.",
    badge: "Атмосфера"
  },
  {
    slug: "baric-step",
    title: "Барическая ступень",
    description:
      "Высота, при подъёме на которую давление падает на 1 мб. Обратная задача: падение давления на 100 м.",
    badge: "Атмосфера"
  },
  {
    slug: "solar-flux",
    title: "Поток солнечной радиации",
    description:
      "Поток на горизонтальную поверхность F' = F₀·sin h_c и масса атмосферы m = 1/sin h_c.",
    badge: "Атмосфера"
  },
  {
    slug: "extinction",
    title: "Ослабление солнечной радиации",
    description:
      "Закон Ламберта-Бугера: поток на поверхности F = F₀·p^m, оптическая толщина τ, масса атмосферы m.",
    badge: "Атмосфера"
  },
  {
    slug: "potential-temp",
    title: "Потенциальная температура",
    description:
      "θ = T (1000/p)^0.286 и сухоадиабатический градиент γ_a ≈ 0.98 °C/100 м.",
    badge: "Атмосфера"
  },
  {
    slug: "geostrophic-wind",
    title: "Геострофический ветер",
    description:
      "Расчёт скорости и направления геострофического ветра по градиенту давления и широте места.",
    badge: "Динамика"
  },
  {
    slug: "wind-profile",
    title: "Профиль ветра в пограничном слое",
    description:
      "Логарифмический профиль u(z) = (u*/κ)·ln(z/z0), напряжение трения τ и число Ричардсона Ri.",
    badge: "Динамика"
  },
  {
    slug: "dew-point",
    title: "Точка росы",
    description:
      "Упругость насыщения, точка росы и дефицит точки росы по температуре и относительной влажности.",
    badge: "Атмосфера"
  }
];

export const metadata = {
  title: "Калькуляторы — Гидродинамика"
};

export default function CalculatorsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Калькуляторы</h1>
      <p className="mt-2 text-slate-600">
        Интерактивные расчёты гидродинамических величин.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((c) => (
          <Card
            key={c.slug}
            href={`/calculators/${c.slug}`}
            title={c.title}
            description={c.description}
            badge={c.badge}
          />
        ))}
      </div>
    </div>
  );
}
