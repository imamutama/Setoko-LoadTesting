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

  let body = JSON.stringify({
    email: "utamaimam04@gmail.com",
    mobile: "0895403495533",
    name: "Imam Setya Utama",
    password: "imamutama15",
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = http.post(
    "https://core.setoko-test.com/admin/v1/admins/register",
    body,
    params
  );
  console.log(res.body);

  let success = check(res, {
    "status is 200": (r) => r.status === 200,
  });
  if (!success) {
    ErrorCount.add(1);
  }
  sleep(2);
}
