import fetchData from '.';

export const fetchDashboardBrief = () => {
  return fetchData('/api/auth/dashboard/brief', { method: 'GET', includeCredential: true });
}
