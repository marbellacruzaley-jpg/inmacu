import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
title: 'Parroquia Santa Maria de la Asuncion',
description: 'Sitio web oficial de la Parroquia Santa Maria de la Asuncion en Morelia, Michoacan.',
keywords: ['parroquia', 'iglesia', 'catolica', 'morelia', 'michoacan'],
openGraph: {
title: 'Parroquia Santa Maria de la Asuncion',
description: 'Sitio web oficial de la Parroquia Santa Maria de la Asuncion',
type: 'website',
},
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="es">
<body className="bg-neutral-white text-neutral-dark">
<Header />
<main className="min-h-screen">
{children}
</main>
<Footer />
</body>
</html>
);
}
