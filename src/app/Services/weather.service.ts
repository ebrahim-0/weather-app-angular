import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { IWeather } from '../Models/Weather';
import { Countries } from '../Models/Countries';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    @Inject('WEATHER_API_URL') private WEATHER_API_URL: string,
    @Inject('WEATHER_API_KEY') private WEATHER_API_KEY: string,
    @Inject('COUNTRIES_API_URL') private COUNTRIES_API_URL: string,
    @Inject('NEW_COUNTRIES_API_URL') private NEW_COUNTRIES_API_URL: string,
    private _HttpClient: HttpClient
  ) {}

  countries: string[] = [
    'cairo',
    'london',
    'paris',
    'new york',
    'tokyo',
    'beijing',
    'moscow',
    'berlin',
    'rome',
    'madrid',
  ];

  allCountries = [
    {
      country: 'Afghanistan',
      capital: 'Kabul',
      flag: 'https://www.worldometers.info/img/flags/af-flag.gif',
    },
    {
      country: 'Albania',
      capital: 'Tirana',
      flag: 'https://www.worldometers.info/img/flags/al-flag.gif',
    },
    {
      country: 'Algeria',
      capital: 'Algiers',
      flag: 'https://www.worldometers.info/img/flags/ag-flag.gif',
    },
    {
      country: 'Andorra',
      capital: 'Andorra la Vella',
      flag: 'https://www.worldometers.info/img/flags/an-flag.gif',
    },
    {
      country: 'Angola',
      capital: 'Luanda',
      flag: 'https://www.worldometers.info/img/flags/ao-flag.gif',
    },
    {
      country: 'Antigua and Barbuda',
      capital: "Saint John's",
      flag: 'https://www.worldometers.info/img/flags/ac-flag.gif',
    },
    {
      country: 'Argentina',
      capital: 'Buenos Aires',
      flag: 'https://www.worldometers.info/img/flags/ar-flag.gif',
    },
    {
      country: 'Armenia',
      capital: 'Yerevan',
      flag: 'https://www.worldometers.info/img/flags/am-flag.gif',
    },
    {
      country: 'Australia',
      capital: 'Canberra',
      flag: 'https://www.worldometers.info/img/flags/as-flag.gif',
    },
    {
      country: 'Austria',
      capital: 'Vienna',
      flag: 'https://www.worldometers.info/img/flags/au-flag.gif',
    },
    {
      country: 'Azerbaijan',
      capital: 'Baku',
      flag: 'https://www.worldometers.info/img/flags/aj-flag.gif',
    },
    {
      country: 'Bahamas',
      capital: 'Nassau',
      flag: 'https://www.worldometers.info/img/flags/bf-flag.gif',
    },
    {
      country: 'Bahrain',
      capital: 'Manama',
      flag: 'https://www.worldometers.info/img/flags/ba-flag.gif',
    },
    {
      country: 'Bangladesh',
      capital: 'Dhaka',
      flag: 'https://www.worldometers.info/img/flags/bg-flag.gif',
    },
    {
      country: 'Barbados',
      capital: 'Bridgetown',
      flag: 'https://www.worldometers.info/img/flags/bb-flag.gif',
    },
    {
      country: 'Belarus',
      capital: 'Minsk',
      flag: 'https://www.worldometers.info/img/flags/bo-flag.gif',
    },
    {
      country: 'Belgium',
      capital: 'Brussels',
      flag: 'https://www.worldometers.info/img/flags/be-flag.gif',
    },
    {
      country: 'Belize',
      capital: 'Belmopan',
      flag: 'https://www.worldometers.info/img/flags/bh-flag.gif',
    },
    {
      country: 'Benin',
      capital: 'Porto Novo',
      flag: 'https://www.worldometers.info/img/flags/bn-flag.gif',
    },
    {
      country: 'Bhutan',
      capital: 'Thimphu',
      flag: 'https://www.worldometers.info/img/flags/bt-flag.gif',
    },
    {
      country: 'Bolivia',
      capital: 'Sucre',
      flag: 'https://www.worldometers.info/img/flags/bl-flag.gif',
    },
    {
      country: 'Bosnia and Herzegovina',
      capital: 'Sarajevo',
      flag: 'https://www.worldometers.info/img/flags/bk-flag.gif',
    },
    {
      country: 'Botswana',
      capital: 'Gaborone',
      flag: 'https://www.worldometers.info/img/flags/bc-flag.gif',
    },
    {
      country: 'Brazil',
      capital: 'Brasilia',
      flag: 'https://www.worldometers.info/img/flags/br-flag.gif',
    },
    {
      country: 'Brunei',
      capital: 'Bandar Seri Begawan',
      flag: 'https://www.worldometers.info/img/flags/bx-flag.gif',
    },
    {
      country: 'Bulgaria',
      capital: 'Sofia',
      flag: 'https://www.worldometers.info/img/flags/bu-flag.gif',
    },
    {
      country: 'Burkina Faso',
      capital: 'Ouagadougou',
      flag: 'https://www.worldometers.info/img/flags/uv-flag.gif',
    },
    {
      country: 'Burundi',
      capital: 'Gitega',
      flag: 'https://www.worldometers.info/img/flags/by-flag.gif',
    },
    {
      country: 'Cambodia',
      capital: 'Phnom Penh',
      flag: 'https://www.worldometers.info/img/flags/cb-flag.gif',
    },
    {
      country: 'Cameroon',
      capital: 'Yaounde',
      flag: 'https://www.worldometers.info/img/flags/cm-flag.gif',
    },
    {
      country: 'Canada',
      capital: 'Ottawa',
      flag: 'https://www.worldometers.info/img/flags/ca-flag.gif',
    },
    {
      country: 'Cape Verde',
      capital: 'Praia',
      flag: 'https://www.worldometers.info/img/flags/cv-flag.gif',
    },
    {
      country: 'Central African Republic',
      capital: 'Bangui',
      flag: 'https://www.worldometers.info/img/flags/ct-flag.gif',
    },
    {
      country: 'Chad',
      capital: "N'Djamena",
      flag: 'https://www.worldometers.info/img/flags/cd-flag.gif',
    },
    {
      country: 'Chile',
      capital: 'Santiago',
      flag: 'https://www.worldometers.info/img/flags/ci-flag.gif',
    },
    {
      country: 'China',
      capital: 'Beijing',
      flag: 'https://www.worldometers.info/img/flags/ch-flag.gif',
    },
    {
      country: 'Colombia',
      capital: 'Bogota',
      flag: 'https://www.worldometers.info/img/flags/co-flag.gif',
    },
    {
      country: 'Comoros',
      capital: 'Moroni',
      flag: 'https://www.worldometers.info/img/flags/cn-flag.gif',
    },
    {
      country: 'Congo, Democratic Republic of the',
      capital: 'Kinshasa',
      flag: 'https://www.worldometers.info/img/flags/cg-flag.gif',
    },
    {
      country: 'Congo, Republic of the',
      capital: 'Brazzaville',
      flag: 'https://www.worldometers.info/img/flags/cf-flag.gif',
    },
    {
      country: 'Costa Rica',
      capital: 'San Jose',
      flag: 'https://www.worldometers.info/img/flags/cs-flag.gif',
    },
    {
      country: "Côte d'Ivoire (Ivory Coast)",
      capital: 'Yamoussoukro',
      flag: 'https://www.worldometers.info/img/flags/iv-flag.gif',
    },
    {
      country: 'Croatia',
      capital: 'Zagreb',
      flag: 'https://www.worldometers.info/img/flags/hr-flag.gif',
    },
    {
      country: 'Cuba',
      capital: 'Havana',
      flag: 'https://www.worldometers.info/img/flags/cu-flag.gif',
    },
    {
      country: 'Cyprus',
      capital: 'Nicosia',
      flag: 'https://www.worldometers.info/img/flags/cy-flag.gif',
    },
    {
      country: 'Czech Republic (Czechia)',
      capital: 'Prague',
      flag: 'https://www.worldometers.info/img/flags/ez-flag.gif',
    },
    {
      country: 'Denmark',
      capital: 'Copenhagen',
      flag: 'https://www.worldometers.info/img/flags/da-flag.gif',
    },
    {
      country: 'Djibouti',
      capital: 'Djibouti',
      flag: 'https://www.worldometers.info/img/flags/dj-flag.gif',
    },
    {
      country: 'Dominica',
      capital: 'Roseau',
      flag: 'https://www.worldometers.info/img/flags/do-flag.gif',
    },
    {
      country: 'Dominican Republic',
      capital: 'Santo Domingo',
      flag: 'https://www.worldometers.info/img/flags/dr-flag.gif',
    },
    {
      country: 'East Timor',
      capital: 'Dili',
      flag: 'https://www.worldometers.info/img/flags/tt-flag.gif',
    },
    {
      country: 'Ecuador',
      capital: 'Quito',
      flag: 'https://www.worldometers.info/img/flags/ec-flag.gif',
    },
    {
      country: 'Egypt',
      capital: 'Cairo',
      flag: 'https://www.worldometers.info/img/flags/eg-flag.gif',
    },
    {
      country: 'El Salvador',
      capital: 'San Salvador',
      flag: 'https://www.worldometers.info/img/flags/es-flag.gif',
    },
    {
      country: 'England',
      capital: 'London',
      flag: 'https://www.worldometers.info/img/flags/uk-flag.gif',
    },
    {
      country: 'Equatorial Guinea',
      capital: 'Malabo',
      flag: 'https://www.worldometers.info/img/flags/ek-flag.gif',
    },
    {
      country: 'Eritrea',
      capital: 'Asmara',
      flag: 'https://www.worldometers.info/img/flags/er-flag.gif',
    },
    {
      country: 'Estonia',
      capital: 'Tallinn',
      flag: 'https://www.worldometers.info/img/flags/en-flag.gif',
    },
    {
      country: 'Eswatini (Swaziland)',
      capital: 'Mbabana',
      flag: 'https://www.worldometers.info/img/flags/wz-flag.gif',
    },
    {
      country: 'Ethiopia',
      capital: 'Addis Ababa',
      flag: 'https://www.worldometers.info/img/flags/et-flag.gif',
    },
    {
      country: 'Federated States of Micronesia',
      capital: 'Palikir',
      flag: 'https://www.worldometers.info/img/flags/fm-flag.gif',
    },
    {
      country: 'Fiji',
      capital: 'Suva',
      flag: 'https://www.worldometers.info/img/flags/fj-flag.gif',
    },
    {
      country: 'Finland',
      capital: 'Helsinki',
      flag: 'https://www.worldometers.info/img/flags/fi-flag.gif',
    },
    {
      country: 'France',
      capital: 'Paris',
      flag: 'https://www.worldometers.info/img/flags/fr-flag.gif',
    },
    {
      country: 'Gabon',
      capital: 'Libreville',
      flag: 'https://www.worldometers.info/img/flags/gb-flag.gif',
    },
    {
      country: 'Gambia',
      capital: 'Banjul',
      flag: 'https://www.worldometers.info/img/flags/ga-flag.gif',
    },
    {
      country: 'Georgia',
      capital: 'Tbilisi',
      flag: 'https://www.worldometers.info/img/flags/gg-flag.gif',
    },
    {
      country: 'Germany',
      capital: 'Berlin',
      flag: 'https://www.worldometers.info/img/flags/gm-flag.gif',
    },
    {
      country: 'Ghana',
      capital: 'Accra',
      flag: 'https://www.worldometers.info/img/flags/gh-flag.gif',
    },
    {
      country: 'Greece',
      capital: 'Athens',
      flag: 'https://www.worldometers.info/img/flags/gr-flag.gif',
    },
    {
      country: 'Grenada',
      capital: "Saint George's",
      flag: 'https://www.worldometers.info/img/flags/gj-flag.gif',
    },
    {
      country: 'Guatemala',
      capital: 'Guatemala City',
      flag: 'https://www.worldometers.info/img/flags/gt-flag.gif',
    },
    {
      country: 'Guinea',
      capital: 'Conakry',
      flag: 'https://www.worldometers.info/img/flags/gv-flag.gif',
    },
    {
      country: 'Guinea-Bissau',
      capital: 'Bissau',
      flag: 'https://www.worldometers.info/img/flags/pu-flag.gif',
    },
    {
      country: 'Guyana',
      capital: 'Georgetown',
      flag: 'https://www.worldometers.info/img/flags/gy-flag.gif',
    },
    {
      country: 'Haiti',
      capital: 'Port au Prince',
      flag: 'https://www.worldometers.info/img/flags/ha-flag.gif',
    },
    {
      country: 'Honduras',
      capital: 'Tegucigalpa',
      flag: 'https://www.worldometers.info/img/flags/ho-flag.gif',
    },
    {
      country: 'Hungary',
      capital: 'Budapest',
      flag: 'https://www.worldometers.info/img/flags/hu-flag.gif',
    },
    {
      country: 'Iceland',
      capital: 'Reykjavik',
      flag: 'https://www.worldometers.info/img/flags/ic-flag.gif',
    },
    {
      country: 'India',
      capital: 'New Delhi',
      flag: 'https://www.worldometers.info/img/flags/in-flag.gif',
    },
    {
      country: 'Indonesia',
      capital: 'Jakarta',
      flag: 'https://www.worldometers.info/img/flags/id-flag.gif',
    },
    {
      country: 'Iran',
      capital: 'Tehran',
      flag: 'https://www.worldometers.info/img/flags/ir-flag.gif',
    },
    {
      country: 'Iraq',
      capital: 'Baghdad',
      flag: 'https://www.worldometers.info/img/flags/iz-flag.gif',
    },
    {
      country: 'Ireland',
      capital: 'Dublin',
      flag: 'https://www.worldometers.info/img/flags/ei-flag.gif',
    },
    {
      country: 'Italy',
      capital: 'Rome',
      flag: 'https://www.worldometers.info/img/flags/it-flag.gif',
    },
    {
      country: 'Jamaica',
      capital: 'Kingston',
      flag: 'https://www.worldometers.info/img/flags/jm-flag.gif',
    },
    {
      country: 'Japan',
      capital: 'Tokyo',
      flag: 'https://www.worldometers.info/img/flags/ja-flag.gif',
    },
    {
      country: 'Jordan',
      capital: 'Amman',
      flag: 'https://www.worldometers.info/img/flags/jo-flag.gif',
    },
    {
      country: 'Kazakhstan',
      capital: 'Astana',
      flag: 'https://www.worldometers.info/img/flags/kz-flag.gif',
    },
    {
      country: 'Kenya',
      capital: 'Nairobi',
      flag: 'https://www.worldometers.info/img/flags/ke-flag.gif',
    },
    {
      country: 'Kiribati',
      capital: 'Tarawa Atoll',
      flag: 'https://www.worldometers.info/img/flags/kr-flag.gif',
    },
    {
      country: 'Kosovo',
      capital: 'Pristina',
      flag: 'https://www.worldometers.info/img/flags/kv-flag.gif',
    },
    {
      country: 'Kuwait',
      capital: 'Kuwait City',
      flag: 'https://www.worldometers.info/img/flags/ku-flag.gif',
    },
    {
      country: 'Kyrgyzstan',
      capital: 'Bishkek',
      flag: 'https://www.worldometers.info/img/flags/kg-flag.gif',
    },
    {
      country: 'Laos',
      capital: 'Vientiane',
      flag: 'https://www.worldometers.info/img/flags/la-flag.gif',
    },
    {
      country: 'Latvia',
      capital: 'Riga',
      flag: 'https://www.worldometers.info/img/flags/lg-flag.gif',
    },
    {
      country: 'Lebanon',
      capital: 'Beirut',
      flag: 'https://www.worldometers.info/img/flags/le-flag.gif',
    },
    {
      country: 'Lesotho',
      capital: 'Maseru',
      flag: 'https://www.worldometers.info/img/flags/lt-flag.gif',
    },
    {
      country: 'Liberia',
      capital: 'Monrovia',
      flag: 'https://www.worldometers.info/img/flags/li-flag.gif',
    },
    {
      country: 'Libya',
      capital: 'Tripoli',
      flag: 'https://www.worldometers.info/img/flags/ly-flag.gif',
    },
    {
      country: 'Liechtenstein',
      capital: 'Vaduz',
      flag: 'https://www.worldometers.info/img/flags/ls-flag.gif',
    },
    {
      country: 'Lithuania',
      capital: 'Vilnius',
      flag: 'https://www.worldometers.info/img/flags/lh-flag.gif',
    },
    {
      country: 'Luxembourg',
      capital: 'Luxembourg',
      flag: 'https://www.worldometers.info/img/flags/lu-flag.gif',
    },
    {
      country: 'Madagascar',
      capital: 'Antananarivo',
      flag: 'https://www.worldometers.info/img/flags/ma-flag.gif',
    },
    {
      country: 'Malawi',
      capital: 'Lilongwe',
      flag: 'https://www.worldometers.info/img/flags/mi-flag.gif',
    },
    {
      country: 'Malaysia',
      capital: 'Kuala Lumpur',
      flag: 'https://www.worldometers.info/img/flags/my-flag.gif',
    },
    {
      country: 'Maldives',
      capital: 'Male',
      flag: 'https://www.worldometers.info/img/flags/mv-flag.gif',
    },
    {
      country: 'Mali',
      capital: 'Bamako',
      flag: 'https://www.worldometers.info/img/flags/ml-flag.gif',
    },
    {
      country: 'Malta',
      capital: 'Valletta',
      flag: 'https://www.worldometers.info/img/flags/mt-flag.gif',
    },
    {
      country: 'Marshall Islands',
      capital: 'Majuro',
      flag: 'https://www.worldometers.info/img/flags/rm-flag.gif',
    },
    {
      country: 'Mauritania',
      capital: 'Nouakchott',
      flag: 'https://www.worldometers.info/img/flags/mr-flag.gif',
    },
    {
      country: 'Mauritius',
      capital: 'Port Louis',
      flag: 'https://www.worldometers.info/img/flags/mp-flag.gif',
    },
    {
      country: 'Mexico',
      capital: 'Mexico City',
      flag: 'https://www.worldometers.info/img/flags/mx-flag.gif',
    },
    {
      country: 'Moldova',
      capital: 'Chisinau',
      flag: 'https://www.worldometers.info/img/flags/md-flag.gif',
    },
    {
      country: 'Monaco',
      capital: 'Monaco',
      flag: 'https://www.worldometers.info/img/flags/mn-flag.gif',
    },
    {
      country: 'Mongolia',
      capital: 'Ulaanbaatar',
      flag: 'https://www.worldometers.info/img/flags/mg-flag.gif',
    },
    {
      country: 'Montenegro',
      capital: 'Podgorica',
      flag: 'https://www.worldometers.info/img/flags/mj-flag.gif',
    },
    {
      country: 'Morocco',
      capital: 'Rabat',
      flag: 'https://www.worldometers.info/img/flags/mo-flag.gif',
    },
    {
      country: 'Mozambique',
      capital: 'Maputo',
      flag: 'https://www.worldometers.info/img/flags/mz-flag.gif',
    },
    {
      country: 'Myanmar (Burma)',
      capital: 'Nay Pyi Taw',
      flag: 'https://www.worldometers.info/img/flags/bm-flag.gif',
    },
    {
      country: 'Namibia',
      capital: 'Windhoek',
      flag: 'https://www.worldometers.info/img/flags/wa-flag.gif',
    },
    {
      country: 'Nepal',
      capital: 'Kathmandu',
      flag: 'https://www.worldometers.info/img/flags/np-flag.gif',
    },
    {
      country: 'Netherlands',
      capital: 'Amsterdam',
      flag: 'https://www.worldometers.info/img/flags/nl-flag.gif',
    },
    {
      country: 'New Zealand',
      capital: 'Wellington',
      flag: 'https://www.worldometers.info/img/flags/nz-flag.gif',
    },
    {
      country: 'Nicaragua',
      capital: 'Managua',
      flag: 'https://www.worldometers.info/img/flags/nu-flag.gif',
    },
    {
      country: 'Niger',
      capital: 'Niamey',
      flag: 'https://www.worldometers.info/img/flags/ng-flag.gif',
    },
    {
      country: 'Nigeria',
      capital: 'Abuja',
      flag: 'https://www.worldometers.info/img/flags/ni-flag.gif',
    },
    {
      country: 'North Korea',
      capital: 'Pyongyang',
      flag: 'https://www.worldometers.info/img/flags/kn-flag.gif',
    },
    {
      country: 'North Macedonia',
      capital: 'Skopje',
      flag: 'https://www.worldometers.info/img/flags/mk-flag.gif',
    },
    {
      country: 'Northern Ireland',
      capital: 'Belfast',
      flag: 'https://www.worldometers.info/img/flags/uk-ni-flag.gif',
    },
    {
      country: 'Norway',
      capital: 'Oslo',
      flag: 'https://www.worldometers.info/img/flags/no-flag.gif',
    },
    {
      country: 'Oman',
      capital: 'Muscat',
      flag: 'https://www.worldometers.info/img/flags/mu-flag.gif',
    },
    {
      country: 'Pakistan',
      capital: 'Islamabad',
      flag: 'https://www.worldometers.info/img/flags/pk-flag.gif',
    },
    {
      country: 'Palau',
      capital: 'Ngerulmud',
      flag: 'https://www.worldometers.info/img/flags/ps-flag.gif',
    },
    {
      country: 'Palestine',
      capital: 'Jerusalem',
      flag: 'https://www.worldometers.info/img/flags/gz-flag.gif',
    },
    {
      country: 'Panama',
      capital: 'Panama City',
      flag: 'https://www.worldometers.info/img/flags/pm-flag.gif',
    },
    {
      country: 'Papua New Guinea',
      capital: 'Port Moresby',
      flag: 'https://www.worldometers.info/img/flags/pp-flag.gif',
    },
    {
      country: 'Paraguay',
      capital: 'Asuncion',
      flag: 'https://www.worldometers.info/img/flags/pa-flag.gif',
    },
    {
      country: 'Peru',
      capital: 'Lima',
      flag: 'https://www.worldometers.info/img/flags/pe-flag.gif',
    },
    {
      country: 'Philippines',
      capital: 'Manila',
      flag: 'https://www.worldometers.info/img/flags/rp-flag.gif',
    },
    {
      country: 'Poland',
      capital: 'Warsaw',
      flag: 'https://www.worldometers.info/img/flags/pl-flag.gif',
    },
    {
      country: 'Portugal',
      capital: 'Lisbon',
      flag: 'https://www.worldometers.info/img/flags/po-flag.gif',
    },
    {
      country: 'Qatar',
      capital: 'Doha',
      flag: 'https://www.worldometers.info/img/flags/qa-flag.gif',
    },
    {
      country: 'Romania',
      capital: 'Bucharest',
      flag: 'https://www.worldometers.info/img/flags/ro-flag.gif',
    },
    {
      country: 'Russia',
      capital: 'Moscow',
      flag: 'https://www.worldometers.info/img/flags/rs-flag.gif',
    },
    {
      country: 'Rwanda',
      capital: 'Kigali',
      flag: 'https://www.worldometers.info/img/flags/rw-flag.gif',
    },
    {
      country: 'Saint Kitts and Nevis',
      capital: 'Basseterre',
      flag: 'https://www.worldometers.info/img/flags/sc-flag.gif',
    },
    {
      country: 'Saint Lucia',
      capital: 'Castries',
      flag: 'https://www.worldometers.info/img/flags/st-flag.gif',
    },
    {
      country: 'Saint Vincent and the Grenadines',
      capital: 'Kingstown',
      flag: 'https://www.worldometers.info/img/flags/vc-flag.gif',
    },
    {
      country: 'Samoa',
      capital: 'Apia',
      flag: 'https://www.worldometers.info/img/flags/ws-flag.gif',
    },
    {
      country: 'San Marino',
      capital: 'San Marino',
      flag: 'https://www.worldometers.info/img/flags/sm-flag.gif',
    },
    {
      country: 'Sao Tome and Principe',
      capital: 'Sao Tome',
      flag: 'https://www.worldometers.info/img/flags/tp-flag.gif',
    },
    {
      country: 'Saudi Arabia',
      capital: 'Riyadh',
      flag: 'https://www.worldometers.info/img/flags/sa-flag.gif',
    },
    {
      country: 'Scotland',
      capital: 'Edinburgh',
      flag: 'https://www.worldometers.info/img/flags/uk-sct-flag.gif',
    },
    {
      country: 'Senegal',
      capital: 'Dakar',
      flag: 'https://www.worldometers.info/img/flags/sg-flag.gif',
    },
    {
      country: 'Serbia',
      capital: 'Belgrade',
      flag: 'https://www.worldometers.info/img/flags/ri-flag.gif',
    },
    {
      country: 'Seychelles',
      capital: 'Victoria',
      flag: 'https://www.worldometers.info/img/flags/se-flag.gif',
    },
    {
      country: 'Sierra Leone',
      capital: 'Freetown',
      flag: 'https://www.worldometers.info/img/flags/sl-flag.gif',
    },
    {
      country: 'Singapore',
      capital: 'Singapore',
      flag: 'https://www.worldometers.info/img/flags/sn-flag.gif',
    },
    {
      country: 'Slovakia',
      capital: 'Bratislava',
      flag: 'https://www.worldometers.info/img/flags/lo-flag.gif',
    },
    {
      country: 'Slovenia',
      capital: 'Ljubljana',
      flag: 'https://www.worldometers.info/img/flags/si-flag.gif',
    },
    {
      country: 'Solomon Islands',
      capital: 'Honiara',
      flag: 'https://www.worldometers.info/img/flags/bp-flag.gif',
    },
    {
      country: 'Somalia',
      capital: 'Mogadishu',
      flag: 'https://www.worldometers.info/img/flags/so-flag.gif',
    },
    {
      country: 'South Africa',
      capital: 'Pretoria',
      flag: 'https://www.worldometers.info/img/flags/sf-flag.gif',
    },
    {
      country: 'South Korea',
      capital: 'Seoul',
      flag: 'https://www.worldometers.info/img/flags/ks-flag.gif',
    },
    {
      country: 'South Sudan',
      capital: 'Juba',
      flag: 'https://www.worldometers.info/img/flags/od-flag.gif',
    },
    {
      country: 'Spain',
      capital: 'Madrid',
      flag: 'https://www.worldometers.info/img/flags/sp-flag.gif',
    },
    {
      country: 'Sri Lanka',
      capital: 'Colombo',
      flag: 'https://www.worldometers.info/img/flags/ce-flag.gif',
    },
    {
      country: 'Sudan',
      capital: 'Khartoum',
      flag: 'https://www.worldometers.info/img/flags/su-flag.gif',
    },
    {
      country: 'Suriname',
      capital: 'Paramaribo',
      flag: 'https://www.worldometers.info/img/flags/ns-flag.gif',
    },
    {
      country: 'Sweden',
      capital: 'Stockholm',
      flag: 'https://www.worldometers.info/img/flags/sw-flag.gif',
    },
    {
      country: 'Switzerland',
      capital: 'Bern',
      flag: 'https://www.worldometers.info/img/flags/sz-flag.gif',
    },
    {
      country: 'Syria',
      capital: 'Damascus',
      flag: 'https://www.worldometers.info/img/flags/sy-flag.gif',
    },
    {
      country: 'Taiwan',
      capital: 'Taipei',
      flag: 'https://www.worldometers.info/img/flags/tw-flag.gif',
    },
    {
      country: 'Tajikistan',
      capital: 'Dushanbe',
      flag: 'https://www.worldometers.info/img/flags/ti-flag.gif',
    },
    {
      country: 'Tanzania',
      capital: 'Dodoma',
      flag: 'https://www.worldometers.info/img/flags/tz-flag.gif',
    },
    {
      country: 'Thailand',
      capital: 'Bangkok',
      flag: 'https://www.worldometers.info/img/flags/th-flag.gif',
    },
    {
      country: 'Togo',
      capital: 'Lome',
      flag: 'https://www.worldometers.info/img/flags/to-flag.gif',
    },
    {
      country: 'Tonga',
      capital: "Nuku'alofa",
      flag: 'https://www.worldometers.info/img/flags/tn-flag.gif',
    },
    {
      country: 'Trinidad and Tobago',
      capital: 'Port of Spain',
      flag: 'https://www.worldometers.info/img/flags/td-flag.gif',
    },
    {
      country: 'Tunisia',
      capital: 'Tunis',
      flag: 'https://www.worldometers.info/img/flags/ts-flag.gif',
    },
    {
      country: 'Turkey',
      capital: 'Ankara',
      flag: 'https://www.worldometers.info/img/flags/tu-flag.gif',
    },
    {
      country: 'Turkmenistan',
      capital: 'Ashgabat',
      flag: 'https://www.worldometers.info/img/flags/tx-flag.gif',
    },
    {
      country: 'Tuvalu',
      capital: 'Funafuti',
      flag: 'https://www.worldometers.info/img/flags/tv-flag.gif',
    },
    {
      country: 'Uganda',
      capital: 'Kampala',
      flag: 'https://www.worldometers.info/img/flags/ug-flag.gif',
    },
    {
      country: 'Ukraine',
      capital: 'Kyiv',
      flag: 'https://www.worldometers.info/img/flags/up-flag.gif',
    },
    {
      country: 'United Arab Emirates',
      capital: 'Abu Dhabi',
      flag: 'https://www.worldometers.info/img/flags/ae-flag.gif',
    },
    {
      country: 'United Kingdom',
      capital: 'London',
      flag: 'https://www.worldometers.info/img/flags/uk-flag.gif',
    },
    {
      country: 'United States',
      capital: 'Washington, D.C.',
      flag: 'https://www.worldometers.info/img/flags/us-flag.gif',
    },
    {
      country: 'Uruguay',
      capital: 'Montevideo',
      flag: 'https://www.worldometers.info/img/flags/uy-flag.gif',
    },
    {
      country: 'Uzbekistan',
      capital: 'Tashkent',
      flag: 'https://www.worldometers.info/img/flags/uz-flag.gif',
    },
    {
      country: 'Vanuatu',
      capital: 'Port Vila',
      flag: 'https://www.worldometers.info/img/flags/nh-flag.gif',
    },
    {
      country: 'Vatican City (Holy See)',
      capital: 'Vatican City',
      flag: 'https://www.worldometers.info/img/flags/vt-flag.gif',
    },
    {
      country: 'Venezuela',
      capital: 'Caracas',
      flag: 'https://www.worldometers.info/img/flags/ve-flag.gif',
    },
    {
      country: 'Vietnam',
      capital: 'Hanoi',
      flag: 'https://www.worldometers.info/img/flags/vm-flag.gif',
    },
    {
      country: 'Wales',
      capital: 'Cardiff',
      flag: 'https://www.worldometers.info/img/flags/uk-wl-flag.gif',
    },
    {
      country: 'Yemen',
      capital: "Sana'a",
      flag: 'https://www.worldometers.info/img/flags/ym-flag.gif',
    },
    {
      country: 'Zambia',
      capital: 'Lusaka',
      flag: 'https://www.worldometers.info/img/flags/za-flag.gif',
    },
    {
      country: 'Zimbabwe',
      capital: 'Harare',
      flag: 'https://www.worldometers.info/img/flags/zi-flag.gif',
    },
  ];

  weatherData: any = [
    {
      weather: [{ description: 'cold' }],
      main: { temp: '18.42' },
      name: 'cairo',
    },
    {
      weather: [{ description: 'worm' }],
      main: { temp: '16.15' },
      name: 'london',
    },
    {
      weather: [{ description: 'wind' }],
      main: { temp: '10.51' },
      name: 'paris',
    },
    {
      weather: [{ description: 'cold' }],
      main: { temp: '8.42' },
      name: 'new york',
    },
    {
      weather: [{ description: 'worm' }],
      main: { temp: '25.15' },
      name: 'tokyo',
    },
    {
      weather: [{ description: 'wind' }],
      main: { temp: '25.51' },
      name: 'beijing',
    },
    {
      weather: [{ description: 'cold' }],
      main: { temp: '-10' },
      name: 'moscow',
    },
    {
      weather: [{ description: 'worm' }],
      main: { temp: '10.15' },
      name: 'berlin',
    },
    {
      weather: [{ description: 'wind' }],
      main: { temp: '10.51' },
      name: 'rome',
    },
    {
      weather: [{ description: 'cold' }],
      main: { temp: '12.42' },
      name: 'madrid',
    },
  ];

  searchLocation = new BehaviorSubject<string>('');

  // getWeatherData(): Observable<IWeather[]> {
  //   const requests = this.countries.map((city) =>
  //     this._HttpClient.get<IWeather>(this.WEATHER_API_URL, {
  //       params: {
  //         q: city,
  //         appid: this.WEATHER_API_KEY,
  //         units: 'metric',
  //       },
  //     })
  //   );

  //   return forkJoin(requests);
  // }

  // getAllCountries(): Observable<Countries[]> {
  //   return new Observable((observer) => {
  //     observer.next(this.allCountries);
  //     observer.complete();
  //   });
  // }

  // getAllCountries(): Observable<Countries[]> {
  //   return this._HttpClient.get<Countries[]>(
  //     `${this.COUNTRIES_API_URL}/countries`
  //   );
  // }
  getAllCountries(): Observable<Countries[]> {
    return this._HttpClient.get<Countries[]>(`${this.NEW_COUNTRIES_API_URL}`);
  }

  getWeatherDataByCity(city: string): Observable<IWeather> {
    return this._HttpClient.get<IWeather>(this.WEATHER_API_URL, {
      params: {
        q: city,
        appid: this.WEATHER_API_KEY,
      },
    });
  }
}
