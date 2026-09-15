'use client';
import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitals() {
  useReportWebVitals((metric) => {
    try {
      if (!metric || typeof metric.value !== 'number') return;

      if (process.env.NODE_ENV === 'development') {
        console.log('[WebVitals]', metric);
      } else {
        console.log('[WebVitals Production]', metric.name, metric.value);
      }
    } catch (err) {
      console.log(err);
    }
  });

  return null;
}
