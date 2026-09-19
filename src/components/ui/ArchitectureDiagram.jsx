// Diagram arsitektur SVG ringan per tipe studi kasus.
// Tanpa dependensi chart — murni SVG + Tailwind agar tetap cepat.

const box = 'fill-white stroke-[#00277F] dark:fill-zinc-900 dark:stroke-white/20';
const accent = 'fill-[#EA5329]';
const textCls = 'fill-[#00277F] dark:fill-zinc-100';
const subCls = 'fill-[#00277F]/60 dark:fill-zinc-400';

function Node({ x, y, w = 150, h = 44, title, sub }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} className={box} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + (sub ? 19 : 27)} textAnchor="middle" fontSize={12} fontWeight={700} className={textCls}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 34} textAnchor="middle" fontSize={10} className={subCls}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#EA5329" strokeWidth={2} />
      <polygon points={`${x2 - 6},${y2 - 4} ${x2},${y2} ${x2 - 6},${y2 + 4}`} className={accent} />
    </g>
  );
}

function FlowRow({ items }) {
  const w = 150;
  const gap = 34;
  const y = 20;
  const totalW = items.length * w + (items.length - 1) * gap;
  const startX = Math.max(0, (640 - totalW) / 2);
  return (
    <svg viewBox="0 0 640 100" className="w-full h-auto" role="img" aria-label="Diagram alur arsitektur">
      {items.map((n, i) => {
        const x = startX + i * (w + gap);
        return (
          <g key={n.title}>
            <Node x={x} y={y} title={n.title} sub={n.sub} />
            {i < items.length - 1 && <Arrow x1={x + w} y1={y + 22} x2={x + w + gap} y2={y + 22} />}
          </g>
        );
      })}
    </svg>
  );
}

const FLOWS = {
  fuzzy: [
    { title: 'CSV + DB lama', sub: '47rb baris' },
    { title: 'Normalisasi', sub: 'case/trim' },
    { title: 'Exact + Fuzzy', sub: 'Levenshtein' },
    { title: 'DB terpusat', sub: 'MySQL' },
  ],
  wma: [
    { title: 'Transaksi', sub: 'histori' },
    { title: 'WMA Forecast', sub: 'berbobot' },
    { title: 'ROP Alert', sub: 'stok ≤ ROP' },
    { title: 'Dashboard', sub: 'Recharts' },
  ],
  rbac: [
    { title: 'User', sub: 'RBAC' },
    { title: 'Overlap Query', sub: 'approved' },
    { title: 'Approval', sub: 'berjenjang' },
    { title: 'Reservasi', sub: 'final' },
  ],
  voting: [
    { title: 'Tata tertib', sub: 'aturan' },
    { title: 'Verifikasi', sub: 'anti-ganda' },
    { title: 'E-Ballot', sub: '700+ suara' },
    { title: 'Rekap', sub: 'transparan' },
  ],
  iot: [
    { title: 'ESP32', sub: 'pH/suhu/TDS' },
    { title: 'REST API', sub: 'ingest' },
    { title: 'Agregasi', sub: 'validasi' },
    { title: 'Dashboard', sub: 'real-time' },
  ],
  ai: [
    { title: 'Curhat', sub: 'teks bebas' },
    { title: '3 Classifier', sub: 'TF-IDF' },
    { title: 'Groq LLM', sub: 'prompt' },
    { title: 'Solusi + ToDo', sub: 'aksi' },
  ],
  auth: [
    { title: 'React SPA', sub: 'router' },
    { title: 'Express API', sub: 'Prisma' },
    { title: 'JWT+bcrypt', sub: 'auth' },
    { title: 'Database', sub: 'SQL' },
  ],
  cms: [
    { title: 'Publik', sub: 'home/galeri' },
    { title: 'Admin', sub: 'auth+CRUD' },
    { title: 'Trash', sub: 'restore' },
    { title: 'MySQL', sub: 'konten' },
  ],
  ml: [
    { title: 'Input', sub: 'bangun+aktivitas' },
    { title: 'Regression', sub: 'sklearn' },
    { title: 'Prediksi', sub: 'HH:MM' },
    { title: 'Visualisasi', sub: 'data latih' },
  ],
  mobile: [
    { title: 'Form', sub: 'validasi' },
    { title: 'Dialog', sub: 'konfirmasi' },
    { title: 'Thanks', sub: 'slide+fade' },
    { title: 'Adaptif', sub: '1/2 kolom' },
  ],
};

const ArchitectureDiagram = ({ type = 'fuzzy', title }) => {
  const items = FLOWS[type] ?? FLOWS.fuzzy;
  return (
    <figure className="rounded-2xl border border-ulbi-silver bg-white p-4 sm:p-6 dark:bg-zinc-900 dark:border-white/10">
      <div className="overflow-x-auto">
        <FlowRow items={items} />
      </div>
      {title && (
        <figcaption className="mt-2 text-center text-xs text-ulbi-blue/60 dark:text-zinc-500">
          {title}
        </figcaption>
      )}
    </figure>
  );
};

export default ArchitectureDiagram;
