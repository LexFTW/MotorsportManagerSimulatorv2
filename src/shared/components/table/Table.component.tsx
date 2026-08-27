import type { ReactNode } from 'react';

import styles from './Table.module.css';

export interface TableColumn {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
}

export interface TableFilterOption {
    id: string;
    label: string;
}

export interface TableRow {
    id: string;
    cells: ReactNode[];
    tone?: 'default' | 'highlight';
}

export interface TableProps {
    title: string;
    columns: TableColumn[];
    rows: TableRow[];
    footnote?: string;
    filters?: TableFilterOption[];
    activeFilterId?: string;
    onFilterChange?: (filterId: string) => void;
    emptyMessage?: string;
}

const getAlignClassName = (align?: TableColumn['align']): string => {
    if (align === 'center') return styles.center;
    if (align === 'right') return styles.right;
    return styles.left;
};

export const Table = ({
    title,
    columns,
    rows,
    footnote,
    filters,
    activeFilterId,
    onFilterChange,
    emptyMessage = 'Sin datos disponibles.',
}: TableProps) => (
    <section className={styles.tableCard}>
        <header className={styles.tableHeader}>
            <h3 className={styles.title}>{title}</h3>

            {filters?.length ? (
                <div className={styles.filters} role="group" aria-label="Filtros de tabla">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={`${styles.filterButton} ${activeFilterId === filter.id ? styles.filterButtonActive : ''}`}
                            onClick={() => onFilterChange?.(filter.id)}
                            type="button"
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            ) : null}
        </header>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th className={getAlignClassName(column.align)} key={column.key} scope="col">
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length ? rows.map((row) => (
                        <tr className={row.tone === 'highlight' ? styles.rowHighlight : undefined} key={row.id}>
                            {row.cells.map((cell, index) => (
                                <td className={getAlignClassName(columns[index]?.align)} key={`${row.id}-${columns[index]?.key ?? index}`}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    )) : (
                        <tr>
                            <td className={styles.emptyCell} colSpan={columns.length}>{emptyMessage}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {footnote ? <p className={styles.footnote}>{footnote}</p> : null}
    </section>
);