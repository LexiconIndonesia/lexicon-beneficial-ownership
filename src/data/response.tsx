export type FilterTypeValue = "All Type" | "verdict" | "blacklist" | "sanction";
export type FilterNationValue = "All Nation" | "Indonesia" | "Singapore" | "Malaysia";

export interface GetCasesParams {
  keyword?: string;
  filterSubjectType?: string | string[];
  filterType?: string | string[];
  filterFrom?: string;
  filterTo?: string;
  filterNation?: string;
}

export interface GetCasesResponse {
  id: string;
  subject?: string;
  subject_type?: string;
  person_in_charge?: string;
  year?: string;
  type?: string;
  decision_number?: string;
  nation?: string;
  source?: string;
  link?: string;
  summary?: string;
  punishment_duration?: string;
  beneficary_ownership?: string;
}