# Installering
1. Installer npm og node. Hvordan det gjøres finnes på https://nodejs.org/en/download/current/
2. Installer truffle ved å kjøre `npm install -g truffle` og `npm install -g ethereumjs-testrpc`
3. Verifiser at installasjonen er riktig ved å kjøre `truffle init webpack` i en tom mappe.
    * I ett terminal vindu start testrpc med kommandoen `testrpc`
    * I et annet vindu kjør `truffle compile` og `truffle migrate` i den rekkefølgen.
    * Til slutt kjøres `npm run dev` som starter webpack-dev-serveren på `localhost:8080`
    * Gå inn på siden og skriv inn et heltall som amount og et tall/hexadesimalt tall som adresse.
    * Verifiser ved å trykke på "Send MetaCoin" at du mister det antallet META du har spesifiser over

4. Til slutt vil vi gjerne at du installerer et program som heter Mist (https://github.com/ethereum/mist/releases). Dette er et program som lar deg 'browse' gjennom smart contracts i ethereumnettverket, og er hva vi kommer til å bruke for å deploye kontrakten vår til blockchainen (test-nettet).
    * Når du har installert pass på at du er koblet til testnettet, det er markert ved en rød boks nederst i venstre hjørne som sier "Rinkeby".
    * Når du har verifisert at du er koblet til testnettet vil testnet-blockchainen lastes ned, og det skal bare være å ha denne kjørende i bakgrunnen en stund så du kommer i sync. 

5. Når det kommer til Ether på testnettet er dette noe vi kan provide under workshoppen :)
