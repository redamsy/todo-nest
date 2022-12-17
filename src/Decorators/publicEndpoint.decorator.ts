// used for declaring routes as public
// https://docs.nestjs.com/security/authentication#enable-authentication-globally
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// usage example:
// @Public()
// @Get()
// findAll() {
//   return [];
// }
