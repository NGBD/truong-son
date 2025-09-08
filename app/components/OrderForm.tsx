'use client';

import React, { useState } from 'react';

type ComboOption = {
  id: string;
  label: string;
  price: string;
};

const comboOptions: ComboOption[] = [
  { id: 'c1', label: '1 Nhẫn Hộ Tâm : 299.000đ + Miễn Ship', price: '299000' },
  { id: 'c2', label: '2 Nhẫn Hộ Tâm : 550.000đ + Miễn Ship', price: '550000' },
  { id: 'c3', label: '3 Nhẫn Hộ Tâm : 759.000đ + Miễn Ship', price: '759000' }
];

const sizeOptions = ['Size', '15', '16', '17', '18', '19', '20'];

export default function OrderForm() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [combo, setCombo] = useState('c1');
  const [size, setSize] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
      alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận.');
      setFullName('');
      setPhone('');
      setAddress('');
      setCombo('c1');
      setSize('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      alert('Có lỗi khi gửi đơn: ' + message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#F8D777] rounded-2xl p-6 shadow">
      <h3 className="text-red-600 text-3xl font-extrabold text-center mb-4">Thông tin đặt hàng</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Họ và tên"
          required
          className="w-full rounded-full px-5 py-3 bg-white outline-none text-red-600"
        />

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
          required
          className="w-full rounded-full px-5 py-3 bg-white outline-none text-red-600"
        />

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Địa chỉ ( Nhập địa chỉ cũ trước khi sát nhập)"
          className="w-full rounded-full px-5 py-3 bg-white outline-none text-red-600"
        />

        <div className="bg-white rounded-2xl p-4">
          <div className="space-y-2 text-sm text-[#B22222]">
            {comboOptions.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2 text-red-600">
                <input
                  type="radio"
                  name="combo"
                  value={opt.id}
                  checked={combo === opt.id}
                  onChange={() => setCombo(opt.id)}
                  className="accent-red-600"
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
            className="w-full appearance-none rounded-full px-5 py-3 bg-white outline-none pr-10 text-red-600"
          >
            {sizeOptions.map((s) => (
              <option key={s} value={s === 'Size' ? '' : s} disabled={s === 'Size'}>
                {s}
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


