# Services Monitor

A monitor for 3rd services health

## Architecture

![architecture](./architecture.png)

## How to add a new endpoint?

1. go to `api/src/service/endpoints.ts`
2. add an item to `endpoints` following the `Endpoint` DSL.
3. run `api` (see below) and visit `http://localhost:3206/health-now`

The explanation of `Endpoint`:

```ts
type Endpoint = {
  name: string;
  urls: string[];
  preprocess?: (url: string) => {
    url: string;
    method: "get" | "post";
    data?: any;
    config?: AxiosRequestConfig;
  };
  expected?: (response: any) => boolean;
  target?: string;
};
```

- name, the category name
- urls, the urls of the service endpoints
- target, the discord webhook url for notification.
- preprocess and expected, the functor will be applied to each items in the urls.
  - preprocess, a functor called before a monitor request is sent:
    - argument, the element in the `urls`
    - returned:
      - url, the final url for requesting
      - method, `get` or `post`
      - data, the data in the request body
      - config, headers or else. it is a `AxiosRequestConfig`, see axios documentation for more details.
  - expected, a functor called when a response is received. its returned value will be used to determine if an endpoint service is healthy.
    - response, the response of axios request.
    - returned, true, good; false, bad.

The properties ends with `?` can be ignored, when it is missing, the default value will be used:

- preprocess, a normal get request.
- expected, to check if the response status is 200.
- target, default discord channel.
- ignore, when set to true, will not send message to target. default is false

## How to run it locally

1. go to `api`:
   - `npm i` (first time only)
   - `npm start`
1. go to `frontend`:
   - `npm i` (first time only)
   - change `baseURL` in `frontend/src/services/Constants.ts` to `http://localhost:3206/health`
   - `npm run dev`
