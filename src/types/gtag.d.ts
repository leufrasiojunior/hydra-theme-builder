// src/types/gtag.d.ts
// Declaração do método global `gtag` utilizado pelo Google Analytics.
interface Window {
  gtag(...args: unknown[]): void;
}
