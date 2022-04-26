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

export interface IUserData {
  additions: number;
  contributionGraph: {
    labels: string[];
    datasets: {
      label: string;
      data: {
        [key: string]: number;
      };
    };
  };
  lastContributed: string;
  loc: number;
  totalPrs: number;
}
