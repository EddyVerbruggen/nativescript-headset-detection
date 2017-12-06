export function isConnected(): Promise<boolean>;
export function onConnectionStateChanged(callback: (connected: boolean) => void): void;