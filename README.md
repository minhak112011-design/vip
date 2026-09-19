# 💗 Em còn yêu anh không?

Một website tình yêu nhỏ xinh, troll vui: nhân vật cute, nút "Không 😭" né chuột/né tay chạm khắp màn hình, chỉ có nút "Có nha 💗" là bấm được thật.

Xây bằng **Next.js 14 + React + TypeScript + Tailwind CSS + Framer Motion**. 100% frontend, không cần database, không cần API key, không cần server riêng.

## 1. Cài dependencies

```bash
npm install
```

## 2. Chạy thử ở local

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## 3. Build production (kiểm tra không lỗi trước khi deploy)

```bash
npm run build
```

## 4. Deploy lên Vercel

Cách nhanh nhất (CLI):

```bash
npm i -g vercel
vercel
```

Hoặc: đẩy code lên GitHub rồi vào [vercel.com](https://vercel.com) → **Import Project** → chọn repo → Deploy. Không cần thêm Environment Variable nào.

## 5. Thêm nhạc nền (tuỳ chọn)

Bỏ file nhạc của bạn vào:

```
public/music/love.mp3
```

Nút nhạc 🎵 ở góc dưới bên phải sẽ tự nhận file. Nếu chưa có file, nút sẽ tự ẩn và web vẫn chạy bình thường (không lỗi).

> ⚠️ Lưu ý bản quyền: mình không nhúng sẵn nhạc/audio lấy từ video TikTok bạn gửi vào code, vì đó là nhạc có bản quyền của người khác. Bạn hãy dùng nhạc bạn sở hữu bản quyền, nhạc royalty-free, hoặc file nhạc bạn tự thu/tự có quyền sử dụng, đặt vào đúng đường dẫn trên là chạy được ngay.

## Cấu trúc project

```
app/
  layout.tsx        # font, metadata
  page.tsx           # ghép các màn hình lại
  globals.css
components/
  CuteCharacter.tsx   # nhân vật SVG, 5 trạng thái: normal/thinking/nervous/happy/sad
  LoveQuestion.tsx    # màn hình câu hỏi chính
  ResultScreen.tsx    # màn hình sau khi bấm "Có"
  NoButton.tsx        # nút né chuột/né tay chạm (logic troll chính)
  YesButton.tsx
  FloatingHearts.tsx  # trái tim/sparkle bay nền
  Confetti.tsx        # hiệu ứng confetti khi bấm "Có"
  SpeechBubble.tsx     # bong bóng thoại trêu
  MusicToggle.tsx      # nút bật/tắt nhạc nền
public/
  music/love.mp3      # (tự thêm)
```

## Cơ chế nút "Không"

- Trên máy tính: hễ chuột lại gần trong bán kính ~95px, nút tự nhảy sang vị trí ngẫu nhiên khác trong màn hình (dùng Framer Motion spring, luôn nằm trong viewport).
- Trên điện thoại: chạm vào là nút né liền, không có kiểu bấm trúng.
- Mỗi lần né, chữ trên nút đổi theo (từ "Không 😭" → ... → "Thôi màaa, chọn Có đi 😭💗"), nhân vật đổi trạng thái (buồn/hồi hộp xen kẽ) và có bong bóng thoại trêu bên dưới.
- Nút "Không" **không bao giờ thực sự chọn được** — chỉ có "Có nha 💗" mới dẫn sang màn hình kết quả.

## Accessibility

- Cả hai nút đều là `<button>` thật, có `aria-label`.
- Hỗ trợ `prefers-reduced-motion` (giảm animation nếu thiết bị bật).
- Focus state rõ ràng khi dùng bàn phím (Tab).

## Performance

- Không dùng ảnh/video nặng, toàn bộ nhân vật là inline SVG.
- Animation chủ yếu bằng Framer Motion + CSS transform, nhẹ và mượt trên mobile.
