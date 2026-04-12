// =============================================
// APARTMENT TEMPLATES (FULLY POPULATED)
// =============================================
const MAT_EN = { "Vreće za šut":"Rubble bags","PPR Cevi i fiting":"PPR pipes and fittings","PVC Odvodne cevi":"PVC drain pipes","Kabl 3x1.5mm2 (osvetljenje)":"Cable 3x1.5mm2 (lighting)","Kabl 3x2.5mm2 (utičnice)":"Cable 3x2.5mm2 (sockets)","Dozne i rebrasta creva":"Junction boxes and corrugated pipes","Razvodna tabla sa osiguračima":"Distribution board with fuses","Gips i malter za krpljenje":"Gypsum and plaster for patching","Nivelir masa":"Self-leveling compound","Prajmer za pod":"Floor primer","Pločice kupatilo (pod+zid)":"Bathroom tiles (floor+wall)","Pločice kuhinja (špic+pod)":"Kitchen tiles","Fleksibilni lepak za keramiku":"Flexible tile adhesive","Fug masa (vodoodbojna)":"Water-repellent grout","Podloga":"Primer","Glet masa":"Skim coat / putty","Disperziona poludisperzija bela":"White emulsion paint","Laminat hrast 10mm":"Oak laminate 10mm","Lajsne i sunđer":"Skirting boards and underlay","WC Šolja ugradna":"Wall-hung toilet bowl","Tuš kabina (staklo)":"Glass shower cabin","Bojler 50l plitki":"Water heater 50l (slim)","Mešalice (tuš, lavabo)":"Faucets (shower, sink)","Utičnice i prekidači Aling":"Sockets and switches","LED Plafonjere":"LED ceiling lights","Blindirana ulazna vrata":"Armored front door","Unutrašnja vrata kupatila":"Internal bathroom door","Kuhinjski materijal (univer, okov)":"Kitchen materials (melamine, hardware)","Vreće za šut i takse za deponiju":"Rubble bags and landfill fees","Kabl 3x1.5mm2 i 3x2.5mm2":"Cables 3x1.5mm2 and 3x2.5mm2","Glavna razvodna tabla":"Main distribution board","Cevovod PPR i PVC komlet":"PPR and PVC pipeline kit","Malter (mašinski/ručni)":"Plaster (machine/manual)","Cement i pesak":"Cement and sand","EPS Stirodor podni":"EPS floor insulation","Španska keramika (ukupno)":"Spanish ceramics (total)","Fleksibilni CM16 Lepak":"Flexible CM16 adhesive","Glet, podloge i Boje komplet":"Skim coat, primer, paints kit","Hrastov parket standard":"Standard oak parquet","Prajmer i Lepak za parket 2k":"Primer and 2k parquet adhesive","Lak na vodenoj bazi":"Water-based varnish","Inverter Midea/HiSense 12k":"12k Inverter AC","Bakarna instalacija":"Copper AC piping","Sanitarije (komplet za kupatilo)":"Sanitary ware (bathroom kit)","Elektrogalanterija (modularni prekidači)":"Electrical accessories (modular)","Ulazna vrata":"Front door","Unutrašnja vrata (CPL folija)":"Internal doors (CPL foil)","Gipsane Knauf ploče, CD, UD profili":"Gypsum boards, CD, UD profiles","Isover zvučna izolacija":"Isover sound insulation","Geberit ugradni vodokotlići":"Geberit concealed cisterns","Kablovi za el. podno Thermoval":"Thermoval electric underfloor heating cables","Cevi aluplast + PPR komplet":"AluPex + PPR pipes kit","Pametni releji, osigurači i kablaža (700m)":"Smart relays, fuses, and cabling (700m)","Cement, pesak, insulation kit":"Cement, sand, insulation kit", "Cement, pesak, izolacija komplet materijal":"Cement, sand, insulation kit","Prozori ALU, termostaklo komplet":"ALU windows, thermal glass kit","Italijanska Keramika 1M klasa":"Italian Ceramics 1st Class","Kerakoll/Sika vrhunski lepkovi":"Kerakoll/Sika premium adhesives","Italijanske boje i glet materijali":"Italian paints and skim coat materials","Tarkett Hrast (14mm)":"Tarkett Oak (14mm)","Specijalni dvokomponentni lepak":"Special 2K adhesive","Mdf visoke lajsne bele":"Tall white MDF skirting","Unutrašnja Vrata farbani Medijapan":"Internal Painted MDF doors","Kuhinja po meri Medijapan / Kvarc":"Custom MDF / Quartz Kitchen","Bosch aparaturna tehnika set":"Bosch home appliances set","Tuš stakla, slivnici paravani":"Shower glass, drains, screens","Lusteti, spot i profilna LED rasveta":"Chandeliers, spot, and profile LED lighting","Hansgrohe baterije i ugradni tuševi":"Hansgrohe faucets and built-in showers","Prozori ALU/PVC":"ALU/PVC Windows","Keramika 1Klasa":"Ceramics 1st Class","Lepak i glet":"Adhesive and Skim coat","Medijapan Kuhinja po meri":"Custom MDF Kitchen" };
const MAT_RU = { "Vreće za šut":"Мешки для мусора","PPR Cevi i fiting":"Трубы ППР и фитинги","PVC Odvodne cevi":"ПВХ трубы для канализации","Kabl 3x1.5mm2 (osvetljenje)":"Кабель 3x1.5мм2 (освещение)","Kabl 3x2.5mm2 (utičnice)":"Кабель 3x2.5мм2 (розетки)","Dozne i rebrasta creva":"Монтажные коробки и гофры","Razvodna tabla sa osiguračima":"Распределительный щит с автоматами","Gips i malter za krpljenje":"Гипс и штукатурка для заделки","Nivelir masa":"Нивелир-масса","Prajmer za pod":"Грунтовка для пола","Pločice kupatilo (pod+zid)":"Плитка для ванной (пол+стены)","Pločice kuhinja (špic+pod)":"Плитка для кухни","Fleksibilni lepak za keramiku":"Гибкий плиточный клей","Fug masa (vodoodbojna)":"Водоотталкивающая затирка","Podloga":"Грунтовка","Glet masa":"Шпаклевка","Disperziona poludisperzija bela":"Белая краска","Laminat hrast 10mm":"Ламинат дуб 10мм","Lajsne i sunđer":"Плинтусы и подложка","WC Šolja ugradna":"Встроенный унитаз","Tuš kabina (staklo)":"Душевая кабина (стекло)","Bojler 50l plitki":"Бойлер 50л узкий","Mešalice (tuš, lavabo)":"Смесители","Utičnice i prekidači Aling":"Розетки и выключатели","LED Plafonjere":"Светодиодные светильники","Blindirana ulazna vrata":"Бронированная дверь","Unutrašnja vrata kupatila":"Дверь в ванную","Kuhinjski materijal (univer, okov)":"Кухонные материалы","Vreće za šut i takse za deponiju":"Мешки и вывоз мусора","Kabl 3x1.5mm2 i 3x2.5mm2":"Кабели 1.5 и 2.5 мм2","Glavna razvodna tabla":"Главный щит","Cevovod PPR i PVC komlet":"Трубы ППР и ПВХ комплект","Malter (mašinski/ručni)":"Штукатурка","Cement i pesak":"Цемент и песок","EPS Stirodor podni":"Пенополистирол для пола","Španska keramika (ukupno)":"Испанская плитка","Fleksibilni CM16 Lepak":"Клей CM16","Glet, podloge i Boje komplet":"Шпаклевка и краски","Hrastov parket standard":"Дубовый паркет","Prajmer i Lepak za parket 2k":"Клей для паркета 2К","Lak na vodenoj bazi":"Лак на водной основе","Inverter Midea/HiSense 12k":"Кондиционер инвертор","Bakarna instalacija":"Медная трасса для кондиционера","Sanitarije (komplet za kupatilo)":"Сантехника комплект","Elektrogalanterija (modularni prekidači)":"Электрофурнитура","Ulazna vrata":"Входная дверь","Unutrašnja vrata (CPL folija)":"Межкомнатные двери","Gipsane Knauf ploče, CD, UD profili":"Гипсокартон Knauf и профили","Isover zvučna izolacija":"Звукоизоляция Isover","Geberit ugradni vodokotlići":"Инсталляции Geberit","Kablovi za el. podno Thermoval":"Теплый пол Thermoval","Cevi aluplast + PPR komplet":"Комплект труб Alupax/PPR","Pametni releji, osigurači i kablaža (700m)":"Умные реле и проводка","Cement, pesak, izolacija komplet materijal":"Цемент, песок, изоляция","Prozori ALU, termostaklo komplet":"Алюминиевые окна комплект","Italijanska Keramika 1M klasa":"Итальянская плитка 1 сорт","Kerakoll/Sika vrhunski lepkovi":"Клеи Kerakoll/Sika","Italijanske boje i glet materijali":"Итальянские краски","Tarkett Hrast (14mm)":"Tarkett Дуб (14мм)","Specijalni dvokomponentni lepak":"Специальный клей 2К","Mdf visoke lajsne bele":"Высокие плинтусы МДФ","Unutrašnja Vrata farbani Medijapan":"Крашеные двери МДФ","Kuhinja po meri Medijapan / Kvarc":"Кухня МДФ/Кварц","Bosch aparaturna tehnika set":"Техника Bosch комплект","Tuš stakla, slivnici paravani":"Стекла для душа и трапы","Lusteti, spot i profilna LED rasveta":"Светильники и светодиоды","Hansgrohe baterije i ugradni tuševi":"Смесители Hansgrohe","Prozori ALU/PVC":"Окна АЛЮ/ПВХ","Keramika 1Klasa":"Керамика 1 класс","Lepak i glet":"Клей и шпаклевка","Medijapan Kuhinja po meri":"Кухня МДФ по мерке" };
const MAT_ZH = { "Vreće za šut":"建筑垃圾袋","PPR Cevi i fiting":"PPR管及配件","PVC Odvodne cevi":"PVC排水管","Kabl 3x1.5mm2 (osvetljenje)":"3x1.5mm2电缆 (照明)","Kabl 3x2.5mm2 (utičnice)":"3x2.5mm2电缆 (插座)","Dozne i rebrasta creva":"接线盒和波纹管","Razvodna tabla sa osiguračima":"配电箱及保险丝","Gips i malter za krpljenje":"石膏和抹灰修补料","Nivelir masa":"地面找平材料","Prajmer za pod":"地面底漆","Pločice kupatilo (pod+zid)":"浴室瓷砖 (墙地)","Pločice kuhinja (špic+pod)":"厨房瓷砖","Fleksibilni lepak za keramiku":"柔性瓷砖胶","Fug masa (vodoodbojna)":"防水填缝剂","Podloga":"底漆","Glet masa":"腻子/墙面抹灰","Disperziona poludisperzija bela":"白色乳胶漆","Laminat hrast 10mm":"10mm橡木复合地板","Lajsne i sunđer":"踢脚线和防潮垫","WC Šolja ugradna":"壁挂式马桶","Tuš kabina (staklo)":"玻璃淋浴房","Bojler 50l plitki":"50L超薄热水器","Mešalice (tuš, lavabo)":"水龙头","Utičnice i prekidači Aling":"插座和开关","LED Plafonjere":"LED吸顶灯","Blindirana ulazna vrata":"防盗门","Unutrašnja vrata kupatila":"浴室门","Kuhinjski materijal (univer, okov)":"厨房材料及五金","Vreće za šut i takse za deponiju":"垃圾袋及清运费","Kabl 3x1.5mm2 i 3x2.5mm2":"1.5/2.5mm2电缆","Glavna razvodna tabla":"主配电箱","Cevovod PPR i PVC komlet":"PPR和PVC管道套件","Malter (mašinski/ručni)":"抹灰砂浆","Cement i pesak":"水泥和沙子","EPS Stirodor podni":"地面EPS保温板","Španska keramika (ukupno)":"西班牙瓷砖","Fleksibilni CM16 Lepak":"CM16柔性粘合剂","Glet, podloge i Boje komplet":"腻子、底漆和油漆套件","Hrastov parket standard":"标准橡木地板","Prajmer i Lepak za parket 2k":"2K地板底漆和胶水","Lak na vodenoj bazi":"水性漆","Inverter Midea/HiSense 12k":"变频空调","Bakarna instalacija":"空调空调铜管","Sanitarije (komplet za kupatilo)":"卫浴套件","Elektrogalanterija (modularni prekidači)":"模块化电器配件","Ulazna vrata":"入户门","Unutrašnja vrata (CPL folija)":"CPL贴面室内门","Gipsane Knauf ploče, CD, UD profili":"Knauf石膏板和型材","Isover zvučna izolacija":"Isover隔音棉","Geberit ugradni vodokotlići":"Geberit壁挂水箱","Kablovi za el. podno Thermoval":"Thermoval电地暖","Cevi aluplast + PPR komplet":"铝塑管/PPR管道套件","Pametni releji, osigurači i kablaža (700m)":"智能继电器和线路 (700m)","Cement, pesak, izolacija komplet materijal":"水泥、沙子、保温套件","Prozori ALU, termostaklo komplet":"铝合金窗套件","Italijanska Keramika 1M klasa":"意大利一等瓷砖","Kerakoll/Sika vrhunski lepkovi":"Kerakoll/Sika顶级瓷砖胶","Italijanske boje i glet materijali":"意大利油漆和腻子","Tarkett Hrast (14mm)":"Tarkett橡木地板 (14mm)","Specijalni dvokomponentni lepak":"专用双组分胶水","Mdf visoke lajsne bele":"白色高踢脚线","Unutrašnja Vrata farbani Medijapan":"喷漆密度板门","Kuhinja po meri Medijapan / Kvarc":"定制密度板/石英石厨房","Bosch aparaturna tehnika set":"博世厨电套件","Tuš stakla, slivnici paravani":"淋浴玻璃和地漏","Lusteti, spot i profilna LED rasveta":"吊灯、射灯和LED灯带","Hansgrohe baterije i ugradni tuševi":"汉斯格雅龙头和花洒","Prozori ALU/PVC":"铝塑窗","Keramika 1Klasa":"特级瓷砖","Lepak i glet":"胶水和腻子","Medijapan Kuhinja po meri":"定制密度板厨房" };

const UNIT_EN = { "komplet": "kit", "kom": "pcs", "džak": "bag", "m2": "sqm", "m": "m", "lit": "L", "kanta": "bucket", "kg": "kg" };
const UNIT_RU = { "komplet": "комплект", "kom": "шт", "džak": "мешок", "m2": "м2", "m": "м", "lit": "л", "kanta": "ведро", "kg": "кг" };
const UNIT_ZH = { "komplet": "套", "kom": "个", "džak": "袋", "m2": "平方米", "m": "米", "lit": "升", "kanta": "桶", "kg": "公斤" };

const APARTMENT_TEMPLATES = {
  garsonjera: {
    budget: 2160000,
    workers: [
      { id: 'w1', name: 'Arhitektonski Studio', trade: 'Arhitekta / Tim', phone: '061', rate: 'Paušalno po m2', rating: 5, notes: '' },
      { id: 'w2', name: 'Ekipa za Demontažu', trade: 'Fizički radnici', phone: '062', rate: '40 EUR / dan', rating: 4, notes: '' },
      { id: 'w3', name: 'Elektro Sistem', trade: 'Električar', phone: '063', rate: 'Dogovor po sijaličnom mestu', rating: 5, notes: '' },
      { id: 'w4', name: 'Vodo-Term NS', trade: 'Vodoinstalater', phone: '064', rate: '3500 RSD/h', rating: 4, notes: '' },
      { id: 'w5', name: 'Majstor Gradnja', trade: 'Zidar / OIKOS Moleraj', phone: '065', rate: '15 EUR/m2 (boja)', rating: 4, notes: '' },
      { id: 'w6', name: 'Keramika 1Klasa', trade: 'Keramičar', phone: '066', rate: '3000 RSD/m2 (veliki format)', rating: 5, notes: '' },
      { id: 'w7', name: 'Premium Podovi', trade: 'Parket/Tarkett', phone: '067', rate: 'Ugradnja 2500 RSD/m2', rating: 5, notes: '' },
      { id: 'w8', name: 'Smart Home Ekipa', trade: 'Sistemi', phone: '068', rate: 'Dogovor', rating: 4, notes: '' },
      { id: 'w9', name: 'Premium Stolarija', trade: 'Nameštaj', phone: '069', rate: 'Paušal', rating: 5, notes: '' },
    ],
    phases: [
      { name: 'Priprema, Projekat, Dozvole', notes: 'Tlocrti, dozvole, odabir materijala', duration: 14, tasks: [
        { title: 'Finalizacija rasporeda tlocrta', priority: 'high', cost: 25000, worker_id: 'w1' },
        { title: 'Koordinacija i pribavljanje dozvola', priority: 'normal', cost: 30000, worker_id: 'w1' },
        { title: 'Odabir keramike, parketa i opreme', priority: 'normal', cost: 0, worker_id: 'w1' },
        { title: 'Izrada predmera i predračuna', priority: 'low', cost: 0, worker_id: 'w1' },
      ], materials: [] },
      { name: 'Rušenje i Odvoz', notes: 'Rušenje starih obloga i zidova', duration: 5, tasks: [
        { title: 'Uklanjanje starih podnih obloga', priority: 'normal', cost: 18000, worker_id: 'w2' },
        { title: 'Skidanje starih zidnih pločica', priority: 'normal', cost: 15000, worker_id: 'w2' },
        { title: 'Demontaža starih sanitarija', priority: 'normal', cost: 10000, worker_id: 'w2' },
        { title: 'Odvoz šuta na deponiju', priority: 'low', cost: 15000, worker_id: 'w2' },
      ], materials: [] },
      { name: 'Grubi Elektro Radovi', notes: 'Nova razvodna tabla, cevi i kablovi', duration: 5, tasks: [
        { title: 'Ugradnja nove razvodne table', priority: 'high', cost: 45000, worker_id: 'w3' },
        { title: 'Postavljanje cevi i razvod kablova', priority: 'high', cost: 55000, worker_id: 'w3' },
        { title: 'Ugradnja doza i razvodnih kutija', priority: 'normal', cost: 15000, worker_id: 'w3' },
        { title: 'Provera elektro instalacija u zidu', priority: 'normal', cost: 10000, worker_id: 'w3' },
      ], materials: [] },
      { name: 'Grubi Vodovodni Radovi', notes: 'Razvod dovodne i odvodne mreže', duration: 4, tasks: [
        { title: 'Razvod dopremanja vode', priority: 'high', cost: 40000, worker_id: 'w4' },
        { title: 'Postavljanje kanalizacionih odvoda', priority: 'high', cost: 45000, worker_id: 'w4' },
        { title: 'Priprema podžbuknih priključaka u kupatilu', priority: 'normal', cost: 20000, worker_id: 'w4' },
        { title: 'Priprema vodovoda u kuhinji', priority: 'normal', cost: 15000, worker_id: 'w4' },
      ], materials: [] },
      { name: 'Malterisanje i Suva gradnja', notes: 'Malterisanje, gips i priprema zidova', duration: 10, tasks: [
        { title: 'Krpljenje i ravnanje zidova', priority: 'normal', cost: 60000, worker_id: 'w5' },
        { title: 'Malterisanje i prvi sloj', priority: 'normal', cost: 65000, worker_id: 'w5' },
        { title: 'Gletovanje u dve ruke', priority: 'normal', cost: 40000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Izlivanje Košuljice', notes: 'Cementna košuljica, estrih', duration: 28, tasks: [
        { title: 'Priprema podloge i postavljanje termoizolacije', priority: 'normal', cost: 15000, worker_id: 'w5' },
        { title: 'Izlivanje mašinske košuljice', priority: 'high', cost: 55000, worker_id: 'w5' },
        { title: 'Provera visine i ravnanje podloge', priority: 'normal', cost: 10000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Keramika Kupatila i Kuhinje', notes: 'Postavljanje i fugovanje keramike', duration: 7, tasks: [
        { title: 'Postavljanje keramike u kupatilu', priority: 'high', cost: 85000, worker_id: 'w6' },
        { title: 'Keramika u kuhinji', priority: 'normal', cost: 60000, worker_id: 'w6' },
        { title: 'Fugovanje i impregnacija fugni', priority: 'normal', cost: 15000, worker_id: 'w6' },
        { title: 'Ugradnja ugaonih lajsni', priority: 'low', cost: 10000, worker_id: 'w6' },
      ], materials: [{ name: 'Keramika 1Klasa', quantity: 45, unit: 'm2', price: 4600, store: 'EuroDOM' },{ name: 'Lepak i glet', quantity: 15, unit: 'džak', price: 2300, store: 'Stovarište' }] },
      { name: 'Molerski Radovi', notes: 'Krečenje svih prostorija', duration: 5, tasks: [
        { title: 'Podloga plofona i zidova', priority: 'normal', cost: 30000, worker_id: 'w5' },
        { title: 'Dve ruke završne disperzije', priority: 'normal', cost: 50000, worker_id: 'w5' },
        { title: 'Sanacija sitnih fleka i popravki', priority: 'low', cost: 10000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Postavljanje Podova / Parket', notes: 'Montaža parketa, laminata i lajsni', duration: 3, tasks: [
        { title: 'Ugradnja parketa ili laminata', priority: 'high', cost: 90000, worker_id: 'w7' },
        { title: 'Ugradnja podnih i prelaznih lajsni', priority: 'normal', cost: 25000, worker_id: 'w7' },
        { title: 'Završno lakiranje i ćišćenje podova', priority: 'low', cost: 15000, worker_id: 'w7' },
      ], materials: [] },
      { name: 'Montaža Sanitarija', notes: 'Montaža wc šolje, lavaboa, tuš kabine', duration: 3, tasks: [
        { title: 'Ugradnja wc šolje i bidea', priority: 'normal', cost: 40000, worker_id: 'w4' },
        { title: 'Ugradnja umivaonika i ormarića', priority: 'normal', cost: 35000, worker_id: 'w4' },
        { title: 'Ugradnja tuš kabine', priority: 'normal', cost: 52000, worker_id: 'w4' },
        { title: 'Kačenje držača i ogledala', priority: 'low', cost: 15000, worker_id: 'w4' },
      ], materials: [] },
      { name: 'Fina Montaža Elektro', notes: 'Utičnice, prekidači i rasveta', duration: 3, tasks: [
        { title: 'Ugradnja svih utičnica i prekidača', priority: 'normal', cost: 30000, worker_id: 'w3' },
        { title: 'Montaža svih svetiljki i lustera', priority: 'normal', cost: 35000, worker_id: 'w3' },
        { title: 'Finalna provera table i osigurača', priority: 'high', cost: 15000, worker_id: 'w3' },
      ], materials: [] },
      { name: 'Montaža Kuhinje', notes: 'Ugradnja elemenata, ploče i aparata', duration: 3, tasks: [
        { title: 'Montaža donjih i gornjih kuhinjskih elemenata', priority: 'high', cost: 120000, worker_id: 'w9' },
        { title: 'Ugradnja radne ploče u kuhinji', priority: 'normal', cost: 60000, worker_id: 'w9' },
        { title: 'Priključivanje sudopere i ugradnih aparata', priority: 'normal', cost: 30000, worker_id: 'w9' },
      ], materials: [{ name: 'Medijapan Kuhinja po meri', quantity: 1, unit: 'komplet', price: 340000, store: 'Stolarija' }] },
      { name: 'Dubinsko Čišćenje', notes: 'Profesionalno higijensko čišćenje nakon radova', duration: 2, tasks: [
        { title: 'Profesionalno čišćenje i brisanje prašine', priority: 'normal', cost: 25000, worker_id: '' },
      ], materials: [] },
      { name: 'Primopredaja', notes: 'Sistematičan pregled i predaja ključeva', duration: 2, tasks: [
        { title: 'Inpekcija izvedenih radova (Punch list)', priority: 'high', cost: 0, worker_id: '' },
        { title: 'Potpisivanje zapisnika i predaja objekta', priority: 'normal', cost: 0, worker_id: '' },
      ], materials: [] },
    ]
  },
  dvosoban: {
    budget: 3360000,
    workers: [
      { id: 'w1', name: 'Arhitektonski Studio', trade: 'Arhitekta / Tim', phone: '061', rate: 'Paušalno po m2', rating: 5, notes: '' },
      { id: 'w2', name: 'Ekipa za Demontažu', trade: 'Fizički radnici', phone: '062', rate: '40 EUR / dan', rating: 4, notes: '' },
      { id: 'w3', name: 'Elektro Sistem', trade: 'Električar', phone: '063', rate: 'Dogovor po sijaličnom mestu', rating: 5, notes: '' },
      { id: 'w4', name: 'Vodo-Term NS', trade: 'Vodoinstalater', phone: '064', rate: '3500 RSD/h', rating: 4, notes: '' },
      { id: 'w5', name: 'Majstor Gradnja', trade: 'Zidar / OIKOS Moleraj', phone: '065', rate: '15 EUR/m2 (boja)', rating: 4, notes: '' },
      { id: 'w6', name: 'Keramika 1Klasa', trade: 'Keramičar', phone: '066', rate: '3000 RSD/m2 (veliki format)', rating: 5, notes: '' },
      { id: 'w7', name: 'Premium Podovi', trade: 'Parket/Tarkett', phone: '067', rate: 'Ugradnja 2500 RSD/m2', rating: 5, notes: '' },
      { id: 'w8', name: 'Smart Home Ekipa', trade: 'Sistemi', phone: '068', rate: 'Dogovor', rating: 4, notes: '' },
      { id: 'w9', name: 'Premium Stolarija', trade: 'Nameštaj', phone: '069', rate: 'Paušal', rating: 5, notes: '' },
    ],
    phases: [
      { name: 'Priprema, Projekat, Dozvole', notes: 'Tlocrti, dozvole, odabir materijala', duration: 21, tasks: [
        { title: 'Finalizacija rasporeda tlocrta', priority: 'high', cost: 40000, worker_id: 'w1' },
        { title: 'Koordinacija i pribavljanje dozvola', priority: 'normal', cost: 45000, worker_id: 'w1' },
        { title: 'Odabir keramike, parketa i opreme', priority: 'normal', cost: 0, worker_id: 'w1' },
        { title: 'Izrada predmera i predračuna', priority: 'low', cost: 0, worker_id: 'w1' },
      ], materials: [] },
      { name: 'Rušenje i Odvoz', notes: 'Rušenje starih obloga i zidova', duration: 7, tasks: [
        { title: 'Uklanjanje starih podnih obloga', priority: 'normal', cost: 28000, worker_id: 'w2' },
        { title: 'Skidanje starih zidnih pločica', priority: 'normal', cost: 25000, worker_id: 'w2' },
        { title: 'Demontaža starih sanitarija', priority: 'normal', cost: 15000, worker_id: 'w2' },
        { title: 'Odvoz šuta na deponiju', priority: 'low', cost: 22000, worker_id: 'w2' },
      ], materials: [] },
      { name: 'Zidarski radovi i Prepravke', notes: 'Zidanje, rušenje, formiranje novih zidova', duration: 7, tasks: [
        { title: 'Obeležavanje i rušenje pregradnih zidova', priority: 'high', cost: 45000, worker_id: 'w5' },
        { title: 'Zidanje novih pregradnih zidova', priority: 'high', cost: 60000, worker_id: 'w5' },
        { title: 'Zatvaranje i krpljenje otvora', priority: 'normal', cost: 15000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Grubi Elektro Radovi', notes: 'Nova razvodna tabla, cevi i kablovi', duration: 7, tasks: [
        { title: 'Ugradnja nove razvodne table', priority: 'high', cost: 55000, worker_id: 'w3' },
        { title: 'Postavljanje cevi i razvod kablova', priority: 'high', cost: 90000, worker_id: 'w3' },
        { title: 'Ugradnja doza i razvodnih kutija', priority: 'normal', cost: 30000, worker_id: 'w3' },
        { title: 'Provera elektro instalacija u zidu', priority: 'normal', cost: 20000, worker_id: 'w3' },
      ], materials: [] },
      { name: 'Grubi Vodovodni Radovi', notes: 'Razvod dovodne i odvodne mreže', duration: 5, tasks: [
        { title: 'Razvod dopremanja vode', priority: 'high', cost: 60000, worker_id: 'w4' },
        { title: 'Postavljanje kanalizacionih odvoda', priority: 'high', cost: 70000, worker_id: 'w4' },
        { title: 'Priprema podžbuknih priključaka u kupatilu', priority: 'normal', cost: 30000, worker_id: 'w4' },
        { title: 'Priprema vodovoda u kuhinji', priority: 'normal', cost: 25000, worker_id: 'w4' },
      ], materials: [] },
      { name: 'Grejanje i Klimatizacija', notes: 'Podno grejanje i split sistemi', duration: 7, tasks: [
        { title: 'Postavljanje podnog grejanja', priority: 'high', cost: 120000, worker_id: 'w8' },
        { title: 'Ugradnja klima uređaja', priority: 'high', cost: 100000, worker_id: 'w8' },
        { title: 'Ugradnja i setovanje termostata', priority: 'normal', cost: 30000, worker_id: 'w8' },
      ], materials: [] },
      { name: 'Malterisanje i Suva gradnja', notes: 'Malterisanje, gips i priprema zidova', duration: 14, tasks: [
        { title: 'Krpljenje i ravnanje zidova', priority: 'normal', cost: 90000, worker_id: 'w5' },
        { title: 'Malterisanje i prvi sloj', priority: 'normal', cost: 105000, worker_id: 'w5' },
        { title: 'Gletovanje u dve ruke', priority: 'normal', cost: 60000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Izlivanje Košuljice', notes: 'Cementna košuljica, estrih', duration: 28, tasks: [
        { title: 'Priprema podloge i postavljanje termoizolacije', priority: 'normal', cost: 25000, worker_id: 'w5' },
        { title: 'Izlivanje mašinske košuljice', priority: 'high', cost: 85000, worker_id: 'w5' },
        { title: 'Provera visine i ravnanje podloge', priority: 'normal', cost: 15000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Keramika Kupatila i Kuhinje', notes: 'Postavljanje i fugovanje keramike', duration: 10, tasks: [
        { title: 'Postavljanje keramike u kupatilu', priority: 'high', cost: 130000, worker_id: 'w6' },
        { title: 'Keramika u kuhinji', priority: 'normal', cost: 95000, worker_id: 'w6' },
        { title: 'Fugovanje i impregnacija fugni', priority: 'normal', cost: 25000, worker_id: 'w6' },
        { title: 'Ugradnja ugaonih lajsni', priority: 'low', cost: 15000, worker_id: 'w6' },
      ], materials: [{ name: 'Keramika 1Klasa', quantity: 45, unit: 'm2', price: 4600, store: 'EuroDOM' },{ name: 'Lepak i glet', quantity: 15, unit: 'džak', price: 2300, store: 'Stovarište' }] },
      { name: 'Gletovanje i Grundiranje', notes: 'Dve ruke gletovanja i prva ruka', duration: 7, tasks: [
        { title: 'Nanošenje podloge / prajmera po celom stanu', priority: 'normal', cost: 40000, worker_id: 'w5' },
        { title: 'Matiranje i šmirglanje pre farbanja', priority: 'normal', cost: 40000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Molerski Radovi', notes: 'Krečenje svih prostorija', duration: 7, tasks: [
        { title: 'Podloga plofona i zidova', priority: 'normal', cost: 50000, worker_id: 'w5' },
        { title: 'Dve ruke završne disperzije', priority: 'normal', cost: 75000, worker_id: 'w5' },
        { title: 'Sanacija sitnih fleka i popravki', priority: 'low', cost: 15000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Postavljanje Podova / Parket', notes: 'Montaža parketa, laminata i lajsni', duration: 5, tasks: [
        { title: 'Ugradnja parketa ili laminata', priority: 'high', cost: 140000, worker_id: 'w7' },
        { title: 'Ugradnja podnih i prelaznih lajsni', priority: 'normal', cost: 40000, worker_id: 'w7' },
        { title: 'Završno lakiranje i ćišćenje podova', priority: 'low', cost: 20000, worker_id: 'w7' },
      ], materials: [] },
      { name: 'Unutrašnja Vrata', notes: 'Ugradnja unutrašnjih krila i štokova', duration: 4, tasks: [
        { title: 'Montaža štokova za unutrašnja vrata', priority: 'normal', cost: 60000, worker_id: 'w9' },
        { title: 'Všanje i štelovanje krila vrata', priority: 'normal', cost: 80000, worker_id: 'w9' },
        { title: 'Ugradnja maski i pervajz lajsni', priority: 'low', cost: 40000, worker_id: 'w9' },
      ], materials: [] },
      { name: 'Montaža Kuhinje', notes: 'Ugradnja elemenata, ploče i aparata', duration: 3, tasks: [
        { title: 'Montaža donjih i gornjih kuhinjskih elemenata', priority: 'high', cost: 180000, worker_id: 'w9' },
        { title: 'Ugradnja radne ploče u kuhinji', priority: 'normal', cost: 95000, worker_id: 'w9' },
        { title: 'Priključivanje sudopere i ugradnih aparata', priority: 'normal', cost: 50000, worker_id: 'w9' },
      ], materials: [{ name: 'Medijapan Kuhinja po meri', quantity: 1, unit: 'komplet', price: 340000, store: 'Stolarija' }] },
      { name: 'Montaža Sanitarija', notes: 'Montaža wc šolje, lavaboa, tuš kabine', duration: 4, tasks: [
        { title: 'Ugradnja wc šolja u oba kupatila', priority: 'normal', cost: 60000, worker_id: 'w4' },
        { title: 'Ugradnja umivaonika u oba kupatila', priority: 'normal', cost: 55000, worker_id: 'w4' },
        { title: 'Ugradnja tuš kabine i kade', priority: 'normal', cost: 80000, worker_id: 'w4' },
        { title: 'Kačenje držača i ogledala', priority: 'low', cost: 25000, worker_id: 'w4' },
      ], materials: [] },
      { name: 'Fina Montaža Elektro', notes: 'Utičnice, prekidači i rasveta', duration: 4, tasks: [
        { title: 'Ugradnja svih utičnica i prekidača', priority: 'normal', cost: 45000, worker_id: 'w3' },
        { title: 'Montaža svih svetiljki i lustera', priority: 'normal', cost: 60000, worker_id: 'w3' },
        { title: 'Finalna provera table i osigurača', priority: 'high', cost: 20000, worker_id: 'w3' },
      ], materials: [] },
      { name: 'Dubinsko Čišćenje', notes: 'Profesionalno higijensko čišćenje nakon radova', duration: 2, tasks: [
        { title: 'Profesionalno čišćenje i brisanje prašine', priority: 'normal', cost: 38000, worker_id: '' },
      ], materials: [] },
      { name: 'Primopredaja', notes: 'Sistematičan pregled i predaja ključeva', duration: 2, tasks: [
        { title: 'Inpekcija izvedenih radova (Punch list)', priority: 'high', cost: 0, worker_id: '' },
        { title: 'Potpisivanje zapisnika i predaja objekta', priority: 'normal', cost: 0, worker_id: '' },
      ], materials: [] },
    ]
  },
  trosoban: {
    budget: 4560000,
    workers: [
      { id: 'w1', name: 'Arhitektonski Studio', trade: 'Arhitekta / Tim', phone: '061', rate: 'Paušalno po m2', rating: 5, notes: '' },
      { id: 'w2', name: 'Ekipa za Demontažu', trade: 'Fizički radnici', phone: '062', rate: '40 EUR / dan', rating: 4, notes: '' },
      { id: 'w3', name: 'Elektro Sistem', trade: 'Električar', phone: '063', rate: 'Dogovor po sijaličnom mestu', rating: 5, notes: '' },
      { id: 'w4', name: 'Vodo-Term NS', trade: 'Vodoinstalater', phone: '064', rate: '3500 RSD/h', rating: 4, notes: '' },
      { id: 'w5', name: 'Majstor Gradnja', trade: 'Zidar / OIKOS Moleraj', phone: '065', rate: '15 EUR/m2 (boja)', rating: 4, notes: '' },
      { id: 'w6', name: 'Keramika 1Klasa', trade: 'Keramičar', phone: '066', rate: '3000 RSD/m2 (veliki format)', rating: 5, notes: '' },
      { id: 'w7', name: 'Premium Podovi', trade: 'Parket/Tarkett', phone: '067', rate: 'Ugradnja 2500 RSD/m2', rating: 5, notes: '' },
      { id: 'w8', name: 'Smart Home Ekipa', trade: 'Sistemi', phone: '068', rate: 'Dogovor', rating: 4, notes: '' },
      { id: 'w9', name: 'Premium Stolarija', trade: 'Nameštaj', phone: '069', rate: 'Paušal', rating: 5, notes: '' },
    ],
    phases: [
      { name: 'Priprema, Projekat, Dozvole', notes: 'Tlocrti, dozvole, odabir materijala', duration: 28, tasks: [
        { title: 'Finalizacija rasporeda tlocrta', priority: 'high', cost: 55000, worker_id: 'w1' },
        { title: 'Koordinacija i pribavljanje dozvola', priority: 'normal', cost: 60000, worker_id: 'w1' },
        { title: 'Odabir keramike, parketa i opreme', priority: 'normal', cost: 0, worker_id: 'w1' },
        { title: 'Izrada predmera i predračuna', priority: 'low', cost: 0, worker_id: 'w1' },
      ], materials: [] },
      { name: 'Rušenje i Odvoz', notes: 'Rušenje starih obloga i zidova', duration: 10, tasks: [
        { title: 'Uklanjanje starih podnih obloga', priority: 'normal', cost: 38000, worker_id: 'w2' },
        { title: 'Skidanje starih zidnih pločica', priority: 'normal', cost: 35000, worker_id: 'w2' },
        { title: 'Demontaža starih sanitarija', priority: 'normal', cost: 20000, worker_id: 'w2' },
        { title: 'Odvoz šuta na deponiju', priority: 'low', cost: 27000, worker_id: 'w2' },
      ], materials: [] },
      { name: 'Zidarski radovi i Prepravke', notes: 'Zidanje, rušenje, formiranje novih zidova', duration: 10, tasks: [
        { title: 'Obeležavanje i rušenje pregradnih zidova', priority: 'high', cost: 65000, worker_id: 'w5' },
        { title: 'Zidanje novih pregradnih zidova', priority: 'high', cost: 90000, worker_id: 'w5' },
        { title: 'Zatvaranje i krpljenje otvora', priority: 'normal', cost: 25000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Grubi Elektro Radovi', notes: 'Nova razvodna tabla, cevi i kablovi', duration: 10, tasks: [
        { title: 'Ugradnja nove razvodne table', priority: 'high', cost: 70000, worker_id: 'w3' },
        { title: 'Postavljanje cevi i razvod kablova', priority: 'high', cost: 130000, worker_id: 'w3' },
        { title: 'Ugradnja doza i razvodnih kutija', priority: 'normal', cost: 40000, worker_id: 'w3' },
        { title: 'Provera elektro instalacija u zidu', priority: 'normal', cost: 25000, worker_id: 'w3' },
      ], materials: [] },
      { name: 'Grubi Vodovodni Radovi', notes: 'Razvod dovodne i odvodne mreže', duration: 7, tasks: [
        { title: 'Razvod dopremanja vode', priority: 'high', cost: 80000, worker_id: 'w4' },
        { title: 'Postavljanje kanalizacionih odvoda', priority: 'high', cost: 95000, worker_id: 'w4' },
        { title: 'Priprema vodovoda za dva kupatila', priority: 'normal', cost: 50000, worker_id: 'w4' },
        { title: 'Priprema vodovoda u kuhinji', priority: 'normal', cost: 25000, worker_id: 'w4' },
      ], materials: [] },
      { name: 'Grejanje i Klimatizacija', notes: 'Podno grejanje i split sistemi', duration: 10, tasks: [
        { title: 'Postavljanje podnog grejanja', priority: 'high', cost: 160000, worker_id: 'w8' },
        { title: 'Ugradnja klima uređaja', priority: 'high', cost: 150000, worker_id: 'w8' },
        { title: 'Ugradnja i setovanje termostata', priority: 'normal', cost: 40000, worker_id: 'w8' },
      ], materials: [] },
      { name: 'Spoljna Stolarija i Vrata', notes: 'Novi prozori i sigurnosna ulazna vrata', duration: 7, tasks: [
        { title: 'Demontaža starih prozora', priority: 'normal', cost: 30000, worker_id: '' },
        { title: 'Ugradnja novih PVC/ALU prozora', priority: 'high', cost: 280000, worker_id: '' },
        { title: 'Ugradnja sigurnosnih ulaznih vrata', priority: 'high', cost: 90000, worker_id: '' },
        { title: 'Silikoniranje i obrada špaletna', priority: 'normal', cost: 20000, worker_id: '' },
      ], materials: [{ name: 'Prozori ALU/PVC', quantity: 6, unit: 'kom', price: 65000, store: 'Stovarište' }] },
      { name: 'Malterisanje i Suva gradnja', notes: 'Malterisanje, gips i priprema zidova', duration: 18, tasks: [
        { title: 'Krpljenje i ravnanje zidova', priority: 'normal', cost: 120000, worker_id: 'w5' },
        { title: 'Malterisanje i prvi sloj', priority: 'normal', cost: 145000, worker_id: 'w5' },
        { title: 'Gletovanje u dve ruke', priority: 'normal', cost: 80000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Izlivanje Košuljice', notes: 'Cementna košuljica, estrih', duration: 28, tasks: [
        { title: 'Priprema podloge i postavljanje termoizolacije', priority: 'normal', cost: 30000, worker_id: 'w5' },
        { title: 'Izlivanje mašinske košuljice', priority: 'high', cost: 120000, worker_id: 'w5' },
        { title: 'Provera visine i ravnanje podloge', priority: 'normal', cost: 20000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Keramika Kupatila i Kuhinje', notes: 'Postavljanje i fugovanje keramike', duration: 14, tasks: [
        { title: 'Keramika prvog kupatila', priority: 'high', cost: 110000, worker_id: 'w6' },
        { title: 'Keramika drugog kupatila', priority: 'high', cost: 100000, worker_id: 'w6' },
        { title: 'Keramika u kuhinji', priority: 'normal', cost: 110000, worker_id: 'w6' },
        { title: 'Fugovanje, lajsne i silikon', priority: 'normal', cost: 40000, worker_id: 'w6' },
      ], materials: [{ name: 'Keramika 1Klasa', quantity: 45, unit: 'm2', price: 4600, store: 'EuroDOM' },{ name: 'Lepak i glet', quantity: 15, unit: 'džak', price: 2300, store: 'Stovarište' }] },
      { name: 'Gletovanje i Grundiranje', notes: 'Dve ruke gletovanja i prva ruka', duration: 10, tasks: [
        { title: 'Nanošenje podloge / prajmera po celom stanu', priority: 'normal', cost: 60000, worker_id: 'w5' },
        { title: 'Matiranje i šmirglanje pre farbanja', priority: 'normal', cost: 60000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Molerski Radovi', notes: 'Krečenje svih prostorija', duration: 10, tasks: [
        { title: 'Podloga plofona i zidova', priority: 'normal', cost: 65000, worker_id: 'w5' },
        { title: 'Dve ruke završne disperzije', priority: 'normal', cost: 105000, worker_id: 'w5' },
        { title: 'Sanacija sitnih fleka i popravki', priority: 'low', cost: 20000, worker_id: 'w5' },
      ], materials: [] },
      { name: 'Postavljanje Podova / Parket', notes: 'Montaža parketa, laminata i lajsni', duration: 7, tasks: [
        { title: 'Ugradnja parketa ili laminata', priority: 'high', cost: 195000, worker_id: 'w7' },
        { title: 'Ugradnja podnih i prelaznih lajsni', priority: 'normal', cost: 55000, worker_id: 'w7' },
        { title: 'Završno lakiranje i ćišćenje podova', priority: 'low', cost: 25000, worker_id: 'w7' },
      ], materials: [] },
      { name: 'Unutrašnja Vrata', notes: 'Ugradnja unutrašnjih krila i štokova', duration: 5, tasks: [
        { title: 'Montaža štokova za unutrašnja vrata', priority: 'normal', cost: 90000, worker_id: 'w9' },
        { title: 'Všanje i štelovanje krila vrata', priority: 'normal', cost: 130000, worker_id: 'w9' },
        { title: 'Ugradnja maski i pervajz lajsni', priority: 'low', cost: 50000, worker_id: 'w9' },
      ], materials: [] },
      { name: 'Montaža Kuhinje', notes: 'Ugradnja elemenata, ploče i aparata', duration: 4, tasks: [
        { title: 'Montaža donjih i gornjih kuhinjskih elemenata', priority: 'high', cost: 250000, worker_id: 'w9' },
        { title: 'Ugradnja radne ploče u kuhinji', priority: 'normal', cost: 130000, worker_id: 'w9' },
        { title: 'Priključivanje sudopere i ugradnih aparata', priority: 'normal', cost: 60000, worker_id: 'w9' },
      ], materials: [{ name: 'Medijapan Kuhinja po meri', quantity: 1, unit: 'komplet', price: 340000, store: 'Stolarija' }] },
      { name: 'Montaža Sanitarija', notes: 'Montaža wc šolje, lavaboa, tuš kabine', duration: 5, tasks: [
        { title: 'Ugradnja wc šolja u oba kupatila', priority: 'normal', cost: 80000, worker_id: 'w4' },
        { title: 'Ugradnja umivaonika u oba kupatila', priority: 'normal', cost: 70000, worker_id: 'w4' },
        { title: 'Ugradnja tuš kabina u oba kupatila', priority: 'normal', cost: 110000, worker_id: 'w4' },
        { title: 'Kačenje zidnih aksesoara', priority: 'low', cost: 40000, worker_id: 'w4' },
      ], materials: [] },
      { name: 'Fina Montaža Elektro', notes: 'Utičnice, prekidači i rasveta', duration: 5, tasks: [
        { title: 'Ugradnja svih utičnica i prekidača', priority: 'normal', cost: 65000, worker_id: 'w3' },
        { title: 'Montaža svih svetiljki i lustera', priority: 'normal', cost: 80000, worker_id: 'w3' },
        { title: 'Finalna provera table i osigurača', priority: 'high', cost: 25000, worker_id: 'w3' },
      ], materials: [] },
      { name: 'Ugradni Plakari', notes: 'Okviri, klizna vrata, police', duration: 5, tasks: [
        { title: 'Montaža okvira ugradnih plakara', priority: 'normal', cost: 120000, worker_id: 'w9' },
        { title: 'Ugradnja kliznih vrata i enterijera', priority: 'normal', cost: 120000, worker_id: 'w9' },
        { title: 'Montaža polica i nosača za cipele', priority: 'low', cost: 40000, worker_id: 'w9' },
      ], materials: [] },
      { name: 'Dubinsko Čišćenje', notes: 'Profesionalno higijensko čišćenje nakon radova', duration: 3, tasks: [
        { title: 'Profesionalno čišćenje i brisanje prašine', priority: 'normal', cost: 55000, worker_id: '' },
      ], materials: [] },
      { name: 'Primopredaja', notes: 'Sistematičan pregled i predaja ključeva', duration: 3, tasks: [
        { title: 'Inpekcija izvedenih radova (Punch list)', priority: 'high', cost: 0, worker_id: '' },
        { title: 'Potpisivanje zapisnika i predaja objekta', priority: 'normal', cost: 0, worker_id: '' },
      ], materials: [] },
    ]
  },
};


let pendingTemplate = null;

// ---- MODULE-LEVEL TRANSLATION HELPERS ----
const TPL_SR_TO_EN_PHASES = {
  "Priprema, Projekat, Dozvole": "Planning & Design",
  "Rušenje i Odvoz": "Demolition & Stripping",
  "Zidarski radovi i Prepravke": "Structural Work & Masonry",
  "Grubi Elektro Radovi": "Electrical Rough-In",
  "Grubi Vodovodni Radovi": "Plumbing Rough-In",
  "Grejanje i Klimatizacija": "HVAC & Heating",
  "Spoljna Stolarija i Vrata": "Windows & Exterior Doors",
  "Malterisanje i Suva gradnja": "Plastering & Drywall",
  "Izlivanje Košuljice": "Floor Screed & Leveling",
  "Keramika Kupatila i Kuhinje": "Tiling — Bathrooms & Kitchen",
  "Gletovanje i Grundiranje": "Wall Finishing & Primer",
  "Molerski Radovi": "Painting",
  "Postavljanje Podova / Parket": "Flooring Installation",
  "Unutrašnja Vrata": "Interior Doors & Trim",
  "Montaža Kuhinje": "Kitchen Installation",
  "Montaža Sanitarija": "Bathroom Fixtures & Fittings",
  "Fina Montaža Elektro": "Electrical Finish Work",
  "Ugradni Plakari": "Built-in Closets & Storage",
  "Dubinsko Čišćenje": "Deep Cleaning",
  "Primopredaja": "Final Inspection & Walkthrough"
};

function tplGetPhaseName(name, lang) {
  if (!lang || lang === 'sr') return name;
  const enKey = TPL_SR_TO_EN_PHASES[name] || name;
  if (lang === 'en') return enKey;
  if (lang === 'ru') return (typeof PHASE_TRANSLATIONS_RU !== 'undefined' ? PHASE_TRANSLATIONS_RU[enKey] : enKey) || enKey;
  if (lang === 'zh') return (typeof PHASE_TRANSLATIONS_ZH !== 'undefined' ? PHASE_TRANSLATIONS_ZH[enKey] : enKey) || enKey;
  return name;
}

function tplGetTaskTitle(title, lang) {
  if (!lang || lang === 'sr') return title;
  return (typeof TASK_ALIASES !== 'undefined' ? TASK_ALIASES[title] : title) || title;
}

function tplGetMatName(name, lang) {
  if (lang === 'en') return MAT_EN[name] || name;
  if (lang === 'ru') return MAT_RU[name] || name;
  if (lang === 'zh') return MAT_ZH[name] || name;
  return name;
}

function tplGetUnitName(unit, lang) {
  if (lang === 'en') return UNIT_EN[unit] || unit;
  if (lang === 'ru') return UNIT_RU[unit] || unit;
  if (lang === 'zh') return UNIT_ZH[unit] || unit;
  return unit;
}
// ------------------------------------------

function previewTemplate(type) {
  const tpl = APARTMENT_TEMPLATES[type];
  if (!tpl) return;
  pendingTemplate = { type, tpl };

  const langSel = document.getElementById('tplMaterialLang');
  if (langSel) langSel.value = (typeof currentLang !== 'undefined' && langSel.querySelector(`option[value="${currentLang}"]`)) ? currentLang : 'sr';

  const names = { garsonjera: t('tpl_studio'), dvosoban: t('tpl_two_room'), trosoban: t('tpl_three_room') };
  document.getElementById('templateModalTitle').textContent = names[type] || type;

  const budgetEur = Math.round(tpl.budget / 117);
  const totalPhases = tpl.phases.length;
  const totalTasks = tpl.phases.reduce((s, p) => s + (p.tasks || []).length, 0);
  const totalWorkers = (tpl.workers || []).length;
  
  // Hide progress area initially, show options
  document.getElementById('tplProgressArea').style.display = 'none';
  document.getElementById('templateOptions').style.display = 'block';
  document.getElementById('templatePreviewContent').style.display = 'block';
  document.getElementById('templateModalFooter').style.display = 'flex';

  let html = `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.6rem 0.75rem;background:var(--frost);border-radius:0.75rem;border:1px solid var(--mist);flex-wrap:wrap;">
    <span style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-secondary);margin-right:0.25rem;">${t('tpl_summary_title') || 'Summary'}:</span>
    <span style="display:flex;align-items:center;gap:0.2rem;font-size:0.8rem;font-weight:600;padding:0.2rem 0.5rem;background:var(--card-bg);border-radius:0.4rem;border:1px solid var(--mist);">
      <span style="color:var(--text-secondary);font-size:0.65rem;font-weight:400;">${t('lbl_phases') || 'Phases'}</span> ${totalPhases}
    </span>
    <span style="display:flex;align-items:center;gap:0.2rem;font-size:0.8rem;font-weight:600;padding:0.2rem 0.5rem;background:var(--card-bg);border-radius:0.4rem;border:1px solid var(--mist);">
      <span style="color:var(--text-secondary);font-size:0.65rem;font-weight:400;">${t('lbl_tasks') || 'Tasks'}</span> ${totalTasks}
    </span>
    <span style="display:flex;align-items:center;gap:0.2rem;font-size:0.8rem;font-weight:600;padding:0.2rem 0.5rem;background:var(--card-bg);border-radius:0.4rem;border:1px solid var(--mist);">
      <span style="color:var(--text-secondary);font-size:0.65rem;font-weight:400;">${t('lbl_workers') || 'Workers'}</span> ${totalWorkers}
    </span>
    <span style="margin-left:auto;font-size:0.8rem;font-weight:700;color:#22c55e;">${fmt(tpl.budget)}</span>
  </div>`;

  document.getElementById('templatePreviewContent').innerHTML = html;
  document.getElementById('applyTemplateBtn').onclick = () => applyTemplate(type);
  openModal('templateModal');
}

async function applyTemplate(type) {
  const includeWorkers = document.getElementById('tplIncludeWorkers')?.checked ?? true;
  const includeMaterials = document.getElementById('tplIncludeMaterials')?.checked ?? true;
  const matLang = document.getElementById('tplMaterialLang')?.value || 'sr';

  const tpl = APARTMENT_TEMPLATES[type];
  if (!tpl) return;

  // Show progress area, hide others
  document.getElementById('templateOptions').style.display = 'none';
  document.getElementById('templatePreviewContent').style.display = 'none';
  document.getElementById('templateModalFooter').style.display = 'none';
  document.getElementById('tplProgressArea').style.display = 'block';
  
  const progBar = document.getElementById('tplProgressBarInner');
  const progStat = document.getElementById('tplProgressStatus');
  const updateProgress = (pct, msg) => {
    progBar.style.width = pct + '%';
    progStat.textContent = msg + '... ' + Math.round(pct) + '%';
  };

  updateProgress(0, 'Initializing');

  // 1) RESET PROTECTION — use inline confirm panel instead of confirm() which can be blocked on HTTPS
  if (appData.phases && appData.phases.length > 0 && window.BYPASS_CONFIRM !== true) {
    // Show inline confirm panel
    document.getElementById('tplProgressArea').style.display = 'none';
    document.getElementById('templateOptions').style.display = 'none';
    document.getElementById('templatePreviewContent').style.display = 'none';
    document.getElementById('templateModalFooter').style.display = 'none';

    let confirmPanel = document.getElementById('tplConfirmPanel');
    if (!confirmPanel) {
      confirmPanel = document.createElement('div');
      confirmPanel.id = 'tplConfirmPanel';
      confirmPanel.style.cssText = 'padding:1.25rem;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:0.75rem;text-align:center;';
      document.querySelector('#templateModal .bl-modal-body').appendChild(confirmPanel);
    }
    confirmPanel.style.display = 'block';
    confirmPanel.innerHTML = `
      <div style="font-size:0.85rem;font-weight:600;color:#ef4444;margin-bottom:0.5rem;">⚠️ ${t('confirm_reset_on_template') || 'Delete existing data and load template?'}</div>
      <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:1rem;">${t('be_careful_undone') || 'This action cannot be undone.'}</div>
      <div style="display:flex;gap:0.5rem;justify-content:center;">
        <button onclick="document.getElementById('tplConfirmPanel').style.display='none';
          document.getElementById('templateOptions').style.display='block';
          document.getElementById('templatePreviewContent').style.display='block';
          document.getElementById('templateModalFooter').style.display='flex';"
          style="padding:0.4rem 1rem;border-radius:0.5rem;border:1px solid var(--mist);background:var(--frost);color:var(--text-primary);cursor:pointer;font-size:0.8rem;">Cancel</button>
        <button onclick="window.BYPASS_CONFIRM=true; document.getElementById('tplConfirmPanel').style.display='none'; applyTemplate('${type}');"
          style="padding:0.4rem 1rem;border-radius:0.5rem;border:none;background:#ef4444;color:white;cursor:pointer;font-size:0.8rem;font-weight:600;">Delete &amp; Load</button>
      </div>`;
    return;
  }

  if (appData.phases && appData.phases.length > 0) {
    updateProgress(5, 'Clearing existing data');
    try {
        await api('reset_project', { type: 'all' });
        appData.phases = []; appData.tasks = []; appData.workers = []; appData.materials = []; appData.payments = [];
        window.BYPASS_CONFIRM = false;
    } catch(e) { console.error(e); }
  }

  const totalSteps = 1 + (tpl.workers ? tpl.workers.length : 0) + tpl.phases.length + tpl.phases.reduce((s,p) => s + (p.tasks||[]).length + (p.materials||[]).length, 0);
  let currentStep = 0;
  let added = 0;
  const tick = (msg) => {
    currentStep++;
    updateProgress((currentStep / totalSteps) * 100, msg);
  };

  // 2) Update Plan Budget
  updateProgress(10, 'Updating budget');
  if (tpl.budget) {
     await api('save_plan', { ...appData.plan, total_budget: tpl.budget });
  }
  tick('Plan updated');

  const existingNames = new Set((appData.phases||[]).flatMap(ph => [
    (ph.name || '').toLowerCase().trim(),
    (ph.name_sr || '').toLowerCase().trim()
  ].filter(Boolean)));

  const existingWorkers = new Set((appData.workers||[]).map(w => (w.name||'').toLowerCase().trim()));

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  let cursor = appData.plan.start_date ? new Date(appData.plan.start_date) : new Date();
  
  // 1) IMPORT WORKERS
  let workerMap = {}; 
  if (tpl.workers && includeWorkers) {
     for (const w of tpl.workers) {
         if (existingWorkers.has(w.name.toLowerCase().trim())) {
             const exist = appData.workers.find(x => (x.name||'').toLowerCase().trim() === w.name.toLowerCase().trim());
             if (exist) workerMap[w.id] = exist.id;
             tick('Worker exists: ' + w.name);
             continue;
         }
         try {
             tick('Adding worker: ' + w.name);
             const wRes = await api('add_worker', { name: w.name, trade: w.trade, phone: w.phone, email: '', rate: w.rate, rating: w.rating, notes: w.notes });
             if (wRes && wRes.worker) workerMap[w.id] = wRes.worker.id;
             await sleep(100);
         } catch(e) { console.error('TPL Worker Init', e); }
     }
  }

  // 2) IMPORT PHASES + TASKS + MATERIALS
  for (const ph of tpl.phases) {
    const start = cursor.toISOString().slice(0,10);
    cursor.setDate(cursor.getDate() + ph.duration);
    const end = cursor.toISOString().slice(0,10);
    cursor.setDate(cursor.getDate() + 1);

    const translatedPhaseName = tplGetPhaseName(ph.name, matLang);
    if (existingNames.has(translatedPhaseName.toLowerCase().trim())) continue;

    tick('Adding phase: ' + translatedPhaseName);
    const phRes = await api('add_phase', { name: translatedPhaseName, notes: ph.notes || '', start, end, status: 'pending', progress: 0 });
    added++;
    await sleep(150);

    if (phRes && phRes.phase) {
      const phaseId = phRes.phase.id;
      
      if (ph.tasks) {
        for (const tk of ph.tasks) {
          tick('Adding task: ' + tk.title);
          await api('add_task', {
            title:    tplGetTaskTitle(tk.title, matLang === 'sr' ? '' : matLang),
            phase_id: phaseId,
            worker_id: includeWorkers ? (workerMap[tk.worker_id] || '') : '', 
            priority: tk.priority || 'normal',
            cost:     includeWorkers ? (tk.cost || 0) : 0, 
            notes:    tk.notes    || '',
            status:   'todo',
            start_date: start,
            end_date: end
          });
          await sleep(100);
        }
      }
      
      if (ph.materials && includeMaterials) {
        for (const m of ph.materials) {
          tick('Adding material: ' + m.name);
          await api('add_material', {
             name: tplGetMatName(m.name, matLang === 'sr' ? '' : matLang),
             phase_id: phaseId,
             quantity: m.quantity || 1,
             unit: tplGetUnitName(m.unit, matLang === 'sr' ? '' : matLang),
             price: m.price || 0,
             store: m.store || '',
             status: 'needed',
             order_by_date: start
          });
          await sleep(100);
        }
      }
    }
  }

  closeModal('templateModal');
  await init();
  toast(added > 0 ? t('tpl_added_toast').replace('{n}', added) : t('tpl_exists_toast'));
}
