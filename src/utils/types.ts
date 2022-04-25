export type TOrgModel = {
  name: string;
  url: string;
};

export type TContributor = {
  login: string;
  avatarURL: string;
  contributions: number;
  id: number;
  url: string;
};

export interface IProductivity {
  increased: boolean;
  percentage: number;
}

export interface IInfoTooltip {
  title: string;
}

export interface IChartTitle {
  title: string;
  tooltipText: string;
}
