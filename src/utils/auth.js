const TokenKey = '_token';
const UserKey = 'pageModel';
export function getToken() {
  const app = sessionStorage.getItem(TokenKey);
  return app.accessToken;
}
export function getPageModel() {
  return localStorage.getItem(UserKey);
}
