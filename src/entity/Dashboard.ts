import { DatasetInterface } from './Dataset';
import { UserInterface } from './User';

export interface DashboardInterface {
  id: number;
  name?: string;
  goal?: DashboardGoal;
  purpose?: DashboardPurpose;
  datasets: DatasetInterface[];
  user: UserInterface;

  createdDate: Date;
  updatedDate: Date;
}

export enum DashboardGoal {
  DECISION_MAKING = 'DECISION_MAKING',
  AWARENESS = 'AWARENESS',
  MOTIVATIONAL_LEARNING = 'MOTIVATIONAL_LEARNING',
  OTHER = 'OTHER',
}

export enum DashboardPurpose {
  STRATEGIC = 'STRATEGIC',
  OPERATIONAL = 'OPERATIONAL',
  ORGANIZATIONAL = 'ORGANIZATIONAL',
  LEARNING = 'LEARNING',
}
