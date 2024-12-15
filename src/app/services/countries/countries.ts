export class Country implements ICountry {
  public id: number;
  public countryName: string;
  public phoneCode: string;

  constructor(
    public Id: number,
    public CountryName: string,
    public PhoneCode: string
  ) {
    this.id = Id;
    this.countryName = CountryName;
    this.phoneCode = PhoneCode;
  }
}

export interface ICountry {
  Id: number;
  CountryName: string;
  PhoneCode: string;
}
