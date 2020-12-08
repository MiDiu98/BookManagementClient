import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/shared/models/address.model';
import { User } from 'src/app/shared/models/user.model';
import { AddressService } from 'src/app/shared/services/address.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  public userAddresses: Address[];
  constructor(
    private authService: AuthenticationService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    const currentAccount = this.authService.currentUserValue;
    this.addressService
      .getUserAddresses(currentAccount.userId)
      .subscribe((addresses: Address[]) => (this.userAddresses = addresses));
  }
}
