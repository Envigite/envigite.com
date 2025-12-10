import { Metadata } from 'next';
import DashboardContainer from '@/projects/cierre-temporada/components/dashboard/DashboardContainer';

export const metadata: Metadata = {
  title: 'Dashboard Cierre | Tu Portafolio',
  description: 'Proyecto de análisis de datos agrícolas.',
};

export default function Page() {
  return <DashboardContainer />;
}
