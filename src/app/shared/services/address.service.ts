import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addressData } from 'src/assets/data/dvhc_data.json';
import { Constant } from '../constants/Constant';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}
  PROVINCE_LEVEL = 'TINH';
  DISTRICT_LEVEL = 'HUYEN';
  WARD_LEVEL = 'XA';

  public getSugestedProvinces() {
    return addressData
      .filter((data) => data.Cap === this.PROVINCE_LEVEL)
      .map((data) => data.Ten);
  }

  public getSugestedDistricts(provinceId: number) {
    return addressData
      .filter(
        (data) =>
          data.Cap === this.DISTRICT_LEVEL && data.CapTren === provinceId
      )
      .map((data) => data.Ten);
  }

  public getSugestedWards(districtId: number) {
    return addressData
      .filter(
        (data) => data.Cap === this.WARD_LEVEL && data.CapTren === districtId
      )
      .map((data) => data.Ten);
  }

  public getUserAddresses(id: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${Constant.USER_ADDRESS_URL}/user/${id}`);
  }

  public addUserAddresses(id: number, address: Address): Observable<Address> {
    return this.http.post<Address>(
      `${Constant.USER_ADDRESS_URL}/user/${id}`,
      address
    );
  }

  public updateUserAddresses(userId: number, address: Address) {
    return this.http.put<Address>(
      Constant.USER_ADDRESS_URL + '/' + userId,
      address
    );
  }
}
