import type { TableColumn } from '@/shared/components';

export const COLUMNS = [
    { key: 'name', label: 'Liga' },
    { key: 'players', label: 'Jugadores', align: 'center' },
    { key: 'status', label: 'Estado', align: 'center' },
    { key: 'actions', label: '', align: 'right' },
] satisfies TableColumn[];
