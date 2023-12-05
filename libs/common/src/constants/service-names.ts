// eslint-disable-next-line @typescript-eslint/naming-convention
export const SERVICE_NAMES = {
  auth: {
    name: 'localhost',
    port: process.env.AUTHENTICATION_PORT,
    label: 'AUTHENTICATION',
  },
} as const;
