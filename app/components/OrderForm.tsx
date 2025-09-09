'use client';

import React, { useEffect, useState } from 'react';

type ComboOption = {
  id: 'c1' | 'c2' | 'c3';
  label: string;
  price: string;
};

const comboOptions: ComboOption[] = [
  { id: 'c1', label: '1 Nhẫn Hộ Tâm : 249.000đ + Miễn Ship', price: '249000' },
  { id: 'c2', label: '2 Nhẫn Hộ Tâm : 480.000đ + Miễn Ship', price: '480000' },
  { id: 'c3', label: '3 Nhẫn Hộ Tâm : 700.000đ + Miễn Ship', price: '700000' }
];

const sizeOptions = [
  { value: '', label: 'Size', disabled: true },
  { value: '1', label: 'Size 1: Chu vi 52–55 mm (đường kính 16.5–17.5mm)' },
  { value: '2', label: 'Size 2: Chu vi 56–59 mm (đường kính 17.8–18.8mm)' },
  { value: '3', label: 'Size 3: Chu vi 60–64 mm (đường kính 19.1–20.4 mm)' },
  { value: '4', label: 'Size 4: Chu vi 65–70 mm (đường kính 20.5–21.1 mm)' }
];

type OrderFormProps = {
  defaultCombo?: 'c1' | 'c2' | 'c3';
  defaultSize?: string;
  onSubmitted?: () => void;
};

export default function OrderForm({ defaultCombo = 'c1', defaultSize = '', onSubmitted }: OrderFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [combo, setCombo] = useState<'c1' | 'c2' | 'c3'>(defaultCombo);
  const [size, setSize] = useState<string>(defaultSize);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  type FbqFunction = (
    command: string,
    param1?: string | number | Record<string, unknown>,
    param2?: Record<string, unknown>
  ) => void;

  const getFbq = (): FbqFunction | undefined => {
    if (typeof window === 'undefined') return undefined;
    const win = window as unknown as { fbq?: FbqFunction };
    return win.fbq;
  };

  useEffect(() => {
    setCombo(defaultCombo);
  }, [defaultCombo]);

  useEffect(() => {
    setSize(defaultSize);
  }, [defaultSize]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        fullName,
        phone,
        address,
        combo,
        size,
        createdAt: new Date().toISOString()
      };
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Gửi thất bại');
      // Track Facebook Pixel Purchase event
      try {
        const priceMap: Record<string, number> = { c1: 299000, c2: 550000, c3: 759000 };
        const value = priceMap[combo] ?? 0;
        const fbq = getFbq();
        if (fbq) {
          fbq('track', 'Purchase', {
            value,
            currency: 'VND',
            contents: [{ id: combo, quantity: 1 }],
            content_type: 'product'
          });
        }
      } catch {}
      setNotice('Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận.');
      setTimeout(() => {
        setNotice(null);
        if (onSubmitted) onSubmitted();
      }, 1500);
      setFullName('');
      setPhone('');
      setAddress('');
      setCombo(defaultCombo);
      setSize(defaultSize);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Có lỗi khi gửi đơn: ' + message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl p-6 relative bg-amber-200"
    
    style={{
    fontSize:"12px !important"
    }}
    >
      {notice && (
        <div className="fixed left-1/2 -translate-x-1/2 top-4 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow z-[60]">
          {notice}
        </div>
      )}
      <h3 className="text-red-600 text-[29px] font-bold text-center mb-4">Thông tin đặt hàng</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Họ và tên"
          required
          className="w-full text-[12px] rounded-full px-5 py-3 bg-white outline-none text-red-600"
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
          required
          className="w-full rounded-full text-[12px] px-5 py-3 bg-white outline-none text-red-600"
        />

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Địa chỉ ( Nhập địa chỉ cũ trước khi sát nhập)"
          className="w-full rounded-full text-[12px] px-5 py-3 bg-white outline-none text-red-600"
        />

        <div className="bg-white rounded-2xl p-4">
          <div className="space-y-2 text-sm text-[#B22222]">
            {comboOptions.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2 text-red-600 text-[12px]">
                <input
                  type="radio"
                  name="combo"
                  value={opt.id}
                  checked={combo === opt.id}
                  onChange={() => setCombo(opt.id)}
                  className="accent-red-600 text-[12px]"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="relative">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            className="w-full appearance-none rounded-full px-5 py-3 bg-white outline-none pr-10 text-red-600 text-[12px]"
          >
            {sizeOptions.map((s) => (
              <option key={s.value} value={s.value} disabled={s.disabled}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-red-600">▼</span>
        </div>

        <div className="text-red-700 font-bold text-sm text-center">
          Hỗ trợ đổi trả 1-1 trong vòng 7 Ngày
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#C9252A] hover:bg-[#b01f23] disabled:opacity-60 text-white font-extrabold text-lg py-4 rounded-full shadow"
        >
          {submitting ? 'Đang gửi...' : 'Mua Ngay'}
        </button>
      </form>
    </div>
  );
}


