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
  let arrBody = [
    {
      name: "Google Pixel 5",
      sku: "002",
      categories: [
        {
          magento_id: 1,
        },
      ],
      price: {
        normal: 100000,
        promo: 90000,
        subscription: 80000,
      },
      attributes: [
        {
          key: "inch",
          kind: "INT",
          value: 1,
        },
        {
          key: "color",
          kind: "INT",
          value: 1,
        },
      ],
    },
  ];

  let body = JSON.stringify(arrBody);
  let token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NldG9rby5jb20iLCJzdWIiOiI2T1dLYktlZklWbzBmUndsbENBeXQiLCJncm91cHMiOlsiTUVSQ0hBTlQiXSwicGhvbmVfbnVtYmVyIjoiMDg5NTQwMzQ5NTUzMyIsImVtYWlsIjoidXRhbWFpbWFtMDRAZ21haWwuY29tIiwiaWF0IjoxNjIwMjA3NjY4LCJleHAiOjE2MjAyOTQwNjgsImp0aSI6ImQwOTlhZmJiLTUzN2QtNDg3ZS1hODRlLWQ1NDFiYmYyZDgxYyJ9.IzSmw5QpQrNOUzsNOmPks-nngkeeYJm6lcnE2SijkFAAWkommpsYRbmJnHt7o2Ol7twd0q1JYbVOTPf5WXE-Upy2j-S5j07RFV5D_bS1A8fcQkjwJkUK9f2PDUth8Z67h5WL5Di1_hvzymqXWLKvlm7T4hz1Qkesjp-etG3Me_UMpoCvqa11lw6khy0QZOyTlJ3gn8m77FHmBIT873mxOZHyJXYeJqhucBbqkV0SglA8CHY_y0mNesTQTfcBP4KPwzG-eOChzPuhMO4-lZsfiRe60NheanulJZC_ovqYIcUv-FcGDTvE8mBzJKC4auAcvNDpkgt-tWziIEhJOqJHZQ";

  let params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  };
  let res = http.post("https://core.setoko-test.com/v1/products", body, params);

  let success = check(res, {
    "status is 200": (r) => r.status === 200,
  });
  if (!success) {
    ErrorCount.add(1);
  }
  sleep(2);
}
