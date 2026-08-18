import React from 'react';

export function App() {
  return (
    <div className="min-h-screen bg-[#F5FAFF] flex flex-col items-center justify-center p-6 text-[#102A43]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#D9EAF7] shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-[#1677FF] rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
          🚀
        </div>
        <h1 className="text-2xl font-black tracking-tight text-[#102A43]">
          Ready for New Code
        </h1>
        <p className="text-sm text-[#52667A] leading-relaxed">
          The previous codebase has been cleared out. Paste or describe your new code and requirements, and I will build it for you immediately.
        </p>
      </div>
    </div>
  );
}

export default App;
