export interface IProjectResponse {
  project_name: string;
  project_info: string;
  project_code: string;
  project_category?: string;
  project_type?: string;
  project_currency?: string;
  project_logo?: string;
}

export interface ISystemResponse extends IProjectResponse {
  company_name: string;
  company_address: string;
  npwp: string;
  telephone_number: string;
  fax: string;
  email: string;
  website: string;
}
