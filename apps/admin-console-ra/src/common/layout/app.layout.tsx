import { Layout } from 'react-admin';
import { AppMenu } from './app.menu';

export const AppLayout = (props:any) => <Layout {...props} menu={AppMenu} />;