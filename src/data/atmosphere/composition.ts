export const composition = {
  slug: "composition",
  order: 2,
  title: "Состав и уравнения состояния",
  matveevChapter: "Гл. 1-2",
  short: "Газовый состав, уравнения состояния сухого и влажного воздуха, характеристики влажности.",
  description:
    "Атмосфера — механическая смесь газов. Для каждого газа справедливо уравнение состояния идеального газа (Менделеева-Клапейрона). Влажный воздух рассматривается как смесь сухого воздуха и водяного пара.",
  concepts: [
    {
      term: "Критические температуры газов",
      definition:
        "N₂ —147°C, O₂ —119°C, Ar —122°C, CO₂ +31°C, H₂O +374°C. Все атмосферные газы, кроме CO₂ и H₂O, имеют критические температуры значительно ниже наблюдаемых в атмосфере."
    },
    {
      term: "Удельная газовая постоянная",
      definition:
        "R_i = R*/μ_i, где R* = 8.314·10⁷ эрг/(моль·град) — универсальная газовая постоянная, μ_i — молекулярный вес газа."
    },
    {
      term: "Закон Дальтона",
      definition:
        "Давление механической смеси газов равно сумме парциальных давлений: p = Σ p_i."
    },
    {
      term: "Виртуальная температура",
      definition:
        "T_v = T(1 + 0.608s) — фиктивная температура, при которой сухой воздух имел бы ту же плотность, что и влажный при данной температуре T."
    }
  ],
  formulas: [
    {
      slug: "ideal-gas",
      title: "Уравнение состояния идеального газа",
      short: "Для каждого газа в смеси: p_i v_i = R_i T.",
      latex: String.raw`p_i v_i = R_i T`,
      about:
        "Каждый газ в атмосфере ведёт себя практически как идеальный. Это уравнение Менделеева-Клапейрона для i-го газа смеси.",
      variables: [
        { symbol: String.raw`p_i`, meaning: "парциальное давление i-го газа, Па" },
        { symbol: String.raw`v_i`, meaning: "удельный объём i-го газа, м³/кг" },
        { symbol: String.raw`R_i`, meaning: "удельная газовая постоянная i-го газа, м²/(с²·К)" },
        { symbol: String.raw`T`, meaning: "абсолютная температура, К" }
      ]
    },
    {
      slug: "specific-gas-constant",
      title: "Удельная газовая постоянная газа",
      short: "Связь с универсальной газовой постоянной.",
      latex: String.raw`R_i = \frac{R^*}{\mu_i}`,
      about:
        "R* = 8.314·10⁷ эрг/(моль·град) — универсальная газовая постоянная. μ_i — молекулярный вес i-го газа.",
      variables: [
        { symbol: String.raw`R^*`, meaning: "универсальная газовая постоянная, эрг/(моль·град)" },
        { symbol: String.raw`\mu_i`, meaning: "молекулярный вес i-го газа, г/моль" }
      ]
    },
    {
      slug: "dry-air-state",
      title: "Уравнение состояния сухого воздуха",
      short: "Основное уравнение состояния атмосферы.",
      latex: String.raw`p = R_c \rho T`,
      about:
        "R_c = 287 м²/(с²·К) — удельная газовая постоянная сухого воздуха. Молекулярный вес сухого воздуха μ_c = 28.966.",
      variables: [
        { symbol: String.raw`p`, meaning: "давление, Па" },
        { symbol: String.raw`R_c`, meaning: "удельная газовая постоянная сухого воздуха, 287 м²/(с²·К)" },
        { symbol: String.raw`\rho`, meaning: "плотность воздуха, кг/м³" },
        { symbol: String.raw`T`, meaning: "абсолютная температура, К" }
      ]
    },
    {
      slug: "water-vapor-state",
      title: "Уравнение состояния водяного пара",
      short: "Для ненасыщенного и насыщенного пара.",
      latex: String.raw`e v_n = R_n T`,
      about:
        "R_n = 461 м²/(с²·К) — удельная газовая постоянная водяного пара. Молекулярный вес μ_n = 18.02. Уравнение справедливо и для насыщенного пара при t от 0 до 40°C.",
      variables: [
        { symbol: String.raw`e`, meaning: "упругость (парциальное давление) водяного пара, Па" },
        { symbol: String.raw`v_n`, meaning: "удельный объём пара, м³/кг" },
        { symbol: String.raw`R_n`, meaning: "удельная газовая постоянная пара, 461 м²/(с²·К)" }
      ]
    },
    {
      slug: "moist-air-state",
      title: "Уравнение состояния влажного воздуха",
      short: "Через виртуальную температуру.",
      latex: String.raw`p = R_c \rho T_v`,
      about:
        "Влажный воздух — смесь сухого воздуха и водяного пара. Введение виртуальной температуры T_v позволяет сохранить R_c = 287.",
      variables: [
        { symbol: String.raw`p`, meaning: "общее давление, Па" },
        { symbol: String.raw`R_c`, meaning: "удельная газовая постоянная сухого воздуха, 287 м²/(с²·К)" },
        { symbol: String.raw`\rho`, meaning: "плотность влажного воздуха, кг/м³" },
        { symbol: String.raw`T_v`, meaning: "виртуальная температура, К" }
      ]
    },
    {
      slug: "virtual-temperature",
      title: "Виртуальная температура",
      short: "T_v = T(1 + 0.608s).",
      latex: String.raw`T_v = T(1 + 0.608 s)`,
      about:
        "Показывает, какую температуру имел бы сухой воздух при той же плотности и давлении, что и влажный. Влажный воздух всегда легче сухого.",
      variables: [
        { symbol: String.raw`T`, meaning: "абсолютная температура, К" },
        { symbol: String.raw`s`, meaning: "удельная влажность, г/г (или кг/кг)" }
      ]
    },
    {
      slug: "virtual-addition",
      title: "Виртуальный добавок",
      short: "ΔT_v ≈ 0.378·T·e/p.",
      latex: String.raw`\Delta T_v = 0.608 s T \approx 0.378 T \frac{e}{p}`,
      about:
        "Добавок к температуре за счёт влажности. При низких температурах мал, при высоких — значителен (до 9°C при t=40°C, p=1000 мб, насыщении).",
      variables: [
        { symbol: String.raw`T`, meaning: "температура, К" },
        { symbol: String.raw`s`, meaning: "удельная влажность, г/г" },
        { symbol: String.raw`e`, meaning: "упругость водяного пара, Па" },
        { symbol: String.raw`p`, meaning: "давление, Па" }
      ]
    },
    {
      slug: "absolute-humidity",
      title: "Абсолютная влажность",
      short: "Масса водяного пара в 1 м³.",
      latex: String.raw`a = 220 \frac{e}{T} \approx \frac{0.8 e}{1 + \alpha t}`,
      about:
        "a — масса водяного пара в граммах в 1 м³ воздуха (г/м³). e — в мб, T — в К.",
      variables: [
        { symbol: String.raw`a`, meaning: "абсолютная влажность, г/м³" },
        { symbol: String.raw`e`, meaning: "упругость водяного пара, мб" },
        { symbol: String.raw`T`, meaning: "температура, К" },
        { symbol: String.raw`\alpha`, meaning: "1/273.15 ≈ 0.00365, 1/°C" }
      ]
    },
    {
      slug: "specific-humidity",
      title: "Удельная влажность",
      short: "Масса пара в 1 г влажного воздуха.",
      latex: String.raw`s = \frac{0.622 e}{p - 0.378 e} \approx 0.622 \frac{e}{p}`,
      about:
        "Удельная влажность s — количество водяного пара в граммах в 1 г влажного воздуха (г/г). Приближённая формула справедлива при e ≪ p.",
      variables: [
        { symbol: String.raw`s`, meaning: "удельная влажность, г/г" },
        { symbol: String.raw`e`, meaning: "упругость пара, мб" },
        { symbol: String.raw`p`, meaning: "общее давление, мб" }
      ]
    },
    {
      slug: "mixing-ratio",
      title: "Отношение смеси",
      short: "Масса пара на 1 г сухого воздуха.",
      latex: String.raw`r = \frac{0.622 e}{p - e}`,
      about:
        "r — отношение массы водяного пара к массе сухого воздуха в том же объёме. Отличается от s очень мало.",
      variables: [
        { symbol: String.raw`r`, meaning: "отношение смеси, г/г" },
        { symbol: String.raw`e`, meaning: "упругость пара, мб" },
        { symbol: String.raw`p`, meaning: "общее давление, мб" }
      ]
    },
    {
      slug: "relative-humidity",
      title: "Относительная влажность",
      short: "Отношение упругости к максимальной.",
      latex: String.raw`f = \frac{e}{E} \cdot 100\%`,
      about:
        "E — упругость насыщения при данной температуре. f показывает, насколько воздух близок к насыщению.",
      variables: [
        { symbol: String.raw`f`, meaning: "относительная влажность, %" },
        { symbol: String.raw`e`, meaning: "фактическая упругость пара, мб" },
        { symbol: String.raw`E`, meaning: "упругость насыщения, мб" }
      ]
    }
  ]
};
