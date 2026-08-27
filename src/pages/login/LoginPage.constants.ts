import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faTrophy,
    faChartColumn,
    faFlag,
} from '@fortawesome/free-solid-svg-icons';

type FooterContentItem = {
    title: string;
    description: string;
    icon: IconDefinition;
};

export const FOOTER_CONTENT: FooterContentItem[] = [
    {
        title: 'COMPITE',
        description: 'Compite en ligas contra otros managers',
        icon: faTrophy,
    },
    {
        title: 'ESTRATEGIA',
        description: 'Toma decisiones y gestiona tu equipo al detalle',
        icon: faChartColumn,
    },
    {
        title: 'GANA',
        description: 'Lleva a tu equipo a la gloria en cada carrera',
        icon: faFlag,
    },
];