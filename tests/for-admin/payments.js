import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 10,
  duration: "15s",
  thresholds: {
    errors: ["count<10"],
  },
};

export default function () {
  const path = Math.random() < 0.9 ? "200" : "500";
  let token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NldG9rby5jb20iLCJzdWIiOiI3S1U0NWQyQndTSkhBblRKNmF6T2lPIiwiZ3JvdXBzIjpbIkFETUlOIl0sInBob25lX251bWJlciI6IjA4OTU0MDM0OTU1MzMiLCJlbWFpbCI6InV0YW1haW1hbTA0QGdtYWlsLmNvbSIsImlhdCI6MTYyMDIwOTQ5MiwiZXhwIjoxNjIwMjk1ODkyLCJqdGkiOiI5MmM4YzQxNS0yM2QxLTQ3NTEtOTc2Yy05MjlmZjMwMDEyOGUifQ.CJi3kL877eBz5ufETpxGBfFqM_wSiPkXLqs8VGzccduaVhM6IQWwJYc_9DkjSn53gt_Abqj4JKjcLoyidqdR3XfqoaQg0Kh2I8zFj09VqQwsWPsxwtIKdCqKx3jInl3dymcwvGnizRqE-Hh9lPA7R9TP0nPXxzaAS1pw2c4-4obRylVnWumsTd9TupCDOvSN9Fz7hEItGrLShWk7JV5o8GLCj9yO5SaXMdB0E8KmUhAALAsrC3ooG03ZRqboMFtEwzkzuIu07Qmp0vBbDZbhmCiLCJRgq7nRsqpxhq0k3Wix_aZVqNNRSUsBOr-BIbZ-z5XSwgi-1yN1ZejMcjcKlQ";

  let params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  //GET CUSTOMERS
  let res = http.get("https://core.setoko-test.com/admin/v1/payments", params);

  let success = check(res, {
    "status is 200": (r) => r.status === 200,
  });
  if (!success) {
    ErrorCount.add(1);
  }
  sleep(2);
}
