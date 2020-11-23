// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrls: {
    mapBoxUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
    mapBoxUrlTwo: ".json",
    weatherMapUrl: "https://api.openweathermap.org/data/2.5/weather",
    
  },

  apiKeys: {
    mapBoxAccessToken: "pk.eyJ1IjoicnliYTEyNjIiLCJhIjoiY2tobm14ODhnMGVhczMyazZxbXhsanY4eSJ9.k1i501YWOpJqGtphrJbZSQ",
    weatherMapToken: "517be8b71b1039a37acd6f03389d74bb"
  }



};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
