import {
	format,
	isToday,
	isTomorrow,
	isBefore,
	isYesterday,
	parseISO,
} from 'date-fns';

export const todayDate = new Date().toISOString().split('T')[0];
export default function getDateLabel(dateString) {
	const date = parseISO(dateString);

	if (isToday(date)) return 'Today';
	if (isTomorrow(date)) return 'Tomorrow';
	// if (isYesterday(date)) return 'Yesterday';
	if (isBefore(date, todayDate)) return 'Overdue';
	return format(date, 'dd MMM yyyy');
}
