const adhan = require('adhan');  

// Koordinat untuk Solo, Indonesia  
const coordinates = new adhan.Coordinates(-7.5582, 110.8271); // Latitude dan Longitude  
const params = adhan.CalculationMethod.MoonsightingCommittee();  
const date = new Date();  

// Mendapatkan waktu sholat  
const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);  

// Menampilkan waktu sholat  
console.clear();  
console.log('\x1b[36m', '=================== Waktu Sholat di Solo ===================');  
console.log(`Subuh   : ${prayerTimes.fajr.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`);  
console.log(`Dzuhur  : ${prayerTimes.dhuhr.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`);  
console.log(`Ashar   : ${prayerTimes.asr.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`);  
console.log(`Maghrib : ${prayerTimes.maghrib.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`);  
console.log(`Isya    : ${prayerTimes.isha.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`);  
console.log('==============================================================', '\x1b[0m');