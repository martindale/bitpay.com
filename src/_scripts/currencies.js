(function(window) {
  'use strict';

  if (window.currencies) {
    return;
  }

  var currencies = {
    BTC: {
      name: 'Bitcoin',
      symbol: '฿'
    },
    AED: {
      name: 'UAE Dirham',
      symbol: 'د.إ'
    },
    AFN: {
      name: 'Afghan Afghani',
      symbol: '؋'
    },
    ALL: {
      name: 'Albanian Lek',
      symbol: 'LEK'
    },
    AMD: {
      name: 'Armenian Dram',
      symbol: 'Դրամ'
    },
    ANG: {
      name: 'Netherlands Antillean Guilder',
      symbol: 'ƒ'
    },
    AOA: {
      name: 'Angolan Kwanza',
      symbol: 'Kz'
    },
    ARS: {
      name: 'Argentine Peso',
      symbol: '$'
    },
    AUD: {
      name: 'Australian Dollar',
      symbol: '$'
    },
    AWG: {
      name: 'Aruban Florin',
      symbol: 'ƒ'
    },
    AZN: {
      name: 'Azerbaijani Manat',
      symbol: 'ман'
    },
    BAM: {
      name: 'Bosnia-Herzegovina Convertible Mark',
      symbol: 'KM'
    },
    BBD: {
      name: 'Barbadian Dollar',
      symbol: '$'
    },
    BDT: {
      name: 'Bangladeshi Taka',
      symbol: '৳'
    },
    BGN: {
      name: 'Bulgarian Lev',
      symbol: 'лв'
    },
    BHD: {
      name: 'Bahraini Dinar',
      symbol: '.د.ب'
    },
    BIF: {
      name: 'Burundian Franc',
      symbol: 'FBu'
    },
    BMD: {
      name: 'Bermudan Dollar',
      symbol: '$'
    },
    BND: {
      name: 'Brunei Dollar',
      symbol: '$'
    },
    BOB: {
      name: 'Bolivian Boliviano',
      symbol: '$b'
    },
    BRL: {
      name: 'Brasilian Real',
      symbol: 'R$'
    },
    BSD: {
      name: 'Bahamian Dollar',
      symbol: '$'
    },
    BTN: {
      name: 'Bhutanese Ngultrum',
      symbol: 'Nu'
    },
    BWP: {
      name: 'Botswanan Pula',
      symbol: 'P'
    },
    BYR: {
      name: 'Belarusian Ruble',
      symbol: 'p.'
    },
    BZD: {
      name: 'Belize Dollar',
      symbol: 'BZ$'
    },
    CAD: {
      name: 'Canadian Dollar',
      symbol: '$'
    },
    CDF: {
      name: 'Congolese Franc',
      symbol: 'FC'
    },
    CHF: {
      name: 'Swiss Franc',
      symbol: 'CHF'
    },
    CLF: {
      name: 'Chilean Unit of Account (UF)',
      symbol: 'UF'
    },
    CLP: {
      name: 'Chilean Peso',
      symbol: '$'
    },
    CNY: {
      name: 'Chinese Yuan',
      symbol: '¥'
    },
    COP: {
      name: 'Colombian Peso',
      symbol: '$'
    },
    CRC: {
      name: 'Costa Rican Colón',
      symbol: '₡'
    },
    CVE: {
      name: 'Cape Verdean Escudo',
      symbol: '$'
    },
    CZK: {
      name: 'Czech Koruna',
      symbol: 'Kč'
    },
    DJF: {
      name: 'Djiboutian Franc',
      symbol: 'Fdj'
    },
    DKK: {
      name: 'Danish Krone',
      symbol: 'kr'
    },
    DOP: {
      name: 'Dominican Peso',
      symbol: 'RD$'
    },
    DZD: {
      name: 'Algerian Dinar',
      symbol: 'دج'
    },
    EEK: {
      name: 'Estonian Kroon',
      symbol: 'kr'
    },
    EGP: {
      name: 'Egyptian Pound',
      symbol: '£'
    },
    ETB: {
      name: 'Ethiopian Birr',
      symbol: 'Br '
    },
    EUR: {
      name: 'Eurozone Euro',
      symbol: '€'
    },
    FJD: {
      name: 'Fijian Dollar',
      symbol: '$'
    },
    FKP: {
      name: 'Falkland Islands Pound',
      symbol: '£'
    },
    GBP: {
      name: 'Pound Sterling',
      symbol: '£'
    },
    GEL: {
      name: 'Georgian Lari',
      symbol: 'ლ'
    },
    GHS: {
      name: 'Ghanaian Cedi',
      symbol: '¢'
    },
    GIP: {
      name: 'Gibraltar Pound',
      symbol: '£'
    },
    GMD: {
      name: 'Gambian Dalasi',
      symbol: 'D'
    },
    GNF: {
      name: 'Guinean Franc',
      symbol: 'FG '
    },
    GTQ: {
      name: 'Guatemalan Quetzal',
      symbol: 'Q'
    },
    GYD: {
      name: 'Guyanaese Dollar',
      symbol: '$'
    },
    HKD: {
      name: 'Hong Kong Dollar',
      symbol: '$'
    },
    HNL: {
      name: 'Honduran Lempira',
      symbol: 'L'
    },
    HRK: {
      name: 'Croatian Kuna',
      symbol: 'kn'
    },
    HTG: {
      name: 'Haitian Gourde',
      symbol: 'G'
    },
    HUF: {
      name: 'Hungarian Forint',
      symbol: 'Ft'
    },
    IDR: {
      name: 'Indonesian Rupiah',
      symbol: 'Rp'
    },
    ILS: {
      name: 'Israeli Shekel',
      symbol: '₪'
    },
    INR: {
      name: 'Indian Rupee',
      symbol: '૱'
    },
    IQD: {
      name: 'Iraqi Dinar',
      symbol: 'ع.د'
    },
    ISK: {
      name: 'Icelandic Króna',
      symbol: 'kr'
    },
    JEP: {
      name: 'Jersey Pound',
      symbol: '£'
    },
    JMD: {
      name: 'Jamaican Dollar',
      symbol: 'J$'
    },
    JOD: {
      name: 'Jordanian Dinar',
      symbol: 'د.ا'
    },
    JPY: {
      name: 'Japanese Yen',
      symbol: '¥'
    },
    KES: {
      name: 'Kenyan Shilling',
      symbol: 'KSh'
    },
    KGS: {
      name: 'Kyrgystani Som',
      symbol: 'лв'
    },
    KHR: {
      name: 'Cambodian Riel',
      symbol: '៛'
    },
    KMF: {
      name: 'Comorian Franc',
      symbol: 'CF'
    },
    KRW: {
      name: 'South Korean Won',
      symbol: '₩'
    },
    KWD: {
      name: 'Kuwaiti Dinar',
      symbol: 'د.ك'
    },
    KYD: {
      name: 'Cayman Islands Dollar',
      symbol: '$'
    },
    KZT: {
      name: 'Kazakhstani Tenge',
      symbol: 'лв'
    },
    LAK: {
      name: 'Laotian Kip',
      symbol: '₭'
    },
    LBP: {
      name: 'Lebanese Pound',
      symbol: '£'
    },
    LKR: {
      name: 'Sri Lankan Rupee',
      symbol: '₨'
    },
    LRD: {
      name: 'Liberian Dollar',
      symbol: '$'
    },
    LSL: {
      name: 'Lesotho Loti',
      symbol: 'L'
    },
    LTL: {
      name: 'Lithuanian Litas',
      symbol: 'Lt'
    },
    LVL: {
      name: 'Latvian Lats',
      symbol: 'Ls'
    },
    LYD: {
      name: 'Libyan Dinar',
      symbol: 'ل.د'
    },
    MAD: {
      name: 'Moroccan Dirham',
      symbol: 'د.م'
    },
    MDL: {
      name: 'Moldovan Leu',
      symbol: 'L'
    },
    MGA: {
      name: 'Malagasy Ariary',
      symbol: 'Ar'
    },
    MKD: {
      name: 'Macedonian Denar',
      symbol: 'ден'
    },
    MMK: {
      name: 'Myanma Kyat',
      symbol: 'K'
    },
    MNT: {
      name: 'Mongolian Tugrik',
      symbol: '₮'
    },
    MOP: {
      name: 'Macanese Pataca',
      symbol: 'MOP$'
    },
    MRO: {
      name: 'Mauritanian Ouguiya',
      symbol: 'UM'
    },
    MUR: {
      name: 'Mauritian Rupee',
      symbol: '₨'
    },
    MVR: {
      name: 'Maldivian Rufiyaa',
      symbol: 'MRf'
    },
    MWK: {
      name: 'Malawian Kwacha',
      symbol: 'MK'
    },
    MXN: {
      name: 'Mexican Peso',
      symbol: '$'
    },
    MYR: {
      name: 'Malaysian Ringgit',
      symbol: 'RM'
    },
    MZN: {
      name: 'Mozambican Metical',
      symbol: 'MT'
    },
    NAD: {
      name: 'Namibian Dollar',
      symbol: 'MT'
    },
    NGN: {
      name: 'Nigerian Naira',
      symbol: '₦'
    },
    NIO: {
      name: 'Nicaraguan Córdoba',
      symbol: 'C$'
    },
    NOK: {
      name: 'Norwegian Krone',
      symbol: 'kr'
    },
    NPR: {
      name: 'Nepalese Rupee',
      symbol: '₨'
    },
    NZD: {
      name: 'New Zealand Dollar',
      symbol: '$'
    },
    OMR: {
      name: 'Omani Rial',
      symbol: '﷼'
    },
    PAB: {
      name: 'Panamanian Balboa',
      symbol: 'B/.'
    },
    PEN: {
      name: 'Peruvian Nuevo Sol',
      symbol: 'S/.'
    },
    PGK: {
      name: 'Papua New Guinean Kina',
      symbol: 'K'
    },
    PHP: {
      name: 'Philippine Peso',
      symbol: '₱'
    },
    PKR: {
      name: 'Pakistani Rupee',
      symbol: '₨'
    },
    PLN: {
      name: 'Polish Zloty',
      symbol: 'zł'
    },
    PYG: {
      name: 'Paraguayan Guarani',
      symbol: 'Gs'
    },
    QAR: {
      name: 'Qatari Rial',
      symbol: '﷼'
    },
    RON: {
      name: 'Romanian Leu',
      symbol: 'lei'
    },
    RSD: {
      name: 'Serbian Dinar',
      symbol: 'Дин.'
    },
    RUB: {
      name: 'Russian Ruble',
      symbol: 'руб'
    },
    RWF: {
      name: 'Rwandan Franc',
      symbol: 'RF'
    },
    SAR: {
      name: 'Saudi Riyal',
      symbol: '﷼'
    },
    SBD: {
      name: 'Solomon Islands Dollar',
      symbol: '$'
    },
    SCR: {
      name: 'Seychellois Rupee',
      symbol: '₨'
    },
    SDG: {
      name: 'Sudanese Pound',
      symbol: '£'
    },
    SEK: {
      name: 'Swedish Krona',
      symbol: 'kr'
    },
    SGD: {
      name: 'Singapore Dollar',
      symbol: '$'
    },
    SHP: {
      name: 'Saint Helena Pound',
      symbol: '£'
    },
    SLL: {
      name: 'Sierra Leonean Leone',
      symbol: 'Le'
    },
    SOS: {
      name: 'Somali Shilling',
      symbol: 'S'
    },
    SRD: {
      name: 'Surinamese Dollar',
      symbol: '$'
    },
    STD: {
      name: 'São Tomé and Príncipe Dobra',
      symbol: 'Db'
    },
    SVC: {
      name: 'Salvadoran Colón',
      symbol: '₡'
    },
    SYP: {
      name: 'Syrian Pound',
      symbol: '£'
    },
    SZL: {
      name: 'Swazi Lilangeni',
      symbol: 'L'
    },
    THB: {
      name: 'Thai Baht',
      symbol: '฿'
    },
    TJS: {
      name: 'Tajikistani Somoni',
      symbol: 'SM'
    },
    TMT: {
      name: 'Turkmenistani Manat',
      symbol: 'm'
    },
    TND: {
      name: 'Tunisian Dinar',
      symbol: 'د.ت'
    },
    TOP: {
      name: 'Tongan Paʻanga',
      symbol: 'T$'
    },
    TRY: {
      name: 'Turkish Lira',
      symbol: '₤'
    },
    TTD: {
      name: 'Trinidad and Tobago Dollar',
      symbol: 'TT$'
    },
    TWD: {
      name: 'New Taiwan Dollar',
      symbol: 'NT$'
    },
    TZS: {
      name: 'Tanzanian Shilling',
      symbol: 'x/y'
    },
    UAH: {
      name: 'Ukrainian Hryvnia',
      symbol: '₴'
    },
    UGX: {
      name: 'Ugandan Shilling',
      symbol: 'USh'
    },
    USD: {
      name: 'US Dollar',
      symbol: '$'
    },
    UYU: {
      name: 'Uruguayan Peso',
      symbol: '$U'
    },
    UZS: {
      name: 'Uzbekistan Som',
      symbol: 'лв'
    },
    VEF: {
      name: 'Venezuelan Bolívar Fuerte',
      symbol: 'Bs'
    },
    VND: {
      name: 'Vietnamese Dong',
      symbol: '₫'
    },
    VUV: {
      name: 'Vanuatu Vatu',
      symbol: 'Vt'
    },
    WST: {
      name: 'Samoan Tala',
      symbol: 'WS$'
    },
    XAF: {
      name: 'CFA Franc BEAC',
      symbol: 'FCFA'
    },
    XAG: {
      name: 'Silver (troy ounce)',
      symbol: 'oz.'
    },
    XAU: {
      name: 'Gold (troy ounce)',
      symbol: 'oz.'
    },
    XCD: {
      name: 'East Caribbean Dollar',
      symbol: '$'
    },
    XOF: {
      name: 'CFA Franc BCEAO',
      symbol: 'CFA'
    },
    XPF: {
      name: 'CFP Franc',
      symbol: 'F'
    },
    YER: {
      name: 'Yemeni Rial',
      symbol: '﷼'
    },
    ZAR: {
      name: 'South African Rand',
      symbol: 'R'
    },
    ZMW: {
      name: 'Zambian Kwacha',
      symbol: 'ZK'
    },
    ZWL: {
      name: 'Zimbabwean Dollar',
      symbol: 'Z$'
    }
  };

  window.currencies = currencies;
}(window));
