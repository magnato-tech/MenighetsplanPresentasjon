import { createRoot } from 'react-dom/client';
import CrmApp from './CrmApp.tsx';
import SalesApp from './SalesApp.tsx';
import { isCrmHost } from './utils/appHost.ts';
import './index.css';

const Root = isCrmHost() ? CrmApp : SalesApp;

createRoot(document.getElementById('root')!).render(<Root />);
