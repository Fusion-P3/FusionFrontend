// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  withCredentials: true,
  baseUrl: "https://localhost:80",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  },
};
