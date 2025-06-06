// src/components/GoogleAnalytics.tsx
// Componente isolado para inserção do Google Analytics 4.
// Toda a lógica está devidamente comentada em português para facilitar o entendimento.

import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

export function GoogleAnalytics() {
  // Caso o identificador não esteja definido, não renderizamos nada.
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Carrega o script principal do Google Analytics de forma assíncrona */}
      <Script
        id="ga-externo"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      {/* Bloco inline necessário para configurar o GA4 */}
      <Script id="ga-inline" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
