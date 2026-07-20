import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { servicesData } from '@/lib/services-data';
import { ServiceDetailClient } from '@/app/services/[slug]/ServiceDetailClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Launch Live Studio`,
    description: service.shortDescription,
    alternates: {
      canonical: `https://www.launchlive.studio/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
