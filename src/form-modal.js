class PhoneSelector {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.toastManager = new ToastManager({ position: 'right' });

    if (!this.container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
      return;
    }

    this.options = {
      onCountryChange: options.onCountryChange || null,
      autoDetectCountry: options.autoDetectCountry !== false,
      defaultCountry: options.defaultCountry || 'mx',
      ...options,
    };

    this.initElements();
    this.setupCountrySelector();
    this.setupEventListeners();

    if (this.options.autoDetectCountry) {
      this.detectUserCountry();
    }
  }

  initElements() {
    // Country selector elements
    this.countrySelector = this.container.querySelector('.ss-country-selector');
    this.selectedFlag = this.container.querySelector('.ss-selected-flag');
    this.countryDropdown = this.container.querySelector('.ss-country-dropdown');
    this.phoneCodeElement = this.container.querySelector('#ss-phone-code');
    this.phoneInput = this.container.querySelector('input[name="ss-phone"]');

    if (!this.countrySelector || !this.selectedFlag || !this.countryDropdown) {
      console.error('Elementos del selector de país no encontrados');
      return;
    }
  }

  setupCountrySelector() {
    // Main countries list
    const mainCountries = [
      { code: 'mx', name: 'Mexico', dialCode: '+52' },
      { code: 'us', name: 'United States of America', dialCode: '+1' },
      { code: 'gb', name: 'United Kingdom', dialCode: '+44' },
      { code: 'af', name: 'Afghanistan', dialCode: '+93' },
      { code: 'al', name: 'Albania', dialCode: '+355' },
      { code: 'dz', name: 'Algeria', dialCode: '+213' },
      { code: 'as', name: 'American Samoa', dialCode: '+1684' },
      { code: 'ad', name: 'Andorra', dialCode: '+376' },
      { code: 'ao', name: 'Angola', dialCode: '+244' },
      { code: 'ai', name: 'Anguilla', dialCode: '+1264' },
      { code: 'aq', name: 'Antarctica', dialCode: '+672' },
      { code: 'ag', name: 'Antigua and Barbuda', dialCode: '+1268' },
      { code: 'ar', name: 'Argentina', dialCode: '+54' },
      { code: 'am', name: 'Armenia', dialCode: '+374' },
      { code: 'aw', name: 'Aruba', dialCode: '+297' },
      { code: 'au', name: 'Australia', dialCode: '+61' },
      { code: 'at', name: 'Austria', dialCode: '+43' },
      { code: 'az', name: 'Azerbaijan', dialCode: '+994' },
      { code: 'bs', name: 'Bahamas', dialCode: '+1242' },
      { code: 'bh', name: 'Bahrain', dialCode: '+973' },
      { code: 'bd', name: 'Bangladesh', dialCode: '+880' },
      { code: 'bb', name: 'Barbados', dialCode: '+1246' },
      { code: 'by', name: 'Belarus', dialCode: '+375' },
      { code: 'be', name: 'Belgium', dialCode: '+32' },
      { code: 'bz', name: 'Belize', dialCode: '+501' },
      { code: 'bj', name: 'Benin', dialCode: '+229' },
      { code: 'bm', name: 'Bermuda', dialCode: '+1441' },
      { code: 'bt', name: 'Bhutan', dialCode: '+975' },
      { code: 'bo', name: 'Bolivia', dialCode: '+591' },
      { code: 'ba', name: 'Bosnia and Herzegovina', dialCode: '+387' },
      { code: 'bw', name: 'Botswana', dialCode: '+267' },
      { code: 'br', name: 'Brazil', dialCode: '+55' },
      { code: 'io', name: 'British Indian Ocean Territory', dialCode: '+246' },
      { code: 'vg', name: 'British Virgin Islands', dialCode: '+1284' },
      { code: 'bn', name: 'Brunei', dialCode: '+673' },
      { code: 'bg', name: 'Bulgaria', dialCode: '+359' },
      { code: 'bf', name: 'Burkina Faso', dialCode: '+226' },
      { code: 'bi', name: 'Burundi', dialCode: '+257' },
      { code: 'kh', name: 'Cambodia', dialCode: '+855' },
      { code: 'cm', name: 'Cameroon', dialCode: '+237' },
      { code: 'ca', name: 'Canada', dialCode: '+1' },
      { code: 'cv', name: 'Cape Verde', dialCode: '+238' },
      { code: 'ky', name: 'Cayman Islands', dialCode: '+1345' },
      { code: 'cf', name: 'Central African Republic', dialCode: '+236' },
      { code: 'td', name: 'Chad', dialCode: '+235' },
      { code: 'cl', name: 'Chile', dialCode: '+56' },
      { code: 'cn', name: 'China', dialCode: '+86' },
      { code: 'cx', name: 'Christmas Island', dialCode: '+61' },
      { code: 'cc', name: 'Cocos (Keeling) Islands', dialCode: '+61' },
      { code: 'co', name: 'Colombia', dialCode: '+57' },
      { code: 'km', name: 'Comoros', dialCode: '+269' },
      { code: 'cg', name: 'Congo', dialCode: '+242' },
      { code: 'ck', name: 'Cook Islands', dialCode: '+682' },
      { code: 'cr', name: 'Costa Rica', dialCode: '+506' },
      { code: 'hr', name: 'Croatia', dialCode: '+385' },
      { code: 'cu', name: 'Cuba', dialCode: '+53' },
      { code: 'cw', name: 'Curaçao', dialCode: '+599' },
      { code: 'cy', name: 'Cyprus', dialCode: '+357' },
      { code: 'cz', name: 'Czech Republic', dialCode: '+420' },
      { code: 'dk', name: 'Denmark', dialCode: '+45' },
      { code: 'dj', name: 'Djibouti', dialCode: '+253' },
      { code: 'dm', name: 'Dominica', dialCode: '+1767' },
      { code: 'do', name: 'Dominican Republic', dialCode: '+1849' },
      { code: 'ec', name: 'Ecuador', dialCode: '+593' },
      { code: 'eg', name: 'Egypt', dialCode: '+20' },
      { code: 'sv', name: 'El Salvador', dialCode: '+503' },
      { code: 'gq', name: 'Equatorial Guinea', dialCode: '+240' },
      { code: 'er', name: 'Eritrea', dialCode: '+291' },
      { code: 'ee', name: 'Estonia', dialCode: '+372' },
      { code: 'et', name: 'Ethiopia', dialCode: '+251' },
      { code: 'fk', name: 'Falkland Islands', dialCode: '+500' },
      { code: 'fo', name: 'Faroe Islands', dialCode: '+298' },
      { code: 'fj', name: 'Fiji', dialCode: '+679' },
      { code: 'fi', name: 'Finland', dialCode: '+358' },
      { code: 'fr', name: 'France', dialCode: '+33' },
      { code: 'gf', name: 'French Guiana', dialCode: '+594' },
      { code: 'pf', name: 'French Polynesia', dialCode: '+689' },
      { code: 'ga', name: 'Gabon', dialCode: '+241' },
      { code: 'gm', name: 'Gambia', dialCode: '+220' },
      { code: 'ge', name: 'Georgia', dialCode: '+995' },
      { code: 'de', name: 'Germany', dialCode: '+49' },
      { code: 'gh', name: 'Ghana', dialCode: '+233' },
      { code: 'gi', name: 'Gibraltar', dialCode: '+350' },
      { code: 'gr', name: 'Greece', dialCode: '+30' },
      { code: 'gl', name: 'Greenland', dialCode: '+299' },
      { code: 'gd', name: 'Grenada', dialCode: '+1473' },
      { code: 'gp', name: 'Guadeloupe', dialCode: '+590' },
      { code: 'gu', name: 'Guam', dialCode: '+1671' },
      { code: 'gt', name: 'Guatemala', dialCode: '+502' },
      { code: 'gg', name: 'Guernsey', dialCode: '+44' },
      { code: 'ht', name: 'Haiti', dialCode: '+509' },
      { code: 'hn', name: 'Honduras', dialCode: '+504' },
      { code: 'hk', name: 'Hong Kong', dialCode: '+852' },
      { code: 'hu', name: 'Hungary', dialCode: '+36' },
      { code: 'is', name: 'Iceland', dialCode: '+354' },
      { code: 'in', name: 'India', dialCode: '+91' },
      { code: 'id', name: 'Indonesia', dialCode: '+62' },
      { code: 'ir', name: 'Iran', dialCode: '+98' },
      { code: 'iq', name: 'Iraq', dialCode: '+964' },
      { code: 'ie', name: 'Ireland', dialCode: '+353' },
      { code: 'im', name: 'Isle of Man', dialCode: '+44' },
      { code: 'il', name: 'Israel', dialCode: '+972' },
      { code: 'it', name: 'Italy', dialCode: '+39' },
      { code: 'jm', name: 'Jamaica', dialCode: '+1876' },
      { code: 'jp', name: 'Japan', dialCode: '+81' },
      { code: 'je', name: 'Jersey', dialCode: '+44' },
      { code: 'jo', name: 'Jordan', dialCode: '+962' },
      { code: 'kz', name: 'Kazakhstan', dialCode: '+7' },
      { code: 'ke', name: 'Kenya', dialCode: '+254' },
      { code: 'ki', name: 'Kiribati', dialCode: '+686' },
      { code: 'xk', name: 'Kosovo', dialCode: '+383' }, // código usuario‑asignado
      { code: 'kw', name: 'Kuwait', dialCode: '+965' },
      { code: 'kg', name: 'Kyrgyzstan', dialCode: '+996' },
      { code: 'la', name: 'Laos', dialCode: '+856' },
      { code: 'lv', name: 'Latvia', dialCode: '+371' },
      { code: 'lb', name: 'Lebanon', dialCode: '+961' },
      { code: 'ls', name: 'Lesotho', dialCode: '+266' },
      { code: 'lr', name: 'Liberia', dialCode: '+231' },
      { code: 'ly', name: 'Libya', dialCode: '+218' },
      { code: 'li', name: 'Liechtenstein', dialCode: '+423' },
      { code: 'lt', name: 'Lithuania', dialCode: '+370' },
      { code: 'lu', name: 'Luxembourg', dialCode: '+352' },
      { code: 'mo', name: 'Macau', dialCode: '+853' },
      { code: 'mk', name: 'Macedonia', dialCode: '+389' },
      { code: 'mg', name: 'Madagascar', dialCode: '+261' },
      { code: 'mw', name: 'Malawi', dialCode: '+265' },
      { code: 'my', name: 'Malaysia', dialCode: '+60' },
      { code: 'mv', name: 'Maldives', dialCode: '+960' },
      { code: 'ml', name: 'Mali', dialCode: '+223' },
      { code: 'mt', name: 'Malta', dialCode: '+356' },
      { code: 'mh', name: 'Marshall Islands', dialCode: '+692' },
      { code: 'mq', name: 'Martinique', dialCode: '+596' },
      { code: 'mr', name: 'Mauritania', dialCode: '+222' },
      { code: 'mu', name: 'Mauritius', dialCode: '+230' },
      { code: 'yt', name: 'Mayotte', dialCode: '+262' },
      { code: 'mx', name: 'Mexico', dialCode: '+52' },
      { code: 'fm', name: 'Micronesia', dialCode: '+691' },
      { code: 'md', name: 'Moldova', dialCode: '+373' },
      { code: 'mc', name: 'Monaco', dialCode: '+377' },
      { code: 'mn', name: 'Mongolia', dialCode: '+976' },
      { code: 'me', name: 'Montenegro', dialCode: '+382' },
      { code: 'ms', name: 'Montserrat', dialCode: '+1664' },
      { code: 'ma', name: 'Morocco', dialCode: '+212' },
      { code: 'mz', name: 'Mozambique', dialCode: '+258' },
      { code: 'mm', name: 'Myanmar', dialCode: '+95' },
      { code: 'na', name: 'Namibia', dialCode: '+264' },
      { code: 'nr', name: 'Nauru', dialCode: '+674' },
      { code: 'np', name: 'Nepal', dialCode: '+977' },
      { code: 'nl', name: 'Netherlands', dialCode: '+31' },
      { code: 'an', name: 'Netherlands Antilles', dialCode: '+599' }, // código histórico
      { code: 'nc', name: 'New Caledonia', dialCode: '+687' },
      { code: 'nz', name: 'New Zealand', dialCode: '+64' },
      { code: 'ni', name: 'Nicaragua', dialCode: '+505' },
      { code: 'ne', name: 'Niger', dialCode: '+227' },
      { code: 'ng', name: 'Nigeria', dialCode: '+234' },
      { code: 'nu', name: 'Niue', dialCode: '+683' },
      { code: 'nf', name: 'Norfolk Island', dialCode: '+672' },
      { code: 'mp', name: 'Northern Mariana Islands', dialCode: '+1670' },
      { code: 'no', name: 'Norway', dialCode: '+47' },
      { code: 'om', name: 'Oman', dialCode: '+968' },
      { code: 'pk', name: 'Pakistan', dialCode: '+92' },
      { code: 'pw', name: 'Palau', dialCode: '+680' },
      { code: 'ps', name: 'Palestine', dialCode: '+970' },
      { code: 'pa', name: 'Panama', dialCode: '+507' },
      { code: 'pg', name: 'Papua New Guinea', dialCode: '+675' },
      { code: 'py', name: 'Paraguay', dialCode: '+595' },
      { code: 'pe', name: 'Peru', dialCode: '+51' },
      { code: 'ph', name: 'Philippines', dialCode: '+63' },
      { code: 'pn', name: 'Pitcairn Islands', dialCode: '+64' },
      { code: 'pl', name: 'Poland', dialCode: '+48' },
      { code: 'pt', name: 'Portugal', dialCode: '+351' },
      { code: 'pr', name: 'Puerto Rico', dialCode: '+1939' },
      { code: 'qa', name: 'Qatar', dialCode: '+974' },
      { code: 're', name: 'Reunion', dialCode: '+262' },
      { code: 'ro', name: 'Romania', dialCode: '+40' },
      { code: 'ru', name: 'Russia', dialCode: '+7' },
      { code: 'rw', name: 'Rwanda', dialCode: '+250' },
      { code: 'bl', name: 'Saint Barthélemy', dialCode: '+590' },
      { code: 'sh', name: 'Saint Helena', dialCode: '+290' },
      { code: 'kn', name: 'Saint Kitts and Nevis', dialCode: '+1869' },
      { code: 'lc', name: 'Saint Lucia', dialCode: '+1758' },
      { code: 'mf', name: 'Saint Martin', dialCode: '+590' },
      { code: 'pm', name: 'Saint Pierre and Miquelon', dialCode: '+508' },
      { code: 'vc', name: 'Saint Vincent and the Grenadines', dialCode: '+1784' },
      { code: 'ws', name: 'Samoa', dialCode: '+685' },
      { code: 'sm', name: 'San Marino', dialCode: '+378' },
      { code: 'st', name: 'Sao Tome and Principe', dialCode: '+239' },
      { code: 'sa', name: 'Saudi Arabia', dialCode: '+966' },
      { code: 'sn', name: 'Senegal', dialCode: '+221' },
      { code: 'rs', name: 'Serbia', dialCode: '+381' },
      { code: 'sc', name: 'Seychelles', dialCode: '+248' },
      { code: 'sl', name: 'Sierra Leone', dialCode: '+232' },
      { code: 'sg', name: 'Singapore', dialCode: '+65' },
      { code: 'sx', name: 'Sint Maarten', dialCode: '+1721' },
      { code: 'sk', name: 'Slovakia', dialCode: '+421' },
      { code: 'si', name: 'Slovenia', dialCode: '+386' },
      { code: 'sb', name: 'Solomon Islands', dialCode: '+677' },
      { code: 'so', name: 'Somalia', dialCode: '+252' },
      { code: 'za', name: 'South Africa', dialCode: '+27' },
      { code: 'gs', name: 'South Georgia and the South Sandwich Islands', dialCode: '+500' },
      { code: 'kr', name: 'South Korea', dialCode: '+82' },
      { code: 'ss', name: 'South Sudan', dialCode: '+211' },
      { code: 'es', name: 'Spain', dialCode: '+34' },
      { code: 'lk', name: 'Sri Lanka', dialCode: '+94' },
      { code: 'sd', name: 'Sudan', dialCode: '+249' },
      { code: 'sr', name: 'Suriname', dialCode: '+597' },
      { code: 'sj', name: 'Svalbard and Jan Mayen', dialCode: '+47' },
      { code: 'sz', name: 'Swaziland', dialCode: '+268' },
      { code: 'se', name: 'Sweden', dialCode: '+46' },
      { code: 'ch', name: 'Switzerland', dialCode: '+41' },
      { code: 'sy', name: 'Syria', dialCode: '+963' },
      { code: 'tw', name: 'Taiwan', dialCode: '+886' },
      { code: 'tj', name: 'Tajikistan', dialCode: '+992' },
      { code: 'tz', name: 'Tanzania', dialCode: '+255' },
      { code: 'th', name: 'Thailand', dialCode: '+66' },
      { code: 'tl', name: 'Timor-Leste', dialCode: '+670' },
      { code: 'tg', name: 'Togo', dialCode: '+228' },
      { code: 'tk', name: 'Tokelau', dialCode: '+690' },
      { code: 'to', name: 'Tonga', dialCode: '+676' },
      { code: 'tt', name: 'Trinidad and Tobago', dialCode: '+1868' },
      { code: 'tn', name: 'Tunisia', dialCode: '+216' },
      { code: 'tr', name: 'Turkey', dialCode: '+90' },
      { code: 'tm', name: 'Turkmenistan', dialCode: '+993' },
      { code: 'tc', name: 'Turks and Caicos Islands', dialCode: '+1649' },
      { code: 'tv', name: 'Tuvalu', dialCode: '+688' },
      { code: 'ug', name: 'Uganda', dialCode: '+256' },
      { code: 'ua', name: 'Ukraine', dialCode: '+380' },
      { code: 'ae', name: 'United Arab Emirates', dialCode: '+971' },
      { code: 'gb', name: 'United Kingdom', dialCode: '+44' },
      { code: 'us', name: 'United States', dialCode: '+1' },
      { code: 'uy', name: 'Uruguay', dialCode: '+598' },
      { code: 'uz', name: 'Uzbekistan', dialCode: '+998' },
      { code: 'vu', name: 'Vanuatu', dialCode: '+678' },
      { code: 'va', name: 'Vatican City', dialCode: '+379' },
      { code: 've', name: 'Venezuela', dialCode: '+58' },
      { code: 'vn', name: 'Vietnam', dialCode: '+84' },
      { code: 'vg', name: 'Virgin Islands, British', dialCode: '+1284' },
      { code: 'vi', name: 'Virgin Islands, U.S.', dialCode: '+1340' },
      { code: 'wf', name: 'Wallis and Futuna', dialCode: '+681' },
      { code: 'ye', name: 'Yemen', dialCode: '+967' },
      { code: 'zm', name: 'Zambia', dialCode: '+260' },
      { code: 'zw', name: 'Zimbabwe', dialCode: '+263' },
    ];

    this.countries = [...mainCountries];

    // Establecer país por defecto
    const defaultCountry = this.countries.find(country => country.code === this.options.defaultCountry);
    this.selectedCountry = defaultCountry || mainCountries[0];

    this.buildCountryDropdown();
    this.updatePhoneCode(this.selectedCountry.dialCode);
  }

  // Detección automática del país por IP
  async detectUserCountry() {
    if (!this.selectedFlag) return;

    try {
      // Mostrar loader en la bandera
      this.showFlagLoader();

      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      console.log('Datos de geolocalización:', data);

      if (data.country_code) {
        const userCountryCode = data.country_code.toLowerCase();

        // Buscar el país en nuestra lista
        const userCountry = this.countries.find(
          country => country.code === userCountryCode || (userCountryCode === 'uk' && country.code === 'gb') // Manejar diferencia UK/GB
        );

        if (data.country_calling_code) {
          this.updatePhoneCode(data.country_calling_code);
        }

        if (userCountry) {
          console.log(`Country detected by IP: ${userCountry.name} (${userCountryCode})`);

          // Pequeño delay para mostrar el loader brevemente
          await new Promise(resolve => setTimeout(resolve, 300));
          this.selectCountry(userCountry);
        } else {
          console.log(`Country not found in the list: ${userCountryCode}`);
          // Si el país no está en nuestra lista, agregarlo dinámicamente
          await new Promise(resolve => setTimeout(resolve, 300));
          this.addCountryToList(data);
        }
      }
    } catch (error) {
      console.warn('Could not detect country by IP:', error);
      // Mantener el país por defecto
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      // Ocultar loader
      this.hideFlagLoader();
    }
  }

  // Actualizar el código de país
  updatePhoneCode(dialCode) {
    if (!this.phoneCodeElement) return;

    // Validar si existe un país con este código de marcado
    const country = this.countries.find(country => country.dialCode === dialCode);

    if (country) {
      this.phoneCodeElement.textContent = country.dialCode;
      return;
    }

    // Si no se encuentra el país, usar el código directamente
    const formattedCode = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
    this.phoneCodeElement.textContent = formattedCode;
  }

  // Agregar países no listados dinámicamente
  async addCountryToList(ipData) {
    if (!ipData.country_code || !ipData.country_name) return;

    const newCountry = {
      code: ipData.country_code.toLowerCase(),
      name: ipData.country_name,
      dialCode: ipData.country_calling_code ? (ipData.country_calling_code.startsWith('+') ? ipData.country_calling_code : `+${ipData.country_calling_code}`) : '+1',
    };

    // Agregar al final de la lista
    this.countries.push(newCountry);

    // Reconstruir el dropdown
    this.buildCountryDropdown();

    // Seleccionar el nuevo país
    this.selectCountry(newCountry);

    console.log(`Country added dynamically: ${newCountry.name}`);
  }

  // Construir el dropdown de países
  buildCountryDropdown() {
    if (!this.countryDropdown) return;

    this.countryDropdown.innerHTML = '';

    this.countries.forEach(country => {
      const countryItem = document.createElement('div');
      countryItem.className = 'flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer';
      countryItem.innerHTML = `
              <img src="https://flagcdn.com/16x12/${country.code}.webp" 
                   alt="${country.name}" 
                   class="w-4 h-3 object-cover rounded-sm">
              <span class="text-lg lg:text-xl">${country.name}</span>
              <span class="text-lg text-gray-500 ml-auto lg:text-xl">${country.dialCode}</span>
            `;

      countryItem.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        this.selectCountry(country);
        this.toggleDropdown(false);
      });

      this.countryDropdown.appendChild(countryItem);
    });
  }

  // Seleccionar un país
  selectCountry(country) {
    this.selectedCountry = country;

    if (this.selectedFlag) {
      // Precargar la imagen antes de cambiarla para evitar parpadeos
      const newImage = new Image();
      newImage.onload = () => {
        this.selectedFlag.src = newImage.src;
        this.selectedFlag.alt = country.name;
      };
      newImage.src = `https://flagcdn.com/16x12/${country.code}.webp`;
    }

    // Actualizar el código de país
    this.updatePhoneCode(country.dialCode);

    // Callback cuando cambia el país
    if (this.options.onCountryChange) {
      this.options.onCountryChange(country);
    }
  }

  // Mostrar loader en la bandera
  showFlagLoader() {
    if (!this.selectedFlag) return;

    const flagContainer = this.selectedFlag.parentElement;
    let loader = flagContainer.querySelector('.ss-flag-loader');

    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'ss-flag-loader absolute inset-0 flex items-center justify-center bg-gray-100 rounded-sm';
      loader.innerHTML = `
              <svg class="animate-spin h-3 w-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            `;

      // Asegurar que el contenedor sea relativo para el posicionamiento absoluto
      if (!flagContainer.style.position && !flagContainer.classList.contains('relative')) {
        flagContainer.style.position = 'relative';
      }

      flagContainer.appendChild(loader);
    }

    // Mostrar el loader
    loader.classList.remove('hidden');

    // Opcional: ocultar temporalmente la bandera actual
    this.selectedFlag.style.opacity = '0.3';
  }

  // Ocultar loader de la bandera
  hideFlagLoader() {
    if (!this.selectedFlag) return;

    const flagContainer = this.selectedFlag.parentElement;
    const loader = flagContainer.querySelector('.ss-flag-loader');

    if (loader) {
      loader.classList.add('hidden');
    }

    // Restaurar la opacidad de la bandera
    this.selectedFlag.style.opacity = '1';
  }

  // Toggle del dropdown
  toggleDropdown(show) {
    if (!this.countryDropdown) return;

    if (show === undefined) {
      this.countryDropdown.classList.toggle('hidden');
    } else if (show) {
      this.countryDropdown.classList.remove('hidden');
    } else {
      this.countryDropdown.classList.add('hidden');
    }
  }

  // Configurar event listeners
  setupEventListeners() {
    if (!this.countrySelector) return;

    // Click en el selector de país
    this.countrySelector.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', event => {
      if (this.countryDropdown && !this.countryDropdown.classList.contains('hidden') && !this.countrySelector.contains(event.target) && !this.countryDropdown.contains(event.target)) {
        this.toggleDropdown(false);
      }
    });

    // Cerrar dropdown con ESC
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !this.countryDropdown.classList.contains('hidden')) {
        this.toggleDropdown(false);
      }
    });
  }

  // Métodos públicos para interactuar con el componente

  // Obtener el país seleccionado
  getSelectedCountry() {
    return this.selectedCountry;
  }

  // Obtener el número de teléfono completo
  getFullPhoneNumber() {
    if (!this.phoneInput || !this.selectedCountry) return '';

    const phoneValue = this.phoneInput.value.trim();
    return phoneValue ? `${this.selectedCountry.dialCode}${phoneValue}` : '';
  }

  // Establecer un país programáticamente
  setCountry(countryCode) {
    const country = this.countries.find(c => c.code === countryCode.toLowerCase());
    if (country) {
      this.selectCountry(country);
    } else {
      console.warn(`Country not found: ${countryCode}`);
    }
  }

  // Validar el número de teléfono
  validatePhone() {
    if (!this.phoneInput) return { isValid: true };

    const value = this.phoneInput.value.trim();

    if (!value) {
      return {
        isValid: false,
        message: 'Por favor, introduce tu número de teléfono',
      };
    }

    if (value.length < 8) {
      return {
        isValid: false,
        message: 'El número de teléfono debe tener al menos 8 dígitos',
      };
    }

    return { isValid: true };
  }

  // Destruir el componente
  destroy() {}
}

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('ss-contact-form');
  const submitButton = contactForm?.querySelector('button[type="submit"]');
  const toastManager = new ToastManager({ position: 'right' });

  // Inicializa el selector de teléfono
  const phoneSelector = new PhoneSelector('#ss-phone-container-1', {
    autoDetectCountry: true,
    defaultCountry: 'mx',
    onCountryChange: country => console.log('País seleccionado:', country),
  });

  // --- Validaciones existentes ---
  function validateName(name) {
    if (!name) {
      toastManager.error('Por favor ingresa tu nombre');
      return false;
    }
    if (name.length < 2) {
      toastManager.error('El nombre debe tener al menos 2 caracteres');
      return false;
    }
    if (name.length > 50) {
      toastManager.error('El nombre debe tener menos de 50 caracteres');
      return false;
    }
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    if (!nameRegex.test(name)) {
      toastManager.error('El nombre contiene caracteres no válidos');
      return false;
    }
    return true;
  }

  function validateEmail(email) {
    if (!email) {
      toastManager.error('Por favor ingresa tu correo electrónico');
      return false;
    }
    if (email.length > 100) {
      toastManager.error('El correo electrónico debe tener menos de 100 caracteres');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~\-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      toastManager.error('Por favor ingresa un correo electrónico válido');
      return false;
    }
    return true;
  }

  function validatePhone(phone) {
    if (!phone) {
      toastManager.error('Por favor ingresa tu número de teléfono');
      return false;
    }
    if (phone.replace(/\D/g, '').length < 8) {
      toastManager.error('El teléfono debe tener al menos 8 dígitos');
      return false;
    }
    const phoneRegex = /^[\d\s\-$begin:math:text$$end:math:text$\+]+$/;
    if (!phoneRegex.test(phone)) {
      toastManager.error('El teléfono contiene caracteres no válidos');
      return false;
    }
    return true;
  }
  // ----------------------------------

  // --- Nuevas validaciones para dirección ---
  function validatePostalCode(postalCode) {
    if (!postalCode) {
      toastManager.error('Por favor ingresa tu código postal');
      return false;
    }
    if (!/^\d{4,6}$/.test(postalCode)) {
      toastManager.error('El código postal debe ser numérico (4-6 dígitos)');
      return false;
    }
    return true;
  }

  function validateState(state) {
    if (!state) {
      toastManager.error('Por favor ingresa tu estado');
      return false;
    }
    return true;
  }

  function validateCity(city) {
    if (!city) {
      toastManager.error('Por favor ingresa tu municipio o alcaldía');
      return false;
    }
    return true;
  }

  function validateColonia(colonia) {
    if (!colonia) {
      toastManager.error('Por favor ingresa tu colonia o barrio');
      return false;
    }
    return true;
  }

  function validateStreet(street) {
    if (!street) {
      toastManager.error('Por favor ingresa tu calle y número');
      return false;
    }
    return true;
  }
  // ----------------------------------------

  if (contactForm && submitButton) {
    const defaultText = submitButton.innerHTML;
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      // Obtención de valores
      const firstName = document.getElementById('ss-fullName').value.trim();
      const email = document.getElementById('ss-email').value.trim();
      const phoneRaw = phoneSelector.phoneInput.value.trim();
      const postalCode = document.getElementById('ss-postalCode').value.trim();
      const state = document.getElementById('ss-state').value.trim();
      const city = document.getElementById('ss-city').value.trim();
      const colonia = document.getElementById('ss-colonia').value.trim();
      const street = document.getElementById('ss-street').value.trim();
      const payment = document.getElementById('ss-payment').value;

      // Validaciones
      if (!validateName(firstName)) return;
      if (!validateEmail(email)) return;
      if (!validatePhone(phoneRaw)) return;
      if (!validatePostalCode(postalCode)) return;
      if (!validateState(state)) return;
      if (!validateCity(city)) return;
      if (!validateColonia(colonia)) return;
      if (!validateStreet(street)) return;
      if (!payment) {
        toastManager.error('Por favor selecciona un método de pago');
        return;
      }

      try {
        submitButton.disabled = true;
        submitButton.innerHTML = `
              <div class="flex items-center justify-center">Enviando...</div>
            `;

        const formData = new FormData();
        formData.append('fullName', firstName);
        formData.append('email', email);
        const finalPhone = phoneSelector.getFullPhoneNumber() || phoneRaw;
        formData.append('phone', finalPhone);
        formData.append('postalCode', postalCode);

        await fetch('YOUR_GOOGLE_FORMS_SCRIPT_URL', {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        toastManager.success('¡Recibimos tu pedido! muy pronto estará contigo');

        const localStorageManager = new LocalStorageManager();
        const shoppingCart = new ShoppingCart();

        localStorageManager.deleteItem(cartCookieName);

        shoppingCart.renderInitialCart();
        shoppingCart.updateCartUI();

        contactForm.reset();
        closeModal();
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        toastManager.error('Ha ocurrido un error. Por favor inténtalo de nuevo más tarde.');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = defaultText;
      }
    });
  }
});
