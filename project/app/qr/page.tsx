'use client'
import React from 'react';

const QRDisplay = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="p-8">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-3xl font-bold">QR Code</h1>
          <div className="flex items-center justify-center">
            <img
              src="/qr_code.jpg"
              alt="QR Code"
              className="h-96 w-96 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRDisplay;