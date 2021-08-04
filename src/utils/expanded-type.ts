import * as datalib from 'datalib';
import {
  DatasetColumnExpandedType,
  DatasetColumnType,
} from '../entity/DatasetColumn';
import { convert, TimeUnit } from './timeunit';

export function getExpandedType(columnArray: any[], data: any[]) {
  // const data = await this.clickHouseService.query(`select * from juno.${name}`);

  let summaries = datalib.summary(data);

  const opt = {
    numberNominalLimit: 40,
    numberNominalProportion: 0.05,
    minPercentUniqueForKey: 0.8,
    minCardinalityForKey: 50,
    enum: {
      binProps: {
        maxbins: [5, 10, 20],
        extent: [undefined],
        base: [10],
        step: [undefined],
        steps: [undefined],
        minstep: [undefined],
        divide: [[5, 2]],
        binned: [false],
        anchor: [undefined],
        nice: [true],
      },
      timeUnit: [
        undefined,
        TimeUnit.YEAR,
        TimeUnit.MONTH,
        TimeUnit.MINUTES,
        TimeUnit.SECONDS,
      ],
    },
  };

  let fieldSchemas = summaries.map((fieldProfile, index) => {
    const name: string = fieldProfile.field;
    const columnIndex = columnArray.findIndex(c => c.name === name);
    const column = columnArray[columnIndex];

    if (!column) {
      return null;
    }

    // In Table schema, 'date' doesn't include time so use 'datetime'
    const type: DatasetColumnType =
      column.typeName === 'date'
        ? DatasetColumnType.DATE
        : (column.typeName as any);

    let distinct: number = fieldProfile.distinct;
    let expandedType: DatasetColumnExpandedType;

    if (type === DatasetColumnType.NUMBER) {
      expandedType = DatasetColumnExpandedType.QUANTITATIVE;
    } else if (type === DatasetColumnType.INTEGER) {
      // use ordinal or nominal when cardinality of integer type is relatively low and the distinct values are less than an amount specified in options
      if (
        distinct < opt.numberNominalLimit &&
        distinct / fieldProfile.count < opt.numberNominalProportion
      ) {
        expandedType = DatasetColumnExpandedType.NOMINAL;
      } else {
        expandedType = DatasetColumnExpandedType.QUANTITATIVE;
      }
    } else if (type === DatasetColumnType.DATE) {
      expandedType = DatasetColumnExpandedType.TEMPORAL;
      // need to get correct min/max of date data because datalib's summary method does not
      // calculate this correctly for date types.
      fieldProfile.min = new Date(data[0][name]);
      fieldProfile.max = new Date(data[0][name]);
      for (const dataEntry of data) {
        const time = new Date(dataEntry[name]).getTime();
        if (time < (fieldProfile.min as Date).getTime()) {
          fieldProfile.min = new Date(time);
        }
        if (time > (fieldProfile.max as Date).getTime()) {
          fieldProfile.max = new Date(time);
        }
      }
    } else {
      expandedType = DatasetColumnExpandedType.NOMINAL;
    }

    if (
      expandedType === DatasetColumnExpandedType.NOMINAL &&
      distinct / fieldProfile.count > opt.minPercentUniqueForKey &&
      fieldProfile.count > opt.minCardinalityForKey
    ) {
      expandedType = DatasetColumnExpandedType.KEY;
    }

    const GEO_TYPES = [
      'airport',
      ['area', 'code'],
      ['cbsa', 'msa'],
      'city',
      ['congressional', 'district'],
      'country',
      'region',
      'county',
      'latitude',
      'longitude',
      'nuts',
      'state',
      'province',
      'lat',
      'long',
      'lng',
      ['zip', 'code'],
      ['post', 'code'],
      ['postal', 'code'],
      ['iso', 'code'],
      'continent',
      'location',
      'iso2',
      'iso3',
    ];

    for (const geoType of GEO_TYPES) {
      if (geoType instanceof Array) {
        let match = true;
        for (const part of geoType) {
          if (!name.toLowerCase().includes(part)) {
            match = false;
            break;
          }
        }

        if (match) {
          expandedType = DatasetColumnExpandedType.GEO;
        }
      } else {
        if (geoType.length <= 4) {
          if (name.toLowerCase() === geoType) {
            expandedType = DatasetColumnExpandedType.GEO;
          }
        } else {
          if (name.toLowerCase().includes(geoType)) {
            expandedType = DatasetColumnExpandedType.GEO;
          }
        }
      }
    }

    let fieldSchema = {
      name,
      originalIndex: index,
      expandedType,
      type,
      stats: fieldProfile,
      timeStats: {} as { [timeUnit: string]: DLFieldProfile },
      binStats: {} as { [key: string]: DLFieldProfile },
    };

    columnArray[columnIndex].expandedType = expandedType;

    return fieldSchema;
  });

  // calculate preset bins for quantitative and temporal data
  for (let fieldSchema of fieldSchemas) {
    if (!fieldSchema) {
      continue;
    }

    if (fieldSchema.vlType === DatasetColumnExpandedType.QUANTITATIVE) {
      for (let maxbins of opt.enum.binProps.maxbins) {
        fieldSchema.binStats[maxbins] = binSummary(maxbins, fieldSchema.stats);
      }
    } else if (fieldSchema.vlType === DatasetColumnExpandedType.TEMPORAL) {
      for (let unit of opt.enum.timeUnit) {
        if (unit !== undefined) {
          fieldSchema.timeStats[unit] = timeSummary(unit, fieldSchema.stats);
        }
      }
    }
  }

  return columnArray;
}

/**
 * @return a summary of the binning scheme determined from the given max number of bins
 */
export function binSummary(
  maxbins: number,
  summary: DLFieldProfile
): DLFieldProfile {
  const bin = datalib.bins({
    min: summary.min,
    max: summary.max,
    maxbins: maxbins,
  });

  // start with summary, pre-binning
  const result = datalib.extend({}, summary);
  result.unique = binUnique(bin, summary.unique);
  result.distinct = (bin.stop - bin.start) / bin.step;
  result.min = bin.start;
  result.max = bin.stop;

  return result;
}

/**
 * @return a new unique object based off of the old unique count and a binning scheme
 */
export function binUnique(bin: any, oldUnique: any) {
  const newUnique = {};
  for (let value in oldUnique) {
    let bucket: number;
    if (value === null) {
      bucket = null;
    } else if (isNaN(Number(value))) {
      bucket = NaN;
    } else {
      bucket = bin.value(Number(value)) as number;
    }
    newUnique[bucket] = (newUnique[bucket] || 0) + oldUnique[value];
  }
  return newUnique;
}

/** @return a modified version of the passed summary with unique and distinct set according to the timeunit.
 *  Maps 'null' (string) keys to the null value and invalid dates to 'Invalid Date' in the unique dictionary.
 */
export function timeSummary(
  timeunit: TimeUnit,
  summary: DLFieldProfile
): DLFieldProfile {
  const result = datalib.extend({}, summary);

  let unique: { [value: string]: number } = {};
  datalib.keys(summary.unique).forEach(function(dateString) {
    // don't convert null value because the Date constructor will actually convert it to a date
    let date: Date = dateString === 'null' ? null : new Date(dateString);
    // at this point, `date` is either the null value, a valid Date object, or "Invalid Date" which is a Date
    let key: string;
    if (date === null) {
      key = null;
    } else if (isNaN(date.getTime())) {
      key = 'Invalid Date';
    } else {
      key = (timeunit === TimeUnit.DAY
        ? date.getDay()
        : convert(timeunit, date)
      ).toString();
    }
    unique[key] = (unique[key] || 0) + summary.unique[dateString];
  });

  result.unique = unique;
  result.distinct = datalib.keys(unique).length;

  return result;
}
