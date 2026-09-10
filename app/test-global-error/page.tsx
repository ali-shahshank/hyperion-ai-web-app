'use client';
import { useEffect } from 'react';

export default function TestGlobalError() {
  useEffect(() => {
    // Simulate uncaught error that bypasses error.tsx
    throw new Error('Test global error');
  }, []);

  return null;
}
