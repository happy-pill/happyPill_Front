import adminRoutes from './admin';
import memberRoutes from './member';

export const routes = [...adminRoutes, ...memberRoutes];
