# Star Wars Characters

- [Star Wars Characters](#star-wars-characters)
  - [Leírás](#leírás)
  - [Fejleszői jegyzetek](#fejleszői-jegyzetek)
  - [Képek](#képek)
  - [Futtatás](#futtatás)

## Leírás

Az alkalmazás a **SWAPI** használatával listázza az összes elérhető Star Wars karaktert React Native-ban. A karakterek neve, szemszíne, hajszíne, bőrszíne, valamint az általuk használt űrhajók száma és neve jelenik meg.

- **Keresés**: A kereső segítségével lehetőség van szűrni a karaktereket név, szemszín, hajszín, bőrszín és űrhajók száma alapján.
- **Rendezés**: A keresés mellett az alkalmazás rendezni is tud:
  - név (A-Z),
  - szemszín (A-Z),
  - hajszín (A-Z),
  - bőrszín (A-Z),
  - űrhajók száma (növekvő sorrendben).
- **Azonnali frissítés**: A keresőmezőbe beírt értékek azonnal frissítik a listát.
- **Kategória gombok**: A keresőmező alatt öt gomb található, amelyek az öt különböző szűrési kategóriát képviselik:
  - Egy rövid kattintás szűri az adott kategória alapján.
  - Egy hosszú kattintás rendezést végez az adott kategóriára vonatkozóan.
- **Jelölés**: A jelenleg kiválasztott szűrőt sárga színű ikon jelzi, a rendezést pedig egy sárga körvonal.
- **Részletek**: Egy karakter nevére hosszan kattintva legördülnek a karakter részletes adatai 

## Fejleszői jegyzetek
- **Paginálás**: A paginálást kivettem az előző iterációból mivel így sokkal reszponzívabb az alkalmazás betöltés után, mely az automatikus filterelést elő segíti.
- **Created date**: Ezt az értéket kihagytam a karakterek listázásánál a UI letisztultsága érdekében, de lényegében ugyan azt a rendszert használná mint bármely másik sorting/filtering.

## Képek

<p align="center">
    <img src="https://github.com/kokasmark/swapi/blob/master/assets/screenshot_0.png?raw=true" alt="Kék szemre szűrve, név szerint sorban" width="22%"/>
    <img src="https://github.com/kokasmark/swapi/blob/master/assets/screenshot_1.png?raw=true" alt="Skywalker névre szűrve, név szerint sorban" width="22%"/>
    <img src="https://github.com/kokasmark/swapi/blob/master/assets/screenshot_2.png?raw=true" alt="Piros szemre szűrve, név szerint sorban" width="22%"/>
    <img src="https://github.com/kokasmark/swapi/blob/master/assets/screenshot_3.png?raw=true" alt="Boba fett részletei" width="22%"/>
</p>

- *Kék szemre szűrve, név szerint sorban*
- *Skywalker névre szűrve, név szerint sorban*
- *Piros szemre szűrve, név szerint sorban*
- *Boba Fett részletei*

## Futtatás
- **npm i**: a csomagok installálása
- **npx expo start**: expo indítása -> expo alkalmazás
- **expo go alkalmazás telepítése**: ezzel az alkalmazással könnyen egy QR kód beolvasásával (melyet a start után ír ki a consoleba) lehet az alkalmazást tesztelni telefonon.
