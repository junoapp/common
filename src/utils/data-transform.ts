export function getRowsToCheck(data: any[]): any[] {
  const size = Math.floor(data.length / 10);

  const checkRows = [];

  let start = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (data[start]) {
        checkRows.push(data[start]);
        start++;
      } else {
        break;
      }
    }

    start += size;
  }

  return checkRows;
}

export function getDateAndCurrencyColumns(
  fields: string[],
  data: any[]
): { dateFields: string[]; moneyFields: string[] } {
  const dateFields: string[] = [];
  const moneyFields: string[] = [];

  for (const key of fields) {
    if (
      data[0][key] &&
      data[0][key].includes &&
      (data[0][key].includes('/') ||
        data[0][key].includes('-') ||
        data[0][key].includes(':'))
    ) {
      dateFields.push(key);
    }

    if (data[0][key] && data[0][key].includes && data[0][key].includes('$')) {
      moneyFields.push(key);
    }
  }

  return {
    dateFields,
    moneyFields,
  };
}

export function a(fields: string[], data: any[]) {
  const checkRows = getRowsToCheck(data);
  const { dateFields, moneyFields } = getDateAndCurrencyColumns(fields, data);

  const dates: number[][] = [[], [], []];
  const times: string[] = [];

  let timeFormat = '';
  let separator = '';

  const newDateFields = {};

  for (const dateField of dateFields) {
    for (const row of checkRows) {
      if (!row[dateField]) {
        continue;
      }

      const [date, time] = row[dateField].split(' ');

      let part1: string;
      let part2: string;
      let part3: string;

      if (String(date).includes('/')) {
        const [date1, date2, date3] = date.split('/');
        separator = '/';

        part1 = date1;
        part2 = date2;
        part3 = date3;
      } else if (String(date).includes('-')) {
        const [date1, date2, date3] = date.split('-');
        separator = '-';

        part1 = date1;
        part2 = date2;
        part3 = date3;
      } else {
        continue;
      }

      if (isNaN(+part1) || isNaN(+part2) || isNaN(+part3)) {
        continue;
      }

      newDateFields[dateField] = true;

      dates[0].push(+part1);
      dates[1].push(+part2);
      dates[2].push(+part3);

      times.push(time);

      if (time) {
        const timeSplit = String(time).split(':');
        if (timeSplit.length === 1) {
          timeFormat = 'HH';
        } else if (timeSplit.length === 2) {
          timeFormat = 'HH:mm';
        } else if (timeSplit.length === 3) {
          if (timeSplit[2].includes('+')) {
            timeFormat = 'HH:mm:ssx';
          } else {
            timeFormat = 'HH:mm:ss';
          }
        }
      }
    }
  }

  const year = dates.findIndex(date =>
    date.every(d => d.toString().length === 2 || d.toString().length === 4)
  );
  const month = dates.findIndex(date =>
    date.every(
      d =>
        (d.toString().length === 1 || d.toString().length === 2) &&
        d >= 0 &&
        d <= 12
    )
  );
  const day = [0, 1, 2].find(d => d !== year && d !== month);

  const year4Digits = dates[year].every(d => d.toString().length === 4);
  const month2Digits = dates[month].every(d => d.toString().length === 2);
  const day2Digits = dates[day].every(d => d.toString().length === 2);

  const dateFormat = [
    { order: year, format: year4Digits ? 'yyyy' : 'yy' },
    { order: month, format: month2Digits ? 'MM' : 'M' },
    { order: day, format: day2Digits ? 'dd' : 'd' },
  ];

  let dateFormatString = `${dateFormat
    .sort((a, b) => a.order - b.order)
    .map(d => d.format)
    .join(separator)}`;

  if (timeFormat) {
    dateFormatString += ` ${timeFormat}`;
  }
}
