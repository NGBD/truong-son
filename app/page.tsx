'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import OrderForm from './components/OrderForm';
import OrderModal from './components/OrderModal';

export default function Home() {
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); // 0h00 ngày hôm sau
    const diffMs = nextMidnight.getTime() - now.getTime();
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Carousel state
  const carouselImages = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
    '/images/slide4.jpg',
    '/images/slide5.jpg'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [carouselImages.length]);

  useEffect(() => {
    // Đồng bộ sau khi mount để tránh mismatch SSR/CSR
    setTimeLeft(getTimeUntilMidnight());
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const openOrder = () => setIsOrderOpen(true);
  const closeOrder = () => setIsOrderOpen(false);
  return (
    <div className="min-h-screen bg-[#FFE286]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#BDEFB0] to-[#91D87D] text-[#B81C25] py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <h1 className="text-2xl font-bold uppercase">Nhẫn Bạc Hộ Tâm</h1>
 
        </div>
      </header>

      {/* Carousel */}
      <section>
        <div className="max-w-6xl mx-auto">
          <div className="relative mx-auto w-full sm:w-[520px] md:w-[640px] bg-white rounded-xl shadow">
            <div className="relative w-full aspect-square">
              <Image
                src={carouselImages[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Controls */}
            <button
              aria-label="Prev slide"
              onClick={() => setCurrentSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length)}
              className="absolute left-2 top-1/2 bg-transparent hover:bg-black/10 text-black rounded-full w-9 h-9 flex items-center justify-center"
            >
              <span className="text-5xl font-extralight leading-none">‹</span>
            </button>
            <button
              aria-label="Next slide"
              onClick={() => setCurrentSlide((currentSlide + 1) % carouselImages.length)}
              className="absolute right-2 top-1/2 bg-transparent hover:bg-black/10 text-black w-9 h-9 flex items-center justify-center"
            >
              <span className="text-5xl font-extralight leading-none">›</span>
            </button>
          </div>
        </div>
      </section>
      
 

      {/* Hero / Offer Section (match mockup) */}
      <section className="py-4 px-2">
        <div className="max-w-md mx-auto">
            <div className="text-center text-[16px] text-black font-bold">
           <span className="text-red-500 italic font-semibold text-[20px]">Sale sốc!!!</span> NHẪN BẠC HỘ TÂM – BẢN RỘNG 10MM | PHONG THỦY – TRẤN AN – TÀI LỘC
            </div>
          {/* Top CTA */}
          <button onClick={openOrder} className="w-full mt-2 bg-[#D5352C] hover:bg-[#bb221a] text-white font-extrabold text-xl py-4 rounded-full shadow mb-5 transition-colors animate-zoom">
            Đặt Hàng Ngay
          </button>

          {/* Offer Card */}
          <div className="rounded-2xl max-w-[600px] mx-auto mt-4">
            <div
              className="flex items-start justify-between relative rounded-r-2xl p-2"
              style={{
                backgroundImage: "url(/images/images8.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "100% 140px"
              }}
            >
              <div className="px-2 py-2">
                <div className="text-[13px] font-extrabold text-white tracking-wide">ƯU ĐÃI LÊN TỚI</div>
                <div className="text-[44px] leading-none font-black text-[#FFE286]">50%</div>
              </div>
              <div className="text-right px-2">
                <div className="text-sm text-[#FFE286]">Giá gốc: <span className="line-through">500.000</span></div>
                <div className="mt-1 bg-white rounded-xl px-3 py-1 inline-block">
                  <div className="text-[13px] font-semibold text-black">Chỉ còn:</div>
                  <div className="text-[20px] font-extrabold text-[#C83A31]">249.000 VNĐ / CÁI</div>
                </div>
              </div>
            </div>

            {/* Combo prices */}
            <div className="bg-white rounded-xl shadow-sm border border-[#F3B97B] p-3 mt-4">
              <ul className="text-[14px] text-gray-800 space-y-2">
                <li>• 1 Nhẫn Hộ Tâm: <span className="font-semibold">249.000đ</span> + Miễn Ship</li>
                <li>• 2 Nhẫn Hộ Tâm: <span className="font-semibold">480.000đ</span> + Miễn Ship</li>
                <li>• 3 Nhẫn Hộ Tâm: <span className="font-semibold">700.000đ</span> + Miễn Ship</li>
              </ul>
              <div className="text-[12px] text-red-800 font-bold mt-2">
              Quà Tặng Phong Thủy Ý Nghĩa - Thu Hút Vận May Cho Bạn
            </div>
            </div>
          </div>
      

          {/* Middle CTA */}
          <button onClick={openOrder} className="w-full bg-[#D5352C] hover:bg-[#bb221a] text-white font-extrabold text-xl py-4 rounded-full shadow mt-5 transition-colors animate-zoom">
            Đặt Hàng Ngay
          </button>

              {/* Benefits */}
              <div className="mt-4 bg-white rounded-2xl p-4 shadow">
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-start gap-3"><span className="text-green-600">✔</span><span
              className="text-black font-bold">Giao hàng tại nhà trên toàn quốc</span></li>
              <li className="flex items-start gap-3"><span className="text-green-600">✔</span><span className="text-black font-bold">Bảo hành sản phẩm trong 12 tháng</span></li>
              <li className="flex items-start gap-3"><span className="text-green-600">✔</span><span className="text-black font-bold">Đổi 1 đổi 1 trong vòng 7 ngày</span></li>
            </ul>
          </div>

          {/* Bottom button */}
          <button className="w-full mt-4 bg-[#8A1C1C] hover:bg-[#8A1C1C] text-white font-extrabold text-sm tracking-wide py-3 rounded-xl border border-[#8A1C1C]/30">
            GIỚI THIỆU VỀ SẢN PHẨM
          </button>

          <div className="mt-4">
            <Image src="/images/images7.png" alt="images7" width={400} height={100} className="w-full h-auto" />
            <Image src="/images/slide4.jpg" alt="images7" width={400} height={100} className="w-full h-auto" />
            <Image src="/images/slide3.jpg" alt="images7" width={400} height={100} className="w-full h-auto" />
            <Image src="/images/slide1.jpg" alt="images7" width={400} height={100} className="w-full h-auto" />
            <button onClick={openOrder} className="w-full bg-[#D5352C] hover:bg-[#bb221a] text-white font-extrabold text-xl py-4 rounded-xl shadow my-5 transition-colors animate-zoom">
            Đặt Hàng Ngay
          </button>
            <Image src="/images/images6.png" alt="images7" width={400} height={100} className="w-full h-auto" />
          </div>
        </div>
      </section>

 

      {/* Product Details */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Mô tả</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6">1. Công dụng</h4>
              <ul className="space-y-3 text-gray-700">
                <li>• Vật phẩm hộ mệnh, giúp trấn an tinh thần, thu hút năng lượng tốt</li>
                <li>• Hỗ trợ cân bằng cảm xúc, giữ tâm vững vàng</li>
                <li>• Tăng vượng khí, phù hợp với người làm việc căng thẳng hoặc tâm linh</li>
                <li>• Có thể dùng làm trang sức phong thủy hoặc quà tặng ý nghĩa</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6">2. Thông tin chi tiết</h4>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Tên sản phẩm:</strong> Nhẫn Bạc Hộ Tâm</li>
                <li>• <strong>Chất liệu:</strong> Bạc S925 cao cấp – chứa 92,5% bạc thật</li>
                <li>• <strong>Trọng lượng:</strong> 10–15g tùy size</li>
                <li>• <strong>Chiều rộng nhẫn:</strong> 10mm</li>
                <li>• <strong>Thiết kế:</strong> Hoa văn cổ thiêng, bản lớn – xoay được linh hoạt</li>
                <li>• <strong>Phù hợp:</strong> Đeo hàng ngày, không gây kích ứng da</li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">3. Lưu ý</h4>
            <ul className="space-y-3 text-gray-700">
              <li>• Hạn chế tiếp xúc với hóa chất mạnh (nước tẩy, nước biển…)</li>
              <li>• Nếu bị xỉn màu do môi trường, có thể lau sáng lại bằng khăn bạc</li>
              <li>• Nên tháo nhẫn khi làm việc nặng hoặc vệ sinh mạnh</li>
              <li>• Bảo quản nơi khô ráo, tránh để chung với kim loại khác</li>
            </ul>
          </div>

          <div className="mt-12">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">4. Hướng dẫn sử dụng</h4>
            <ul className="space-y-3 text-gray-700">
              <li>• Đeo ở ngón tay thuận hoặc ngón áp út để cảm nhận năng lượng ổn định</li>
              <li>• Có thể kết hợp cùng vòng phong thủy, dây bạc để tăng hiệu quả hộ mệnh</li>
              <li>• Khi không đeo, nên cất vào hộp để giữ độ sáng bóng</li>
            </ul>
          </div>
        </div>
      </section>
      <button onClick={openOrder} className="w-full bg-[#D5352C] hover:bg-[#bb221a] text-white font-extrabold text-xl rounded-xl shadow p-2 transition-colors my-2 animate-zoom">
            Đặt Hàng Ngay
          </button>

      {/* Countdown Timer */}
      <section className="py-12 px-6 bg-red-600 text-white text-center">
        <h3 className="text-2xl font-bold mb-6">Ưu đãi chỉ còn kéo dài trong</h3>
        <div className="flex justify-center space-x-4 text-4xl font-bold">
          <div className="bg-white/20 rounded-lg p-4">
            <div>00</div>
            <div className="text-sm">Ngày</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div>{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-sm">Giờ</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div>{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-sm">Phút</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div>{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-sm">Giây</div>
          </div>
        </div>
      </section>

      {/* Customer Stats */}
      <section className="py-4 bg-[#FFE286] text-white text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-green-600">4000+ KHÁCH HÀNG</h3>
          <p className="text-xl text-red-600 font-bold">ĐÃ MUA TRONG TUẦN QUA</p>
          <Image src="/images/slide3.jpg" alt="images7" width={400} height={100} className="w-full h-auto" />
          <button onClick={openOrder} className="w-[300px] bg-[#D5352C] hover:bg-[#bb221a] text-white font-extrabold text-xl rounded-xl shadow p-2 transition-colors my-2 animate-zoom">
            Đặt Hàng Ngay
          </button>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="danh-gia" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Đánh giá của khách hàng (1245 bình luận)</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  hN
                </div>
                <div>
                  <div className="font-bold">h N</div>
                  <div className="text-sm text-gray-600">Mặt hàng: 2 Nhẫn Hộ Tâm</div>
                </div>
              </div>
              <p className="text-gray-700">&quot;Thiết kế khắc hoa văn rất tinh xảo, nhìn sang và có hồn. Bạc thật nên mình đeo không bị dị ứng, rất ưng ý nha!&quot;</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  TH
                </div>
                <div>
                  <div className="font-bold">Th Hn</div>
                  <div className="text-sm text-gray-600">Mặt hàng: 1 Nhẫn Hộ Tâm</div>
                </div>
              </div>
              <p className="text-gray-700">&quot;Nhẫn đẹp, bản to đúng như hình, đeo rất chắc tay luôn ạ. Mình thấy nhẹ người, cảm giác đeo vào an tâm thật sự. Giao hàng nhanh, đóng gói cẩn thận!&quot;</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  VD
                </div>
                <div>
                  <div className="font-bold">Vn Dng</div>
                  <div className="text-sm text-gray-600">Mặt hàng: 2 Nhẫn Hộ Tâm</div>
                </div>
              </div>
              <p className="text-gray-700">&quot;Từ lúc đeo nhẫn này thấy ngủ ngon, tâm ổn định hơn thật. Không biết do niềm tin hay năng lượng, nhưng cảm giác rất tốt! Nhẫn chất lượng, khuyên mọi người nên thử.&quot;</p>
            </div>
          </div>
        </div>
      </section>

         {/* OrderForm Component (the form UI like the screenshot) */}
         <section className="py-8 px-4 bg-[#FFE286]">
        <div className="max-w-md mx-auto">
          <OrderForm />
        </div>
      </section>
      <section className="py-16 px-6 bg-gray-50 w-full justify-center flex">
        <div className="max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12 uppercase">Chính sách bán hàng</h3>
          <div className="grid-cols-2 gap-2 grid justify-center items-center">
          <Image src="/images/cs1.png" alt="images7" width={400} height={100} className="aspect-square" />
            <Image src="/images/cs2.png" alt="images7" width={400} height={100} className="aspect-square" />
            <Image src="/images/cs3.png" alt="images7" width={400} height={100} className="aspect-square" />
            <Image src="/images/cs4.png" alt="images7" width={400} height={100} className="aspect-square" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="lien-he" className="py-16 px-6 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
      
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">THÔNG TIN LIÊN HỆ</h4>
              <div className="space-y-2">
                <p><strong>Email:</strong> capduoi13@gmail.com</p>
                <p><strong>Số điện thoại:</strong> 0342.764.382</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">ĐỊA CHỈ CỬA HÀNG</h4>
              <div className="space-y-2 text-sm">
                <p>• CS 1: 20 Bến Nghé, TP Huế, Thừa Thiên Huế</p>
                <p>• CS 2: 15 Lê Đức Thọ, Thanh Xuân, Hà Nội</p>
                <p>• CS 3: Khu Đô Thị Vạn Phúc, Thủ Đức, Hồ Chí Minh</p>
                <p>• CS 4: 20 Nguyễn Văn Linh, Hải Châu, Đà Nẵng</p>
              </div>
            </div>
          </div>
     
        </div>
      </footer>
      <OrderModal open={isOrderOpen} onClose={closeOrder} />
    </div>
  );
}
