# NB!

[![Join the chat at https://gitter.im/knowit/ethereum-workshop](https://badges.gitter.im/knowit/ethereum-workshop.svg)](https://gitter.im/knowit/ethereum-workshop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Hvis du støter problemer under innstallasjon på egen maskin, kan du hoppe over dette og heller bruke en `Virtuell maskin` som beskrevet lenger ned. 

Det skal være mulig å få til oppsettet på både Mac, Windows og Linux, men merk at Windows er mindre testet, så hvis du får problemer her så anbefaler vi å bruke en `Virtuell maskin`.

# Installasjon
1. Installer npm og node. Velg LTS slik at du får node versjon 6.x. Hvordan det gjøres finnes på https://nodejs.org/en/download/current/
2. Installer truffle ved å kjøre `npm install -g truffle ethereumjs-testrpc`
3. Sett opp prosjektet
    * Dra ned dette repoet med kommandoen `git clone https://github.com/knowit/ethereum-workshop`.
    * Gå inn i mappen som er blitt klonet (`$ cd ethereum-workshop`), kjør først kommandoen `npm install` og så `truffle migrate`.
    * Til slutt må man kjøre kommandoen `npm run dev` som starter webpack-dev-serveren på `localhost:8080`
    * Gå inn på siden for å verifisere at den kjører. Du vil ikke kunne bruke denne siden før deler av workshopen er løst.
    * Åpne prosjektet i din favoritt editor. Solidity, som er språket vi for det meste skal kode i, er støttet av de fleste IDE hvis man installerer en ekstra plugin.

# Virtuell maskin
Dersom du fikk til å installere alt på maskinen din under `Installasjon`, så kan du hoppe over dette. 
Det er ment som et alternativ til de som har problemer med å få ting satt opp riktig, eller ikke ønsker å installere det på egen maskin.

1. Last ned [Virtualbox](https://www.virtualbox.org/wiki/Downloads) og installer programmet.
2. Last ned VM [imaget](https://drive.google.com/file/d/0B7hH5Ns5xLvhNjhIUm5TQnRrZWs/view) som vi har gjort klart. Alt du trenger ligger i dette imaget.
3. Følg [guide fra Oracle](https://docs.oracle.com/cd/E26217_01/E26796/html/qs-import-vm.html) på hvordan man kan legge til dette bildet i Virtualbox.


# Troubleshooting

1. `testrpc` feiler umiddelbart med følgende stack trace
    ```javascript
    /usr/local/lib/node_modules/ethereumjs-testrpc/build/cli.node.js:30305
    function VM (opts = {}) {
                  ^

    SyntaxError: Unexpected token =
        at exports.runInThisContext (vm.js:53:16)
        at Module._compile (module.js:374:25)
        at Object.Module._extensions..js (module.js:417:10)
        at Module.load (module.js:344:32)
        at Function.Module._load (module.js:301:12)
        at Function.Module.runMain (module.js:442:10)
        at startup (node.js:136:18)
        at node.js:966:3
    ```

  * Grunn: [ethereumjs-vm bruker ES6 etter at `node` 6.9.1 har fått LTS](https://github.com/ethereumjs/testrpc/issues/216#issuecomment-264552034)
  * Fix: Oppgrader `node` til nyeste stabile versjon
      ```shell
      $ npm cache clean -f
      $ npm install -g n
      $ n stable
      ```
