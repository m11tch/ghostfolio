import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Access } from '@ghostfolio/api/app/access/interfaces/access.interface';
import { UpdateAccountDto } from '@ghostfolio/api/app/account/update-account.dto';
import { AdminData } from '@ghostfolio/api/app/admin/interfaces/admin-data.interface';
import { InfoItem } from '@ghostfolio/api/app/info/interfaces/info-item.interface';
import { UpdateOrderDto } from '@ghostfolio/api/app/order/update-order.dto';
import { PortfolioItem } from '@ghostfolio/api/app/portfolio/interfaces/portfolio-item.interface';
import { PortfolioOverview } from '@ghostfolio/api/app/portfolio/interfaces/portfolio-overview.interface';
import { PortfolioPerformance } from '@ghostfolio/api/app/portfolio/interfaces/portfolio-performance.interface';
import {
  HistoricalDataItem,
  PortfolioPositionDetail
} from '@ghostfolio/api/app/portfolio/interfaces/portfolio-position-detail.interface';
import { PortfolioPosition } from '@ghostfolio/api/app/portfolio/interfaces/portfolio-position.interface';
import { PortfolioReport } from '@ghostfolio/api/app/portfolio/interfaces/portfolio-report.interface';
import { LookupItem } from '@ghostfolio/api/app/symbol/interfaces/lookup-item.interface';
import { SymbolItem } from '@ghostfolio/api/app/symbol/interfaces/symbol-item.interface';
import { UserItem } from '@ghostfolio/api/app/user/interfaces/user-item.interface';
import { User } from '@ghostfolio/api/app/user/interfaces/user.interface';
import { UpdateUserSettingsDto } from '@ghostfolio/api/app/user/update-user-settings.dto';
import { Order as OrderModel } from '@prisma/client';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private info: InfoItem;

  public constructor(private http: HttpClient) {}

  public fetchAccounts() {
    return this.http.get<OrderModel[]>('/api/account');
  }

  public fetchAdminData() {
    return this.http.get<AdminData>('/api/admin');
  }

  public deleteAccount(aId: string) {
    return this.http.delete<any>(`/api/account/${aId}`);
  }

  public deleteOrder(aId: string) {
    return this.http.delete<any>(`/api/order/${aId}`);
  }

  public fetchAccesses() {
    return this.http.get<Access[]>('/api/access');
  }

  public fetchChart(aParams: { [param: string]: any }) {
    return this.http.get<HistoricalDataItem[]>('/api/portfolio/chart', {
      params: aParams
    });
  }

  public fetchInfo() {
    /*
      if (this.info) {
        // TODO: Cache info
        return of(this.info);
      }
    */

    return this.http.get<InfoItem>('/api/info');
  }

  public fetchSymbolItem(aSymbol: string) {
    return this.http.get<SymbolItem>(`/api/symbol/${aSymbol}`);
  }

  public fetchSymbols(aQuery: string) {
    return this.http.get<LookupItem[]>(`/api/symbol/lookup?query=${aQuery}`);
  }

  public fetchOrders() {
    return this.http.get<OrderModel[]>('/api/order');
  }

  public fetchPortfolio() {
    return this.http.get<PortfolioItem[]>('/api/portfolio');
  }

  public fetchPortfolioOverview() {
    return this.http.get<PortfolioOverview>('/api/portfolio/overview');
  }

  public fetchPortfolioPerformance(aParams: { [param: string]: any }) {
    return this.http.get<PortfolioPerformance>('/api/portfolio/performance', {
      params: aParams
    });
  }

  public fetchPortfolioPositions(aParams: { [param: string]: any }) {
    return this.http.get<{ [symbol: string]: PortfolioPosition }>(
      '/api/portfolio/details',
      { params: aParams }
    );
  }

  public fetchPortfolioReport() {
    return this.http.get<PortfolioReport>('/api/portfolio/report');
  }

  public fetchPositionDetail(aSymbol: string) {
    return this.http.get<PortfolioPositionDetail>(
      `/api/portfolio/position/${aSymbol}`
    );
  }

  public fetchUser() {
    return this.http.get<User>('/api/user');
  }

  public loginAnonymous(accessToken: string) {
    return this.http.get<any>(`/api/auth/anonymous/${accessToken}`);
  }

  public postAccount(aAccount: UpdateAccountDto) {
    return this.http.post<OrderModel>(`/api/account`, aAccount);
  }

  public postOrder(aOrder: UpdateOrderDto) {
    return this.http.post<OrderModel>(`/api/order`, aOrder);
  }

  public postUser() {
    return this.http.post<UserItem>(`/api/user`, {});
  }

  public putAccount(aAccount: UpdateAccountDto) {
    return this.http.put<UserItem>(`/api/account/${aAccount.id}`, aAccount);
  }

  public putOrder(aOrder: UpdateOrderDto) {
    return this.http.put<UserItem>(`/api/order/${aOrder.id}`, aOrder);
  }

  public putUserSettings(aData: UpdateUserSettingsDto) {
    return this.http.put<User>(`/api/user/settings`, aData);
  }
}
