import React from 'react';

const QrCode: React.FC = () => {
    // This is a static, representative QR code for UI purposes.
    // In a real application, you would generate this dynamically.
    const size = 160;
    const moduleSize = 8;
    const modules = size / moduleSize;
    
    // Simple pattern to look like a QR code
    const pattern = Array.from({ length: modules }, (_, y) =>
        Array.from({ length: modules }, (_, x) => {
            const isFinderPattern = (x < 7 && y < 7) || (x >= modules - 7 && y < 7) || (x < 7 && y >= modules - 7);
            if (isFinderPattern) {
                const inner = (x % 7 > 0 && x % 7 < 6) && (y % 7 > 0 && y % 7 < 6);
                const center = (x % 7 > 1 && x % 7 < 5) && (y % 7 > 1 && y % 7 < 5);
                return center ? true : !inner;
            }
            return Math.random() > 0.5;
        })
    );

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg bg-white dark:bg-gray-200 p-2">
            {pattern.map((row, y) =>
                row.map((isFilled, x) =>
                    isFilled ? (
                        <rect
                            key={`${y}-${x}`}
                            x={x * moduleSize}
                            y={y * moduleSize}
                            width={moduleSize}
                            height={moduleSize}
                            className="fill-current text-black"
                        />
                    ) : null
                )
            )}
        </svg>
    );
};

export default QrCode;