import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Reveal from '../ui/Reveal';
import GlowButton from '../ui/GlowButton';
import { normalizeTel } from '../../data/projectUtils';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const Contact = () => {
  const { data, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  // status.key (bukan text) agar otomatis ikut bahasa aktif via t(key) saat render
  const [status, setStatus] = useState({ type: 'idle', key: '' });

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.contact.email);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const validate = (values) => {
    const next = {};
    if (!values.name.trim()) next.name = t('contact.errName');
    if (!values.email.trim()) next.email = t('contact.errEmail');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = t('contact.errEmailInvalid');
    if (!values.message.trim()) next.message = t('contact.errMsg');
    else if (values.message.trim().length < 10)
      next.message = t('contact.errMsgShort');
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

    setStatus({ type: 'sending', key: 'contact.sending' });

    // Jika ada Formspree ID, kirim via API. Jika tidak, fallback ke mailto.
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name.trim().slice(0, 100),
            email: form.email.trim().slice(0, 254),
            message: form.message.trim().slice(0, 5000),
          }),
        });
        if (!res.ok) throw new Error('gagal');
        setStatus({ type: 'success', key: 'contact.success' });
        setForm({ name: '', email: '', message: '' });
      } catch {
        setStatus({ type: 'error', key: 'contact.error' });
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry dari ${form.name.trim().slice(0, 100)}`);
    const body = encodeURIComponent(`${form.message.trim().slice(0, 2000)}\n\n— ${form.name.trim().slice(0, 100)} (${form.email.trim()})`);
    window.location.href = `mailto:${data.contact.email}?subject=${subject}&body=${body}`;
    setStatus({ type: 'success', key: 'contact.successMailto' });
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border bg-white text-ulbi-blue placeholder:text-ulbi-blue/40 focus:outline-2 focus:outline-offset-1 focus:outline-ulbi-orange transition-colors dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:border-white/15 ${
      hasError ? 'border-red-400 dark:border-red-400' : 'border-ulbi-silver focus:border-ulbi-orange dark:focus:border-ulbi-orange'
    }`;

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-white/70 backdrop-blur-[2px] scroll-mt-20 dark:bg-zinc-950/70">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[400px] bg-ulbi-orange/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('contact.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ulbi-blue mb-6 tracking-tight dark:text-white">{t('contact.title')}</h2>
            <p className="text-base sm:text-lg text-ulbi-blue/70 leading-relaxed font-light dark:text-zinc-400">
              {t('contact.desc')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          {/* Info panel */}
          <Reveal className="lg:col-span-2">
            <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-ulbi-blue text-white relative overflow-hidden dark:bg-zinc-900 dark:border dark:border-white/10">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-ulbi-orange/20 rounded-full blur-[60px] pointer-events-none" aria-hidden="true"></div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 relative">{t('contact.infoTitle')}</h3>
              <p className="text-white/70 text-sm mb-6 relative dark:text-zinc-400">{t('contact.infoDesc')}</p>
              <div className="space-y-3 text-sm relative">
                <button
                  type="button"
                  onClick={copyEmail}
                  title={t('contact.copyTitle')}
                  aria-label={`${t('contact.emailLabel')}: ${data.contact.email}`}
                  className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors break-all"
                >
                  <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">{t('contact.emailLabel')} {copied ? `— ${t('contact.copied')}` : ''}</span>
                  <span className="font-medium">{data.contact.email}</span>
                </button>
                <a href={`tel:${normalizeTel(data.contact.phone)}`} className="block px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors">
                  <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">{t('contact.phoneLabel')}</span>
                  <span className="font-medium">{data.contact.phone}</span>
                </a>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2.5 rounded-xl bg-ulbi-orange hover:bg-[#c94520] font-semibold transition-colors">
                    GitHub
                  </a>
                  <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 font-semibold transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120} className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-6 md:p-8 rounded-2xl bg-ulbi-grey/30 border border-ulbi-silver dark:bg-zinc-900/60 dark:border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-ulbi-blue mb-2 dark:text-zinc-200">{t('contact.name')}</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    placeholder={t('contact.namePh')}
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-ulbi-blue mb-2 dark:text-zinc-200">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    placeholder={t('contact.emailPh')}
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
                <label htmlFor="contact-message" className="block text-sm font-semibold text-ulbi-blue mb-2 dark:text-zinc-200">{t('contact.msg')}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={5000}
                  placeholder={t('contact.msgPh')}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${inputClass(errors.message)} resize-y min-h-[120px]`}
                />
                {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-red-500">{errors.message}</p>}
              </div>

              {status.type !== 'idle' && status.key && (
                <p
                  role="status"
                  className={`mt-5 text-sm font-medium px-4 py-3 rounded-xl ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-900'
                      : status.type === 'error'
                        ? 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900'
                        : 'bg-ulbi-blue/5 text-ulbi-blue/70 border border-ulbi-silver dark:bg-white/5 dark:text-zinc-300 dark:border-white/10'
                  }`}
                >
                  {t(status.key)}
                </p>
              )}

              <GlowButton
                type="submit"
                variant="primary"
                disabled={status.type === 'sending'}
                className="mt-6"
              >
                {status.type === 'sending' ? t('contact.sending') : t('contact.submit')}
              </GlowButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
