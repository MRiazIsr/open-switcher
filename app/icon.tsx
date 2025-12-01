import { ImageResponse } from 'next/og'

// Параметры иконки
export const runtime = 'edge'
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Генерация картинки
export default function Icon() {
    return new ImageResponse(
        (
            // Элемент, который станет картинкой
            <div
                style={{
                    fontSize: 18,
                    background: 'linear-gradient(to bottom right, #2563eb, #4f46e5)', // Синий градиент как на сайте
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px', // Скругленный квадрат (как у приложений iOS/macOS)
                    fontFamily: 'sans-serif',
                    fontWeight: 700,
                }}
            >
                OA
            </div>
        ),
        {
            ...size,
        }
    )
}