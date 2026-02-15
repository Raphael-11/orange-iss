/**
 * Environment configuration for development
 */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiDocsUrl: 'http://localhost:3000/api/docs',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['.pdf', '.docx'],
  jwtTokenKey: 'iss_orange_token',
  userDataKey: 'iss_orange_user'
};
