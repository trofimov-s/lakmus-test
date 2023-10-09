import { HttpClient } from '@angular/common/http';

import * as envConfig from '@lakmus/environmets/environment';
import { QueryParamsI, RequiredQueryParamsI } from '@lakmus/core/models';

export abstract class BaseApi {
  private readonly URL_PATH = envConfig.environment.apiUrl;
  private readonly defaultParams: RequiredQueryParamsI = {
    IsPublic: true,
  };

  constructor(protected http: HttpClient) {}

  protected buildUrl(query: QueryParamsI): string {
    const requiredParams: string = this.buildQueries(this.defaultParams);
    const queryParams: string = this.buildQueries(query);

    return `${this.URL_PATH}?${requiredParams}&${queryParams}`;
  }

  private buildQueries(query: QueryParamsI | RequiredQueryParamsI): string {
    const passedParams: string = Object.entries(query)
      .map((paramPare: string[]) => paramPare.join('='))
      .join('&');

    return passedParams;
  }
}
