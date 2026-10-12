export type SymbolEntry = {
  symbol: string;
  meaning: string;
  category: string;
  where?: string[];
};

export const symbols: SymbolEntry[] = [
  // ---------- Греческие буквы ----------
  { symbol: "\\alpha", meaning: "Угол, коэффициент, параметр", category: "Греческие буквы", where: ["methods"] },
  { symbol: "\\beta", meaning: "Параметр Россби (β = ∂f/∂y)", category: "Греческие буквы", where: ["models"] },
  { symbol: "\\gamma", meaning: "Градиент температуры, коэффициент", category: "Греческие буквы" },
  { symbol: "\\delta", meaning: "Вариация, малое приращение", category: "Греческие буквы" },
  { symbol: "\\varepsilon", meaning: "Точность вычислений, малая величина", category: "Греческие буквы" },
  { symbol: "\\zeta", meaning: "Относительный вихрь", category: "Греческие буквы", where: ["models"] },
  { symbol: "\\eta", meaning: "Вертикальная координата, переменная", category: "Греческие буквы", where: ["models"] },
  { symbol: "\\theta", meaning: "Потенциальная температура", category: "Греческие буквы" },
  { symbol: "\\lambda", meaning: "Собственное число, долгота", category: "Греческие буквы", where: ["methods"] },
  { symbol: "\\mu", meaning: "Динамическая вязкость, параметр", category: "Греческие буквы", where: ["methods"] },
  { symbol: "\\nu", meaning: "Кинематическая вязкость", category: "Греческие буквы" },
  { symbol: "\\rho", meaning: "Плотность среды", category: "Греческие буквы", where: ["models"] },
  { symbol: "\\sigma", meaning: "σ-координата, напряжение", category: "Греческие буквы", where: ["models"] },
  { symbol: "\\tau", meaning: "Шаг по времени, касательное напряжение", category: "Греческие буквы", where: ["methods"] },
  { symbol: "\\varphi", meaning: "Широта, угол", category: "Греческие буквы" },
  { symbol: "\\psi", meaning: "Функция тока", category: "Греческие буквы", where: ["models"] },
  { symbol: "\\omega", meaning: "Угловая скорость, вертикальная скорость", category: "Греческие буквы", where: ["models"] },
  { symbol: "\\Omega", meaning: "Угловая скорость вращения Земли", category: "Греческие буквы" },
  { symbol: "\\Phi", meaning: "Геопотенциал", category: "Греческие буквы", where: ["models"] },

  // ---------- Латинские буквы ----------
  { symbol: "c_p", meaning: "Удельная теплоёмкость при постоянном давлении", category: "Латинские буквы" },
  { symbol: "f", meaning: "Параметр Кориолиса, правая часть уравнения", category: "Латинские буквы", where: ["models"] },
  { symbol: "g", meaning: "Ускорение свободного падения", category: "Латинские буквы", where: ["models"] },
  { symbol: "h", meaning: "Шаг сетки, высота", category: "Латинские буквы", where: ["methods"] },
  { symbol: "H", meaning: "Высота изобарической поверхности", category: "Латинские буквы", where: ["models"] },
  { symbol: "k", meaning: "Коэффициент, индекс, волновое число", category: "Латинские буквы" },
  { symbol: "l", meaning: "Параметр Кориолиса (в русской литературе)", category: "Латинские буквы", where: ["models"] },
  { symbol: "L", meaning: "Характерный линейный размер", category: "Латинские буквы" },
  { symbol: "p", meaning: "Давление", category: "Латинские буквы", where: ["models"] },
  { symbol: "p_s", meaning: "Приземное давление", category: "Латинские буквы", where: ["models"] },
  { symbol: "q", meaning: "Влажность, потенциальный вихрь", category: "Латинские буквы" },
  { symbol: "R", meaning: "Удельная газовая постоянная, радиус", category: "Латинские буквы" },
  { symbol: "t", meaning: "Время", category: "Латинские буквы" },
  { symbol: "T", meaning: "Температура", category: "Латинские буквы", where: ["models"] },
  { symbol: "u, v", meaning: "Горизонтальные компоненты скорости", category: "Латинские буквы", where: ["models"] },
  { symbol: "w", meaning: "Вертикальная скорость", category: "Латинские буквы" },
  { symbol: "x, y", meaning: "Горизонтальные координаты", category: "Латинские буквы", where: ["models"] },
  { symbol: "z", meaning: "Вертикальная координата (высота)", category: "Латинские буквы" },

  // ---------- Математические операторы ----------
  { symbol: "\\nabla", meaning: "Оператор Гамильтона (набла)", category: "Операторы", where: ["models"] },
  { symbol: "\\nabla^2", meaning: "Оператор Лапласа", category: "Операторы", where: ["models", "methods"] },
  { symbol: "\\partial", meaning: "Частная производная", category: "Операторы", where: ["models"] },
  { symbol: "\\Delta", meaning: "Приращение, оператор Лапласа", category: "Операторы" },
  { symbol: "\\int", meaning: "Интеграл", category: "Операторы" },
  { symbol: "\\sum", meaning: "Сумма", category: "Операторы" },
  { symbol: "\\prod", meaning: "Произведение", category: "Операторы" },
  { symbol: "\\frac{a}{b}", meaning: "Дробь a/b", category: "Операторы" },
  { symbol: "\\cdot", meaning: "Скалярное произведение", category: "Операторы" },
  { symbol: "\\times", meaning: "Векторное произведение", category: "Операторы" },
  { symbol: "\\approx", meaning: "Приближённо равно", category: "Операторы" },
  { symbol: "\\leq", meaning: "Меньше или равно (≤)", category: "Операторы" },
  { symbol: "\\geq", meaning: "Больше или равно (≥)", category: "Операторы" },
  { symbol: "\\neq", meaning: "Не равно (≠)", category: "Операторы" },
  { symbol: "J(A, B)", meaning: "Якобиан — адвекция A полем B", category: "Операторы", where: ["models"] },

  // ---------- Специальные символы ----------
  { symbol: "\\mathbf{v}", meaning: "Вектор скорости", category: "Специальные", where: ["models", "methods"] },
  { symbol: "\\mathbf{u}", meaning: "Вектор горизонтальной скорости", category: "Специальные", where: ["models"] },
  { symbol: "\\mathbb{R}", meaning: "Множество действительных чисел", category: "Специальные" },
  { symbol: "O(h)", meaning: "Порядок точности (O-большое)", category: "Специальные", where: ["methods"] }
];