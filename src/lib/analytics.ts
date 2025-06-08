// src/lib/analytics.ts
// Arquivo de utilidades para integrar o Google Analytics 4.
// Toda a implementação está comentada em português de forma detalhada.

// Identificador de medição do GA4. Ele é exposto no lado do cliente por
// meio da variável de ambiente "NEXT_PUBLIC_GA_MEASUREMENT_ID". Essa
// configuração permite que o código permaneça limpo e que o identificador
// seja alterado sem mexer no código fonte.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

// Registra uma visualização de página. É chamada toda vez que o usuário
// muda de rota dentro da aplicação.
export function pageview(url: string): void {
  // Verifica se estamos no ambiente do navegador e se o ID de medição foi
  // configurado. Caso contrário, não faz nada.
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  // A função "gtag" é disponibilizada pelo script do Google Analytics e
  // utilizada para enviar eventos. Aqui configuramos o tipo "config" para
  // registrar a visualização de página.
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

// Dispara um evento personalizado. Pode ser utilizado para rastrear ações
// específicas do usuário (cliques, downloads, etc.).
export function event({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  // O método "gtag" recebe o nome do evento (action) e os parâmetros
  // adicionais de categorização.
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}
