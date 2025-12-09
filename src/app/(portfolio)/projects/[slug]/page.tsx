import { notFound } from 'next/navigation';
import { ALL_PROJECTS } from '@/config/projects';
import ProjectDetailView from '@/components/projects/ProjectDetailView';

export function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  if (!project) return notFound();

  return <ProjectDetailView project={project} />;
}
