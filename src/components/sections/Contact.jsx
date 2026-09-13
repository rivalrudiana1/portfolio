import { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import Reveal from '../ui/Reveal';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const validate = (values) => {
    const next = {};
    if (!values.name.trim()) next.name = 'Nama wajib diisi.';
    if (!values.email.trim()) next.email = 'Email wajib diisi.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Format email tidak valid.';
    if (!values.message.trim()) next.message = 'Pesan wajib diisi.';
    else if (values.message.trim().length < 10)
      next.message = 'Pesan minimal 10 karakter.';
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus({ type: 'sending', text: 'Mengirim...' });

    // Jika ada Formspree ID, kirim via API. Jika tidak, fallback ke mailto.
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
          }),
        });
        if (!res.ok) throw new Error('gagal');
        setStatus({ type: 'success', text: 'Pesan terkirim. Terima kasih, saya akan segera membalas!' });
        setForm({ name: '', email: '', message: '' });
      } catch {
        setStatus({ type: 'error', text: 'Gagal mengirim via form. Silakan pakai tombol email langsung.' });
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry dari ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`);
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
    setStatus({ type: 'success', text: 'Membuka aplikasi email kamu. Tinggal tekan kirim!' });
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border bg-white text-ulbi-blue placeholder:text-ulbi-blue/40 focus:outline-2 focus:outline-offset-1 focus:outline-ulbi-orange transition-colors ${
      hasError ? 'border-red-400' : 'border-ulbi-silver focus:border-ulbi-orange'
    }`;

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-white scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-ulbi-orange/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-ulbi-blue mb-6 tracking-tight">Mari Berkolaborasi!</h2>
            <p className="text-lg text-ulbi-blue/70 leading-relaxed font-light">
              Tertarik untuk bekerja sama, diskusi tentang arsitektur data, atau sekadar menyapa?
              Isi form di bawah — langsung masuk ke email saya.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Info panel */}
          <Reveal className="lg:col-span-2">
            <div className="p-6 md:p-8 rounded-2xl bg-ulbi-blue text-white">
              <h3 className="text-xl font-bold mb-2">Info Kontak</h3>
              <p className="text-white/70 text-sm mb-6">Respon tercepat via email. Juga aktif di GitHub & LinkedIn.</p>
              <div className="space-y-3 text-sm">
                <button
                  type="button"
                  onClick={copyEmail}
                  title="Klik untuk salin"
                  className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors break-all"
                >
                  <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Email {copied ? '— tersalin ✓' : '(klik untuk salin)'}</span>
                  <span className="font-medium">{personalInfo.contact.email}</span>
                </button>
                <a href={`tel:${personalInfo.contact.phone.replace(/\s/g, '')}`} className="block px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
                  <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Telepon</span>
                  <span className="font-medium">{personalInfo.contact.phone}</span>
                </a>
                <div className="flex gap-3 pt-2">
                  <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2.5 rounded-xl bg-ulbi-orange hover:bg-[#c94520] font-semibold transition-colors">
                    GitHub
                  </a>
                  <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 font-semibold transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="p-6 md:p-8 rounded-2xl bg-ulbi-grey/30 border border-ulbi-silver">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-ulbi-blue mb-2">Nama</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama kamu"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-ulbi-blue mb-2">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nama@email.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-ulbi-blue mb-2">Pesan</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Ceritakan kebutuhan / peluang / pertanyaan kamu..."
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${inputClass(errors.message)} resize-y min-h-[120px]`}
                />
                {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-red-500">{errors.message}</p>}
              </div>

              {status.type !== 'idle' && (
                <p
                  role="status"
                  className={`mt-5 text-sm font-medium px-4 py-3 rounded-xl ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : status.type === 'error'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-ulbi-blue/5 text-ulbi-blue/70 border border-ulbi-silver'
                  }`}
                >
                  {status.text}
                </p>
              )}

              <button
                type="submit"
                disabled={status.type === 'sending'}
                className="mt-6 w-full sm:w-auto px-8 py-4 rounded-full bg-ulbi-orange text-white font-semibold hover:bg-[#c94520] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-ulbi-orange/20"
              >
                {status.type === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
