import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { services } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gdestudio.com.ar'; // Reemplazar despues con el dominio real

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/proyecto/${project.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...serviceUrls,
    ...projectUrls,
  ];
}
