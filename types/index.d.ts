export {};

declare global {
  interface Window {
    Tawk_API: any;
  }

  interface Tawk_API {
    hideWidget: any;
    showWidget: any;
  }
}
