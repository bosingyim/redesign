import { format } from 'timeago.js'

export const fetcher = (url:string) => fetch(url).then((res) => res.json())

export const formatValue = (value:number, decimal = 0) =>
    Number(value)
        .toFixed(decimal)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const formatTimeAgo = (date: Date): string => {
    if (date) return format(date);
    return '';
}

