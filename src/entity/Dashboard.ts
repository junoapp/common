import { BasicColumnsInterface } from './BasicColumns';
import { UserDatasetInterface } from './UserDataset';

export interface DashboardInterface extends BasicColumnsInterface {
  id: number;
  name?: string;
  goalType?: DashboardGoal;
  goalPurpose?: DashboardPurpose;
  userDatasets: UserDatasetInterface[];
}

export enum DashboardGoal {
  DecisionMaking = 'DECISION_MAKING',
  Awareness = 'AWARENESS',
  MotivationalLearning = 'MOTIVATIONAL_LEARNING',
  Other = 'OTHER',
}

export enum DashboardPurpose {
  Strategic = 'STRATEGIC',
  Operational = 'OPERATIONAL',
  Organizational = 'ORGANIZATIONAL',
  Learning = 'LEARNING',
}
