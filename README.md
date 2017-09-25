# NB!
Hvis du bruker `Windows`, gå ned til seksjonen som heter: `Virtuell maskin`. Eller finn deg en som bruker `Linux` eller `osx` som operativsystem.

Hvis du bruker `osx` eller `Linux`, gå ned til `Installasjon`.

# Installasjon
1. Installer npm og node. Hvordan det gjøres finnes på https://nodejs.org/en/download/current/
2. Installer truffle ved å kjøre `npm install -g truffle` og `npm install -g ethereumjs-testrpc`
3. Verifiser at installasjonen er riktig ved å kjøre `truffle init webpack` i en tom mappe.
    * I ett nytt terminal vindu, start opp en lokal instans av blockchain med kommandoen `testrpc`.
    * Dra ned dette repoet med kommandoen `git clone https://github.com/knowit/ethereum-workshop`.
    * Gå inn i mappen som er blitt klonet (`$ cd ethereum-workshop`), kjør først kommandoen `truffle compile` og så `truffle migrate`.
    * Til slutt må man kjøre kommandoen `npm run dev` som starter webpack-dev-serveren på `localhost:8080`
    * Gå inn på siden og skriv inn et heltall som amount og et tall/hexadesimalt tall som adresse.
    * Verifiser ved å trykke på "Send MetaCoin" at du mister det antallet `META` du har spesifisert over.

# Virtuell maskin
Nedlastning av virtuell maskin: https://drive.google.com/file/d/0B7hH5Ns5xLvhNjhIUm5TQnRrZWs/view

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
