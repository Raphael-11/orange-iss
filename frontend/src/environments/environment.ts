/**
 * Environment configuration for production
 */
export const environment = {
  production: true,
  apiUrl: '/api',
  apiDocsUrl: '/api/docs',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['.pdf', '.docx'],
  jwtTokenKey: 'iss_orange_token',
  userDataKey: 'iss_orange_user'
};
