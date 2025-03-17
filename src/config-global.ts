import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.NEXT_PUBLIC_BASE_URL;
export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;
export const HOST_MLC_URL = process.env.NEXT_PUBLIC_MLC_BACK_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
