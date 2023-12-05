/* eslint-disable @typescript-eslint/naming-convention */
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const apiUrlLoacl = 'http://localhost:3000';

  const url = `${apiUrlLoacl}/auth/login`;
  const payload = JSON.stringify({
    username: 'super',
    password: 'super123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 201': (r) => r.status === 403,
  });
}
