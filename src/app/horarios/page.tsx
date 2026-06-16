'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { HorariosMisas } from '@/components/interactive/HorariosMisas';

export default function HorariosPage() {
return (
<>
<HeroSection
bgImage="https://images.unsplash.com/photo-1548625149-720754860eea?w=1800&q=90"
title="Horarios de Misas"
subtitle="Celebraciones liturgicas de la comunidad"
/>

<section className="py-16">
<HorariosMisas />
</section>
</>
);
}
