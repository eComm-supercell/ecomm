export class Config {
  isLocal = true;
  apiUrlDev = 'http://test.k6.io';
  apiUrlLoacl = 'http://localhost:3000';

  apiUrl = this.isLocal ? this.apiUrlLoacl : this.apiUrlDev;
}
