# NB!

[![Join the chat at https://gitter.im/knowit-blockchain-workshop](https://badges.gitter.im/knowit/ethereum-workshop.svg)](https://gitter.im/knowit-blockchain-workshop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

If you are running into problem during the installation on your own computer you can jump over this and go straight to the `Virtual Machine` step described below.

The workshop is supposed to work on OSX, Windows and Linux. However it is much less tested on a windows environment, so if you are having problems we recommend using a `virtual machine`.

# Installation
1. Make sure `git` is installed. 
    * Download for Windows: `https://git-scm.com/download/win`
    * Download for Mac: `https://git-scm.com/download/gui/mac`
    * Download for Linux: `https://mirrors.edge.kernel.org/pub/software/scm/git/`

2. Install npm and node. Make sure to pick LTS to get node version 8.x. Download npm and node from: https://nodejs.org/en/download/current/

3. Install truffle and testrpc by running the following command `npm install -g truffle ethereumjs-testrpc`

4. Check that `truffle` is installed by running `truffle version` in the command line.

```bash
$ truffle version
Truffle v3.4.9 (core: 3.4.8)
Solidity v0.4.15 (solc-js)
```

5. To run a local copy of the ethereum blockchain on your computer run the following command in another terminal window: `testrpc`. To compile the smart contract write `truffle compile`
NB: Every time you want to test if your smart contract is correct, run `truffle test`.

6. Setting up the project
    * Download the workshop repository by using the following command `git clone https://github.com/knowit/ethereum-workshop`.
    * Enter the folder that you just cloned (`cd ethereum-workshop`), Run the following commands `npm install` then `truffle migrate`.
    * When everything has finished downloading you can run `npm run dev` to start the dev-server on `localhost:8080`, if this site is unreacheable (e.g 404) try `http://127.0.0.1:8080`.
    * Make sure that the site is running OK. The functionality on the site is not working yet, but that is because we have to do some coding on our own :)
    * Åpne prosjektet i din favoritt editor. Solidity, som er språket vi for det meste skal kode i, er støttet av de fleste IDE hvis man installerer en ekstra plugin.
    * Open the project in your favorite editor. Solidity, which is the language we are going to do most of our work in is supported by most IDEs by installing a Solidity plugin.

# Tasks
You can find the tasks for the workshop [here](https://github.com/knowit/ethereum-workshop/blob/master/Tasks.md) under Tasks.md.

# Virtual Machine

If you were able to install and run everything above in the `Installation` section you can go ahead and skip this part.
This part is meant as an alternative to the people that faced problems with the `Installation` section, or don't want to install everything on their own computer.

1. Download [Virtualbox](https://www.virtualbox.org/wiki/Downloads) and install virtualbox.
2. Download the VM [image](https://drive.google.com/file/d/0B7hH5Ns5xLvhNjhIUm5TQnRrZWs/view) that we have made ready for you.
3. Follow the [guide from Oracle](https://docs.oracle.com/cd/E26217_01/E26796/html/qs-import-vm.html) on how to add the image to Virtualbox.


# Troubleshooting

1. `testrpc` fails immediately with the following stacktrace
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

  * Reason: [ethereumjs-vm uses ES6 after `node` 6.9.1 was LTS](https://github.com/ethereumjs/testrpc/issues/216#issuecomment-264552034)
  * Fix: Upgrade `node` to the latest stable version
      ```shell
      $ npm cache clean -f
      $ npm install -g n
      $ n stable
      ```
