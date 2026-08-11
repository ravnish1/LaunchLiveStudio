import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { servicesData } from '@/lib/services-data';
import { ServiceDetailClient } from '@/app/services/[slug]/ServiceDetailClient';
import Script from "next/script";

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDescription,
    "provider": {
      "@type": "Organization",
      "name": "Launch Live Studio",
      "url": "https://www.launchlive.studio/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.launchlive.studio/logo.png"
      }
    },
    "url": `https://www.launchlive.studio/services/${service.slug}`
  };

  return (
    <>
      <Script
        id="schema-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
