# NB!

For english readme see [README.English.md](https://github.com/knowit/ethereum-workshop/blob/master/README.English.md).

[![Join the chat at https://gitter.im/knowit-blockchain-workshop](https://badges.gitter.im/knowit/ethereum-workshop.svg)](https://gitter.im/knowit-blockchain-workshop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Hvis du støter problemer under innstallasjon på egen maskin, kan du hoppe over dette og heller bruke en `Virtuell maskin` som beskrevet lenger ned. 

Det skal være mulig å få til oppsettet på både Mac, Windows og Linux, men merk at Windows er mindre testet, så hvis du får problemer her så anbefaler vi å bruke en `Virtuell maskin`.

# Installasjon
1. Pass på at `git` er installert. 
    * Last ned for Windows: `https://git-scm.com/download/win`
    * Last ned for Mac: `https://git-scm.com/download/gui/mac`
    * Last ned for Linux: `https://mirrors.edge.kernel.org/pub/software/scm/git/`

2. Installer npm og node. Velg LTS slik at du får node versjon 8.x. Hvordan det gjøres finnes på https://nodejs.org/en/download/current/

3. Installer truffle ved å kjøre `npm install -g truffle ethereumjs-testrpc`

4. Sett opp prosjektet
    * Dra ned dette repoet med kommandoen `git clone https://github.com/knowit/ethereum-workshop`.
    * Gå inn i mappen som er blitt klonet (`cd ethereum-workshop`), kjør først kommandoen `npm install` og så `truffle migrate`.
    * Til slutt må man kjøre kommandoen `npm run dev` som starter webpack-dev-serveren på `localhost:8080`, hvis denne siden gir 404 eller at siden ikke finnes prøv `http://127.0.0.1:8080`.
    * Gå inn på siden for å verifisere at den kjører. Du vil ikke kunne bruke denne siden før deler av workshopen er løst.
    * Åpne prosjektet i din favoritt editor. Solidity, som er språket vi for det meste skal kode i, er støttet av de fleste IDE hvis man installerer en ekstra plugin.

5. Sjekk at `truffle` er installert ved å skrive `truffle version` i terminalen. Kommandoen skal skrive noe i terminalen som dette:
```bash
$ truffle version
Truffle v3.4.9 (core: 3.4.8)
Solidity v0.4.15 (solc-js)
```

6. For å kjøre opp en lokal instans av ethereum-blockchain på maskinen din nå du skrive `testrpc`.
NB: Hver gang du vil teste om smart-kontrakten din er skrevet riktig, så kan du kjøre testene med kommandoen `truffle test`. For å kompilere må du skrive `truffle compile`.

# Oppgavene
Oppgavene for workshoppen finner du [her](https://github.com/knowit/ethereum-workshop/blob/master/Tasks.md) under Tasks.md.

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
