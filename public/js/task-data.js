const PHASE_TRANSLATIONS = {
  "Planning & Design": "Planiranje i Dizajn",
  "Demolition & Stripping": "Rušenje i Priprema",
  "Structural Work & Masonry": "Grubi Zidarski Radovi",
  "Electrical Rough-In": "Elektroinstalacije - Grubo",
  "Plumbing Rough-In": "Vodovod - Grubo",
  "HVAC & Heating": "Grejanje i Klimatizacija",
  "Windows & Exterior Doors": "Prozori i Ulazna Vrata",
  "Plastering & Drywall": "Malterisanje i Gipsarski Radovi",
  "Floor Screed & Leveling": "Košuljica i Nivelisanje",
  "Tiling — Bathrooms & Kitchen": "Keramika - Kupatilo i Kuhinja",
  "Wall Finishing & Primer": "Gletovanje i Priprema",
  "Flooring Installation": "Postavljanje Podova",
  "Painting": "Krečenje i Molerski Radovi",
  "Interior Doors & Trim": "Unutrašnja Vrata i Lajsne",
  "Kitchen Installation": "Montaža Kuhinje",
  "Bathroom Fixtures & Fittings": "Fina Montaža Sanitarija",
  "Electrical Finish Work": "Fina Montaža Elektrike",
  "Built-in Closets & Storage": "Ugradni Plakari i Skladište",
  "Deep Cleaning": "Dubinsko Čišćenje",
  "Final Inspection & Walkthrough": "Finalna Kontrola i Primopredaja"
};

const PHASE_TRANSLATIONS_RU = {
  "Planning & Design": "Планирование и проектирование",
  "Demolition & Stripping": "Снос и демонтаж",
  "Structural Work & Masonry": "Конструктивные и каменные работы",
  "Electrical Rough-In": "Черновая электропроводка",
  "Plumbing Rough-In": "Черновая сантехника",
  "HVAC & Heating": "Отопление и вентиляция",
  "Windows & Exterior Doors": "Окна и входные двери",
  "Plastering & Drywall": "Штукатурка и гипсокартон",
  "Floor Screed & Leveling": "Стяжка и выравнивание пола",
  "Tiling — Bathrooms & Kitchen": "Плитка — ванная и кухня",
  "Wall Finishing & Primer": "Финишная отделка стен и грунтовка",
  "Flooring Installation": "Укладка напольного покрытия",
  "Painting": "Окраска",
  "Interior Doors & Trim": "Внутренние двери и отделка",
  "Kitchen Installation": "Монтаж кухни",
  "Bathroom Fixtures & Fittings": "Сантехника и фурнитура",
  "Electrical Finish Work": "Финишные электромонтажные работы",
  "Built-in Wardrobes & Storage": "Встроенные шкафы и хранение",
  "Deep Cleaning": "Генеральная уборка",
  "Final Inspection & Walkthrough": "Финальная проверка и приёмка"
};

const PHASE_TRANSLATIONS_ZH = {
  "Planning & Design": "规划与设计",
  "Demolition & Stripping": "拆除与清理",
  "Structural Work & Masonry": "结构与砌筑工程",
  "Electrical Rough-In": "电气粗装",
  "Plumbing Rough-In": "管道粗装",
  "HVAC & Heating": "暖通与供暖",
  "Windows & Exterior Doors": "窗户与外门",
  "Plastering & Drywall": "抹灰与石膏板",
  "Floor Screed & Leveling": "地面找平",
  "Tiling — Bathrooms & Kitchen": "贴砖——浴室与厨房",
  "Wall Finishing & Primer": "墙面找平与底漆",
  "Flooring Installation": "地板安装",
  "Painting": "油漆粉刷",
  "Interior Doors & Trim": "内门与装饰线",
  "Kitchen Installation": "厨房安装",
  "Bathroom Fixtures & Fittings": "卫浴洁具",
  "Electrical Finish Work": "电气精装",
  "Built-in Wardrobes & Storage": "内置衣柜与储物",
  "Deep Cleaning": "深度清洁",
  "Final Inspection & Walkthrough": "最终验收"
};

const PHASE_ALIASES = {
  "Priprema, Projekat, Dozvole": "Planning & Design",
  "Planiranje i Dizajn": "Planning & Design",
  "Rušenje i Odvoz": "Demolition & Stripping",
  "Rušenje i Priprema": "Demolition & Stripping",
  "Grubi Elektro Radovi": "Electrical Rough-In",
  "Elektroinstalacije - Grubo": "Electrical Rough-In",
  "Grubi Vodovodni Radovi": "Plumbing Rough-In",
  "Vodovod - Grubo": "Plumbing Rough-In",
  "Zidarski radovi i Prepravke": "Structural Work & Masonry",
  "Grubi Zidarski Radovi": "Structural Work & Masonry",
  "Spoljna Stolarija i Vrata": "Windows & Exterior Doors",
  "Prozori i Ulazna Vrata": "Windows & Exterior Doors",
  "Malterisanje i Suva gradnja": "Plastering & Drywall",
  "Malterisanje i Gipsarski Radovi": "Plastering & Drywall",
  "Izlivanje Košuljice": "Floor Screed & Leveling",
  "Košuljica i Nivelisanje": "Floor Screed & Leveling",
  "Keramika Kupatila i Kuhinje": "Tiling — Bathrooms & Kitchen",
  "Keramika - Kupatilo i Kuhinja": "Tiling — Bathrooms & Kitchen",
  "Gletovanje i Grundiranje": "Wall Finishing & Primer",
  "Gletovanje i Priprema": "Wall Finishing & Primer",
  "Grejanje i Klimatizacija": "HVAC & Heating",
  "Molerski Radovi": "Painting",
  "Krečenje i Molerski Radovi": "Painting",
  "Postavljanje Podova / Parket": "Flooring Installation",
  "Postavljanje Podova": "Flooring Installation",
  "Unutrašnja Vrata": "Interior Doors & Trim",
  "Unutrašnja Vrata i Lajsne": "Interior Doors & Trim",
  "Montaža Kuhinje": "Kitchen Installation",
  "Montaža Sanitarija": "Bathroom Fixtures & Fittings",
  "Fina Montaža Sanitarija": "Bathroom Fixtures & Fittings",
  "Fina Montaža Elektro": "Electrical Finish Work",
  "Fina Montaža Elektrike": "Electrical Finish Work",
  "Ugradni Plakari": "Built-in Wardrobes & Storage",
  "Ugradni Plakari i Skladište": "Built-in Wardrobes & Storage",
  "Dubinsko Čišćenje": "Deep Cleaning",
  "Primopredaja": "Final Inspection & Walkthrough",
  "Finalna Kontrola i Primopredaja": "Final Inspection & Walkthrough"
};


const PHASE_NOTES_TRANSLATIONS_SR = {
  "Planning & Design": "Početne konsultacije sa arhitektom/dizajnerom. Definisanje obima posla, izrada tlocrta, biranje palete materijala, dobijanje svih potrebnih dozvola od uprave zgrade. Precizno merenje svih prostorija.",
  "Demolition & Stripping": "Uklanjanje starih podova, pločica, tapeta, ugradnog nameštaja i nenosivih pregradnih zidova. Uklanjanje starih sanitarija, kuhinjskih elemenata i uređaja. Pravilno odlaganje sav materijala i šuta.",
  "Structural Work & Masonry": "Izgradnja ili modifikacija pregradnih zidova prema novom tlocrtu. Popravka i nivelisanje podloga. Sanacija pukotina i strukturalnih problema na zidovima i plafonima. Izmene okvira prozora i vrata.",
  "Electrical Rough-In": "Postavljanje novih elektroinstalacija u celom stanu. Instalacija nove razvodne table sa osiguračima. Postavljanje kutija za utičnice, prekidače i razvodne kutije prema planu. Provlačenje kablova za rasvetu, uređaje (rerna, klima, veš mašina). Postavljanje instalacije za internet i TV.",
  "Plumbing Rough-In": "Instalacija novih dovodnih i odvodnih cevi za vodu. Postavljanje cevi za kupatilo, kuhinjsku sudoperu, mašinu za sudove i veš. Instalacija ventila. Testiranje instalacije pod pritiskom na curenja.",
  "HVAC & Heating": "Instalacija ili zamena radijatora/podnog grejanja. Postavljanje cevi za klimatizaciju i odvod kondenzata. Montaža unutrašnjih i spoljašnjih jedinica klime. Instalacija ventilacionih kanala ako je potrebno.",
  "Windows & Exterior Doors": "Uklanjanje starih prozora i balkonskih vrata. Instalacija novih prozora (PVC ili aluminijum). Instalacija novih blindiranih ulaznih vrata. Zaptivanje i izolacija oko novih okvira.",
  "Plastering & Drywall": "Malterisanje i gletovanje svih zidova. Instalacija suve gradnje (gips) za spuštene plafone ili pregradne zidove. Obrada spojeva i postavljanje ugaonih profila.",
  "Floor Screed & Leveling": "Izlivanje samonivelišuće košuljice preko podnog grejanja. Izravnavanje podova na odgovarajuću visinu. Postavljanje hidroizolacije u kupatilu i kuhinji. Vreme sušenja (obično 3-4 nedelje).",
  "Tiling — Bathrooms & Kitchen": "Postavljanje zidnih i podnih pločica u kupatilima i kuhinji. Fugovanje i nanošenje silikona. Ugradnja lajsni za pločice. Provera hidroizolacije u predelu tuša i kade.",
  "Wall Finishing & Primer": "Finalno gletovanje svih površina zidova i plafona. Šmirglanje do savršene glatkoće. Nanošenje osnovne podloge (praimera). Popunjavanje preostalih neravnina pre krečenja.",
  "Flooring Installation": "Postavljanje podloge za vlagu. Ugradnja parketa, laminata ili gotovog troslojnog poda. Postavljanje prelaznih lajsni. Ostavljanje prostorija za diletaciju kod zidova.",
  "Painting": "Nanošenje 2-3 sloja boje na zidove u izabranim nijansama. Krečenje plafona (obično belo). Farbanje stolarije ili radijatorskih maski ako je planirano. Zaštita svih gotovih površina pre početka.",
  "Interior Doors & Trim": "Montaža svih sobnih vrata i okvira. Montaža kvaka i šarki. Postavljanje podnih lajsni kroz ceo stan. Podešavanje svih vrata da se glatko otvaraju i zatvaraju.",
  "Kitchen Installation": "Montaža donjih i gornjih kuhinjskih elemenata. Postavljanje radne ploče. Ugradnja sudopere i slavine. Povezivanje bele tehnike. Montaža LED rasvete ispod gornjih elemenata.",
  "Bathroom Fixtures & Fittings": "Montaža WC šolje i bidea. Montaža umivaonika. Postavljanje tuš kabine ili staklene pregrade. Montaža slavina, tuš ručica i galanterije u kupatilu.",
  "Electrical Finish Work": "Montaža ukrasnih maski utičnica i prekidača. Postavljanje plafonjera, lustera i ugradnih lampi (spotova). Povezivanje i testiranje svih uređaja. Finalna provera električne instalacije.",
  "Built-in Closets & Storage": "Montaža ugradnih plakara sa kliznim ili krilnim vratima. Postavljanje unutrašnjih polica i šipki za garderobu. Izrada nameštaja po meri za hodnik i ostave.",
  "Deep Cleaning": "Uklanjanje svog građevinskog otpada i prašine. Detaljno pranje svih površina - podova, stolarije i sanitarija. Čišćenje unutrašnjosti svih ormarića i plakara.",
  "Final Inspection & Walkthrough": "Provera svih završenih radova sa izvođačima. Testiranje svih instalacija, utičnica i slavina. Izrada punch-liste za eventualne popravke. Preuzimanje garancija i uputstava."
};

const PHASE_NOTES_TRANSLATIONS_EN = {
  "Planning & Design": "Initial consultation with the architect/designer. Defining the scope of work, creating floor plans, selecting the material palette, and obtaining all necessary permits from building management. Precise measurement of all rooms.",
  "Demolition & Stripping": "Removal of old flooring, tiles, wallpaper, built-in furniture, and non-load-bearing partition walls. Removal of old sanitary fixtures, kitchen cabinets, and appliances. Proper disposal of all materials and debris.",
  "Structural Work & Masonry": "Construction or modification of partition walls according to the new floor plan. Repairing and leveling substrates. Remediation of cracks and structural issues on walls and ceilings. Modification of window and door frames.",
  "Electrical Rough-In": "Installation of new electrical wiring throughout the apartment. Installation of a new distribution board with circuit breakers. Positioning outlet, switch, and junction boxes according to the plan. Running cables for lighting and appliances (oven, AC, washing machine). Installing internet and TV wiring.",
  "Plumbing Rough-In": "Installation of new water supply and drainage pipes. Plumbing for the bathroom, kitchen sink, dishwasher, and washing machine. Valve installation. Pressure testing the plumbing for leaks.",
  "HVAC & Heating": "Installation or replacement of radiators/underfloor heating. Laying pipes for air conditioning and condensate drainage. Mounting indoor and outdoor AC units. Installation of ventilation ducts if necessary.",
  "Windows & Exterior Doors": "Removal of old windows and balcony doors. Installation of new windows (PVC or aluminum). Installation of a new armored entrance door. Sealing and insulating around new frames.",
  "Plastering & Drywall": "Plastering and skim-coating all walls. Installation of drywall (gypsum) for suspended ceilings or partition walls. Finishing joints and installing corner profiles.",
  "Floor Screed & Leveling": "Pouring self-leveling screed over underfloor heating. Leveling floors to the appropriate height. Applying waterproofing in the bathroom and kitchen. Drying time (usually 3-4 weeks).",
  "Tiling — Bathrooms & Kitchen": "Installing wall and floor tiles in bathrooms and the kitchen. Grouting and applying silicone. Installing tile trim. Checking waterproofing in the shower and bathtub areas.",
  "Wall Finishing & Primer": "Final skim-coating of all wall and ceiling surfaces. Sanding to perfect smoothness. Applying the base coat (primer). Filling any remaining imperfections before painting.",
  "Flooring Installation": "Laying moisture underlayment. Installation of parquet, laminate, or engineered hardwood floors. Installing transition profiles. Leaving expansion gaps near walls.",
  "Painting": "Applying 2-3 coats of paint to walls in the selected shades. Painting ceilings (usually white). Painting woodwork or radiator covers if planned. Protecting all finished surfaces before starting.",
  "Interior Doors & Trim": "Mounting all interior doors and frames. Installing handles and hinges. Installing baseboards throughout the apartment. Adjusting all doors for smooth opening and closing.",
  "Kitchen Installation": "Mounting lower and upper kitchen cabinets. Installing the countertop. Installing the sink and faucet. Connecting appliances. Mounting LED lighting under the upper cabinets.",
  "Bathroom Fixtures & Fittings": "Mounting the toilet and bidet. Mounting the washbasin. Installing the shower cabin or glass partition. Installing faucets, shower heads, and bathroom accessories.",
  "Electrical Finish Work": "Installing decorative covers for outlets and switches. Mounting ceiling lights, chandeliers, and recessed spotlights. Connecting and testing all devices. Final check of the electrical installation.",
  "Built-in Closets & Storage": "Mounting built-in closets with sliding or hinged doors. Installing internal shelves and wardrobe rails. Custom-made furniture for the hallway and storage rooms.",
  "Deep Cleaning": "Removal of all construction waste and dust. Detailed washing of all surfaces - floors, woodwork, and sanitary fixtures. Cleaning the inside of all cabinets and closets.",
  "Final Inspection & Walkthrough": "Reviewing all completed work with the contractors. Testing all installations, outlets, and faucets. Creating a punch list for any potential repairs. Handover of warranties and manuals."
};

const PHASE_NOTES_TRANSLATIONS_RU = {
  "Planning & Design": "Первичная консультация с архитектором/дизайнером. Определение объема работ, создание поэтажных планов, выбор палитры материалов, получение всех необходимых разрешений от управления зданием. Точный замер всех помещений.",
  "Demolition & Stripping": "Удаление старых полов, плитки, обоев, встроенной мебели и ненесущих перегородок. Демонтаж старой сантехники, кухонных шкафов и техники. Правильная утилизация всех материалов и строительного мусора.",
  "Structural Work & Masonry": "Возведение или изменение перегородок согласно новому плану. Ремонт и выравнивание оснований. Устранение трещин и структурных проблем на стенах и потолках. Изменение дверных и оконных проемов.",
  "Electrical Rough-In": "Прокладка новой электропроводки по всей квартире. Установка нового распределительного щита с автоматами. Размещение коробок под розетки, выключатели и распределительные коробки по плану. Прокладка кабелей для освещения и техники (духовка, кондиционер, стиральная машина). Прокладка интернет- и ТВ-кабелей.",
  "Plumbing Rough-In": "Монтаж новых труб водоснабжения и канализации. Разводка труб для ванной, кухонной мойки, посудомоечной и стиральной машин. Установка вентилей. Опрессовка системы под давлением на предмет утечек.",
  "HVAC & Heating": "Установка или замена радиаторов/теплых полов. Прокладка труб для кондиционирования и отвода конденсата. Монтаж внутренних и наружных блоков кондиционеров. Монтаж вентиляционных каналов при необходимости.",
  "Windows & Exterior Doors": "Демонтаж старых окон и балконных дверей. Установка новых окон (ПВХ или алюминий). Установка новой бронированной входной двери. Герметизация и изоляция вокруг новых рам.",
  "Plastering & Drywall": "Штукатурка и шпаклевка всех стен. Монтаж гипсокартона для подвесных потолков или перегородок. Заделка швов и установка угловых профилей.",
  "Floor Screed & Leveling": "Заливка самовыравнивающейся стяжки поверх теплого пола. Выравнивание полов на нужную высоту. Нанесение гидроизоляции в ванной и кухне. Время высыхания (обычно 3-4 недели).",
  "Tiling — Bathrooms & Kitchen": "Укладка настенной и напольной плитки в ванных комнатах и кухне. Затирка швов и нанесение силикона. Установка кромочных профилей для плитки. Проверка гидроизоляции в зоне душа и ванны.",
  "Wall Finishing & Primer": "Финишная шпаклевка всех поверхностей стен и потолков. Шлифовка до идеальной гладкости. Нанесение базового слоя (грунтовки). Заполнение оставшихся неровностей перед покраской.",
  "Flooring Installation": "Укладка влагозащитной подложки. Укладка паркета, ламината или инженерной доски. Установка переходных профилей. Оставление компенсационных зазоров у стен.",
  "Painting": "Нанесение 2-3 слоев краски на стены в выбранных оттенках. Покраска потолков (обычно в белый цвет). Покраска столярки или экранов радиаторов, если запланировано. Защита всех готовых поверхностей перед началом работ.",
  "Interior Doors & Trim": "Монтаж всех межкомнатных дверей и коробок. Установка ручек и петель. Установка плинтусов по всей квартире. Регулировка всех дверей для плавного открывания и закрывания.",
  "Kitchen Installation": "Монтаж нижних и верхних кухонных шкафов. Установка столешницы. Установка мойки и смесителя. Подключение бытовой техники. Монтаж светодиодного освещения под навесными шкафами.",
  "Bathroom Fixtures & Fittings": "Установка унитаза и биде. Установка раковины. Монтаж душевой кабины или стеклянной перегородки. Установка смесителей, душевых леек и аксессуаров в ванной.",
  "Electrical Finish Work": "Установка декоративных рамок розеток и выключателей. Монтаж потолочных светильников, люстр и встроенных спотов. Подключение и тестирование всех устройств. Окончательная проверка электроустановки.",
  "Built-in Closets & Storage": "Монтаж встроенных шкафов с раздвижными или распашными дверями. Установка внутренних полок и штанг для гардероба. Мебель на заказ для прихожей и кладовых.",
  "Deep Cleaning": "Вывоз всего строительного мусора и пыли. Детальное мытье всех поверхностей - полов, столярки и сантехники. Уборка внутри всех шкафов и тумб.",
  "Final Inspection & Walkthrough": "Проверка всех выполненных работ с подрядчиками. Тестирование всех установок, розеток и смесителей. Составление списка недоделок для возможного исправления. Передача гарантий и инструкций."
};

const PHASE_NOTES_TRANSLATIONS_ZH = {
  "Planning & Design": "与建筑师/设计师进行初步咨询。明确工程范围，制作平面图，选择材料调色板，获得建筑管理部门的所有必要许可。精确测量所有房间。",
  "Demolition & Stripping": "拆除旧地板、瓷砖、墙纸、内置家具和非承重隔墙。拆除旧卫浴洁具、厨柜和电器。妥善处理所有材料和建筑垃圾。",
  "Structural Work & Masonry": "根据新平面图建造或改造隔断墙。修补和找平基层。修复墙壁和天花板上的裂缝及结构问题。改造门窗框架。",
  "Electrical Rough-In": "在整个公寓铺设新电线。安装带有断路器的新配电箱。按计划定位插座、开关和接线盒。铺设照明和电器（烤箱、空调、洗衣机）电缆。安装网络和电视走线。",
  "Plumbing Rough-In": "安装新的一般给排水管道。为浴室、厨房水槽、洗碗机和洗衣机布管。安装阀门。系统进行压力测试寻找漏洞。",
  "HVAC & Heating": "安装或更换散热器/地暖。铺设空调和冷凝水排放管。安装室内外空调机组。必要时安装通风管道。",
  "Windows & Exterior Doors": "拆除旧窗户和阳台门。安装新窗户（PVC或铝合金）。安装防盗入户门。新窗框周围密封和保温。",
  "Plastering & Drywall": "所有墙面进行抹灰和腻子找平。安装用于吊顶或隔墙的石膏板。接缝处理并安装包角型材。",
  "Floor Screed & Leveling": "在地暖上方浇筑自流平找平层。将地面平整至适当高度。在浴室和厨房做防水。等待干燥时间（通常3-4周）。",
  "Tiling — Bathrooms & Kitchen": "在浴室和厨房铺设墙砖和地砖。填缝并涂抹硅胶。安装瓷砖收边条。检查淋浴和浴缸区域的防水情况。",
  "Wall Finishing & Primer": "对所有墙壁和天花板表面进行最终腻子涂刮。打磨至完美平滑。涂抹底层底漆。在粉刷前填补残留的瑕疵。",
  "Flooring Installation": "铺设防潮垫。安装拼花地板、复合地板或实木复合地板。安装过渡收边条。在墙壁附近留出膨胀间隙。",
  "Painting": "按选定色调在墙上涂刷2-3层面漆。涂刷天花板（通常为白色）。如有计划，对木制品或散热器罩进行喷漆。动工前保护所有已完成的表面。",
  "Interior Doors & Trim": "安装所有室内门和门框。安装把手和铰链。在整个公寓安装踢脚线。调整所有门以确保顺畅开关。",
  "Kitchen Installation": "安装厨房上下层橱柜。安装台面。安装水槽和水龙头。连接电器。在上层橱柜下方安装LED照明。",
  "Bathroom Fixtures & Fittings": "安装马桶和净身盆。安装洗手盆。安装淋浴房或玻璃隔断。安装浴室内的水龙头、花洒头和浴室配件。",
  "Electrical Finish Work": "安装插座和开关的装饰面板。安装吸顶灯、吊灯和嵌入式射灯。连接并测试所有设备。对电气安装进行最终检查。",
  "Built-in Closets & Storage": "安装带推拉门或平开门的内置衣柜。安装内部隔板和挂衣杆。定制走廊和储物间的家具。",
  "Deep Cleaning": "清除所有建筑垃圾和灰尘。详细清洗所有表面 - 地板、木制品和卫浴洁具。清洁所有橱柜内部。",
  "Final Inspection & Walkthrough": "与承包商检查所有已竣工的工作。测试所有设施、插座和水龙头。编制可能需要修补的清单。移交保修单和使用说明。"
};

function phaseTitle(ph) {
  const key = ph.name || '';
  const lookupKey = (typeof PHASE_ALIASES !== 'undefined' && PHASE_ALIASES[key]) ? PHASE_ALIASES[key] : key;

  if (currentLang === 'sr') {
    if (ph.name_sr) return ph.name_sr;
    if (PHASE_TRANSLATIONS[lookupKey]) return PHASE_TRANSLATIONS[lookupKey];
  }
  if (currentLang === 'ru') {
    if (ph.name_ru) return ph.name_ru;
    if (PHASE_TRANSLATIONS_RU[lookupKey]) return PHASE_TRANSLATIONS_RU[lookupKey];
  }
  if (currentLang === 'zh') {
    if (ph.name_zh) return ph.name_zh;
    if (PHASE_TRANSLATIONS_ZH[lookupKey]) return PHASE_TRANSLATIONS_ZH[lookupKey];
  }
  // English fallback: if we found an English key via lookup, return it
  if (currentLang === 'en') {
    if (typeof PHASE_TRANSLATIONS !== 'undefined' && PHASE_TRANSLATIONS[lookupKey]) return lookupKey;
  }
  return key;
}


function phaseNotes(ph) {
  const key = ph.name || '';
  const lookupKey = (typeof PHASE_ALIASES !== 'undefined' && PHASE_ALIASES[key]) ? PHASE_ALIASES[key] : key;

  if (currentLang === 'sr') {
    if (ph.notes_sr) return ph.notes_sr;
    if (PHASE_NOTES_TRANSLATIONS_SR[lookupKey]) return PHASE_NOTES_TRANSLATIONS_SR[lookupKey];
  }
  if (currentLang === 'ru') {
    if (ph.notes_ru) return ph.notes_ru;
    if (PHASE_NOTES_TRANSLATIONS_RU[lookupKey]) return PHASE_NOTES_TRANSLATIONS_RU[lookupKey];
  }
  if (currentLang === 'zh') {
    if (ph.notes_zh) return ph.notes_zh;
    if (PHASE_NOTES_TRANSLATIONS_ZH[lookupKey]) return PHASE_NOTES_TRANSLATIONS_ZH[lookupKey];
  }
  if (currentLang === 'en') {
    if (PHASE_NOTES_TRANSLATIONS_EN[lookupKey]) return PHASE_NOTES_TRANSLATIONS_EN[lookupKey];
  }
  return ph.notes || '';
}


const TASK_NOTES_TRANSLATIONS = {
  "Finalize floor plan layout":         "Uključiti sve konstruktivne izmene i pozicije instalacija na tlocrtu.",
  "Obtain renovation permit":           "Predati zahtev upravi zgrade. Očekivano vreme obrade: 2 nedelje.",
  "Select and order tiles":             "Format 60x120, rektifikovane. Naručiti 10% više za rezervu.",
  "Choose flooring material and color": "Inžinjerski parket hrast, 15mm. Završna obrada prirodnim uljem.",
  "Final budget review":                "Finalni pregled budžeta pre početka radova. Zaključati cene sa izvođačima.",
  "Protect common areas":               "Karton i folija na lift i pod hodnika. Zaštiti stepenište i zid.",
  "Remove old flooring":                "Parket i pločice. Koristiti ugaonu brusilicu uz zidove.",
  "Strip bathroom tiles":               "Kupatilo i kuhinja. Proveriti da li staro lepilo sadrži azbest.",
  "Demolish partitions":                "Samo nenosivi zidovi. Prethodno konsultovati se sa statičarem.",
  "Debris removal":                     "Iznajmiti kontejner. Odvoz u maksimalno 3 ture.",
  "Build partition walls":              "Siporex 20cm. Nova pregrada hodnika i garderobera.",
  "Repair wall cracks":                 "Epoxy injekcija na glavnoj pukotini blizu prozora.",
  "Subfloor leveling":                  "Samonivelišuća masa 5-15mm. Sušenje 48h pre malterisanja.",
  "Socket positions confirm":           "Obeležiti sve pozicije utičnica i prekidača pre postavljanja cevi.",
  "Run electrical conduits":            "NYM kabl 2,5mm². Maksimalno 3 strujne kola po sobi.",
  "Main distribution box":             "Trofazni osigurač 63A. Označiti sva strujni kola.",
  "Internet/TV cabling":                "CAT6 do svake sobe + 2x koaksijal. Završiti u panelu u hodniku.",
  "Water supply routing":               "PPR cevi topla+hladna voda. Odvojena kola za kupatilo i kuhinju.",
  "Built-in cisterns install":          "Geberit ili Grohe. 2 u kupatilu, 1 u odvojenom toaletu.",
  "Pressure test":                      "10 bara 30 minuta. Fotografisati manometar pre i posle.",
  "Floor heating install":              "Danfoss cevi + razdelnik. Razmak 150mm. Izolaciona ploča ispod.",
  "AC copper route":                    "Bakrena cev 3/8 u valovitoj zaštiti. Nagib prema odvodu kondenzata.",
  "Windows install":                    "Schüco troslojni. PVC klupica i montažna pena po celom obodu.",
  "Frame cleanup":                      "Ukloniti stari malter, očistiti špaletu. Grundirati pre novog maltera.",
  "External sills":                     "Mermerna kompozitna klupica. Ugli na miter. Silikonirati spoj.",
  "Rough plastering":                   "Prvi sloj 15mm. Drugi sloj 5mm posle 7 dana. Dobro pokriti cevi.",
  "Gypsum ceilings":                    "Metalna mreža spuštena 15cm. Izolacione ploče između mreže i tavanice.",
  "Moisture check":                     "Merač vlage <3% pre livenja. Čekati pune 4 nedelje ako je potrebno.",
  "Self-leveling compound":             "Knauf 424 ili Baumit. 55mm iznad grejnih cevi. Dodati vlakna u smesu.",
  "Door threshold height":              "Svi pragovi moraju uzeti u obzir visinu pločice + lepka.",
  "Flood test shower":                  "Napuniti tuš kadicu 24h. Obeležiti sva vlažna mesta na košuljici ispod.",
  "Laying wall tiles":                  "Početi od centra. Epoksi fuga u mokrim zonama. Fuga 2mm.",
  "Grouting tiles":                     "Mapei Ultracolor Plus. Brisati unutar 20 min. Silikon na uglovima.",
  "Wall skim coat":                     "Završni sloj gletovanja 2mm. Brusiti između slojeva. Pokriti sve doze.",
  "Wall primer":                        "Dubinski prajmer. Proveriti eflorescenciju na novom malteru.",
  "Flloring underlay":                  "Pena 3mm + parna brana. Spojeve pomeriti za 30cm.",
  "Parquet oiling":                     "Rubio Monocoat 2C. Nanositi tanko, utrljavati unutar 5 min. 3 sloja.",
  "Grazing light check":                "Koristiti radnu lampu pod uglom 10°. Označiti sve neravnine lepljivom trakom.",
  "Final painting":                     "Farrow & Ball Pointing + Strong White. 3 sloja valjkom od kratke dlake.",
  "Interior door frames":               "Hrastovi okviri. Farbanje pre montaže krila. Predvrtati šarke.",
  "Door hardware":                      "Colombo ručke. Pneumatski zatvarači na vratima kupatila.",
  "Cabinetry measurement":              "Meriti posle postavljanja poda. Proveriti vertikalu i horizontalu pre narudžbine.",
  "Kitchen hood test":                  "Proveriti kapacitet aspiratora u odnosu na veličinu kuhinje. Očistiti filter posle testa.",
  "Sink/Faucet test":                   "Pustiti toplu i hladnu vodu. Proveriti kapanje ispod elementa. Silikonirati oko sudopere.",
  "Final walkthrough":                  "Klijent + nadzorni inženjer + izvođač. Uneti sve stavke u punch listu.",

  // HVAC dopuna
  "Install AC indoor and outdoor units": "LG Dual Inverter ili Daikin. Punjenje rashladnog sredstva nakon montaže. Min. 3m između unutrašnje i spoljašnje jedinice.",
  "Commission and test heating system":  "Testirati sve zone razdelnika, proveriti aktuatore i balansirati protoke. Dokumentovati fotografijama.",

  // Tiling dopuna
  "Lay floor tiles":                     "Posle zidnih pločica. Isti epoksi lepak. Održavati kontinuirane fuge. Lippaž < 0,5mm.",

  // Flooring dopuna
  "Install parquet or laminate flooring":"Klik spoj. Dilatacija 10mm uz sve zidove. Pomak krajnjih spojeva min. 30cm. Aklimatizacija 72h.",

  // Kitchen dopuna
  "Install kitchen cabinets and units":  "Prvo nivelisati donje elemente. Gornji elementi 530mm iznad radne ploče. Koristiti laseru za poravnanje.",
  "Install countertop":                  "Kvarc ili granit. Otvor za sudoperu seci na licu mesta. Silikon na svim gornjim ivicama elemenata.",
  "Connect appliances and plumbing":     "Priključiti rernu, ploču, mašinu za suđe i pranje veša. Proveriti sve odvode ispod sudopere.",

  // Bathroom fixtures
  "Install toilet and cistern":          "Geberit okvir već u zidu. Montirati konzolnu šolju. Zavrtnje stegnuti na maks. 3Nm. Bez fleksibilne cevi.",
  "Install sink and vanity unit":        "Objesiti ormarić na zidne konzole. Proveriti horizontalnost. Priključiti toplu i hladnu push-fit spojem.",
  "Install shower screen or tub":        "Staklena pregrada min. 8mm kaljeno staklo. Silikon s obe strane donje lajsne. Ponovo proveriti nivo tuš posude.",
  "Connect faucets and plumbing fixtures":"Montirati termostatsku tuš armaturu. Priključiti punjač kade i preliv. Proveriti sve spojeve na kapanje.",
  "Install mirror, towel rails and accessories": "Koristiti tiple u pločici. Obeležiti šablonom za bušenje. Silikon iza ogledala za zaštitu pločice.",

  // Electrical finish
  "Install outlet and switch covers":    "Schneider Unica ili slično. Ista serija kroz ceo stan. Proveriti polaritet pre montaže maske.",
  "Install ceiling lights and fixtures": "IP44 minimum u kupatilima. LED downlights 3000K. Silikonirati patuljke u vlažnim zonama.",
  "Test all circuits and socket outlets":"Testirati svako strujno kolo testerom. Proveriti okidanje FID-a. Izmeriti otpor petlje. Atestirati.",
  "Connect and test appliances":         "Uključiti rernu, ploču, bojler i klime. Beležiti sve alarm kodove. Proveriti brzine aspiratora.",

  // Closets
  "Install wardrobe frames and carcasses":"Pax ili korisnički ormar. Pričvrstiti na zidne stude M8 vijcima. Nivelisati vertikalno pre polica.",
  "Fit sliding doors and interior fittings": "Kessebohmer šarke, tihozatvarajući tračnice. Podesiti vrata da vise vertikalno. Polični nosači poslednji.",
  "Install hallway storage and hooks":   "Kuke za kaputove na 155cm i 110cm visine. Ormarić za cipele sa tihozatvarajućim poklopcem.",

  // Cleanup
  "Post-construction deep clean":        "Ekipa od 4 osobe, ceo dan. Ukloniti fuganit sa pločica. Oprati unutar ormara i ispod elemenata.",

  // Flooring underlay fix (popravljen typo)
  "Flooring underlay":                   "Pena 3mm + parna brana. Spojeve pomeriti za 30cm."
};

// =============================================
// TASK DETAILED DESCRIPTIONS — full guide per task
// =============================================
// Maps actual task titles (from user data) → TASK_DETAILED_DESCRIPTIONS keys
const TASK_ALIASES = {
  // Planning
  "Obtain renovation permit":          "Coordinate permits and approvals",
  "Select and order tiles":            "Select materials, finishes and fixtures",
  "Choose flooring material and color":"Select materials, finishes and fixtures",
  "Final budget review":               "Create material schedule and BOQ",
  "Cabinetry measurement":             "Create material schedule and BOQ",
  "Protect common areas":              "Coordinate permits and approvals",
  // Demolition
  "Remove old flooring":               "Remove existing flooring",
  "Strip bathroom tiles":              "Strip old wall tiles",
  "Strip old tiles":                   "Strip old wall tiles",
  "Demolish partitions":               "Mark and cut partition walls",
  "Debris removal":                    "Haul away debris",
  // Structural
  "Build partition walls":             "Build new partition walls",
  "Repair wall cracks":                "Seal and patch structural openings",
  // Electrical
  "Socket positions confirm":          "Install junction boxes and rough-in",
  "Run electrical conduits":           "Run conduit and wire all circuits",
  "Main distribution box":             "Install new electrical panel",
  "Internet/TV cabling":               "Run conduit and wire all circuits",
  "Install outlet and switch covers":  "Install outlets and switches",
  "Install ceiling lights and fixtures":"Install light fixtures",
  "Test all circuits and socket outlets":"Final panel check and test",
  // Plumbing
  "Water supply routing":              "Run water supply lines",
  "Built-in cisterns install":         "Rough-in bathroom plumbing",
  "Pressure test":                     "Run water supply lines",
  "Flood test shower":                 "Rough-in bathroom plumbing",
  "Connect faucets and plumbing fixtures":"Rough-in bathroom plumbing",
  "Sink/Faucet test":                  "Rough-in bathroom plumbing",
  // HVAC
  "Floor heating install":             "Install radiant floor heating",
  "AC copper route":                   "Install HVAC units and ductwork",
  "Install AC indoor and outdoor units":"Install HVAC units and ductwork",
  "Commission and test heating system":"Thermostat installation and setup",
  // Windows
  "Windows install":                   "Install new PVC or wood windows",
  "Frame cleanup":                     "Seal and insulate around frames",
  "External sills":                    "Seal and insulate around frames",
  // Plastering
  "Rough plastering":                  "Apply base coat plaster",
  "Gypsum ceilings":                   "Apply base coat plaster",
  "Wall skim coat":                    "Skim coat and smooth finish",
  // Screed
  "Subfloor leveling":                 "Check levels and grind high spots",
  "Door threshold height":             "Check levels and grind high spots",
  "Moisture check":                    "Prepare substrate",
  "Flooring underlay":                 "Prepare substrate",
  "Self-leveling compound":            "Pour self-leveling screed",
  // Tiling
  "Laying wall tiles":                 "Tile bathroom floor and walls",
  "Lay floor tiles":                   "Tile bathroom floor and walls",
  "Grouting tiles":                    "Grout and seal all tiles",
  // Painting
  "Wall primer":                       "Prime all walls and ceilings",
  "Grazing light check":               "Sand and prepare for painting",
  "Final painting":                    "Apply two coats of finish paint",
  // Flooring
  "Install parquet or laminate flooring":"Install laminate or parquet flooring",
  "Parquet oiling":                    "Install laminate or parquet flooring",
  // Bathroom Fixtures
  "Install toilet and cistern":        "Install toilet and bidet",
  "Install sink and vanity unit":      "Install sink and vanity",
  "Install shower screen or tub":      "Install shower or tub",
  "Install mirror, towel rails and accessories":"Install accessories and towel bars",
  // Doors
  "Interior door frames":              "Install interior door frames",
  "Door hardware":                     "Hang interior doors",
  "Fit sliding doors and interior fittings":"Fit doors and interior fittings",
  // Wardrobes
  "Install wardrobe frames and carcasses":"Install built-in wardrobe frames",
  "Install hallway storage and hooks": "Install storage accessories",
  // Kitchen
  "Kitchen hood test":                 "Connect appliances and plumbing",
  "Connect and test appliances":       "Connect appliances and plumbing",
  // Final
  "Post-construction deep clean":      "Professional post-construction clean",
  "Final walkthrough":                 "Final walkthrough and punch list",
  "Sign off and handover":             "Sign-off and documentation",

  // Dvosoban & Trosoban Tasks
  "Dizajn prostora i nabavka materijala": "Finalize floor plan layout",
  "Arhitektonski projekat i rušenje zidova": "Finalize floor plan layout",
  "Kompletno rušenje starih površina": "Remove existing flooring",
  "Rušenje do betona": "Remove existing flooring",
  "Štemovanje i kablivi": "Run conduit and wire all circuits",
  "Sistem centralne pametne table, razvod svuda": "Run conduit and wire all circuits",
  "Instalacija 2 čvora (kupatilo + kuhinja)": "Water supply routing",
  "Instalacija 2 kupatila, toalet, kuhinja i podno u kupatilima": "Rough-in two bathrooms",
  "Krpljenje otvora, priprema zidova": "Repair and level walls",
  "Pregradni zidovi, spušteni plafoni u dnevnoj": "Build new partition walls",
  "Izlivanje košuljice u celom stanu": "Pour self-leveling screed",
  "Mašinska košuljica / Estrich": "Pour self-leveling screed",
  "Ugradnja ALU/Drvo spoljne stolarije": "Install new PVC or wood windows",
  "Postavljanje keramike": "Tile bathroom floor and walls",
  "Velikoformatna keramika u 2 kupatila i kuhinji": "Tile bathroom floor and walls",
  "Komplet gletovanje dve ruke i krečenje": "Skim coat and smooth finish",
  "3 ruke gletovanja + Skratch + OIKOS Boje": "Skim coat and smooth finish",
  "Parket - Postavljanje, brušenje, lakiranje": "Install parquet or laminate flooring",
  "Ugradnja Tarkett troslojnog parketa": "Install parquet or laminate flooring",
  "Montaža Inverter klima": "Install HVAC units and ductwork",
  "Montiranje tuš kabine, lavaboa, utičnica": "Install sink and vanity unit",
  "Ugradnja sigurnosnih i 4 unutrašnjih vrata": "Interior door frames",
  "Montaža ugradnog nameštaja po meri": "Install wardrobe frames and carcasses",
  "Ugradnja unutrašnjih medijapan vrata": "Interior door frames",
  "Ugradnja 2 tuš kabine po meri stakla, lavaboi": "Install shower screen or tub",
  "Modularne utičnice, pametni termostati, rasveta (šine i led)": "Install outlet and switch covers",
  "Finalno tehničko i higijensko čišćenje i predaja": "Post-construction deep clean",

  // New granular 65 tasks Translations
  "Finalizacija rasporeda tlocrta": "Finalize floor plan layout",
  "Koordinacija i pribavljanje dozvola": "Coordinate permits and approvals",
  "Odabir keramike, parketa i opreme": "Select materials, finishes and fixtures",
  "Izrada predmera i predračuna": "Create material schedule and BOQ",
  "Uklanjanje starih podnih obloga": "Remove existing flooring",
  "Skidanje starih zidnih pločica": "Strip old wall tiles",
  "Demontaža starih sanitarija": "Remove old fixtures and sanitarije",
  "Odvoz šuta na deponiju": "Haul away debris",
  "Obeležavanje i rušenje pregradnih zidova": "Mark and cut partition walls",
  "Zidanje novih pregradnih zidova": "Build new partition walls",
  "Zatvaranje i krpljenje otvora": "Seal and patch structural openings",
  "Ugradnja nove razvodne table": "Install new electrical panel",
  "Postavljanje cevi i razvod kablova": "Run conduit and wire all circuits",
  "Ugradnja doza i razvodnih kutija": "Install junction boxes and rough-in",
  "Provera elektro instalacija u zidu": "Inspect rough electrical work",
  "Razvod dopremanja vode": "Run water supply lines",
  "Postavljanje kanalizacionih odvoda": "Install drain and waste lines",
  "Priprema podžbuknih priključaka u kupatilu": "Rough-in bathroom plumbing",
  "Priprema vodovoda u kuhinji": "Rough-in kitchen plumbing",
  "Priprema vodovoda za dva kupatila": "Rough-in two bathrooms",
  "Postavljanje podnog grejanja": "Install radiant floor heating",
  "Ugradnja klima uređaja": "Install HVAC units and ductwork",
  "Ugradnja i setovanje termostata": "Thermostat installation and setup",
  "Demontaža starih prozora": "Remove old windows and frames",
  "Ugradnja novih PVC/ALU prozora": "Install new PVC or wood windows",
  "Ugradnja sigurnosnih ulaznih vrata": "Install armored entry door",
  "Silikoniranje i obrada špaletna": "Seal and insulate around frames",
  "Krpljenje i ravnanje zidova": "Repair and level walls",
  "Malterisanje i prvi sloj": "Apply base coat plaster",
  "Gletovanje u dve ruke": "Skim coat and smooth finish",
  "Priprema podloge i postavljanje termoizolacije": "Prepare substrate",
  "Izlivanje mašinske košuljice": "Pour self-leveling screed",
  "Provera visine i ravnanje podloge": "Check levels and grind high spots",
  "Postavljanje keramike u kupatilu": "Tile bathroom floor and walls",
  "Keramika prvog kupatila": "Tile first bathroom floor and walls",
  "Keramika drugog kupatila": "Tile second bathroom floor and walls",
  "Keramika u kuhinji": "Tile kitchen backsplash and floor",
  "Fugovanje i impregnacija fugni": "Grout and seal all tiles",
  "Fugovanje, lajsne i silikon": "Grout, seal and install trim",
  "Ugradnja ugaonih lajsni": "Install tile trim and accessories",
  "Nanošenje podloge / prajmera po celom stanu": "Apply wall primer throughout",
  "Matiranje i šmirglanje pre farbanja": "Sand and prepare for painting",
  "Podloga plofona i zidova": "Prime all walls and ceilings",
  "Dve ruke završne disperzije": "Apply two coats of finish paint",
  "Sanacija sitnih fleka i popravki": "Touch-ups and final finish",
  "Ugradnja parketa ili laminata": "Install laminate or parquet flooring",
  "Ugradnja podnih i prelaznih lajsni": "Install baseboards and trim",
  "Završno lakiranje i ćišćenje podova": "Final finishing and cleanup",
  "Montaža štokova za unutrašnja vrata": "Install interior door frames",
  "Všanje i štelovanje krila vrata": "Hang interior doors",
  "Ugradnja maski i pervajz lajsni": "Install door trim and moldings",
  "Montaža donjih i gornjih kuhinjskih elemenata": "Install kitchen cabinets and units",
  "Ugradnja radne ploče u kuhinji": "Install countertop",
  "Priključivanje sudopere i ugradnih aparata": "Connect appliances and plumbing",
  "Ugradnja wc šolje i bidea": "Install toilet and bidet",
  "Ugradnja wc šolja u oba kupatila": "Install toilets and bidets",
  "Ugradnja umivaonika i ormarića": "Install sink and vanity",
  "Ugradnja umivaonika u oba kupatila": "Install sinks and vanities",
  "Ugradnja tuš kabine": "Install shower or tub",
  "Ugradnja tuš kabine i kade": "Install shower and tub",
  "Ugradnja tuš kabina u oba kupatila": "Install showers and tubs",
  "Kačenje držača i ogledala": "Install accessories and towel bars",
  "Kačenje zidnih aksesoara": "Install accessories",
  "Ugradnja svih utičnica i prekidača": "Install outlets and switches",
  "Montaža svih svetiljki i lustera": "Install light fixtures",
  "Finalna provera table i osigurača": "Final panel check and test",
  "Montaža okvira ugradnih plakara": "Install built-in wardrobe frames",
  "Ugradnja kliznih vrata i enterijera": "Fit doors and interior fittings",
  "Montaža polica i nosača za cipele": "Install storage accessories",
  "Profesionalno čišćenje i brisanje prašine": "Professional post-construction clean",
  "Inpekcija izvedenih radova (Punch list)": "Final walkthrough and punch list",
  "Potpisivanje zapisnika i predaja objekta": "Sign-off and documentation",
};

const TASK_DETAILED_DESCRIPTIONS = {

  // ── Planning & Design ──────────────────────────────────────────────────────
  "Finalize floor plan layout": {
    image: 'assets/images/task-sketches/planning_design_sketch.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="48" height="48" rx="3"/><line x1="8" y1="32" x2="36" y2="32"/><line x1="36" y1="8" x2="36" y2="48"/><line x1="36" y1="24" x2="56" y2="24"/><rect x="12" y="12" width="8" height="6" rx="1"/></svg>`,
    title_sr: "Finalizacija rasporeda prostorija",
    title_ru: "Окончательный план планировки",
    title_zh: "最终确定平面布置图",
    desc_en: `Review and lock the final floor plan before any construction begins. Ensure all room dimensions, door swings, and furniture placement are verified against actual site measurements. Coordinate with the architect to confirm structural walls versus partition walls. Common mistake: not accounting for radiator pipes, risers, or electrical panel clearance zones. Always print the plan at 1:50 scale and walk the site with it in hand to catch discrepancies early.`,
    desc_sr: `Pregledajte i zaključajte konačan raspored pre početka bilo kakvih radova. Proverite sve dimenzije prostorija, smer otvaranja vrata i raspored nameštaja u odnosu na stvarne mere na terenu. Koordinirajte sa arhitektom koje su zidovi noseći, a koji pregradni. Česta greška: ne uzimaju se u obzir vertikale za cevi, riseri ili zone oko razvodnog ormana. Odštampajte plan u razmeri 1:50 i prošetajte stan sa njim u ruci da biste uočili neslaganja.`,
    desc_ru: `Проверьте и утвердите окончательную планировку до начала любых строительных работ. Убедитесь, что все размеры комнат, направления открывания дверей и расстановка мебели соответствуют реальным замерам на объекте. Согласуйте с архитектором, какие стены несущие, а какие — перегородки. Распечатайте план в масштабе 1:50 и пройдитесь с ним по квартире, чтобы выявить несоответствия до начала работ.`,
    desc_zh: `在任何施工开始前，审查并确定最终平面布局。确保所有房间尺寸、门的开启方向和家具摆放已根据现场实际测量数据核实。与建筑师确认哪些是承重墙，哪些是隔断墙。将图纸打印为1:50比例并持图在现场走一遍，尽早发现差异。`
  },
  "Coordinate permits and approvals": {
    image: 'assets/images/task-sketches/planning_design_sketch.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="8" width="36" height="48" rx="3"/><line x1="22" y1="18" x2="42" y2="18"/><line x1="22" y1="26" x2="42" y2="26"/><line x1="22" y1="34" x2="36" y2="34"/><path d="M24 44l4 4 8-8"/></svg>`,
    title_sr: "Koordinacija dozvola i saglasnosti",
    title_ru: "Координация разрешений и согласований",
    title_zh: "协调许可证和批准",
    desc_en: `Submit all required building permit applications to local authorities before starting demolition or structural work. Typical documents include architectural drawings, structural calculations, and fire safety certificates. Expect 15-30 business days for approval in most municipalities. Keep copies of all submissions with timestamps. Professional tip: start the permit process at least 4 weeks before planned construction start to avoid idle labor costs.`,
    desc_sr: `Podnesite sve potrebne zahteve za građevinske dozvole lokalnim organima pre početka rušenja ili strukturalnih radova. Tipična dokumentacija uključuje arhitektonske crteže, statičke proračune i sertifikate protivpožarne zaštite. Očekujte 15-30 radnih dana za odobrenje. Čuvajte kopije svih podnesaka sa datumima. Profesionalni savet: pokrenite proces dozvola najmanje 4 nedelje pre planiranog početka gradnje da izbegnete troškove zastoja radnika.`,
    desc_ru: `Подайте все необходимые заявки на разрешение на строительство в местные органы власти до начала сноса или структурных работ. Стандартный пакет документов включает архитектурные чертежи, расчёты конструкций и противопожарные сертификаты. Ожидайте 15–30 рабочих дней на согласование. Начните оформление разрешений не менее чем за 4 недели до запланированного начала работ, чтобы избежать вынужденных простоев.`,
    desc_zh: `在开始拆除或结构性工作之前，向当地主管部门提交所有必要的建筑许可申请。典型文件包括建筑图纸、结构计算书和消防安全证书。大多数城市的审批周期为15-30个工作日。至少提前4周启动审批流程，以避免因等待许可而造成施工人员的闲置成本。`
  },
  "Select materials, finishes and fixtures": {
    image: 'assets/images/task-sketches/planning_design_sketch.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="28" width="16" height="16" rx="2"/><rect x="30" y="28" width="16" height="16" rx="2"/><circle cx="20" cy="18" r="8"/><path d="M52 28l-4 16h8l-4-16z"/></svg>`,
    title_sr: "Izbor materijala, završnih obrada i armature",
    title_ru: "Выбор материалов, отделки и фурнитуры",
    title_zh: "选择材料、饰面和固定装置",
    desc_en: `Create a comprehensive selection of all tiles, flooring, paint colors, bathroom fixtures, kitchen fittings, and hardware. Visit showrooms to confirm color and texture in person — screens distort colors. Order samples for final on-site comparison. Lead times for imported materials can reach 6-8 weeks, so finalize selections before demolition begins. Budget a 10% overage on tiles and flooring to account for cuts, breakage, and future repairs.`,
    desc_sr: `Napravite kompletnu selekciju svih pločica, podnih obloga, boja za zidove, sanitarne opreme, kuhinjskih elemenata i okovja. Posetite salon da uživo proverite boje i teksture — ekrani iskrivljuju boje. Naručite uzorke za finalnu proveru na licu mesta. Rokovi isporuke za uvozne materijale mogu biti 6-8 nedelja, pa finalizujte izbor pre početka rušenja. Budžetirajte 10% viška za pločice i pod da pokrijete sečenje, lom i buduće popravke.`,
    desc_ru: `Составьте полный перечень всей плитки, напольных покрытий, цветов краски, сантехники, кухонных гарнитуров и фурнитуры. Посетите шоурумы, чтобы лично оценить цвета и текстуры — экраны искажают оттенки. Сроки поставки импортных материалов могут достигать 6–8 недель, поэтому завершите выбор до начала демонтажа. Заложите 10% запас по плитке и напольным покрытиям на обрезки, бой и будущий ремонт.`,
    desc_zh: `制作包含所有瓷砖、地板、墙面颜色、卫浴洁具、厨房配件及五金件的完整选材清单。亲自前往展厅确认颜色和质感，屏幕显示会产生色差。进口材料的货期可能长达6-8周，因此在拆除开始前完成选材。为瓷砖和地板预留10%的损耗量，用于切割、破损和日后修缮。`
  },
  "Create material schedule and BOQ": {
    image: 'assets/images/task-sketches/planning_design_sketch.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="8" width="40" height="48" rx="3"/><line x1="20" y1="18" x2="44" y2="18"/><line x1="20" y1="26" x2="44" y2="26"/><line x1="20" y1="34" x2="44" y2="34"/><line x1="20" y1="42" x2="36" y2="42"/><line x1="36" y1="14" x2="36" y2="46"/></svg>`,
    title_sr: "Kreiranje specifikacije materijala i predmera",
    title_ru: "Создание графика материалов и сметы",
    title_zh: "编制材料清单和工程量清单",
    desc_en: `Compile a Bill of Quantities listing every material, quantity, unit price, and supplier. Break it down by phase so procurement can be staged. Cross-reference BOQ against the floor plan to verify square meter calculations for tiles, paint, and flooring. Include all consumables: adhesive, grout, primer, screws, silicone. A well-prepared BOQ prevents mid-project shortages that cause expensive delays and rush-order surcharges.`,
    desc_sr: `Sastavite predmer i predračun sa svim materijalima, količinama, jediničnim cenama i dobavljačima. Podelite ga po etapama da bi se nabavka vršila fazno. Uporedite predmer sa planom za proveru kvadratura za pločice, farbu i pod. Uključite sav potrošni materijal: lepak, fug masu, prajmer, zavrtnje, silikon. Dobro pripremljen predmer sprečava nestašice usred projekta koje izazivaju skupe zastoje i hitne narudžbine.`,
    desc_ru: `Составьте ведомость объёмов работ с перечнем всех материалов, количества, единичных цен и поставщиков. Разбейте её по этапам для поэтапных закупок. Сверьте ведомость с планом для проверки расчётов площадей под плитку, краску и напольные покрытия. Включите все расходные материалы: клей, затирку, грунтовку, крепёж, силикон. Это предотвратит дефицит материалов в разгаре проекта и дорогостоящие срочные заказы.`,
    desc_zh: `编制工程量清单，列明每种材料的数量、单价和供应商，并按施工阶段分类以便分批采购。将清单与平面图交叉核对，验证瓷砖、油漆和地板的面积计算。包含所有耗材：粘合剂、填缝剂、底漆、螺丝、硅胶。充分准备的工程量清单可防止项目中途出现材料短缺，避免因紧急采购产生的额外费用。`
  },

  // ── Demolition ─────────────────────────────────────────────────────────────
  "Remove existing flooring": {
    image: 'assets/images/task-sketches/sketch_demolition.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 52h40"/><path d="M16 52V28l8-8h16l8 8v24"/><path d="M20 52V36h24v16"/><line x1="32" y1="36" x2="32" y2="52"/><line x1="20" y1="44" x2="44" y2="44"/></svg>`,
    title_sr: "Uklanjanje postojećeg poda",
    title_ru: "Удаление существующего напольного покрытия",
    title_zh: "拆除现有粗制地板",
    desc_en: `Remove all existing floor coverings including tiles, parquet, laminate, and screed down to the structural slab where required. Use an electric demolition hammer for ceramic tiles and a floor scraper for vinyl or laminate. Wear PPE: dust mask, ear protection, and safety boots. Check for asbestos in pre-1990 buildings before disturbing old vinyl tiles. Bag debris immediately to keep the site walkable and reduce dust spread to neighboring apartments.`,
    desc_sr: `Uklonite sve postojeće podne obloge uključujući pločice, parket, laminat i košuljicu do noseće ploče gde je potrebno. Koristite električni čekić za keramičke pločice i strugač za vinil ili laminat. Obavezna zaštitna oprema: maska za prašinu, zaštita za uši i zaštitne cipele. U zgradama pre 1990. proverite prisustvo azbesta pre uklanjanja starog vinila. Odmah pakujte šut da bi se radilište moglo prohodati i da se smanji širenje prašine.`,
    desc_ru: `Демонтируйте все существующие напольные покрытия: плитку, паркет, ламинат и стяжку до несущей плиты там, где требуется. Используйте электрический перфоратор для керамической плитки и шпатель для винила или ламината. Обязательно применяйте СИЗ: респиратор, защиту для ушей и защитные ботинки. В зданиях до 1990 года проверьте наличие асбеста перед вскрытием старого линолеума. Сразу упаковывайте мусор в мешки, чтобы рабочая площадка оставалась проходимой.`,
    desc_zh: `拆除所有现有地面覆盖层，包括瓷砖、实木地板、复合地板，必要时清除至结构楼板。对陶瓷砖使用电动破碎锤，对乙烯基或复合地板使用地板铲。必须佩戴个人防护装备：防尘口罩、耳护和安全靴。1990年前的建筑在清除旧乙烯基地砖前需检查石棉含量。立即将废料装袋以保持场地可通行并减少扬尘。`
  },
  "Strip old wall tiles": {
    image: 'assets/images/task-sketches/sketch_demolition.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="12" width="40" height="40" rx="2"/><line x1="12" y1="25" x2="52" y2="25"/><line x1="12" y1="38" x2="52" y2="38"/><line x1="25" y1="12" x2="25" y2="52"/><line x1="38" y1="12" x2="38" y2="52"/><line x1="32" y1="16" x2="48" y2="48" stroke-dasharray="3 3"/></svg>`,
    title_sr: "Skidanje starih zidnih pločica",
    title_ru: "Снятие старой настенной плитки",
    title_zh: "拆除旧墙砖",
    desc_en: `Remove old wall tiles using a wide chisel and demolition hammer, working from top to bottom to prevent large sections falling uncontrolled. Protect the bathtub or shower base with plywood boards during demolition. Inspect the substrate behind — older apartments often have plaster over brick that may need re-leveling. Avoid prying aggressively near water pipes embedded in the wall. Expect 1-2 days per bathroom depending on tile adhesion strength.`,
    desc_sr: `Skidajte stare zidne pločice širokim dletom i čekićem za rušenje, radeći od vrha ka dnu da se spreči nekontrolisano padanje velikih komada. Zaštitite kadu ili tuš bazu daskama od šper ploče tokom rušenja. Pregledajte podlogu iza — stariji stanovi često imaju malter preko cigle koji zahteva ponovo nivelisanje. Izbegavajte agresivno podizanje blizu vodovodnih cevi u zidu. Računajte na 1-2 dana po kupatilu zavisno od jačine lepka.`,
    desc_ru: `Снимайте старую настенную плитку широким зубилом и перфоратором, работая сверху вниз, чтобы предотвратить неконтролируемое падение крупных фрагментов. Защитите ванну или поддон душа листами фанеры во время демонтажа. Осмотрите основание позади плитки — в старых квартирах часто встречается штукатурка по кирпичу, требующая повторного выравнивания. Рассчитывайте на 1–2 дня на одну ванную комнату в зависимости от прочности клея.`,
    desc_zh: `使用宽凿和破碎锤从上往下拆除旧墙砖，以防止大块砖面不受控制地脱落。拆除过程中用胶合板保护浴缸或淋浴底盘。检查背后的基底——老公寓墙砖后面常见砖墙抹灰，可能需要重新找平。避免在靠近墙内管道处用力撬撬。根据瓷砖粘贴强度，每个卫生间预计需要1-2天。`
  },
  "Remove old fixtures and sanitarije": {
    image: 'assets/images/task-sketches/sketch_demolition.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="20" rx="14" ry="8"/><path d="M18 20v16c0 4.4 6.3 8 14 8s14-3.6 14-8V20"/><line x1="32" y1="44" x2="32" y2="56"/><line x1="24" y1="56" x2="40" y2="56"/></svg>`,
    title_sr: "Demontaža starih sanitarija i opreme",
    title_ru: "Демонтаж старого оборудования и сантехники",
    title_zh: "拆除旧固定装置和洁具",
    desc_en: `Disconnect and remove all old sanitary fixtures: toilets, sinks, bathtubs, radiators, and kitchen units. Shut off the main water valve and drain pipes before disconnecting any plumbing. Cap all open pipe ends immediately with threaded plugs to prevent sewer gas and accidental flooding. Label each shutoff valve for easy identification later. Old cast-iron bathtubs are extremely heavy — plan for two workers and protect doorframes during removal.`,
    desc_sr: `Odspojite i uklonite sve stare sanitarije: WC šolje, lavaboe, kade, radijatore i kuhinjske elemente. Zatvorite glavni ventil za vodu i ispraznite cevi pre odvajanja instalacija. Odmah zatvorite sve otvorene krajeve cevi navojnim čepovima da sprečite miris kanalizacije i slučajno izlivanje. Obeležite svaki ventil za lakšu kasniju identifikaciju. Stare livene kade su izuzetno teške — planirajte dva radnika i zaštitite dovratnike pri iznošenju.`,
    desc_ru: `Отключите и демонтируйте всю старую сантехнику: унитазы, раковины, ванны, радиаторы и кухонную мебель. Перекройте главный водяной кран и слейте воду из труб перед отключением коммуникаций. Немедленно закройте все открытые концы труб резьбовыми заглушками. Промаркируйте каждый запорный вентиль для последующей идентификации. Старые чугунные ванны очень тяжелы — планируйте двух рабочих и защитите дверные проёмы при вывозе.`,
    desc_zh: `断开并拆除所有旧卫浴洁具：马桶、洗手盆、浴缸、散热器和厨房橱柜。在断开任何管道连接前，先关闭总水阀并排空管道。用螺纹堵头立即封堵所有开口管端，防止下水道异味和意外进水。标记每个截止阀以便日后识别。旧铸铁浴缸极重——需安排两名工人并在搬运时保护门框。`
  },
  "Haul away debris": {
    image: 'assets/images/task-sketches/sketch_demolition.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="24" width="36" height="24" rx="3"/><circle cx="16" cy="52" r="4"/><circle cx="36" cy="52" r="4"/><path d="M44 36h10l6 12H44"/><circle cx="52" cy="52" r="4"/></svg>`,
    title_sr: "Odvoz šuta i otpada",
    title_ru: "Вывоз строительного мусора",
    title_zh: "清运建筑垃圾",
    desc_en: `Arrange for proper removal of all demolition waste using licensed waste haulers. Typical apartment demolition generates 3-8 tons of debris depending on scope. Use heavy-duty rubble bags or a container positioned at building entrance. Check building management rules — many condominiums restrict debris hauling to specific hours. Never dump construction waste in municipal bins. Keep a waste manifest for regulatory compliance.`,
    desc_sr: `Organizujte pravilan odvoz svog građevinskog otpada koristeći licencirane prevoznike. Tipična demontaža stana generiše 3-8 tona šuta zavisno od obima. Koristite vreće za šut ili kontejner postavljen na ulazu u zgradu. Proverite pravila zgrade — mnoge stambene zajednice ograničavaju odvoz šuta na određene sate. Nikada ne bacajte građevinski otpad u komunalne kontejnere. Čuvajte evidenciju o otpadu radi usklađenosti sa propisima.`,
    desc_ru: `Организуйте вывоз всех строительных отходов через лицензированных перевозчиков. Типичный объём мусора при ремонте квартиры составляет 3–8 тонн в зависимости от масштаба работ. Используйте мешки для строительного мусора или контейнер у входа в здание. Проверьте правила дома — многие ТСЖ ограничивают вывоз мусора определёнными часами. Никогда не выбрасывайте строительные отходы в городские контейнеры.`,
    desc_zh: `通过有资质的废物运输商安排清运所有拆除废弃物。根据施工规模，公寓装修通常产生3-8吨废料。使用建筑垃圾袋或在楼栋入口设置垃圾箱。检查楼栋管理规定——许多公寓大厦对建筑垃圾的外运时间有限制。切勿将建筑垃圾投入市政垃圾桶，留存废物记录以符合监管要求。`
  },

  // ── Structural ─────────────────────────────────────────────────────────────
  "Mark and cut partition walls": {
    image: 'assets/images/task-sketches/sketch_structural.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="12" x2="12" y2="52"/><line x1="52" y1="12" x2="52" y2="52"/><line x1="32" y1="12" x2="32" y2="52" stroke-dasharray="4 4"/><path d="M26 28l12 8-12 8"/></svg>`,
    title_sr: "Obeležavanje i sečenje pregradnih zidova",
    title_ru: "Разметка и резка перегородок",
    title_zh: "标记和切割隔断墙",
    desc_en: `Mark exact wall positions using a laser level and chalk line on floor and ceiling. Before cutting, verify with the structural engineer that no load-bearing elements will be affected. Use a wall chaser or angle grinder with diamond blade for clean cuts. Check for hidden electrical cables and plumbing with a detector before cutting. Keep cuts straight and perpendicular — crooked cuts make framing and finishing much harder.`,
    desc_sr: `Obeležite tačne pozicije zidova laserskim nivelirima i kredom na podu i plafonu. Pre sečenja potvrdite sa statičarem da nema nosećih elemenata. Koristite zidfrez ili ugaonu brusilicu sa dijamantskim diskom za čiste rezove. Pre sečenja proverite skenerom prisustvo skrivenih kablova i cevi. Držite rezove ravne i pod pravim uglom — krivi rezovi otežavaju ugradnju i završnu obradu.`,
    desc_ru: `Нанесите точные позиции стен лазерным нивелиром и меловой линией на полу и потолке. Перед началом резки согласуйте со строительным инженером отсутствие несущих элементов. Используйте штроборез или болгарку с алмазным диском для чистых резов. Перед резкой проверьте стены детектором на наличие скрытой проводки и труб. Держите резы ровными и перпендикулярными — кривые резы существенно осложнят последующую отделку.`,
    desc_zh: `使用激光水平仪和墨线在地面和天花板上标记准确的墙体位置。切割前与结构工程师确认不会影响承重结构。使用开槽机或配金刚石锯片的角磨机进行整洁切割。切割前用探测仪检查墙内隐藏的电线和管道。保持切割线笔直且垂直——歪斜的切口会使后续的框架安装和装修工作变得更加困难。`
  },
  "Build new partition walls": {
    image: 'assets/images/task-sketches/sketch_structural.png',
    icon: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="12" width="40" height="40"/><line x1="12" y1="26" x2="52" y2="26"/><line x1="12" y1="40" x2="52" y2="40"/><line x1="26" y1="12" x2="26" y2="52"/><line x1="40" y1="12" x2="40" y2="52"/></svg>`,
    title_sr: "Zidanje novih pregradnih zidova",
    title_ru: "Возведение новых перегородок",
    title_zh: "建造新隔断墙",
    desc_en: `Build partition walls using either gypsum plasterboard on metal stud frames (faster, lighter) or hollow clay blocks (better sound insulation). For wet areas, use moisture-resistant green board or cement board. Install acoustic insulation inside stud walls between living areas. Ensure all new walls are plumb and level — check every 3 courses with a spirit level. Anchor the top track to the ceiling slab, not just the plaster, to prevent movement.`,
    desc_sr: `Gradite pregradne zidove od gips-karton ploča na metalnoj podkonstrukciji (brže, lakše) ili od šupljih glinenih blokova (bolja zvučna izolacija). Za vlažne zone koristite vodootporne zelene ploče ili cement ploče. Ugradite zvučnu izolaciju unutar zidova između stambenih prostorija. Svi novi zidovi moraju biti u vaterpasku — proveravajte svaka 3 reda libelom. Gornju šinu pričvrstite za plafonsku ploču, ne samo za malter.`,
    desc_ru: `Возводите перегородки из гипсокартона на металлическом каркасе (быстрее и легче) или из пустотелых керамических блоков (лучшая звукоизоляция). Во влажных зонах используйте влагостойкий зелёный гипсокартон или цементно-стружечные плиты. Укладывайте звукоизоляционный материал внутри перегородок между жилыми помещениями. Все новые стены должны быть строго вертикальны — проверяйте уровнем каждые 3 ряда. Верхнюю направляющую крепите к перекрытию, а не только к штукатурке.`,
    desc_zh: `使用轻钢龙骨石膏板（更快捷、更轻便）或空心粘土砖（隔音效果更好）建造隔断墙。潮湿区域使用防水绿板或水泥板。在居住区域的隔断墙内填充隔音材料。所有新墙必须垂直——每砌3排用水平仪检查一次。顶部龙骨应固定在楼板上，而非仅固定在抹灰层上。`
  },
  "Seal and patch structural openings": {
    image: 'assets/images/task-sketches/sketch_structural.png',
    icon: null,
    title_sr: "Zatvaranje i popravka strukturalnih otvora",
    title_ru: "Заделка и ремонт структурных проемов",
    title_zh: "密封和修补结构开口",
    desc_en: `Close any unnecessary openings in load-bearing or partition walls using matching masonry or plasterboard patches. For structural openings, install steel lintels before infilling. Apply bonding agent to old surfaces before new mortar to ensure adhesion. Fill voids around pipe penetrations with fire-rated intumescent sealant. Allow patches to cure fully (minimum 48 hours for mortar) before applying plaster over them.`,
    desc_sr: `Zatvorite sve nepotrebne otvore u nosećim ili pregradnim zidovima odgovarajućom zidarijom ili gips-karton zakrpama. Za strukturalne otvore ugradite čelične nadvratnike pre popunjavanja. Nanesite vezivno sredstvo na stare površine pre novog maltera za bolju adheziju. Popunite šupljine oko prodora cevi vatrootpornim intumescentnim kitom. Pustite zakrpe da se potpuno osuše (minimum 48 sati za malter) pre malterisanja.`,
    desc_ru: `Заделайте все ненужные проёмы в несущих или перегородочных стенах соответствующей кладкой или гипсокартонными заплатками. Для структурных проёмов установите стальные перемычки до заполнения. Нанесите грунтовку-адгезив на старые поверхности перед новым раствором. Заполните пустоты вокруг трубных проходок огнестойким вспучивающимся герметиком. Дайте заплаткам полностью высохнуть (не менее 48 часов для раствора) перед нанесением штукатурки.`,
    desc_zh: `使用匹配的砌体或石膏板修补料封堵承重墙或隔断墙上所有不必要的开口。结构性开口在填充前须安装钢质过梁。在旧表面涂抹粘结剂以确保新砂浆附着牢固。用防火膨胀密封剂填充管道穿墙孔周围的空隙。在抹灰前让修补处充分固化（砂浆至少48小时）。`
  },

  // ── Electrical Rough-In ────────────────────────────────────────────────────
  "Install new electrical panel": {
    image: 'assets/images/task-sketches/sketch_electrical.png',
    icon: null,
    title_sr: "Ugradnja novog razvodnog ormana",
    title_ru: "Установка нового электрического щитка",
    title_zh: "安装新电气面板",
    desc_en: `Install a new distribution board with adequate capacity — minimum 24 modules for a two-room apartment, 36+ for three rooms. Include separate RCD (FID) protection for lighting, power, wet areas, and high-draw appliances. Position the panel at 1.4-1.6m height in a dry, accessible location. Use a licensed electrician for panel connection to the building mains. Label every circuit breaker clearly in both final and rough-in stages.`,
    desc_sr: `Ugradite novi razvodni orman adekvatnog kapaciteta — minimum 24 modula za dvosoban, 36+ za trosoban stan. Uključite zasebnu FID zaštitu za osvetljenje, utičnice, vlažne zone i jače potrošače. Pozicionirajte orman na 1.4-1.6m visine na suvom, pristupačnom mestu. Za priključenje na mrežu zgrade koristite licenciranog električara. Jasno obeležite svaki prekidač u ormanu i u gruboj i u finalnoj fazi.`,
    desc_ru: `Установите новый распределительный щит достаточной ёмкости — минимум 24 модуля для двухкомнатной, 36+ для трёхкомнатной квартиры. Предусмотрите отдельную защиту УЗО для освещения, розеток, влажных зон и мощных потребителей. Размещайте щит на высоте 1.4–1.6 м в сухом, доступном месте. Подключение к домовой сети должен выполнять лицензированный электрик. Чётко промаркируйте каждый автомат на всех этапах работ.`,
    desc_zh: `安装容量充足的新配电箱——两居室至少24个模块，三居室36个以上。为照明、插座、潮湿区域和大功率电器分别设置独立的漏电保护器（RCD）。将配电箱安装在干燥、易于操作的位置，距地面高度1.4-1.6米。与建筑配电网络的连接须由持证电工操作。在粗装和精装阶段均须清晰标注每个断路器。`
  },
  "Run conduit and wire all circuits": {
    image: 'assets/images/task-sketches/sketch_electrical.png',
    icon: null,
    title_sr: "Polaganje cevi i provlačenje svih kablova",
    title_ru: "Прокладка труб и проводка всех цепей",
    title_zh: "敷设线管并为所有电路布线",
    desc_en: `Route corrugated conduit through walls and floors for all power, lighting, and data circuits. Use minimum 2.5mm2 wire for power circuits and 1.5mm2 for lighting. Keep strong current and weak current (data/TV) runs at least 30cm apart to prevent interference. Pull extra wire length at each box for easy termination. Photograph all cable routes before plastering — this map is invaluable for future maintenance and hanging heavy items.`,
    desc_sr: `Položite rebraste cevi kroz zidove i podove za sve strujne, svetlosne i podatkovne krugove. Koristite minimum 2.5mm2 žicu za utičnice i 1.5mm2 za osvetljenje. Držite jaku i slabu struju (podaci/TV) razdvojene najmanje 30cm da se spreče smetnje. Na svakoj dozni ostavite višak žice za lakše povezivanje. Fotografišite sve trase kablova pre malterisanja — ta mapa je neprocenjiva za buduće održavanje.`,
    desc_ru: `Проложите гофрированные трубы через стены и полы для всех силовых, осветительных и слаботочных цепей. Используйте кабель минимум 2.5 мм² для розеток и 1.5 мм² для освещения. Разделяйте силовые и слаботочные трассы (данные/ТВ) не менее чем на 30 см во избежание помех. В каждой коробке оставляйте запас кабеля для удобного подключения. Сфотографируйте все трассы кабелей до оштукатуривания — эта карта бесценна для будущего обслуживания.`,
    desc_zh: `在墙壁和地板中铺设波纹管，用于所有电力、照明和数据线路。插座回路使用最小截面2.5mm²的电线，照明回路使用1.5mm²。强电和弱电（数据/电视）线路至少保持30厘米间距以防止干扰。在每个接线盒处留足余量以便于接线。在抹灰前拍摄所有线管走向的照片——这张线路图对日后维护极为宝贵。`
  },
  "Install junction boxes and rough-in": {
    image: 'assets/images/task-sketches/sketch_electrical.png',
    icon: null,
    title_sr: "Ugradnja razvodnih kutija i grube instalacije",
    title_ru: "Установка распределительных коробок и черновка",
    title_zh: "安装接线盒和粗加工",
    desc_en: `Set all junction boxes, switch boxes, and outlet boxes at correct heights: switches at 110cm, outlets at 30cm, kitchen counter outlets at 115cm above finished floor. Use deep boxes (60mm) for outlets that will have USB or smart switches. Secure boxes flush with the final plaster line — too deep means face plates won't sit flat, too proud means they'll protrude. Verify box count against the electrical plan before closing walls.`,
    desc_sr: `Postavite sve razvodne kutije, prekidačke i utičnične dozne na pravilne visine: prekidači na 110cm, utičnice na 30cm, kuhinjske utičnice na 115cm od završnog poda. Koristite duboke dozne (60mm) za utičnice sa USB ili smart prekidačima. Pričvrstite dozne u ravan sa završnom linijom maltera — preduboke znače da maske neće nalegati, preplitke da će viri. Proverite broj dozni prema elektro planu pre zatvaranja zidova.`,
    desc_ru: `Устанавливайте все распределительные, выключательные и розеточные коробки на правильных высотах: выключатели — 110 см, розетки — 30 см, кухонные розетки — 115 см от чистого пола. Используйте глубокие коробки (60 мм) для розеток с USB или умными выключателями. Устанавливайте коробки заподлицо с линией чистой штукатурки — слишком глубокие означают, что рамки не прилягут; выступающие — что будут торчать. Сверьте количество коробок с электросхемой до закрытия стен.`,
    desc_zh: `按正确高度安装所有接线盒、开关盒和插座盒：开关距地110厘米，插座距地30厘米，厨房台面插座距地115厘米。带USB或智能开关的插座使用深型底盒（60mm）。将底盒安装与最终抹灰线齐平——过深会导致面板无法贴合，过浅则会突出墙面。在封墙前按电气图纸核对底盒数量。`
  },
  "Inspect rough electrical work": {
    image: 'assets/images/task-sketches/sketch_electrical.png',
    icon: null,
    title_sr: "Inspekcija grube elektro instalacije",
    title_ru: "Проверка черновых электромонтажных работ",
    title_zh: "检查粗电工工作",
    desc_en: `Conduct a thorough inspection of all rough electrical work before closing walls. Test continuity on every circuit, verify correct wire gauge per circuit breaker rating, and check grounding connections. Ensure all boxes are at correct depths and firmly secured. An independent electrician inspection can catch issues that are extremely expensive to fix after plastering. Document the inspection with dated photos and a sign-off sheet.`,
    desc_sr: `Izvršite temeljnu inspekciju svih grubih elektro radova pre zatvaranja zidova. Testirajte provodnost na svakom krugu, proverite presek žice prema osiguraču i proverite uzemljenja. Svi boksovi moraju biti na pravoj dubini i čvrsto fiksirani. Nezavisna inspekcija električara može otkriti probleme čija je popravka nakon malterisanja izuzetno skupa. Dokumentujte inspekciju datiranim fotografijama i potpisanim zapisnikom.`,
    desc_ru: `Выполните тщательную инспекцию всех скрытых электромонтажных работ до закрытия стен. Проверьте целостность каждой цепи, соответствие сечения кабеля номиналу автомата и качество соединений заземления. Все коробки должны быть на нужной глубине и надёжно закреплены. Независимая проверка электрика может выявить проблемы, исправление которых после оштукатуривания обойдётся очень дорого. Задокументируйте проверку датированными фото и подписанным актом.`,
    desc_zh: `在封墙前对所有粗装电气工程进行彻底检查。测试每条回路的导通性，核实电线截面与断路器额定值匹配，检查接地连接。所有底盒必须位于正确深度且固定牢固。独立电工检查可以发现抹灰后修复极为昂贵的问题。用带日期的照片和签署的验收单记录检查结果。`
  },

  // ── Plumbing Rough-In ──────────────────────────────────────────────────────
  "Run water supply lines": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Polaganje vodovodnih cevi",
    title_ru: "Прокладка водопроводных труб",
    title_zh: "铺设供水管线",
    desc_en: `Install new water supply lines using PPR (polypropylene) or PEX piping. PPR requires fusion welding and is rigid; PEX is flexible and faster to install with press fittings. Run hot and cold lines parallel with minimum 15cm separation. Insulate hot water pipes to reduce heat loss. Pressure test the complete system at 6 bar for 24 hours before closing walls — even a small leak behind a tiled wall means ripping everything out.`,
    desc_sr: `Položite nove vodovodne cevi koristeći PPR (polipropilen) ili PEX cevi. PPR zahteva fuziono zavarivanje i krut je; PEX je fleksibilan i brži za ugradnju sa press fitinzima. Vodite toplu i hladnu vodu paralelno sa razmakom od minimum 15cm. Izolirajte cevi tople vode za smanjenje gubitka toplote. Testirajte ceo sistem na 6 bara 24 sata pre zatvaranja zidova — čak i malo curenje iza pločica znači rušenje svega.`,
    desc_ru: `Прокладывайте новые трубы водоснабжения из PPR (полипропилена) или PEX. PPR требует сварки встык и жёсткий; PEX гибкий и быстрее монтируется с пресс-фитингами. Прокладывайте горячую и холодную воду параллельно с расстоянием не менее 15 см. Утепляйте трубы горячего водоснабжения для снижения теплопотерь. Проведите испытание всей системы давлением 6 бар в течение 24 часов до закрытия стен — даже небольшая течь за плиткой означает вскрытие всего покрытия.`,
    desc_zh: `使用PPR（聚丙烯）或PEX管材铺设新的供水管道。PPR需要热熔焊接且为硬管；PEX柔性更好，使用压接管件安装更快。冷热水管平行铺设，间距至少15厘米。对热水管进行保温以减少热量损失。封墙前以6巴压力对整个系统进行24小时压力测试——即使瓷砖后面有细微渗漏也意味着要拆除所有装修。`
  },
  "Install drain and waste lines": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Ugradnja kanalizacionih cevi",
    title_ru: "Установка канализационных труб",
    title_zh: "安装排水管线",
    desc_en: `Install PVC drain and waste pipes with correct fall — minimum 1-2% gradient toward the stack. Use 50mm pipe for sinks and 110mm for toilets. Include an access point or inspection tee at every direction change for future maintenance. Apply PVC cement on all joints and let cure for 30 minutes before testing. Pour water through each line to confirm free flow and check for leaks at every joint before concealing.`,
    desc_sr: `Ugradite PVC kanalizacione cevi sa pravilnim padom — minimum 1-2% nagiba ka vertikali. Koristite 50mm cev za lavaboe i 110mm za WC. Ugradite revizioni otvor na svakoj promeni pravca za buduće održavanje. Nanesite PVC lepak na sve spojeve i pustite da se stvrdne 30 minuta pre testiranja. Propustite vodu kroz svaku liniju da potvrdite slobodan protok i proverite curenje na svakom spoju pre zatvaranja.`,
    desc_ru: `Устанавливайте ПВХ-трубы канализации с правильным уклоном — не менее 1–2% в сторону стояка. Используйте трубу 50 мм для раковин и 110 мм для унитазов. Устанавливайте ревизионный тройник на каждом изменении направления для будущего обслуживания. Наносите ПВХ-клей на все соединения и давайте затвердеть 30 минут до испытания. Пролейте воду через каждую линию для подтверждения свободного тока и проверьте все соединения на течь.`,
    desc_zh: `安装PVC排水管道，保持正确坡度——向排水立管方向至少1-2%的落差。洗手盆使用50mm管，马桶使用110mm管。在每个转向处安装检修三通以便日后维护。在所有接头处涂抹PVC胶水，固化30分钟后再进行测试。向每条管线注水以确认水流畅通，在封堵前检查每个接头是否有渗漏。`
  },
  "Rough-in bathroom plumbing": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Gruba vodoinstalacija kupatila",
    title_ru: "Черновая сантехника в ванной",
    title_zh: "浴室粗管工程",
    desc_en: `Position all water supply and drain points for toilet, sink, shower, and bathtub according to the fixture layout plan. Install the concealed cistern frame (Geberit or similar) and verify it is level and at correct height. Set the shower drain at the proper depth to allow for screed and tile thickness. All pipe positions must be measured from finished wall line, not raw wall. Pressure test before any wall closing.`,
    desc_sr: `Pozicionirajte sve vodovodne priključke i odvode za WC, lavabo, tuš i kadu prema planu rasporeda sanitarija. Ugradite podžbukni ram za vodokotlić (Geberit ili slično) i proverite da je u nivou na pravilnoj visini. Postavite tuš slivnik na pravilnu dubinu uzimajući u obzir debljinu košuljice i pločica. Sve pozicije cevi mere se od linije završnog zida, ne od sirovog. Uradite test pritiska pre zatvaranja zidova.`,
    desc_ru: `Расположите все точки подачи воды и слива для унитаза, раковины, душа и ванны согласно плану расстановки сантехники. Установите инсталляцию для скрытого бачка (Geberit или аналог) и убедитесь, что она горизонтальна и на правильной высоте. Установите трап для душа на нужную глубину с учётом толщины стяжки и плитки. Все позиции труб измеряются от линии чистовой стены, а не черновой. Выполните испытание давлением до закрытия стен.`,
    desc_zh: `按照洁具布局图定位马桶、洗手盆、淋浴和浴缸的所有给水点和排水点。安装隐藏式水箱框架（Geberit或同等产品）并确认水平且高度正确。考虑到找平层和瓷砖的厚度，将淋浴地漏安装在正确深度。所有管道位置均从完成面墙线而非粗坯墙面量取。封墙前进行压力测试。`
  },
  "Rough-in kitchen plumbing": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Gruba vodoinstalacija kuhinje",
    title_ru: "Черновая сантехника на кухне",
    title_zh: "厨房粗管工程",
    desc_en: `Run hot and cold water supply and a drain line to the kitchen sink position. Add a separate cold supply for the dishwasher (typically left side under counter). Position the drain stub 40cm above floor and centered under the sink cabinet. Install an isolation valve for each appliance to allow independent servicing. If a gas connection is needed for the cooktop, route gas pipe with proper slope and test for leaks with soapy water.`,
    desc_sr: `Sprovedite toplu i hladnu vodu i odvod do pozicije kuhinjske sudopere. Dodajte poseban priključak hladne vode za mašinu za sudove (obično levo ispod pulta). Pozicionirajte odvodni nastavak na 40cm od poda centriran ispod elementa sudopere. Ugradite zaporni ventil za svaki uređaj radi nezavisnog servisiranja. Ako je potreban gasni priključak za ploču, vodite gasnu cev sa pravilnim nagibom i testirajte curenje sapunicom.`,
    desc_ru: `Подведите горячую и холодную воду и слив к месту расположения кухонной мойки. Добавьте отдельный отвод холодной воды для посудомоечной машины (как правило, слева под столешницей). Расположите канализационный патрубок на высоте 40 см от пола, по центру под шкафом мойки. Установите запорный вентиль для каждого прибора. Если требуется газовый подвод для варочной панели, прокладывайте газовую трубу с нужным уклоном и проверяйте на утечку мыльным раствором.`,
    desc_zh: `将冷热水供水管和排水管引至厨房水槽位置。在水槽柜左侧下方为洗碗机单独接一路冷水。排水管接口距地面40厘米，置于水槽柜中央正下方。为每个器具安装独立截止阀以便单独维修。如果灶台需要燃气接口，铺设燃气管时保持适当坡度，并用肥皂水检查接头是否漏气。`
  },
  "Rough-in two bathrooms": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Gruba instalacija za dva kupatila",
    title_ru: "Черновая сантехника для двух ванных",
    title_zh: "两个浴室粗管工程",
    desc_en: `When two bathrooms share the same riser stack, coordinate drain tie-in heights carefully to prevent cross-flow. Each bathroom needs independent shutoff valves. Run dedicated hot water loops if the distance from the boiler exceeds 5 meters to avoid long wait times for hot water. Stagger the rough-in schedule so both bathrooms can be pressure-tested simultaneously. Label all pipe ends clearly — B1 and B2 — to avoid mix-ups during fixture installation.`,
    desc_sr: `Kada dva kupatila dele isti vertikalni razvod, pažljivo koordinirajte visine priključaka odvoda da sprečite unakrsni tok. Svako kupatilo treba nezavisne zaporone ventile. Sprovedite zasebne petlje tople vode ako je udaljenost od bojlera veća od 5m da izbegnete dugo čekanje. Uskladite raspored grube instalacije da oba kupatila mogu biti testirana na pritisak istovremeno. Jasno obeležite sve krajeve cevi — K1 i K2 — da izbegnete zabune pri montaži.`,
    desc_ru: `Когда две ванные комнаты используют один стояк, тщательно координируйте высоты врезок канализации, чтобы предотвратить перекрёстный ток. Каждая ванная должна иметь независимые запорные вентили. Прокладывайте отдельные петли горячего водоснабжения, если расстояние от бойлера превышает 5 м. Синхронизируйте график черновых работ, чтобы обе ванные можно было тестировать одновременно. Чётко маркируйте концы труб — В1 и В2 — во избежание путаницы при монтаже.`,
    desc_zh: `当两个卫生间共用同一排水立管时，仔细协调排水接口的高度以防止反流。每个卫生间须有独立的截止阀。若距热水器超过5米，需铺设独立的热水循环管路以避免长时间等待热水。协调粗装进度，使两个卫生间能同时进行压力测试。清晰标记所有管道接头——W1和W2——以避免安装时混淆。`
  },

  // ── HVAC ───────────────────────────────────────────────────────────────────
  "Install radiant floor heating": {
    image: 'assets/images/task-sketches/sketch_hvac.png',
    icon: null,
    title_sr: "Ugradnja podnog grejanja",
    title_ru: "Установка теплого пола",
    title_zh: "安装地暖",
    desc_en: `Install either water-based (hydronic) or electric underfloor heating depending on the heat source. For hydronic systems, lay 16mm PEX pipe in spiral or serpentine patterns at 10-15cm spacing. Apply thermal insulation board beneath and edge insulation strip around the perimeter. Perform a pressure test at 6 bar for 48 hours before pouring screed. Never drive nails or screws into the floor without checking the heating layout map.`,
    desc_sr: `Ugradite vodno (hidronično) ili električno podno grejanje zavisno od izvora toplote. Za hidronične sisteme, položite PEX cev 16mm u spiralnom ili serpentinskom rasporedu na razmaku 10-15cm. Postavite termoizolacionu ploču ispod i ivičnu izolacionu traku po obodu. Izvršite test pritiska na 6 bara 48 sati pre izlivanja košuljice. Nikada ne zabijajte eksere ili zavrtnje u pod bez provere mape podnog grejanja.`,
    desc_ru: `Устанавливайте водяную (гидравлическую) или электрическую систему тёплого пола в зависимости от источника тепла. Для гидравлических систем укладывайте трубу PEX 16 мм спиральным или змеевидным способом с шагом 10–15 см. Укладывайте теплоизоляционную плиту снизу и демпферную ленту по периметру. Проводите испытание давлением 6 бар в течение 48 часов до заливки стяжки. Никогда не забивайте гвозди или шурупы в пол, не сверившись со схемой тёплого пола.`,
    desc_zh: `根据热源类型安装水暖（液压式）或电热地暖系统。水暖系统使用16mm PEX管，以螺旋或蛇形方式铺设，间距10-15厘米。下方铺设隔热板，周边铺设膨胀缓冲条。浇筑找平层前以6巴压力进行48小时压力测试。在未查阅地暖铺设图的情况下，切勿在地面上打钉或拧螺丝。`
  },
  "Install HVAC units and ductwork": {
    image: 'assets/images/task-sketches/sketch_hvac.png',
    icon: null,
    title_sr: "Ugradnja klima uređaja i kanala",
    title_ru: "Установка систем кондиционирования и воздуховодов",
    title_zh: "安装暖通空调装置和风管",
    desc_en: `Mount indoor units at correct height (typically 15-20cm below ceiling) with adequate clearance for airflow and filter access. Route refrigerant lines through walls with proper insulation and slope for condensate drainage. The outdoor unit needs a solid bracket on the facade with vibration dampeners. Size ductwork for the BTU capacity — undersized ducts cause noise and reduced efficiency. Run condensate drain lines with minimum 1% fall to prevent backflow.`,
    desc_sr: `Montirajte unutrašnje jedinice na pravilnu visinu (obično 15-20cm ispod plafona) sa dovoljnim razmakom za protok vazduha i pristup filteru. Sprovedite freonske cevi kroz zidove sa pravilnom izolacijom i nagibom za odvod kondenzata. Spoljna jedinica treba čvrst nosač na fasadi sa anti-vibracionim podloškama. Dimenzionišite kanale prema BTU kapacitetu — preuski kanali stvaraju buku i smanjuju efikasnost. Vodite odvod kondenzata sa min. 1% pada.`,
    desc_ru: `Монтируйте внутренние блоки на правильной высоте (обычно 15–20 см ниже потолка) с достаточным зазором для циркуляции воздуха и доступа к фильтру. Прокладывайте трубки хладагента через стены с надлежащей теплоизоляцией и уклоном для слива конденсата. Наружный блок требует прочного кронштейна на фасаде с виброизоляторами. Подбирайте воздуховоды по мощности в BTU — заниженные воздуховоды создают шум и снижают эффективность. Дренаж конденсата прокладывайте с уклоном не менее 1%.`,
    desc_zh: `将室内机安装在正确高度（通常距天花板15-20厘米），确保有足够的气流空间和滤网清洗通道。制冷剂管道穿墙时需妥善保温并保持适当坡度以排出冷凝水。室外机需要在外墙安装稳固的支架并加装防振垫。根据BTU容量设计风管尺寸——风管过细会产生噪音并降低效率。冷凝水排水管保持至少1%的坡度。`
  },
  "Thermostat installation and setup": {
    image: 'assets/images/task-sketches/sketch_hvac.png',
    icon: null,
    title_sr: "Ugradnja i podešavanje termostata",
    title_ru: "Установка и настройка термостата",
    title_zh: "恒温器安装和设置",
    desc_en: `Mount the thermostat at 1.5m height on an interior wall, away from direct sunlight, drafts, and heat sources. For underfloor heating, use a thermostat with both air and floor temperature sensors. Connect according to the manufacturer wiring diagram — incorrect wiring can damage the heating system controller. Program heating schedules to match occupancy patterns. Test the full heating cycle: set temperature, verify the system activates and deactivates at correct thresholds.`,
    desc_sr: `Montirajte termostat na 1.5m visine na unutrašnjem zidu, dalje od direktne sunčeve svetlosti, promaje i izvora toplote. Za podno grejanje koristite termostat sa senzorom i vazduha i poda. Povežite prema šemi proizvođača — pogrešno povezivanje može oštetiti kontroler. Programirajte raspored grejanja prema korišćenju prostora. Testirajte kompletan ciklus: zadajte temperaturu, potvrdite da se sistem uključuje i isključuje na pravim pragovima.`,
    desc_ru: `Устанавливайте термостат на высоте 1.5 м на внутренней стене, вдали от прямых солнечных лучей, сквозняков и источников тепла. Для тёплого пола используйте термостат с датчиками и воздуха, и пола. Подключайте согласно схеме производителя — неправильное подключение может повредить контроллер. Запрограммируйте расписание отопления под режим использования помещений. Проверьте полный цикл: задайте температуру, убедитесь, что система включается и отключается на нужных порогах.`,
    desc_zh: `将温控器安装在内墙高度1.5米处，远离直射阳光、穿堂风和热源。地暖系统使用同时具有空气温度传感器和地面温度传感器的温控器。按照厂家接线图连接——接线错误可能损坏加热控制器。根据房间使用规律设置加热时间表。测试完整循环：设定温度，确认系统在正确阈值下启动和关闭。`
  },

  // ── Windows ────────────────────────────────────────────────────────────────
  "Remove old windows and frames": {
    image: 'assets/images/task-sketches/sketch_windows.png',
    icon: null,
    title_sr: "Demontaža starih prozora i okvira",
    title_ru: "Демонтаж старых окон и рам",
    title_zh: "拆除旧窗户和框架",
    desc_en: `Remove old window sashes first, then carefully extract frames from the opening. Old wooden frames may be screwed, nailed, or cemented — use a reciprocating saw to cut through fixings if needed. Protect interior floors and walls from debris during removal. Measure the rough opening precisely after frame removal — never order new windows from old measurements, as openings may have shifted. Cover openings with temporary plastic sheeting if there's a gap before new window installation.`,
    desc_sr: `Prvo skinite stara krila prozora, zatim pažljivo izvadite okvire iz otvora. Stari drveni okviri mogu biti zavrnuti, zakovani ili cementirani — koristite sabljasti pilu za presecanje veziva. Zaštitite unutrašnje podove i zidove od šuta tokom demontaže. Izmerite grub otvor precizno nakon vađenja okvira — nikad ne naručujte nove prozore po starim merama jer se otvori mogu pomeriti. Pokrijte otvore privremenom folijom do ugradnje.`,
    desc_ru: `Сначала снимите старые оконные створки, затем аккуратно извлеките рамы из проёмов. Старые деревянные рамы могут быть прикручены, прибиты или зацементированы — используйте сабельную пилу для перерезания крепежей. Защитите полы и стены от мусора во время демонтажа. Точно измерьте проём после извлечения рамы — никогда не заказывайте новые окна по старым размерам, так как проёмы могут измениться. Накройте проёмы временной плёнкой до установки.`,
    desc_zh: `先拆除旧窗扇，再小心地从洞口取出窗框。旧木窗框可能是螺丝固定、钉装或水泥浇筑的——使用往复锯切断固定件。拆除过程中保护室内地板和墙面免受碎片损坏。取出窗框后精确测量粗口尺寸——切勿按旧尺寸订购新窗，因为洞口尺寸可能已发生变化。安装前用临时塑料薄膜封堵洞口。`
  },
  "Install new PVC or wood windows": {
    image: 'assets/images/task-sketches/sketch_windows.png',
    icon: null,
    title_sr: "Ugradnja novih PVC ili drvenih prozora",
    title_ru: "Установка новых окон из ПВХ или дерева",
    title_zh: "安装新PVC或木窗",
    desc_en: `Set the window frame in the opening with minimum 10mm gap on each side for expansion foam. Level the frame using plastic packers — never use wooden wedges as they can swell. Secure with frame fixings at maximum 70cm intervals on each side. Apply low-expansion polyurethane foam in the gap. Once foam cures, trim excess and apply vapor barrier tape on the interior side and weather-resistant tape on the exterior. Test that all sashes open, close, and lock smoothly.`,
    desc_sr: `Postavite okvir prozora u otvor sa razmakom od minimum 10mm sa svake strane za ekspanzionu penu. Nivelišite okvir plastičnim podloškama — nikad ne koristite drvene klinove jer mogu da nabubre. Pričvrstite anker vijcima na max 70cm razmaka sa svake strane. Nanesite niskoekspanzionu poliuretansku penu. Kad se pena stvrdne, odsecite višak i nanesite parnu branu sa unutrašnje i vremenski otpornu traku sa spoljne strane. Testirajte otvaranje i zaključavanje.`,
    desc_ru: `Устанавливайте раму в проём с зазором не менее 10 мм с каждой стороны под монтажную пену. Выравнивайте раму пластиковыми клиньями — никогда не используйте деревянные, так как они могут разбухнуть. Крепите анкерными болтами с шагом не более 70 см с каждой стороны. Наносите монтажную пену с низким расширением. После отвердевания срежьте излишки и нанесите пароизоляционную ленту изнутри и атмосферостойкую ленту снаружи. Проверьте открывание и закрывание всех створок.`,
    desc_zh: `将窗框安装在洞口中，每侧预留至少10毫米的膨胀泡沫间隙。用塑料垫片校平窗框——切勿使用木楔，因为木楔可能会膨胀变形。每侧以不超过70厘米的间距用框架固定螺栓固定。填充低膨胀聚氨酯泡沫。泡沫固化后裁去多余部分，室内侧贴防水蒸气隔离带，室外侧贴防风雨密封带。测试所有扇的开启、关闭和锁定是否顺畅。`
  },
  "Seal and insulate around frames": {
    image: 'assets/images/task-sketches/sketch_windows.png',
    icon: null,
    title_sr: "Zaptivanje i izolacija oko okvira",
    title_ru: "Герметизация и изоляция вокруг рам",
    title_zh: "框架周围密封和隔热",
    desc_en: `Apply three layers of sealing: inner vapor barrier, insulation foam in the gap, and outer weather seal. Use EPDM or butyl rubber tape for the exterior weather barrier. On the interior, use airtight tape or acrylic sealant to prevent condensation in the joint. Ensure the windowsill has proper drainage slope (minimum 3 degrees outward). Poor sealing is the number one cause of mold around windows — invest time here to prevent years of problems.`,
    desc_sr: `Nanesite tri sloja zaptivanja: unutrašnja parna brana, izolaciona pena u šupljini i spoljni vremenski zaptivač. Koristite EPDM ili butil gumenu traku za spoljnu zaštitu. Sa unutrašnje strane koristite hermetičku traku ili akrilni kit da sprečite kondenzaciju u spoju. Prozorska klupica mora imati pravilan pad (minimum 3 stepena napolje). Loše zaptivanje je uzrok broj jedan pojave buđi oko prozora — uložite vreme ovde da sprečite godine problema.`,
    desc_ru: `Наносите три слоя герметизации: внутренняя пароизоляция, монтажная пена в зазоре и наружный атмосферостойкий уплотнитель. Используйте EPDM или бутилкаучуковую ленту для наружной защиты. Изнутри используйте герметичную ленту или акриловый герметик для предотвращения конденсации в шве. Подоконник должен иметь правильный уклон (не менее 3 градусов наружу). Плохая герметизация — главная причина появления плесени вокруг окон — уделите этому время, чтобы избежать проблем на годы вперёд.`,
    desc_zh: `施加三层密封：室内防水蒸气隔离层、间隙中的隔热泡沫和室外防风雨密封层。室外防护使用EPDM或丁基橡胶密封带。室内侧使用气密胶带或丙烯酸密封胶防止接缝处产生冷凝水。窗台必须有适当的排水坡度（向外至少3度）。密封不良是窗户周围出现霉菌的首要原因——在此处投入时间，可避免多年的麻烦。`
  },

  // ── Plastering ─────────────────────────────────────────────────────────────
  "Repair and level walls": {
    image: 'assets/images/task-sketches/sketch_plastering.png',
    icon: null,
    title_sr: "Popravka i nivelisanje zidova",
    title_ru: "Ремонт и выравнивание стен",
    title_zh: "修补找平墙面",
    desc_en: `Assess all walls with a 2-meter straight edge to identify high and low spots. Fill deep depressions (over 10mm) with repair mortar in layers, allowing each layer to dry. Hack off bulges with a bolster chisel. Apply bonding agent (e.g., Ceresit CC 81) to smooth concrete surfaces to ensure plaster adhesion. Use metal corner beads on all external corners for a clean, durable edge. This prep work determines the final quality of every visible surface.`,
    desc_sr: `Procenite sve zidove ravnjakom od 2 metra da identifikujete ispupčenja i udubljenja. Dublje depresije (preko 10mm) popunite reparaturnim malterom u slojevima, puštajući svaki da se osuši. Obijte izbočine širokim dletom. Nanesite vezivno sredstvo (npr. Ceresit CC 81) na glatke betonske površine za bolju adheziju maltera. Koristite metalne ugaone lajsne na svim spoljnim uglovima za čist i trajan rub. Ova priprema određuje finalni kvalitet.`,
    desc_ru: `Проверьте все стены 2-метровым правилом для выявления выступов и впадин. Глубокие впадины (более 10 мм) заполняйте ремонтным раствором послойно, давая каждому слою высохнуть. Сбейте выступы широким зубилом. Нанесите адгезионную грунтовку (например, Ceresit CC 81) на гладкие бетонные поверхности для улучшения сцепления штукатурки. Используйте металлические угловые профили на всех внешних углах для чистого и долговечного ребра. Эта подготовка определяет итоговое качество.`,
    desc_zh: `用2米靠尺检查所有墙面，找出凸起和凹陷处。较深的凹陷（超过10mm）用修补砂浆分层填平，每层充分干燥后再施下一层。用宽凿清除凸起部位。在光滑混凝土表面涂抹粘结剂（如Ceresit CC 81）以提高抹灰粘附力。所有外角安装金属护角条以获得整洁耐久的棱角。这道准备工序直接决定了所有可见面的最终质量。`
  },
  "Apply base coat plaster": {
    image: 'assets/images/task-sketches/sketch_plastering.png',
    icon: null,
    title_sr: "Nanošenje grubog sloja maltera",
    title_ru: "Нанесение базовой штукатурки",
    title_zh: "涂抹底漆抹灰",
    desc_en: `Apply base coat plaster (cement-lime or gypsum-based) to a thickness of 10-15mm using metal screeds as guides. Work in sections of 2-3 square meters, applying with a hawk and trowel, then leveling with an H-rule. Keep the room temperature above 5C and below 30C during application. Mist brick walls with water before application to prevent rapid moisture absorption. Allow 24-48 hours of drying per 10mm thickness before applying the finish coat.`,
    desc_sr: `Nanesite grubi malter (cement-kreč ili gips baza) u debljini 10-15mm koristeći metalne lajsne kao vodiče. Radite u sekcijama od 2-3 m2, nanoseći gleđalicom i ravnajući H-letvom. Temperatura prostorije mora biti iznad 5°C i ispod 30°C. Ovlažite zidane zidove vodom pre nanošenja da sprečite brzo upijanje vlage. Pustite 24-48 sati sušenja na svakih 10mm debljine pre nanošenja završnog sloja.`,
    desc_ru: `Наносите базовый штукатурный слой (цементно-известковый или гипсовый) толщиной 10–15 мм, используя металлические маяки в качестве ориентиров. Работайте участками по 2–3 м², нанося смесь тёркой и разравнивая H-правилом. Температура в помещении должна быть выше 5°С и ниже 30°С. Увлажняйте кирпичные стены водой перед нанесением, чтобы предотвратить быстрое поглощение влаги. Давайте 24–48 часов на каждые 10 мм толщины до нанесения финишного слоя.`,
    desc_zh: `使用金属灰饼作为参考，涂抹10-15mm厚的基层抹灰（水泥石灰砂浆或石膏基底）。每次施工2-3平方米区域，用抹灰板涂抹后用H形铝合金刮尺找平。施工时室温须高于5°C且低于30°C。施工前用水润湿砖砌墙面以防止砂浆水分被快速吸收。每10mm厚度允许干燥24-48小时后再施涂面层。`
  },
  "Skim coat and smooth finish": {
    image: 'assets/images/task-sketches/sketch_plastering.png',
    icon: null,
    title_sr: "Gletovanje i završna obrada",
    title_ru: "Шпаклевка и гладкая отделка",
    title_zh: "找平和光滑饰面",
    desc_en: `Apply a thin skim coat (1-3mm) of finishing plaster over the base coat to achieve a smooth, paint-ready surface. Use a wide stainless steel trowel (40-60cm) for a flat finish with minimal marks. Apply two passes: the first to fill, the second to smooth. Sand lightly with 120-grit paper once dry, using a pole sander for consistent pressure. Wear a dust mask during sanding. A perfectly smooth skim coat eliminates the need for excessive paint coats.`,
    desc_sr: `Nanesite tanki sloj glet mase (1-3mm) preko grubog maltera za glatku površinu spremnu za farbanje. Koristite široku inox gleđalicu (40-60cm) za ravnu završnu obradu sa minimalnim tragovima. Nanesite u dva prolaza: prvi za popunjavanje, drugi za zaglađivanje. Lagano brusiti sa 120-gridom nakon sušenja, koristeći šipku za brusilicu za ravnomeran pritisak. Nosite masku za prašinu pri brušenju. Savršeno gletovanje eliminiše potrebu za previše slojeva farbe.`,
    desc_ru: `Нанесите тонкий выравнивающий слой шпаклёвки (1–3 мм) поверх базовой штукатурки для получения гладкой поверхности, готовой к покраске. Используйте широкий нержавеющий шпатель (40–60 см) для ровного нанесения с минимальными следами. Наносите в два прохода: первый — для заполнения, второй — для разглаживания. После высыхания слегка отшлифуйте бумагой зернистостью 120, используя шлифовальную штангу для равномерного давления. Идеальная шпаклёвка устраняет необходимость в многочисленных слоях краски.`,
    desc_zh: `在基层抹灰上涂抹1-3mm厚的腻子层，获得平整光滑、可直接涂刷油漆的表面。使用宽幅不锈钢刮板（40-60cm）进行平整收光，尽量减少刮痕。分两遍涂抹：第一遍填平，第二遍收光。干燥后用120目砂纸配合磨板轻轻打磨，保持均匀压力。打磨时佩戴防尘口罩。完美的腻子层可减少油漆涂层数量，节省涂料。`
  },

  // ── Floor Screed ───────────────────────────────────────────────────────────
  "Prepare substrate": {
    image: 'assets/images/task-sketches/sketch_screed.png',
    icon: null,
    title_sr: "Priprema podloge",
    title_ru: "Подготовка основания",
    title_zh: "准备基层",
    desc_en: `Clean the structural slab thoroughly — remove all dust, debris, and loose material. Apply a primer or bonding agent for adhesion between the slab and new screed. Install perimeter insulation strips around all walls to allow for thermal expansion. If underfloor heating is present, verify all circuits are pressure-tested and documented. Place any required sound insulation or waterproof membrane before screed. This preparation directly impacts the durability and flatness of the final floor.`,
    desc_sr: `Temeljno očistite nosću ploču — uklonite svu prašinu, šut i rastresiti materijal. Nanesite prajmer ili vezivno sredstvo za adheziju između ploče i nove košuljice. Ugradite ivičnu izolacionu traku oko svih zidova za termalno širenje. Ako je podno grejanje prisutno, proverite da su sva kola testirana na pritisak. Postavite zvučnu izolaciju ili hidroizolacionu membranu pre košuljice. Ova priprema direktno utiče na trajnost i ravnost završnog poda.`,
    desc_ru: `Тщательно очистите несущее перекрытие — удалите всю пыль, мусор и рыхлый материал. Нанесите грунтовку или адгезионную эмульсию для сцепления между плитой и новой стяжкой. Установите демпферную ленту по периметру вдоль всех стен для компенсации теплового расширения. При наличии тёплого пола убедитесь, что все контуры прошли испытание давлением. Уложите звукоизоляцию или гидроизоляционную мембрану до стяжки. Эта подготовка напрямую влияет на долговечность и ровность готового пола.`,
    desc_zh: `彻底清洁结构楼板——清除所有灰尘、碎屑和松散材料。涂抹底漆或粘结剂，确保楼板与新找平层之间的附着力。沿所有墙根铺设膨胀缓冲条以允许热胀冷缩。如有地暖，确认所有回路已通过压力测试。在浇筑找平层前铺设隔音层或防水卷材。这道准备工序直接影响最终地面的耐久性和平整度。`
  },
  "Pour self-leveling screed": {
    image: 'assets/images/task-sketches/sketch_screed.png',
    icon: null,
    title_sr: "Izlivanje samonivelirajuće košuljice",
    title_ru: "Заливка самовыравнивающейся стяжки",
    title_zh: "浇筑自流平砂浆",
    desc_en: `Mix self-leveling compound according to manufacturer specifications — incorrect water ratio causes cracking or poor strength. Pour in a continuous flow from one corner, working across the room. Use a spiked roller to release trapped air bubbles and achieve an even surface. Work quickly — most self-leveling compounds have a 20-30 minute working time. Keep foot traffic off for a minimum of 24 hours and wait 3-7 days before installing floor coverings depending on thickness.`,
    desc_sr: `Mešajte samonivelirajuću masu prema uputstvu proizvođača — pogrešan odnos vode uzrokuje pucanje ili slabu čvrstoću. Izlivajte u neprekidnom toku iz jednog ugla, krećući se kroz prostoriju. Koristite nazubljeni valjak za oslobađanje zarobljenih mehurića vazduha. Radite brzo — većina masa ima radno vreme od 20-30 minuta. Ne hodajte minimum 24 sata i sačekajte 3-7 dana pre postavljanja podnih obloga zavisno od debljine.`,
    desc_ru: `Готовьте самовыравнивающуюся смесь строго по инструкции производителя — неправильное соотношение воды вызывает растрескивание или потерю прочности. Заливайте непрерывным потоком из одного угла, продвигаясь по комнате. Используйте шипованный валик для выпуска пузырьков воздуха. Работайте быстро — у большинства смесей время жизни 20–30 минут. Не ходите минимум 24 часа и ожидайте 3–7 дней до укладки напольных покрытий в зависимости от толщины.`,
    desc_zh: `严格按照厂家说明书配制自流平砂浆——水灰比不当会导致开裂或强度不足。从一个角落连续不断地倾倒，逐步覆盖整个房间。用带刺滚筒排出气泡以获得均匀平整的表面。快速作业——大多数自流平砂浆的操作时间为20-30分钟。至少24小时内禁止踩踏，根据厚度不同，铺装地面材料前须等待3-7天。`
  },
  "Check levels and grind high spots": {
    image: 'assets/images/task-sketches/sketch_screed.png',
    icon: null,
    title_sr: "Provera nivoa i brušenje visokih tačaka",
    title_ru: "Проверка уровня и шлифовка",
    title_zh: "检查水平并打磨高处",
    desc_en: `Check the entire floor surface with a 2-meter straightedge and laser level. Maximum allowable deviation is 2mm per meter for tile and 3mm per meter for laminate. Mark high spots with chalk and grind them down with a concrete grinder. Fill any low spots with thin patching compound. Recheck after grinding. This step is critical — uneven screed causes tiles to crack, laminate to bounce, and doors to stick. Allow dust to settle and vacuum before proceeding.`,
    desc_sr: `Proverite celu površinu poda ravnjakom od 2 metra i laserskim nivelirima. Maksimalno dozvoljeno odstupanje je 2mm po metru za pločice i 3mm za laminat. Obeležite visoke tačke kredom i poravnajte ih brusilom za beton. Popunite niske tačke tankim reparaturnim malterom. Ponovo proverite nakon brušenja. Ovaj korak je ključan — neravan pod uzrokuje pucanje pločica, poskakivanje laminata i zaglavljivanje vrata. Usisajte prašinu pre nastavka.`,
    desc_ru: `Проверьте всю поверхность пола 2-метровым правилом и лазерным нивелиром. Максимально допустимое отклонение составляет 2 мм на метр для плитки и 3 мм для ламината. Отметьте высокие места мелом и сошлифуйте их шлифовальной машиной по бетону. Заполните впадины тонким ремонтным раствором. Повторно проверьте после шлифовки. Этот шаг критически важен — неровная стяжка вызывает растрескивание плитки, пружинение ламината и заедание дверей. Пропылесосьте поверхность перед следующим этапом.`,
    desc_zh: `用2米靠尺和激光水平仪检查整个地面。瓷砖铺装允许的最大误差为每米2mm，复合地板为每米3mm。用粉笔标记高点并用混凝土打磨机磨平。低洼处用薄层修补砂浆填充。打磨后重新检测。这道工序至关重要——不平的找平层会导致瓷砖开裂、复合地板弹跳和门扇卡涩。继续下道工序前用吸尘器清除灰尘。`
  },

  // ── Tiling ─────────────────────────────────────────────────────────────────
  "Tile bathroom floor and walls": {
    image: 'assets/images/task-sketches/sketch_tiling.png',
    icon: null,
    title_sr: "Postavljanje pločica u kupatilu — pod i zidovi",
    title_ru: "Укладка плитки на пол и стены ванной",
    title_zh: "贴浴室地砖和墙砖",
    desc_en: `Start wall tiling from the second row up, using a temporary batten as a level guide. Tile the floor last to catch wall tile drips. Use 3mm spacers for a consistent grout line. Apply flexible tile adhesive (C2TE class) in wet areas. Waterproof the shower zone and floor with liquid membrane before tiling. Ensure proper slope toward floor drain — 1.5-2% gradient. Cut tiles with a wet saw for clean edges. Mix only enough adhesive for 30 minutes of work.`,
    desc_sr: `Počnite zidno lepljenje od drugog reda naviše, koristeći privremenu letvu kao vodič nivoa. Pod lepite poslednji da uhvatite kapi sa zidnih pločica. Koristite distancere od 3mm za ravnomernu fugu. U vlažnim zonama koristite fleksibilni lepak (C2TE klasa). Pre lepljenja nanesite tečnu hidroizolaciju na tuš zonu i pod. Obezbedite pravilni pad ka slivniku — 1.5-2%. Secite pločice mokrim rezačem. Mešajte lepak samo za 30 minuta rada.`,
    desc_ru: `Начинайте укладку настенной плитки со второго ряда снизу, используя временную направляющую рейку как ориентир уровня. Напольную плитку укладывайте последней, чтобы уловить капли от настенной. Используйте крестики 3 мм для равномерных швов. Во влажных зонах применяйте эластичный клей класса C2TE. Перед укладкой нанесите жидкую гидроизоляцию на душевую зону и пол. Обеспечьте уклон к трапу 1,5–2%. Режьте плитку влажным резчиком. Готовьте клей только на 30 минут работы.`,
    desc_zh: `墙面贴砖从第二排开始向上铺贴，以临时水平导轨为基准线。地砖最后铺贴以接住墙砖的滴落。使用3mm十字卡保持均匀缝隙。潮湿区域使用C2TE级柔性瓷砖胶。贴砖前在淋浴区和地面涂刷液体防水层。确保坡向地漏的坡度为1.5-2%。用湿切割机切割瓷砖。每次只调配30分钟用量的瓷砖胶。`
  },
  "Tile first bathroom floor and walls": {
    image: 'assets/images/task-sketches/sketch_tiling.png',
    icon: null,
    title_sr: "Pločice u prvom kupatilu — pod i zidovi",
    title_ru: "Укладка плитки на пол и стены первой ванной",
    title_zh: "贴第一间浴室地砖和墙砖",
    desc_en: `Apply liquid waterproofing membrane on the entire bathroom floor and shower walls up to 200cm height. Start wall tiling from the second row using a level batten, working upward. Use notched trowel size matched to tile size — 8mm for tiles up to 30x30cm, 10mm for larger. Verify vertical plumb every 3-4 rows. Floor tiles should have anti-slip rating R10 or higher. Allow 24 hours before grouting. This bathroom sets the quality standard for the second.`,
    desc_sr: `Nanesite tečnu hidroizolaciju na ceo pod kupatila i zidove tuš zone do 200cm visine. Počnite zidno lepljenje od drugog reda uz letvu za nivo, radeći naviše. Koristite nazubljenu gleđalicu prilagođenu veličini pločice — 8mm do 30x30cm, 10mm za veće. Proveravajte vertikalu svakih 3-4 reda. Podne pločice moraju imati anti-slip ocenu R10 ili višu. Sačekajte 24 sata pre fugovanja. Ovo kupatilo postavlja standard kvaliteta za drugo.`,
    desc_ru: `Нанесите жидкую гидроизоляцию на весь пол ванной и стены душевой зоны до высоты 200 см. Начинайте укладку настенной плитки со второго ряда по направляющей рейке, работая вверх. Используйте зубчатый шпатель, подобранный под размер плитки — 8 мм для плиток до 30×30 см, 10 мм для больших. Проверяйте вертикаль каждые 3–4 ряда. Напольная плитка должна иметь противоскользящий класс R10 или выше. Ждите 24 часа перед затиркой. Эта ванная задаёт стандарт качества для второй.`,
    desc_zh: `在卫生间整个地面和淋浴区墙面200cm高度以内涂刷液体防水层。从第二排开始向上沿水平导轨铺贴墙砖。根据瓷砖尺寸选用合适的锯齿形刮板——30×30cm以内用8mm，更大的砖用10mm。每铺3-4排检查一次垂直度。地砖防滑等级须达到R10或以上。等待24小时后再进行填缝。第一个卫生间为第二个的施工质量树立标准。`
  },
  "Tile second bathroom floor and walls": {
    image: 'assets/images/task-sketches/sketch_tiling.png',
    icon: null,
    title_sr: "Pločice u drugom kupatilu — pod i zidovi",
    title_ru: "Укладка плитки на пол и стены второй ванной",
    title_zh: "贴第二间浴室地砖和墙砖",
    desc_en: `Follow the same waterproofing and tiling procedures as the first bathroom. If using the same tile across both bathrooms, verify dye lot numbers match to avoid color variation. Apply lessons learned from the first bathroom — adjust spacer size, adhesive mix, or layout if needed. Coordinate with the plumber so pipe stub positions align with tile layout. Pay extra attention to areas around concealed cistern frames and shower niches where precise cuts are needed.`,
    desc_sr: `Sledite iste postupke hidroizolacije i lepljenja kao u prvom kupatilu. Ako koristite iste pločice, proverite da se šarže boja poklapaju da izbegnete razlike u nijansi. Primenite iskustva iz prvog kupatila — prilagodite veličinu distancera, mešavinu lepka ili raspored. Koordinirajte sa vodoinstalerom da pozicije cevi odgovaraju rasporedu pločica. Obratite posebnu pažnju na zone oko podžbuknih ramova i tuš niša gde su potrebni precizni rezovi.`,
    desc_ru: `Соблюдайте те же процедуры гидроизоляции и укладки, что и в первой ванной. При использовании одной и той же плитки проверяйте совпадение партии цвета, чтобы избежать тональных различий. Применяйте уроки первой ванной — корректируйте размер крестиков, состав клея или раскладку. Координируйте с сантехником позиции труб под раскладку плитки. Уделяйте особое внимание зонам вокруг инсталляций и душевых ниш, где требуются точные подрезки.`,
    desc_zh: `执行与第一个卫生间相同的防水和贴砖程序。如果使用相同的瓷砖，核对批次色号以避免色差。将第一个卫生间的经验教训应用于此——根据需要调整缝隙大小、胶泥配比或铺贴布局。与水暖工协调管道位置以符合瓷砖排版。特别注意隐藏水箱框架和淋浴壁龛周围需要精确切割的区域。`
  },
  "Tile kitchen backsplash and floor": {
    image: 'assets/images/task-sketches/sketch_tiling.png',
    icon: null,
    title_sr: "Pločice kuhinjske pozadine i poda",
    title_ru: "Укладка плитки на фартук и пол кухни",
    title_zh: "贴厨房后挡板和地砖",
    desc_en: `Install kitchen floor tiles before cabinetry — this allows for future layout changes without exposed subfloor. For the backsplash, tile after lower cabinets are installed so the bottom edge sits cleanly on the countertop or base cabinet. Plan the backsplash layout to avoid narrow cut strips at edges or around outlets. Use grout with anti-mold properties for the backsplash area. Seal the joint between countertop and backsplash tile with food-safe silicone, not grout.`,
    desc_sr: `Lepite kuhinjski pod pre ugradnje elemenata — ovo omogućava buduće promene rasporeda bez otkrivene podloge. Pozadinu lepite nakon montaže donjih elemenata da donja ivica nalegne čisto na radnu ploču. Isplanirajte raspored pozadine da izbegnete uske trake na ivicama ili oko utičnica. Koristite fug masu sa anti-plesni svojstvima za zonu pozadine. Spoj između radne ploče i pločica zatvorite prehrambenim silikonom, ne fug masom.`,
    desc_ru: `Укладывайте напольную плитку кухни до установки шкафов — это позволит в будущем менять планировку без открытого основания. Фартук укладывайте после монтажа нижних шкафов, чтобы нижний край аккуратно лёг на столешницу. Планируйте раскладку фартука так, чтобы избежать узких подрезок по краям и вокруг розеток. Используйте затирку с антиплесневыми свойствами для зоны фартука. Стык между столешницей и плиткой закрывайте пищевым силиконом, а не затиркой.`,
    desc_zh: `厨房地砖在橱柜安装前铺贴——这样便于日后更改布局而不留裸露基底。挡板瓷砖在安装下柜后铺贴，使底部边缘整洁地搭在台面上。规划挡板排版以避免在边缘或插座周围出现细窄切割条。挡板区域使用具有防霉性能的填缝剂。台面与挡板瓷砖之间的接缝用食品级硅胶而非填缝剂封堵。`
  },
  "Grout and seal all tiles": {
    image: 'assets/images/task-sketches/sketch_tiling.png',
    icon: null,
    title_sr: "Fugovanje i impregnacija svih pločica",
    title_ru: "Затирка и герметизация всей плитки",
    title_zh: "填缝和密封所有瓷砖",
    desc_en: `Wait minimum 24 hours after tiling before grouting. Mix grout to a peanut-butter consistency — too wet causes shrinkage cracks, too dry causes poor adhesion. Apply with a rubber float at a 45-degree angle to fill joints completely. Wipe excess with a damp sponge after 15-20 minutes. Apply silicone (not grout) at all movement joints: wall-floor corners, around fixtures, and at material transitions. Seal porous grout with impregnator after 72 hours for stain resistance.`,
    desc_sr: `Sačekajte minimum 24 sata nakon lepljenja pre fugovanja. Mešajte fug masu do konzistencije kikiriki putera — previše vlažna uzrokuje pukotine, previše suva lošu adheziju. Nanesite gumenom gladilicom pod uglom od 45 stepeni za potpuno popunjavanje fuga. Obrišite višak vlažnim sunđerom posle 15-20 minuta. Na svim dilatacionim spojevima koristite silikon: uglovi zid-pod, oko sanitarija i prelazi materijala. Impregnirajte fuge posle 72 sata.`,
    desc_ru: `Ожидайте не менее 24 часов после укладки плитки перед затиркой. Готовьте затирку до консистенции арахисового масла — слишком жидкая вызывает усадочные трещины, слишком густая — плохое сцепление. Наносите резиновым шпателем под углом 45° для полного заполнения швов. Удаляйте излишки влажной губкой через 15–20 минут. Во всех деформационных швах используйте силикон: углы пол-стена, вокруг сантехники и на переходах между материалами. Импрегнируйте швы через 72 часа.`,
    desc_zh: `贴砖后至少等待24小时再进行填缝。将填缝剂调制至花生酱状稠度——过稀会产生收缩裂缝，过稠则附着力差。用橡胶刮板以45度角涂抹以充分填满缝隙。15-20分钟后用湿海绵擦去多余填缝剂。所有活动缝处使用硅胶密封：墙角地面、洁具周围和材料交接处。72小时后用渗透剂处理缝隙以增强防污性。`
  },
  "Grout, seal and install trim": {
    image: 'assets/images/task-sketches/sketch_tiling.png',
    icon: null,
    title_sr: "Fugovanje, impregnacija i ugradnja lajsni",
    title_ru: "Затирка, герметизация и установка отделки",
    title_zh: "填缝、密封和安装饰条",
    desc_en: `Complete grouting of all tiled surfaces, then install metal or PVC tile trim profiles at exposed edges, outside corners, and transitions between tile and other materials. Select trim profile height to match tile thickness exactly. Apply trim during tiling (embed in adhesive) for the strongest hold. Seal all perimeter joints with color-matched silicone. Clean all tiles thoroughly with acid-based tile cleaner to remove grout haze. Apply grout impregnator for long-term protection.`,
    desc_sr: `Završite fugovanje svih pločastih površina, zatim ugradite metalne ili PVC lajsne na vidljivim ivicama, spoljnim uglovima i prelazima između pločica i drugih materijala. Izaberite profil lajsne čija visina odgovara debljini pločice. Lajsne ugradite tokom lepljenja (utopite u lepak) za najčvršći spoj. Zatvorite sve obodne spojeve silikonom u boji fuge. Očistite pločice kiselim sredstvom za uklanjanje fug izmaglice. Impregnirajte fuge za dugotrajnu zaštitu.`,
    desc_ru: `Завершите затирку всех облицованных поверхностей, затем установите металлические или ПВХ-профили на открытых торцах, внешних углах и переходах между плиткой и другими материалами. Выбирайте профиль, высота которого точно соответствует толщине плитки. Профили устанавливайте в процессе укладки (утапливая в клей) для наиболее прочного крепления. Закройте все периметральные швы силиконом в цвет затирки. Очистите плитку кислотным очистителем от налёта затирки. Импрегнируйте швы для долгосрочной защиты.`,
    desc_zh: `完成所有贴砖面的填缝后，在外露边缘、阳角和瓷砖与其他材料的交接处安装金属或PVC收边条。选择高度与瓷砖厚度精确匹配的收边条型材。在铺贴过程中安装收边条（压入胶黏剂中）以获得最牢固的固定。所有周边接缝用与填缝剂同色的硅胶密封。用酸性瓷砖清洁剂清除填缝剂雾状残留。涂抹填缝剂保护渗透剂以获得长期防污性。`
  },
  "Install tile trim and accessories": {
    image: 'assets/images/task-sketches/sketch_tiling.png',
    icon: null,
    title_sr: "Ugradnja lajsni i pločastih dodataka",
    title_ru: "Установка плиточного профиля и аксессуаров",
    title_zh: "安装瓷砖饰条和配件",
    desc_en: `Install Schluter or equivalent edge trim at all exposed tile edges and transitions. Choose between aluminum, stainless steel, or brass finishes to match the design. Install corner shelves, soap dishes, and recessed niches during tiling for a clean, integrated look. For retrofit accessories, use diamond-tipped hole saws to drill through tile without cracking. Apply silicone behind all surface-mounted accessories to seal the penetration against moisture.`,
    desc_sr: `Ugradite Schluter ili ekvivalentne ivične lajsne na svim vidljivim ivicama i prelazima pločica. Izaberite aluminijum, inox ili mesing prema dizajnu. Ugradite ugaone police, držače sapuna i ugradbene niše tokom lepljenja za čist, integrisan izgled. Za naknadno ugradne dodatke koristite dijamantske krune za bušenje pločica bez pucanja. Nanesite silikon iza svih površinski montiranih dodataka za zaštitu od vlage.`,
    desc_ru: `Устанавливайте профили Schluter или аналогичные на всех видимых торцах и переходах плитки. Выбирайте алюминий, нержавеющую сталь или латунь в соответствии с дизайном. Угловые полки, мыльницы и нишу устанавливайте в процессе укладки плитки для чистого встроенного вида. Для аксессуаров, устанавливаемых постфактум, используйте алмазные коронки для сверления без растрескивания плитки. Наносите силикон за всеми навесными аксессуарами для защиты от влаги.`,
    desc_zh: `在所有外露边缘和瓷砖交接处安装Schluter或同等品牌的收边型材。根据设计风格选择铝合金、不锈钢或黄铜饰面。在铺贴过程中安装角落搁板、肥皂盒和壁龛以获得整洁的嵌入式效果。后期安装的配件使用金刚石钻头钻孔，避免瓷砖开裂。在所有表面安装配件的背面涂抹硅胶以防水封堵穿孔。`
  },

  // ── Painting ───────────────────────────────────────────────────────────────
  "Prime all walls and ceilings": {
    image: 'assets/images/task-sketches/sketch_painting.png',
    icon: null,
    title_sr: "Grundiranje svih zidova i plafona",
    title_ru: "Грунтовка всех стен и потолков",
    title_zh: "所有墙壁和天花板涂底漆",
    desc_en: `Apply a quality acrylic primer to all plastered surfaces to seal porosity and ensure uniform paint absorption. Use a roller for large areas and a brush for corners and edges. Dilute primer 10-15% with water for the first coat on very absorbent surfaces. Prime stain-prone areas (water marks, smoke damage) with shellac-based stain blocker first. Allow 4-6 hours drying time between coats. A well-primed surface reduces finish paint consumption by up to 30%.`,
    desc_sr: `Nanesite kvalitetan akrilni prajmer na sve malterisane površine za zatvaranje poroznosti i ravnomerno upijanje farbe. Koristite valjak za velike površine i četkicu za uglove i ivice. Razredite prajmer 10-15% vodom za prvi sloj na vrlo upijajućim površinama. Zone sklonim mrljama (tragovi vode, dim) prvo tretirajte šelak baznim blokerom. Pustite 4-6 sati sušenja između slojeva. Dobro grundirana površina smanjuje potrošnju završne farbe do 30%.`,
    desc_ru: `Нанесите качественную акриловую грунтовку на все оштукатуренные поверхности для закрытия пористости и равномерного поглощения краски. Используйте валик для больших площадей и кисть для углов и кромок. Разбавляйте грунтовку на 10–15% водой при первом нанесении на сильно впитывающие поверхности. Зоны, склонные к пятнам (водяные следы, копоть), сначала обработайте шеллачным блокером. Давайте 4–6 часов сушки между слоями. Хорошо загрунтованная поверхность снижает расход финишной краски на 30%.`,
    desc_zh: `在所有抹灰面涂抹优质丙烯酸底漆，封闭孔隙并确保油漆均匀吸收。大面积区域使用滚筒，角落和边缘使用刷子。在吸水性很强的表面首遍涂抹时将底漆用水稀释10-15%。先用虫胶基封闭剂处理易渗色区域（水渍、烟熏痕迹）。各层之间允许干燥4-6小时。充分涂刷底漆的表面可减少面漆用量多达30%。`
  },
  "Apply wall primer throughout": {
    image: 'assets/images/task-sketches/sketch_painting.png',
    icon: null,
    title_sr: "Nanošenje prajmera na sve zidove",
    title_ru: "Нанесение грунтовки по всем стенам",
    title_zh: "所有墙壁涂底漆",
    desc_en: `Prime all wall surfaces throughout the apartment in one continuous operation for consistent results. Use a deep-nap roller (12mm) for textured plaster and a short-nap roller (6mm) for smooth skim-coated surfaces. Maintain a wet edge to avoid lap marks — work in sections from top to bottom. Protect flooring and fixtures with drop cloths and painter's tape. Inspect the primed surface under a work light to catch any imperfections before the finish coat.`,
    desc_sr: `Grundirajte sve zidne površine kroz ceo stan u jednoj kontinuiranoj operaciji za ujednačene rezultate. Koristite valjak sa dugim vlaknom (12mm) za teksturirani malter i kratkim vlaknom (6mm) za glatke gletovane površine. Održavajte mokru ivicu da izbegnete tragove preklapanja — radite u sekcijama od vrha ka dnu. Zaštitite podove i opremu zaštitnim folama i krep trakom. Pregledajte grundiranu površinu pod radnim svetlom pre završnog premaza.`,
    desc_ru: `Грунтуйте все стеновые поверхности по всей квартире за одну непрерывную операцию для единообразного результата. Используйте валик с длинным ворсом (12 мм) для фактурной штукатурки и коротким ворсом (6 мм) для гладких шпаклёванных поверхностей. Поддерживайте «мокрый край», чтобы избежать следов перекрытия — работайте секциями сверху вниз. Защитите полы и оборудование плёнкой и малярной лентой. Осмотрите загрунтованную поверхность под рабочим освещением перед финишным покрытием.`,
    desc_zh: `在整套公寓所有墙面一次性连续完成底漆涂刷，以获得统一效果。纹理抹灰面使用长毛滚筒（12mm），光滑腻子面使用短毛滚筒（6mm）。保持"湿边"以避免搭接痕迹——从上到下分段作业。用保护膜和美纹纸胶带保护地板和设备。在涂抹面漆前，在工作灯下检查底漆面是否有瑕疵。`
  },
  "Apply two coats of finish paint": {
    image: 'assets/images/task-sketches/sketch_painting.png',
    icon: null,
    title_sr: "Dva sloja završne farbe",
    title_ru: "Нанесение двух слоев финишной краски",
    title_zh: "涂刷两层饰面漆",
    desc_en: `Apply two coats of premium interior latex paint for a professional, durable finish. Use eggshell or satin sheen in high-traffic areas (hallways, kitchens) and matte in living rooms and bedrooms. Cut in edges and corners with a 2-inch angled brush first, then roll the field. Allow 4-6 hours between coats. Apply second coat perpendicular to the first for full coverage. Work in natural or consistent artificial light to spot missed areas. Expect 10-12 m2 coverage per liter.`,
    desc_sr: `Nanesite dva sloja premium unutrašnje lateks farbe za profesionalnu i trajnu završnu obradu. Koristite polumat ili satin sjaj za prohodne zone (hodnik, kuhinja) i mat za dnevne sobe i spavaće sobe. Prvo obrubite ivice i uglove kosnom četkicom, pa valjajte polje. Pustite 4-6 sati između slojeva. Drugi sloj nanesite upravno na prvi za punu pokrivenost. Radite u prirodnom ili ujednačenom veštačkom svetlu. Očekujte 10-12 m2 pokrivenosti po litru.`,
    desc_ru: `Наносите два слоя премиальной интерьерной латексной краски для профессионального долговечного покрытия. Используйте полуматовое или сатиновое покрытие для проходных зон (коридор, кухня) и матовое для гостиных и спален. Сначала закрасьте кромки и углы угловой кистью, затем прокатайте поле валиком. Давайте 4–6 часов между слоями. Второй слой наносите перпендикулярно первому для полного перекрытия. Работайте при естественном или равномерном искусственном освещении. Расход около 10–12 м² на литр.`,
    desc_zh: `涂刷两遍优质室内乳胶漆，获得专业持久的饰面效果。走廊和厨房等高使用率区域使用半哑或丝绸光泽，客厅和卧室使用哑光。先用斜口刷涂刷边缘和角落，再用滚筒滚涂大面积区域。各层之间间隔4-6小时。第二遍与第一遍垂直方向涂刷以确保全面覆盖。在自然光或均匀人工光下作业。预计每升覆盖10-12平方米。`
  },
  "Sand and prepare for painting": {
    image: 'assets/images/task-sketches/sketch_painting.png',
    icon: null,
    title_sr: "Brušenje i priprema za farbanje",
    title_ru: "Шлифовка и подготовка к покраске",
    title_zh: "打磨和准备喷漆",
    desc_en: `Sand all plastered and skim-coated surfaces with 120-150 grit sandpaper using a pole sander for walls and ceilings. Focus on removing trowel marks, ridges, and any surface imperfections. Fill small pinholes and cracks with lightweight filler and sand again once dry. Vacuum all dust from surfaces, corners, and floor before priming. Good preparation accounts for 70% of the final paint quality — rushing this step shows in every subsequent coat.`,
    desc_sr: `Brusiti sve malterisane i gletovane površine brusnim papirom 120-150 koristeći šipku za brusilicu za zidove i plafone. Fokusirajte se na uklanjanje tragova gleđalice, grebena i svih površinskih nepravilnosti. Popunite male rupice i pukotine lakim kitom i ponovo brusiti kad se osuši. Usisajte svu prašinu sa površina, uglova i poda pre grundiranja. Dobra priprema čini 70% kvaliteta završne farbe — žurba se vidi na svakom narednom sloju.`,
    desc_ru: `Шлифуйте все оштукатуренные и зашпаклёванные поверхности бумагой зернистостью 120–150, используя шлифовальную штангу для стен и потолков. Сосредоточьтесь на удалении следов шпателя, гребней и любых поверхностных дефектов. Заполните мелкие ямки и трещины лёгкой шпаклёвкой и снова шлифуйте после высыхания. Пропылесосьте всю пыль с поверхностей, углов и пола перед грунтовкой. Хорошая подготовка составляет 70% качества финишной окраски — спешка видна на каждом последующем слое.`,
    desc_zh: `用120-150目砂纸配合打磨杆对所有抹灰和腻子面进行打磨。重点清除刮板痕迹、凸起和各种表面瑕疵。用轻质填料填补小孔洞和裂缝，干燥后再次打磨。涂刷底漆前用吸尘器清除所有表面、角落和地面的灰尘。良好的前期准备决定了70%的最终涂装质量——匆忙省略这步在每一遍涂层上都会显现出来。`
  },
  "Touch-ups and final finish": {
    image: 'assets/images/task-sketches/sketch_painting.png',
    icon: null,
    title_sr: "Popravke i finalni premaz",
    title_ru: "Подкраска и финальная отделка",
    title_zh: "修补和最终饰面",
    desc_en: `Inspect all painted surfaces under strong angled light to identify misses, drips, and scuff marks from other trades. Touch up with the same batch of paint to avoid color mismatch — keep leftover paint labeled by room. Use a small foam roller for touch-ups rather than a brush to match the surrounding texture. Clean up all paint splatters on tiles, fixtures, and windows. This is your last chance to achieve a flawless finish before handover.`,
    desc_sr: `Pregledajte sve farbane površine pod jakim bočnim svetlom da identifikujete propuste, kapljice i ogrebotine od drugih zanata. Popravljajte istom šaržom farbe da izbegnete razliku u boji — čuvajte ostatke obeležene po prostoriji. Koristite mali sunđerasti valjak umesto četkice za popravke da se uskladi tekstura. Očistite sve mrlje farbe sa pločica, opreme i prozora. Ovo je poslednja šansa za besprekoran završetak pre primopredaje.`,
    desc_ru: `Осматривайте все окрашенные поверхности под ярким боковым светом для выявления пропусков, подтёков и царапин от других работ. Исправляйте краской той же партии, чтобы избежать цветового расхождения — храните остатки с маркировкой по комнатам. Используйте маленький поролоновый валик вместо кисти для подправок, чтобы совпасть с окружающей текстурой. Очистите все пятна краски с плитки, оборудования и окон. Это последний шанс добиться безупречного результата перед сдачей объекта.`,
    desc_zh: `在强烈侧光下检查所有已涂装表面，找出漏涂、流挂和其他工种留下的划痕。用同一批次的油漆修补以避免色差——将剩余油漆按房间标注保存。修补时用小型海绵滚筒代替刷子以匹配周边纹理。清除瓷砖、设备和窗户上所有油漆污点。这是在交付前实现完美效果的最后机会。`
  },

  // ── Flooring ───────────────────────────────────────────────────────────────
  "Install laminate or parquet flooring": {
    image: 'assets/images/task-sketches/sketch_flooring.png',
    icon: null,
    title_sr: "Postavljanje laminata ili parketa",
    title_ru: "Укладка ламината или паркета",
    title_zh: "安装复合或镶木地板",
    desc_en: `Acclimatize flooring material in the room for minimum 48-72 hours before installation. Install a foam or cork underlay with vapor barrier over the screed. Start from the longest wall with 10mm expansion gaps at all walls, pipes, and fixed objects. Stagger end joints by at least 30cm between rows. Use a pull bar and tapping block to close click joints without damaging edges. Cut boards face-up with a jigsaw or face-down with a circular saw to prevent chipping.`,
    desc_sr: `Aklimatizujte materijal za pod u prostoriji minimum 48-72 sata pre ugradnje. Postavite penu ili plutanu podlogu sa parnom branom preko košuljice. Počnite od najdužeg zida sa dilatacionim razmakom od 10mm uz sve zidove, cevi i fiksne objekte. Pomak krajnjih spojeva minimum 30cm između redova. Koristite povlačnu šipku i udarni blok za zatvaranje klik spojeva bez oštećenja ivica. Secite daske licem naviše ubodnom, licem nadole cirkularnom testerom.`,
    desc_ru: `Выдержите напольный материал в помещении не менее 48–72 часов перед укладкой. Уложите пенолиноль или пробковую подложку с пароизоляцией поверх стяжки. Начинайте от самой длинной стены с деформационным зазором 10 мм у всех стен, труб и неподвижных объектов. Смещайте стыки торцов минимум на 30 см между рядами. Используйте тяговый крюк и добойник для защёлкивания замков без повреждения кромок. Режьте доски лицом вверх лобзиком и лицом вниз дисковой пилой.`,
    desc_zh: `地面材料在房间内至少放置48-72小时进行适应性处理后再铺装。在找平层上铺设带防潮膜的泡沫或软木垫层。从最长的墙边开始，在所有墙面、管道和固定物处留10mm膨胀缝。相邻排之间的端部接缝至少错开30厘米。用拉勾和敲击块扣合锁扣接头，避免损坏边缘。用曲线锯正面朝上切割，用圆锯正面朝下切割以防止崩边。`
  },
  "Install baseboards and trim": {
    image: 'assets/images/task-sketches/sketch_flooring.png',
    icon: null,
    title_sr: "Ugradnja lajsni i letvica",
    title_ru: "Установка плинтусов и наличников",
    title_zh: "安装踢脚线和饰条",
    desc_en: `Install baseboards after flooring is complete to cover the expansion gap. Use MDF or solid wood baseboards, minimum 60mm height. Miter cut internal and external corners at 45 degrees with a miter saw. Fix to the wall (not the floor) using adhesive and pin nails. Fill nail holes and joint gaps with wood filler, then touch up with paint or varnish. Ensure baseboards are level — use a laser line for long runs. Add door threshold strips at transitions between rooms.`,
    desc_sr: `Ugradite lajsne nakon završenog poda da pokrijete dilatacioni razmak. Koristite MDF ili drvene lajsne, minimum 60mm visine. Režite unutrašnje i spoljne uglove pod 45 stepeni gerunškom testerom. Fiksirajte na zid (ne na pod) lepkom i čivijama. Popunite rupe od čivija i spojeve drvenim kitom, zatim dofarbajte. Lajsne moraju biti u nivou — koristite laser za duge deonice. Dodajte prelazne lajsne na prelazima između prostorija.`,
    desc_ru: `Устанавливайте плинтусы после завершения укладки пола, чтобы закрыть деформационный зазор. Используйте МДФ или деревянные плинтусы высотой не менее 60 мм. Режьте внутренние и внешние углы под 45° торцовочной пилой. Крепите к стене (не к полу) на клей и гвозди. Заполните гвоздевые отверстия и стыки деревянным шпаклёвочным составом и подкрасьте. Плинтусы должны быть строго горизонтальны — используйте лазер для длинных участков. Добавьте переходные планки на стыках между комнатами.`,
    desc_zh: `地面铺装完成后安装踢脚线以覆盖膨胀缝。使用高度不小于60mm的中密度纤维板或木质踢脚线。用斜切锯以45度角切割阳角和阴角。固定在墙面（而非地面）上，使用胶水和钉子。用木材腻子填充钉孔和接缝，补刷油漆。踢脚线须保持水平——长段使用激光辅助。在房间之间的材料交接处安装过渡条。`
  },
  "Final finishing and cleanup": {
    image: 'assets/images/task-sketches/sketch_cleaning.png',
    icon: null,
    title_sr: "Završna obrada i čišćenje",
    title_ru: "Финальная отделка и уборка",
    title_zh: "最后的整理和清理",
    desc_en: `Complete all remaining minor tasks: install vent covers, touch up paint around fixtures, apply silicone at all floor-wall-tile junctions, and adjust door closers. Clean all surfaces — vacuum flooring, wipe window sills, clean light switches and outlet covers. Remove all protective films from windows, appliances, and fixtures. This is the final opportunity to catch and fix details before the professional deep clean and client walkthrough.`,
    desc_sr: `Završite sve preostale sitne zadatke: ugradite ventilacione rešetke, dofarbajte oko opreme, nanesite silikon na sve spojeve pod-zid-pločica i podesite zatvarače vrata. Očistite sve površine — usisajte podove, obrišite prozorske klupice, očistite prekidače i maske utičnica. Uklonite sve zaštitne folije sa prozora, aparata i opreme. Ovo je poslednja prilika da uhvatite i popravite detalje pre profesionalnog čišćenja i primopredaje.`,
    desc_ru: `Завершите все оставшиеся мелкие работы: установите вентиляционные решётки, подкрасьте вокруг оборудования, нанесите силикон на все стыки пол-стена-плитка и отрегулируйте доводчики дверей. Очистите все поверхности — пропылесосьте полы, протрите подоконники, очистите выключатели и рамки розеток. Снимите все защитные плёнки с окон, техники и оборудования. Это последний шанс заметить и исправить детали до профессиональной уборки и сдачи объекта.`,
    desc_zh: `完成所有剩余的细节工作：安装通风格栅，涂补设备周围油漆，在所有地面-墙面-瓷砖接缝处涂抹硅胶，调整门闭合器。清洁所有表面——吸尘地面，擦拭窗台，清洁开关和插座面板。揭除窗户、电器和设备上的所有保护膜。这是在专业保洁和验收前发现并修正细节问题的最后机会。`
  },

  // ── Bathroom Fixtures ──────────────────────────────────────────────────────
  "Install toilet and bidet": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Montaža WC šolje i bidea",
    title_ru: "Установка унитаза и биде",
    title_zh: "安装马桶和净身器",
    desc_en: `Mount the wall-hung toilet on the concealed cistern frame, ensuring bolts are tightened evenly to prevent cracking the ceramic. Maximum torque: 3Nm. Connect the flush pipe and test flushing before final tightening. For bidets, connect hot and cold supply with flexible hoses and set the mixing valve temperature. Seal the base to the wall tile with sanitary silicone. Check that the flush plate operates smoothly and water shuts off completely after each cycle.`,
    desc_sr: `Montirajte konzolnu WC šolju na podžbukni ram, pritežući vijke ravnomerno da ne pukne keramika. Maksimalni moment: 3Nm. Povežite cev za ispiranje i testirajte pre finalnog pritezanja. Za bide, priključite toplu i hladnu vodu fleksibilnim crevima i podesite temperaturu mešajuće slavine. Zalepite osnovu za zidnu pločicu sanitarnim silikonom. Proverite da taster za ispiranje radi glatko i da se voda potpuno zatvara nakon svakog ciklusa.`,
    desc_ru: `Монтируйте подвесной унитаз на инсталляцию, равномерно затягивая болты во избежание растрескивания керамики. Максимальный момент затяжки: 3 Нм. Подключите сливной патрубок и протестируйте до окончательной затяжки. Для биде подключите горячую и холодную воду гибкой подводкой и настройте температуру смесителя. Приклейте основание к настенной плитке санитарным силиконом. Убедитесь, что клавиша смыва работает плавно и вода полностью перекрывается после каждого цикла.`,
    desc_zh: `将壁挂式马桶安装到隐藏式水箱框架上，均匀拧紧螺栓以防瓷器开裂。最大扭矩：3牛米。连接冲水管并在最终紧固前测试冲水效果。安装妇洗器时，用软管连接冷热水并设定混水阀温度。用卫生硅胶将底部边缘粘接到墙砖上。确认冲水按钮操作顺畅且每次冲水后水流完全停止。`
  },
  "Install toilets and bidets": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Montaža WC šolja i bidea",
    title_ru: "Установка унитазов и биде",
    title_zh: "安装多个马桶和净身器",
    desc_en: `When installing fixtures in multiple bathrooms, use the same procedure for consistency. Mount wall-hung toilets on Geberit or equivalent frames, tightening mounting bolts evenly at 3Nm maximum. Connect each flush mechanism and test before sealing. Install bidets with proper hot/cold mixing valve setup. Seal all fixtures to wall tiles with sanitary silicone and allow 24 hours cure before use. Test every fixture for leaks under pressure before handover.`,
    desc_sr: `Kada ugrađujete sanitarije u više kupatila, koristite isti postupak za konzistentnost. Montirajte konzolne WC šolje na Geberit ili ekvivalentne ramove, pritežući vijke ravnomerno na maks. 3Nm. Povežite svaki mehanizam ispiranja i testirajte pre zaptivanja. Ugradite bidee sa pravilnim podešavanjem mešajuće slavine. Zalepite sve sanitarije za zidne pločice sanitarnim silikonom i pustite 24 sata sušenja. Testirajte svaku na curenje pre primopredaje.`,
    desc_ru: `При установке сантехники в нескольких ванных комнатах используйте одинаковую процедуру для единообразия. Монтируйте подвесные унитазы на инсталляции Geberit или аналоги, равномерно затягивая болты до 3 Нм максимум. Подключайте каждый механизм слива и тестируйте до герметизации. Устанавливайте биде с правильной настройкой смесителя. Приклейте все санфаянсовые приборы к настенной плитке санитарным силиконом и дайте 24 часа на отвердевание. Тестируйте каждый прибор на течь перед сдачей.`,
    desc_zh: `在多个卫生间安装洁具时，使用相同的程序以保持一致性。将壁挂马桶安装到Geberit或同等框架上，均匀拧紧螺栓，最大扭矩3牛米。连接每套冲水机构并在密封前测试。安装妇洗器时正确设置混水阀。用卫生硅胶将所有洁具粘接到墙砖，等待24小时固化。交付前对每件洁具进行渗漏测试。`
  },
  "Install sink and vanity": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Montaža lavaboa i ormarića",
    title_ru: "Установка умывальника и тумбы",
    title_zh: "安装水槽和梳妆台",
    desc_en: `Mount the vanity cabinet on wall brackets at the correct height — standard is 85cm from floor to basin rim. Use a laser level to ensure perfectly horizontal alignment. Connect hot and cold water supplies with push-fit or compression fittings. Install the trap and waste pipe, ensuring the trap seal remains intact. Apply a thin bead of silicone where the basin meets the wall tile. Run water for 5 minutes and check all joints and trap for leaks.`,
    desc_sr: `Montirajte ormarić na zidne konzole na pravilnu visinu — standard je 85cm od poda do ivice lavaboa. Koristite laserski nivo za savršeno horizontalno poravnanje. Priključite toplu i hladnu vodu push-fit ili kompresionim spojevima. Ugradite sifon i odvod, osiguravajući da vodeni zatvarač ostane netaknut. Nanesite tanak sloj silikona gde lavabo dodiruje zidnu pločicu. Pustite vodu 5 minuta i proverite sve spojeve i sifon na curenje.`,
    desc_ru: `Монтируйте тумбу на настенные кронштейны на правильной высоте — стандарт 85 см от пола до края раковины. Используйте лазерный нивелир для идеально горизонтального выравнивания. Подключайте горячую и холодную воду пуш-фит или компрессионными соединениями. Установите сифон и слив, убедившись, что гидрозатвор сохраняет целостность. Нанесите тонкий слой силикона там, где раковина касается настенной плитки. Пустите воду на 5 минут и проверьте все соединения и сифон на течь.`,
    desc_zh: `将浴室柜安装在墙面托架上，高度正确——标准为地面到盆沿85厘米。使用激光水平仪确保完全水平。用快插式或压缩式接头连接冷热水供水管。安装存水弯和排水管，确保水封完好。在洗手盆与墙砖接触处涂抹一道薄硅胶。放水5分钟，检查所有接头和存水弯是否有渗漏。`
  },
  "Install sinks and vanities": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Montaža lavaboa i ormarića",
    title_ru: "Установка умывальников и тумб",
    title_zh: "安装多个水槽和梳妆台",
    desc_en: `Install vanity units in multiple bathrooms maintaining consistent height and alignment. Mount all cabinets at 85cm from floor to basin rim. Verify level across both units if visible in sequence. Connect water supplies and waste pipes, ensuring each sink has its own trap. Use the same faucet brand and model across bathrooms for a unified look. Test each installation independently — let water run for several minutes and inspect underneath for any drips or slow leaks.`,
    desc_sr: `Ugradite ormariće u svim kupatilima održavajući konzistentnu visinu i poravnanje. Montirajte sve ormariće na 85cm od poda do ivice lavaboa. Proverite nivo oba elementa ako su vidljivi u nizu. Priključite vodu i odvod, osiguravajući da svaki lavabo ima svoj sifon. Koristite istu marku i model slavine u svim kupatilima za ujednačen izgled. Testirajte svaku instalaciju nezavisno — pustite vodu nekoliko minuta i proverite ispod.`,
    desc_ru: `Устанавливайте тумбы в обеих ванных комнатах, выдерживая одинаковую высоту и выравнивание. Монтируйте все тумбы на 85 см от пола до края раковины. Проверьте горизонт обоих изделий, если они видны в одном ряду. Подключайте воду и слив, обеспечивая наличие индивидуального сифона у каждой раковины. Используйте одну марку и модель смесителя во всех ванных для единообразного вида. Тестируйте каждую установку независимо — пускайте воду несколько минут и проверяйте снизу.`,
    desc_zh: `在所有卫生间安装浴室柜，保持一致的高度和对齐。所有浴室柜安装高度为地面到盆沿85厘米。如果并排可见，检查两件产品是否水平。连接供水和排水，确保每个洗手盆有独立的存水弯。各卫生间使用相同品牌和型号的水龙头以保持统一外观。独立测试每处安装——放水数分钟并检查下方是否有渗漏。`
  },
  "Install shower or tub": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Ugradnja tuš kabine ili kade",
    title_ru: "Установка душа или ванны",
    title_zh: "安装淋浴器或浴缸",
    desc_en: `For showers, install the base or tray on a bed of mortar ensuring proper slope toward the drain. Connect the waste outlet and test for watertight seal before any surround installation. For bathtubs, secure the bath to the wall with brackets and fill with water before sealing — baths flex under load and silicone applied empty will crack. Install a glass shower screen (minimum 8mm tempered) with silicone along the bottom rail. Test the complete assembly for leaks.`,
    desc_sr: `Za tuš, ugradite bazu na posteljicu od maltera osiguravajući pravilan pad ka odvodu. Povežite odvod i testirajte vodonepropusnost pre ugradnje obloge. Za kade, pričvrstite kadu za zid nosačima i napunite vodom pre zaptivanja — kade se savijaju pod opterećenjem i silikon nanesen na praznu će pući. Ugradite stakleni paravan (min. 8mm kaljeno staklo) sa silikonom duž donje šine. Testirajte celu montažu na curenje.`,
    desc_ru: `Для душа: устанавливайте поддон на растворную постель, обеспечивая правильный уклон к трапу. Подключите слив и проверьте водонепроницаемость до установки облицовки. Для ванн: крепите ванну к стене кронштейнами и наполняйте водой перед герметизацией — ванны прогибаются под нагрузкой, и силикон, нанесённый на пустую ванну, растрескается. Устанавливайте стеклянный экран (мин. 8 мм закалённое стекло) с силиконом по нижней направляющей. Тестируйте всю сборку на течь.`,
    desc_zh: `淋浴：将底盘安装在砂浆层上，确保坡向地漏。连接排水口并在安装围挡前测试防水密封。浴缸：用托架将浴缸固定在墙上，在密封前注满水——浴缸在承重时会发生形变，在空缸状态下涂抹的硅胶会开裂。用硅胶沿下轨道安装玻璃淋浴屏（最少8mm钢化玻璃）。对整个组件进行渗漏测试。`
  },
  "Install shower and tub": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Ugradnja tuša i kade",
    title_ru: "Установка душа и ванны",
    title_zh: "安装淋浴器和浴缸",
    desc_en: `When the bathroom has both a bathtub and a separate shower, coordinate installation sequence with the tiler. Install the bathtub first as it requires wall-to-wall fitting. Set the shower tray on a mortar bed, verify drain connection, and waterproof all joints. Fill the bathtub with water before applying silicone to allow for flex. Install glass shower screen and bath panel. Test both drains simultaneously to verify the waste system handles combined flow without backup.`,
    desc_sr: `Kada kupatilo ima i kadu i zasebni tuš, koordinirajte redosled ugradnje sa keramičarem. Prvo ugradite kadu jer zahteva naleganje od zida do zida. Postavite tuš bazu na malternu posteljicu, proverite odvod i hidroizolujte sve spojeve. Napunite kadu vodom pre nanošenja silikona radi savijanja. Ugradite stakleni paravan i panel kade. Testirajte oba odvoda istovremeno da proverite da kanalizacija podnosi kombinovani protok.`,
    desc_ru: `При наличии в ванной и ванны, и отдельного душа — координируйте очерёдность установки с плиточником. Сначала устанавливайте ванну, так как она требует монтажа от стены до стены. Поддон душа устанавливайте на растворную постель, проверяйте слив и гидроизолируйте все стыки. Наполняйте ванну водой перед нанесением силикона — для учёта прогиба. Устанавливайте стеклянный экран и панель ванны. Тестируйте оба слива одновременно, чтобы убедиться, что канализация справляется с совокупным потоком.`,
    desc_zh: `当卫生间同时设有浴缸和独立淋浴时，与贴砖工协调安装顺序。浴缸先安装，因为它需要靠墙到墙安装。将淋浴底盘安装在砂浆层上，检查排水口并对所有接缝做防水处理。浴缸注满水后再涂抹硅胶以适应受力变形。安装玻璃淋浴屏和浴缸侧板。同时测试两个排水口，确认排水系统能够承受合并水流。`
  },
  "Install showers and tubs": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Ugradnja tuševa i kada",
    title_ru: "Установка душей и ванн",
    title_zh: "安装多个淋浴器和浴缸",
    desc_en: `Install shower and bathtub fixtures in multiple bathrooms with consistent quality. Set each tub on a mortar bed and verify level. Connect waste pipes and test drain flow independently before sealing. Fill each tub with water before applying silicone to the wall junction. Install glass screens with proper silicone seal along all edges. Stagger the installations to allow silicone curing time (24 hours minimum) before water testing each bathroom fully.`,
    desc_sr: `Ugradite tuš i kadu u svim kupatilima sa konzistentnim kvalitetom. Postavite svaku kadu na malternu posteljicu i proverite nivo. Povežite odvode i testirajte protok nezavisno pre zaptivanja. Napunite svaku kadu vodom pre nanošenja silikona na zidni spoj. Ugradite staklene paravane sa pravilnim silikonskim zaptivanjem. Rasporedite ugradnje da omogućite sušenje silikona (min. 24 sata) pre kompletnog testiranja vodotoka svakog kupatila.`,
    desc_ru: `Устанавливайте душевые поддоны и ванны во всех ванных комнатах с одинаковым качеством. Каждую ванну устанавливайте на растворную постель и проверяйте горизонталь. Подключайте сливы и тестируйте напор независимо до герметизации. Наполняйте каждую ванну водой перед нанесением силикона на стеновой стык. Устанавливайте стеклянные экраны с правильным силиконовым уплотнением. Распределяйте монтаж так, чтобы силикон успел застыть (мин. 24 часа) до комплексного тестирования каждой ванной.`,
    desc_zh: `在所有卫生间以一致的质量标准安装淋浴和浴缸。每个浴缸安装在砂浆层上并检查水平度。在密封前独立连接排水口并测试排水流量。在浴缸与墙面接缝处涂抹硅胶前注满水。安装玻璃淋浴屏并做好硅胶密封。错开安装时间，确保硅胶有足够的固化时间（至少24小时），然后对每个卫生间进行完整的用水测试。`
  },
  "Install accessories and towel bars": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Ugradnja pribora i držača peškira",
    title_ru: "Установка аксессуаров и полотенцесушителей",
    title_zh: "安装配件和毛巾杆",
    desc_en: `Install towel bars, robe hooks, toilet paper holders, soap dispensers, and mirrors. Use a template or painter's tape to mark drill positions before drilling into tile. Always drill through tile with a diamond-tipped bit at low speed without hammer action — switch to hammer mode only once through the tile and into the wall. Use proper wall plugs rated for the wall type (hollow wall, brick, or concrete). Apply silicone behind mirrors to protect the tile from moisture.`,
    desc_sr: `Ugradite držače peškira, kuke za bade mantile, držače toalet papira, dozer za sapun i ogledala. Koristite šablon ili krep traku za obeležavanje pozicija bušenja pre bušenja u pločicu. Uvek bušite pločicu dijamantskom krunom na malim obrtajima bez udara — uključite udar tek kad prođete pločicu i uđete u zid. Koristite odgovarajuće tiple za tip zida (šuplji zid, cigla ili beton). Nanesite silikon iza ogledala za zaštitu pločice od vlage.`,
    desc_ru: `Устанавливайте полотенцедержатели, крючки для халатов, держатели туалетной бумаги, диспенсеры для мыла и зеркала. Используйте шаблон или малярную ленту для разметки позиций сверления до сверления в плитку. Всегда сверлите плитку алмазной коронкой на малых оборотах без удара — переключайте на удар только после прохождения плитки и вхождения в стену. Используйте подходящие дюбели для типа стены (пустотелая, кирпич или бетон). Наносите силикон за зеркалами для защиты плитки от влаги.`,
    desc_zh: `安装毛巾架、浴袍挂钩、卫生纸架、皂液器和镜子。在钻孔前用纸板模板或美纹纸胶带标记钻孔位置。始终用金刚石钻头在低速无锤击模式下钻穿瓷砖——穿过瓷砖进入墙体后再切换至锤击模式。根据墙体类型（空心墙、砖墙或混凝土）选用合适的膨胀螺钉。在镜子背面涂抹硅胶以保护墙砖免受潮气侵蚀。`
  },
  "Install accessories": {
    image: 'assets/images/task-sketches/sketch_plumbing.png',
    icon: null,
    title_sr: "Ugradnja kupatilskog pribora",
    title_ru: "Установка аксессуаров",
    title_zh: "安装配件",
    desc_en: `Mount all bathroom accessories — towel bars, hooks, shelves, soap dishes, and toilet brush holders — at ergonomic heights. Standard towel bar height is 120cm for adults. Use stainless steel or chrome accessories that match the faucet finish. Pre-drill all holes with a tile-specific bit, then switch to masonry for the wall behind. Double-check alignment with a level before final tightening. Apply a small dot of silicone on the wall anchor to seal the tile penetration.`,
    desc_sr: `Montirajte sav kupatilski pribor — držače peškira, kuke, police, držače sapuna i četke za WC — na ergonomske visine. Standardna visina držača peškira je 120cm za odrasle. Koristite inox ili hrom pribor koji se slaže sa završnom obradom slavina. Prethodno izbušite sve rupe burgijom za pločice, pa prebacite na zidarski borer. Proverite poravnanje libelom pre finalnog pritezanja. Nanesite tačku silikona na zidni tipl za zaptivanje prodora kroz pločicu.`,
    desc_ru: `Монтируйте все аксессуары ванной — полотенцедержатели, крючки, полки, мыльницы и ёршики — на эргономичных высотах. Стандартная высота полотенцедержателя — 120 см для взрослых. Используйте нержавеющие или хромированные аксессуары, подходящие к отделке смесителей. Предварительно сверлите все отверстия коронкой по плитке, затем переключайтесь на победитовое сверло. Проверяйте горизонталь уровнем до окончательной затяжки. Наносите каплю силикона на настенный дюбель для герметизации прохода через плитку.`,
    desc_zh: `将所有卫生间配件——毛巾架、挂钩、搁架、肥皂盒和马桶刷架——安装在人体工学高度上。成人毛巾架的标准安装高度为120厘米。选用与水龙头饰面匹配的不锈钢或镀铬配件。先用专用瓷砖钻头预钻孔，然后换用砖墙钻头。最终紧固前用水平仪检查对齐情况。在墙内膨胀螺钉上点一滴硅胶以密封穿瓷砖孔洞。`
  },

  // ── Electrical Finish ──────────────────────────────────────────────────────
  "Install outlets and switches": {
    image: 'assets/images/task-sketches/sketch_electrical.png',
    icon: null,
    title_sr: "Montaža utičnica i prekidača",
    title_ru: "Установка розеток и выключателей",
    title_zh: "安装插座和开关",
    desc_en: `Install all outlet and switch face plates using the same product series throughout the apartment for a consistent look (e.g., Schneider Unica, Legrand Valena). Verify correct polarity and grounding on every outlet with a socket tester before installing covers. Ensure face plates sit flush against the wall — if the box is too deep, use spacer rings. Tighten screws evenly to avoid cracking the plate. Test every switch for correct circuit operation.`,
    desc_sr: `Ugradite sve maske utičnica i prekidača koristeći istu seriju proizvoda kroz ceo stan za konzistentan izgled (npr. Schneider Unica, Legrand Valena). Proverite pravilan polaritet i uzemljenje na svakoj utičnici testerom pre montaže maski. Maske moraju nalegati ravno na zid — ako je dozna preduboka, koristite distancne prstenove. Pritegnite zavrtnje ravnomerno da ne pukne maska. Testirajte svaki prekidač za pravilno funkcionisanje.`,
    desc_ru: `Устанавливайте все рамки розеток и выключателей одной серии по всей квартире для единообразного внешнего вида (например, Schneider Unica, Legrand Valena). Проверяйте правильность полярности и заземления каждой розетки тестером перед установкой рамок. Рамки должны прилегать заподлицо к стене — если подрозетник слишком глубокий, используйте дистанционные кольца. Затягивайте винты равномерно, чтобы не треснула рамка. Тестируйте каждый выключатель на правильность работы цепи.`,
    desc_zh: `在整套公寓中使用同一系列的产品安装所有插座和开关面板，以保持统一外观（如施耐德Unica、罗格朗Valena）。在安装面板前，用插座测试仪检查每个插座的极性和接地是否正确。面板必须与墙面齐平——如果接线盒太深，使用垫圈调整。均匀拧紧螺钉以防面板开裂。测试每个开关的电路操作是否正确。`
  },
  "Install light fixtures": {
    image: 'assets/images/task-sketches/sketch_electrical.png',
    icon: null,
    title_sr: "Ugradnja svetiljki",
    title_ru: "Установка светильников",
    title_zh: "安装照明灯具",
    desc_en: `Install all ceiling lights, recessed downlights, wall sconces, and pendant fixtures. Use IP44-rated fixtures minimum in bathrooms and wet areas. For LED downlights, verify the driver is dimmable if connected to a dimmer switch. Ensure all fixtures are securely mounted to ceiling boxes or plasterboard fixings rated for the fixture weight. Confirm color temperature consistency — mixing 3000K and 4000K in the same room looks unprofessional. Test every fixture and dimmer.`,
    desc_sr: `Ugradite sve plafonske lampe, ugradne spotove, zidne aplika i viseće svetiljke. U kupatilima i vlažnim zonama koristite minimum IP44 svetiljke. Za LED spotove proverite da li je drajver dimabilan ako je povezan na dimer prekidač. Sva svetla moraju biti sigurno montirana na plafonske dozne ili gips-karton nosače za odgovarajuću težinu. Potvrdite ujednačenost boje svetla — mešanje 3000K i 4000K u istoj prostoriji izgleda neprofesionalno. Testirajte sve.`,
    desc_ru: `Устанавливайте все потолочные светильники, встроенные споты, настенные бра и подвесные люстры. В ванных комнатах и влажных зонах используйте светильники минимум IP44. Для LED-спотов убедитесь, что драйвер диммируемый, если подключён к диммеру. Все светильники должны быть надёжно закреплены в потолочных подрозетниках или на ГКЛ-кронштейнах с нужной грузоподъёмностью. Убедитесь в единообразии цветовой температуры — смешение 3000K и 4000K в одной комнате выглядит непрофессионально. Тестируйте всё.`,
    desc_zh: `安装所有吸顶灯、嵌入式射灯、壁灯和吊灯。卫生间和潮湿区域至少使用IP44防护等级的灯具。LED射灯如果连接调光开关，需确认驱动器支持调光。所有灯具须牢固安装在吊顶接线盒或承重适合的石膏板固定件上。确认色温一致——同一房间混用3000K和4000K显得不专业。全部测试。`
  },
  "Final panel check and test": {
    image: 'assets/images/task-sketches/sketch_electrical.png',
    icon: null,
    title_sr: "Finalna provera ormana i testiranje",
    title_ru: "Финальная проверка щитка",
    title_zh: "面板最终检查和测试",
    desc_en: `Conduct a complete electrical system test: verify every RCD/FID trips correctly (test button and actual fault simulation), measure loop impedance on critical circuits, and confirm correct labeling of all breakers. Test every outlet for correct polarity and grounding. Verify kitchen and bathroom circuits are on separate RCDs. Document all test results on a formal inspection certificate. This is a legal requirement in most jurisdictions and essential for insurance.`,
    desc_sr: `Izvršite kompletno testiranje elektro sistema: proverite da svaki FID pravilno okida (test dugme i simulacija kvara), izmerite impedansu petlje na kritičnim krugovima i potvrdite pravilno obeležavanje svih osigurača. Testirajte svaku utičnicu na polaritet i uzemljenje. Proverite da su kuhinjska i kupatilska kola na zasebnim FID-ovima. Dokumentujte sve rezultate testiranja formalnim sertifikatom. Ovo je zakonski obavezno i neophodno za osiguranje.`,
    desc_ru: `Проведите комплексное тестирование электрической системы: убедитесь, что каждое УЗО срабатывает правильно (кнопка тест и реальная симуляция неисправности), измерьте импеданс петли на критических цепях и подтвердите правильную маркировку всех автоматических выключателей. Протестируйте каждую розетку на полярность и заземление. Убедитесь, что кухонные и ванные цепи на отдельных УЗО. Задокументируйте все результаты в официальном протоколе испытаний. Это законодательное требование, обязательное для страхования.`,
    desc_zh: `对电气系统进行全面测试：验证每个漏电保护器是否正确动作（测试按钮和实际故障模拟），测量关键回路的环路阻抗，确认所有断路器标注正确。用插座测试仪检查每个插座的极性和接地。确认厨房和卫生间回路分别接在独立的漏电保护器上。在正式检测证书上记录所有测试结果。这是大多数地区的法律要求，也是保险的必要条件。`
  },

  // ── Kitchen ────────────────────────────────────────────────────────────────
  "Install kitchen cabinets and units": {
    image: 'assets/images/task-sketches/sketch_kitchen.png',
    icon: null,
    title_sr: "Ugradnja kuhinjskih elemenata",
    title_ru: "Установка кухонных шкафов",
    title_zh: "安装厨柜和装置",
    desc_en: `Start with lower base cabinets — level them precisely using adjustable legs and a laser level. Upper wall cabinets should be mounted 530mm above the countertop (1380mm from floor). Use heavy-duty wall brackets rated for the load. Ensure all cabinet doors align vertically and horizontally, adjusting hinges as needed. Install end panels and filler strips between cabinets and walls. Check that all drawers and pull-out mechanisms operate smoothly before installing the countertop.`,
    desc_sr: `Počnite sa donjim elementima — nivelišite ih precizno podesivim nogicama i laserskim nivelirima. Gornji zidni elementi montiraju se 530mm iznad radne ploče (1380mm od poda). Koristite teške zidne nosače za odgovarajuće opterećenje. Sva vrata elemenata moraju biti poravnata vertikalno i horizontalno, podešavajući šarke po potrebi. Ugradite bočne panele i popunjivače između elemenata i zidova. Proverite sve fioke i izvlačne mehanizme pre ugradnje radne ploče.`,
    desc_ru: `Начните с нижних тумб — выравнивайте их точно с помощью регулируемых ножек и лазерного нивелира. Верхние навесные шкафы монтируются на 530 мм выше столешницы (1380 мм от пола). Используйте тяжёлые настенные кронштейны с нужной несущей способностью. Все фасады должны быть выровнены вертикально и горизонтально с регулировкой петель. Установите торцевые панели и заполнители между шкафами и стенами. Проверьте все ящики и выдвижные механизмы до укладки столешницы.`,
    desc_zh: `从底柜开始——用可调节底脚和激光水平仪精确调平。上部挂墙柜安装在台面上方530mm处（距地面1380mm）。使用重型墙面托架，确保承重能力足够。所有橱柜门须垂直和水平对齐，根据需要调整铰链。安装侧面板和橱柜与墙之间的填充条。安装台面前检查所有抽屉和拉出式机构是否运作顺畅。`
  },
  "Install countertop": {
    image: 'assets/images/task-sketches/sketch_kitchen.png',
    icon: null,
    title_sr: "Ugradnja radne ploče",
    title_ru: "Установка столешницы",
    title_zh: "安装台面",
    desc_en: `Measure and template the countertop precisely, including cutouts for sink, cooktop, and any flush-mount outlets. Quartz and granite countertops are cut off-site from templates — verify dimensions before cutting begins. Apply silicone adhesive on top of all base cabinets before setting the countertop. For L-shaped kitchens, use invisible miter bolts to join sections. Seal the backsplash joint with continuous silicone bead. Support overhangs greater than 30cm with brackets.`,
    desc_sr: `Izmerite i šablonirajte radnu ploču precizno, uključujući otvore za sudoperu, ploču za kuvanje i ugradne utičnice. Kvarc i granit ploče se seku van radilišta prema šablonima — proverite dimenzije pre sečenja. Nanesite silikonski lepak na vrh svih donjih elemenata pre postavljanja ploče. Za L-oblik kuhinje koristite nevidljive gerunške zavrtnje za spajanje sekcija. Zalepite spoj sa pozadinom kontinuiranim silikonskim trakom. Poduprite previse veće od 30cm konzolama.`,
    desc_ru: `Точно замерьте столешницу и изготовьте шаблоны, включая вырезы для мойки, варочной панели и встроенных розеток. Кварцевые и гранитные столешницы режутся вне площадки по шаблонам — проверяйте размеры до начала резки. Наносите силиконовый клей на верхний край всех нижних тумб до установки столешницы. Для угловых кухонь используйте невидимые митерные болты для соединения секций. Заполняйте стык с фартуком непрерывным силиконовым жгутом. Поддерживайте свесы более 30 см кронштейнами.`,
    desc_zh: `精确测量台面并制作模板，包括水槽、灶台和嵌入式插座的开孔。石英石和花岗岩台面依据模板在工厂外切割——开始切割前务必核对尺寸。台面就位前在所有底柜顶部涂抹硅胶粘合剂。L形厨房使用隐形斜接螺栓连接各段台面。用连续的硅胶线密封台面与挡板的接缝。超过30cm的悬挑部分用托架支撑。`
  },
  "Connect appliances and plumbing": {
    image: 'assets/images/task-sketches/sketch_kitchen.png',
    icon: null,
    title_sr: "Priključenje aparata i instalacija",
    title_ru: "Подключение техники и сантехники",
    title_zh: "连接设备和管道",
    desc_en: `Connect the oven, cooktop, dishwasher, and washing machine to their respective electrical, water, and drain connections. Verify that high-draw appliances (oven, cooktop) are on dedicated circuits with correct amperage breakers. Connect the dishwasher drain with a high loop to prevent backflow. Test all gas connections with soapy water. Run each appliance through a complete cycle to verify operation. Check under the sink after 24 hours for any slow leaks.`,
    desc_sr: `Priključite rernu, ploču za kuvanje, mašinu za sudove i veš mašinu na odgovarajuće električne, vodovodne i odvode. Proverite da su jaki potrošači (rernu, ploča) na zasebnim krugovima sa pravilnim osiguračima. Povežite odvod mašine za sudove sa visokom petljom da sprečite povratni tok. Testirajte sve gasne priključke sapunicom. Pustite svaki aparat kroz kompletan ciklus. Proverite ispod sudopere posle 24 sata na tiho curenje.`,
    desc_ru: `Подключите духовой шкаф, варочную панель, посудомоечную и стиральную машины к соответствующим электрическим, водопроводным и сливным соединениям. Убедитесь, что мощные потребители (духовка, варочная панель) подключены на отдельные цепи с правильными автоматами. Подключайте слив посудомойки с высоким петлевым подъёмом для предотвращения обратного тока. Проверяйте все газовые соединения мыльным раствором. Запускайте каждый прибор на полный цикл. Проверяйте под мойкой через 24 часа на медленные течи.`,
    desc_zh: `将烤箱、灶台、洗碗机和洗衣机连接到各自的电气、供水和排水接口。确认大功率电器（烤箱、灶台）接在有正确安培断路器的独立回路上。洗碗机排水管连接时做高位弯以防止回流。用肥皂水检查所有燃气接头。让每台电器运行一个完整周期。24小时后检查水槽下方是否有缓慢渗漏。`
  },

  // ── Doors ──────────────────────────────────────────────────────────────────
  "Install armored entry door": {
    image: 'assets/images/task-sketches/sketch_carpentry.png',
    icon: null,
    title_sr: "Ugradnja sigurnosnih ulaznih vrata",
    title_ru: "Установка бронированной входной двери",
    title_zh: "安装防盗门",
    desc_en: `Install the armored entry door (blindirana vrata) early in the renovation to secure the site. Level the frame precisely using shims and check diagonals are equal. Anchor the frame to the wall with heavy-duty expanding bolts at minimum 6 points. Fill the gap between frame and wall with fire-rated polyurethane foam. Test the multi-point locking mechanism from both sides. Adjust the door closer for smooth operation. Protect the door surface with cardboard during remaining construction.`,
    desc_sr: `Ugradite blindirana vrata rano u renoviranju za obezbeđenje radilišta. Nivelišite okvir precizno podloškama i proverite da su dijagonale jednake. Pričvrstite okvir na zid teškim ekspanzinim zavrtnjima na minimum 6 tačaka. Popunite razmak između okvira i zida vatrootpornom PU penom. Testirajte višetačkasto zaključavanje sa obe strane. Podesite zatvarač za glatko funkcionisanje. Zaštitite površinu vrata kartonom tokom preostalih radova.`,
    desc_ru: `Устанавливайте бронированную входную дверь в начале ремонта для обеспечения безопасности объекта. Выравнивайте коробку точно с помощью прокладок и проверяйте равенство диагоналей. Крепите коробку к стене тяжёлыми анкерными болтами минимум в 6 точках. Заполняйте зазор между коробкой и стеной огнестойкой пенополиуретановой пеной. Тестируйте многоточечный замок с обеих сторон. Регулируйте доводчик для плавной работы. Защищайте поверхность двери картоном в ходе оставшихся работ.`,
    desc_zh: `在装修初期就安装防盗入户门以保障施工场地安全。用垫片精确调平门框并检查对角线是否相等。用重型膨胀螺栓在至少6个点将门框固定到墙上。用防火聚氨酯泡沫填充门框与墙壁之间的缝隙。从两侧测试多点锁闭机构。调整闭门器使其顺畅运作。在后续施工期间用纸板保护门面。`
  },
  "Install interior door frames": {
    image: 'assets/images/task-sketches/sketch_carpentry.png',
    icon: null,
    title_sr: "Ugradnja štokova unutrašnjih vrata",
    title_ru: "Установка коробок межкомнатных дверей",
    title_zh: "安装内门框",
    desc_en: `Install door frames after plastering but before final painting. Use a laser level to ensure frames are perfectly plumb and level. Anchor frames to the wall opening using expanding foam and wooden wedges or dedicated frame brackets. Maintain consistent reveal (gap between frame and wall face) on all three sides. Check that the frame opening matches the door leaf size plus 3-4mm clearance per side. Protect installed frames with tape during subsequent painting and flooring work.`,
    desc_sr: `Ugradite štokove nakon malterisanja ali pre finalnog farbanja. Koristite laserski nivo da okviri budu savršeno u vaterpasku. Pričvrstite okvire za zidni otvor ekspanzionom penom i drvenim klinovima ili namenskim nosačima. Održavajte konzistentan falc (razmak između okvira i lica zida) sa sve tri strane. Proverite da otvor okvira odgovara veličini vratnog krila plus 3-4mm zazora po strani. Zaštitite ugrađene okvire trakom tokom farbanja i podova.`,
    desc_ru: `Устанавливайте дверные коробки после штукатурки, но до финальной покраски. Используйте лазерный нивелир, чтобы коробки были идеально вертикальны. Крепите коробки в проёме монтажной пеной и деревянными клиньями или специальными кронштейнами. Выдерживайте одинаковый зазор (расстояние между коробкой и лицевой поверхностью стены) со всех трёх сторон. Проверяйте, что проём коробки соответствует размеру дверного полотна плюс 3–4 мм на сторону. Защищайте установленные коробки лентой во время покраски и укладки полов.`,
    desc_zh: `在抹灰完成后、最终涂漆前安装门框。使用激光水平仪确保门框完全垂直。用膨胀泡沫和木楔或专用固定件将门框固定到门洞中。三面保持一致的门框露出量（门框与墙面之间的距离）。检查门框开口尺寸是否与门扇尺寸加每侧3-4mm间隙相符。在后续涂漆和铺地板施工期间用胶带保护已安装的门框。`
  },
  "Hang interior doors": {
    image: 'assets/images/task-sketches/sketch_carpentry.png',
    icon: null,
    title_sr: "Kačenje unutrašnjih vrata",
    title_ru: "Навешивание межкомнатных дверей",
    title_zh: "安装内门",
    desc_en: `Hang door leaves on the installed frames using three hinges per door for stability. Verify smooth operation — the door should swing freely without rubbing on the frame or floor. Maintain 3mm clearance at top and sides, and 8-10mm gap at the bottom for airflow (or more if transitioning over a threshold strip). Install the latch mechanism and strike plate, adjusting for a snug but smooth close. Check that the door stays open at 90 degrees without swinging shut or open on its own.`,
    desc_sr: `Okačite vratna krila na ugrađene okvire koristeći tri šarke po vratima za stabilnost. Proverite glatko funkcionisanje — vrata se moraju kretati slobodno bez trljanja o okvir ili pod. Održavajte 3mm zazora na vrhu i stranama i 8-10mm na dnu za protok vazduha. Ugradite bravu i protivlim, podešavajući za čvrsto ali glatko zatvaranje. Proverite da vrata ostaju otvorena na 90 stepeni bez samostalnog zatvaranja ili otvaranja.`,
    desc_ru: `Навешивайте дверные полотна на установленные коробки, используя три петли на дверь для стабильности. Проверяйте плавность работы — дверь должна двигаться свободно без трения о коробку или пол. Выдерживайте 3 мм зазора сверху и по бокам и 8–10 мм снизу для вентиляции. Устанавливайте защёлку и ответную планку, регулируя для плотного, но мягкого закрывания. Проверяйте, что дверь остаётся открытой под углом 90° без самопроизвольного закрывания или открывания.`,
    desc_zh: `将门扇悬挂在已安装的门框上，每扇门使用三个铰链以确保稳定性。检查开关顺畅度——门扇应能自由转动，不与门框或地板摩擦。顶部和两侧保持3mm间隙，底部留8-10mm间隙以利通风。安装门锁和碰珠，调整至轻松顺滑的关闭效果。检查门在90度位置能自然停留，不会自行关闭或打开。`
  },
  "Install door trim and moldings": {
    image: 'assets/images/task-sketches/sketch_carpentry.png',
    icon: null,
    title_sr: "Ugradnja okvira i dekorativnih lajsni vrata",
    title_ru: "Установка наличников дверей",
    title_zh: "安装门饰条和模块",
    desc_en: `Install architrave trim around all door frames to create a clean transition between frame and wall. Miter cut corners at 45 degrees for a professional finish. Use pin nails and adhesive to secure trim. Fill nail holes and gaps with wood filler, then sand smooth. Paint or varnish trim to match the door finish. For rooms with different floor levels, install threshold strips that allow smooth transition. Ensure all trim profiles are consistent throughout the apartment.`,
    desc_sr: `Ugradite dekorativne lajsne oko svih štokova za čist prelaz između okvira i zida. Režite uglove pod 45 stepeni za profesionalnu završnu obradu. Fiksirajte lajsne čivijama i lepkom. Popunite rupe od čivija i spojeve drvenim kitom pa brusiti. Farbajte ili lakirajte lajsne da se slažu sa završnom obradom vrata. Za prostorije sa različitim nivoima poda ugradite prelazne lajsne. Svi profili lajsni moraju biti konzistentni kroz ceo stan.`,
    desc_ru: `Устанавливайте наличники вокруг всех дверных коробок для чёткого перехода между коробкой и стеной. Режьте углы под 45° для профессиональной финишной отделки. Крепите наличники гвоздями и клеем. Заполняйте гвоздевые отверстия и стыки шпаклёвкой по дереву, затем шлифуйте. Красьте или лакируйте наличники под финишную обработку дверей. Для комнат с разными уровнями пола устанавливайте пороги. Все профили наличников должны быть одинаковыми по всей квартире.`,
    desc_zh: `在所有门框周围安装门套线，实现门框与墙面之间的整洁过渡。以45度角切割转角以达到专业效果。用钉子和胶水固定门套线。用木材腻子填充钉孔和接缝后打磨平整。涂漆或上清漆使门套线与门扇饰面一致。不同地面高度的房间之间安装过渡门槛条。整套公寓的所有门套线线型应保持一致。`
  },
  "Fit doors and interior fittings": {
    image: 'assets/images/task-sketches/sketch_carpentry.png',
    icon: null,
    title_sr: "Montaža vrata i unutrašnjih elemenata",
    title_ru: "Установка дверей и внутренней фурнитуры",
    title_zh: "安装门和内部配件",
    desc_en: `Complete the final fitting of all doors including handle sets, locks, soft-close mechanisms, and door stops. Adjust all hinges for perfect alignment — doors should close smoothly without slamming. Install magnetic or rubber door stops on walls or floors to protect handles from wall damage. Test every lock and key for smooth operation. Apply felt pads or bumper strips where doors may contact walls. This is the finishing touch that defines the quality of the entire interior.`,
    desc_sr: `Završite finalnu montažu svih vrata uključujući kvake, brave, tiho zatvaranje i graničnike. Podesite sve šarke za savršeno poravnanje — vrata se moraju zatvarati glatko bez lupanja. Ugradite magnetne ili gumene graničnike na zidove ili pod da zaštitite kvake od oštećenja zida. Testirajte svaku bravu i ključ za glatko funkcionisanje. Nanesite filc podloške gde vrata mogu dodirnuti zidove. Ovo je završni detalj koji definiše kvalitet celog enterijera.`,
    desc_ru: `Завершите финальный монтаж всех дверей: ручки, замки, механизмы доводчика и ограничители. Отрегулируйте все петли для идеального выравнивания — двери должны закрываться плавно без хлопков. Установите магнитные или резиновые ограничители на стены или пол для защиты ручек от ударов о стену. Тестируйте каждый замок и ключ на плавность работы. Приклейте войлочные прокладки там, где двери могут касаться стен. Это финальный штрих, определяющий качество всего интерьера.`,
    desc_zh: `完成所有门扇的最终安装，包括门把手、锁具、缓冲关闭机构和门挡。调整所有铰链至完美对齐——门扇应轻柔关闭，不发出撞击声。在墙壁或地面上安装磁性或橡胶门挡，防止门把手撞墙损坏。测试每把锁和钥匙是否顺滑。在门扇可能接触墙面的位置粘贴毡垫。这是决定整体室内装修品质的最后细节。`
  },

  // ── Wardrobes/Storage ──────────────────────────────────────────────────────
  "Install built-in wardrobe frames": {
    image: 'assets/images/task-sketches/sketch_carpentry.png',
    icon: null,
    title_sr: "Ugradnja okvira ugradbenih ormana",
    title_ru: "Установка каркасов встроенных шкафов",
    title_zh: "安装内置衣柜框",
    desc_en: `Assemble and install wardrobe carcasses, anchoring them securely to wall studs or masonry with M8 bolts. Level the frame vertically with a spirit level — even 2mm out of plumb will show on tall doors. If spanning wall-to-wall, install filler panels to accommodate uneven walls. Ensure the interior is accessible for shelf and rail installation before fixing the top panel. Pre-drill all shelf pin holes using a drilling jig for consistent spacing. Leave 10mm clearance at the top for ventilation.`,
    desc_sr: `Sastavite i ugradite karkase ormana, pričvršćujući ih sigurno na zidne studove ili zidove M8 vijcima. Nivelišite okvir vertikalno libelom — čak i 2mm odstupanja od vertikale vidi se na visokim vratima. Ako ide od zida do zida, ugradite popunjivače za neravne zidove. Unutrašnjost mora biti pristupačna za ugradnju polica i šipki pre fiksiranja gornjeg panela. Prethodno izbušite rupe za nosače polica šablonom. Ostavite 10mm zazora na vrhu za ventilaciju.`,
    desc_ru: `Собирайте и устанавливайте корпуса шкафов, надёжно закрепляя их к настенным стойкам или стенам болтами M8. Выравнивайте корпус вертикально уровнем — даже отклонение на 2 мм будет заметно на высоких дверях. При монтаже от стены до стены устанавливайте заполнители для неровных стен. Внутреннее пространство должно быть доступно для монтажа полок и штанг до закрепления верхней панели. Предварительно просверлите отверстия для кронштейнов полок с помощью кондуктора. Оставляйте 10 мм зазора сверху для вентиляции.`,
    desc_zh: `组装并安装衣柜柜体，用M8螺栓将其牢固固定在墙骨柱或砌体墙上。用水平仪垂直校正柜体——哪怕偏差2mm也会在高柜门上显现出来。墙到墙安装时，加装填充板适应不平整的墙面。在固定顶板前确保内部空间便于安装隔板和挂衣杆。使用钻孔模板预钻隔板销孔以保持均匀间距。顶部留10mm通风间隙。`
  },
  "Install storage accessories": {
    image: 'assets/images/task-sketches/sketch_carpentry.png',
    icon: null,
    title_sr: "Ugradnja dodataka za odlaganje",
    title_ru: "Установка систем хранения",
    title_zh: "安装储物配件",
    desc_en: `Install all internal wardrobe accessories: sliding doors or hinged doors, drawer units, pull-out shoe racks, trouser hangers, tie/belt hooks, and LED strip lighting. Adjust sliding door tracks so doors glide smoothly and align at the closed position. Install soft-close mechanisms on all drawers and hinged doors. Mount clothing rails at 170cm height for long items and 100cm for double-hang sections. A well-organized wardrobe interior maximizes storage by up to 40% compared to basic shelving.`,
    desc_sr: `Ugradite sav unutrašnji pribor ormana: klizna ili klasična vrata, fioke, izvlačne police za cipele, nosače pantalone, kuke i LED osvetljenje. Podesite šine kliznih vrata da klize glatko i poravnaju se u zatvorenom položaju. Ugradite tiho zatvaranje na sve fioke i klasična vrata. Montirajte šipke za odeću na 170cm za duge komade i 100cm za dvostruke sekcije. Dobro organizovana unutrašnjost ormana povećava skladišni prostor do 40% u odnosu na obične police.`,
    desc_ru: `Устанавливайте все внутренние аксессуары шкафа: раздвижные или распашные двери, ящики, выдвижные полки для обуви, брючницы, крючки и LED-подсветку. Регулируйте направляющие раздвижных дверей для плавного скольжения и совмещения в закрытом положении. Устанавливайте доводчики на все ящики и распашные двери. Монтируйте штанги для одежды на высоте 170 см для длинных вещей и 100 см для двухъярусных секций. Хорошо организованное нутро шкафа увеличивает вместимость на 40% по сравнению с простыми полками.`,
    desc_zh: `安装所有衣柜内部配件：推拉门或平开门、抽屉、鞋架、裤架、挂钩和LED照明灯带。调整推拉门轨道，确保顺滑滑动并在关闭时对齐。为所有抽屉和平开门安装缓冲关闭机构。长款衣物区的挂衣杆安装高度170厘米，双层区挂衣杆安装高度100厘米。与普通隔板相比，合理规划衣柜内部可将收纳空间提升多达40%。`
  },

  // ── Cleaning ───────────────────────────────────────────────────────────────
  "Professional post-construction clean": {
    image: 'assets/images/task-sketches/sketch_cleaning.png',
    icon: null,
    title_sr: "Profesionalno čišćenje posle gradnje",
    title_ru: "Профессиональная послестроительная уборка",
    title_zh: "专业的施工后清洁",
    desc_en: `Hire a professional post-construction cleaning team (typically 3-4 people for a full day). They will remove all construction dust from every surface, including inside cabinets, on window sills, behind radiators, and in ductwork vents. Clean tile grout haze with acid-based cleaner. Polish all glass, mirrors, and chrome fixtures. Remove protective films from windows and appliances. Vacuum and mop all floors. This is not a regular cleaning — construction dust is abrasive and requires special equipment and products.`,
    desc_sr: `Angažujte profesionalni tim za čišćenje posle gradnje (obično 3-4 osobe za ceo dan). Oni uklanjaju svu građevinsku prašinu sa svake površine, uključujući unutar ormara, na prozorskim klupicama, iza radijatora i u ventilacionim otvorima. Očistite fug izmaglicu kiselim sredstvom. Ispolirajte svo staklo, ogledala i hrom opremu. Uklonite zaštitne folije sa prozora i aparata. Usisajte i operite sve podove. Ovo nije obično čišćenje — građevinska prašina je abrazivna i zahteva posebnu opremu.`,
    desc_ru: `Наймите профессиональную бригаду уборки после строительства (обычно 3–4 человека на полный рабочий день). Они удаляют строительную пыль со всех поверхностей, в том числе внутри шкафов, с подоконников, за радиаторами и из вентиляционных отверстий. Очищайте налёт затирки кислотным чистящим средством. Полируйте всё стекло, зеркала и хромированное оборудование. Снимайте защитные плёнки с окон и техники. Пылесосьте и мойте все полы. Это не обычная уборка — строительная пыль абразивна и требует специального оборудования.`,
    desc_zh: `聘请专业的施工后保洁团队（通常3-4人工作一整天）。他们清除每个表面的建筑灰尘，包括橱柜内部、窗台上、散热器后方和通风口内。用酸性清洁剂清除瓷砖缝隙上的水泥雾化残留。抛光所有玻璃、镜子和镀铬设备。揭除窗户和电器上的保护膜。吸尘并拖洗所有地面。这不是普通清洁——建筑灰尘有磨蚀性，需要专用设备和产品。`
  },

  // ── Final ──────────────────────────────────────────────────────────────────
  "Final walkthrough and punch list": {
    image: 'assets/images/task-sketches/sketch_cleaning.png',
    icon: null,
    title_sr: "Finalni obilazak i lista popravki",
    title_ru: "Финальный осмотр и список недоделок",
    title_zh: "最终演练和查验",
    desc_en: `Walk through every room systematically with the contractor, checking all finished work against the original specifications. Document every deficiency on a numbered punch list with photos. Common items include paint touch-ups, tile grout gaps, door alignment, silicone joints, and fixture scratches. Set a clear deadline for punch list completion (typically 7-14 days). Reinspect after repairs. Do not make final payment until all punch list items are satisfactorily resolved.`,
    desc_sr: `Prođite svaku prostoriju sistematično sa izvođačem, proveravajući sve završene radove prema originalnim specifikacijama. Dokumentujte svaku nepravilnost na numerisanoj listi popravki sa fotografijama. Uobičajene stavke uključuju popravke farbe, fug razmake, poravnanje vrata, silikonske spojeve i ogrebotine na opremi. Odredite jasan rok za završetak popravki (obično 7-14 dana). Ponovo pregledajte nakon popravki. Ne plaćajte finalni iznos dok sve stavke nisu rešene.`,
    desc_ru: `Систематически обходите каждое помещение вместе с подрядчиком, проверяя все выполненные работы по исходным спецификациям. Документируйте каждое несоответствие в нумерованном списке замечаний с фотографиями. Типичные позиции: подкраска, зазоры в затирке, выравнивание дверей, силиконовые швы и царапины на оборудовании. Установите чёткий срок устранения замечаний (обычно 7–14 дней). Повторно проверяйте после ремонтных работ. Не производите финальную оплату до полного и удовлетворительного устранения всех замечаний.`,
    desc_zh: `与施工方系统性地逐间检查，对照原始规格核验所有完工工程。用带编号的整改清单记录每处问题并附照片。常见问题包括：油漆修补、填缝间隙、门扇对齐、硅胶接缝和设备划痕。设定明确的整改完成期限（通常7-14天）。整改后重新检查验收。在所有整改项目得到满意解决之前不予支付尾款。`
  },
  "Sign-off and documentation": {
    image: 'assets/images/task-sketches/sketch_cleaning.png',
    icon: null,
    title_sr: "Primopredaja i dokumentacija",
    title_ru: "Подписание документов и документация",
    title_zh: "签署和文档",
    desc_en: `Compile all project documentation: warranties, appliance manuals, paint color codes, tile batch numbers, and material suppliers. Collect certificates for electrical, plumbing, and gas work. Photograph the final state of every room for reference. Hand over all keys, remote controls, and spare materials (extra tiles, paint). Have the client sign a formal acceptance document. Provide a maintenance schedule for HVAC filters, grout sealing, and window hardware lubrication.`,
    desc_sr: `Kompilirajte svu projektnu dokumentaciju: garancije, uputstva za aparate, kodove boja farbi, šarže pločica i dobavljače materijala. Prikupite sertifikate za električne, vodovodne i gasne radove. Fotografišite finalno stanje svake prostorije za referencu. Predajte sve ključeve, daljinske upravljače i rezervne materijale (viška pločica, farbu). Neka klijent potpiše formalni primopredajni zapisnik. Obezbedite raspored održavanja za HVAC filtere, impregnaciju fuga i podmazivanje okovja.`,
    desc_ru: `Составьте полный пакет проектной документации: гарантии, инструкции к приборам, коды цветов краски, номера партий плитки и поставщики материалов. Соберите сертификаты на электрические, сантехнические и газовые работы. Сфотографируйте финальное состояние каждого помещения для референса. Передайте все ключи, пульты дистанционного управления и остатки материалов (запасную плитку, краску). Подпишите у клиента официальный акт приёмки-передачи. Предоставьте график технического обслуживания: фильтры климатической системы, пропитка затирки, смазка фурнитуры.`,
    desc_zh: `整理所有项目文档：保修书、电器使用说明、油漆色号、瓷砖批次号和材料供应商信息。收集电气、水暖和燃气工程的验收合格证书。对每个房间的最终状态进行拍照留档。移交所有钥匙、遥控器和剩余材料（备用瓷砖、油漆）。让客户在正式验收交付文件上签字。提供维护计划：空调滤网更换、填缝剂防渗处理和五金件润滑周期。`
  }
};

