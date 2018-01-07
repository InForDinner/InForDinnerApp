
export const ENV = process.env.NODE_ENV || 'development';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';