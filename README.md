# Personal Dictionary

A PWA to make my life easier when attending courses using my notebook or listening to talks with my smartphone. This application is built with **Angular**. Head over to [Angular's repository](https://github.com/angular/angular) if you'd like more information.

## Setup

### Initial steps

Install these in order:

* [NodeJS](https://nodejs.org/en/) (LTS)
* [Yarn](https://yarnpkg.com/lang/en/)

Check if the PATH environment variable is setup. One should be able to run the following command from anywhere (= Command Prompt, Powershell, Terminal...):

```shell
yarn
```

### Installation of dependencies

Navigate to the project root and run the following command:
(This process may take a couple of minutes, depening on the internet connection)

```shell
yarn install
```

One should now be able to run the NPM scripts declared in package.json.

### Launching the development server

Navigate to the project root and run the following command:

```shell
yarn ng serve --aot -o -sm
```

Just-in-Time **will not** work, you **must** use Ahead-of-Time compilation.

This command will commence webpack-dev-server (using the Angular CLI) and host the files in-memory from http://localhost:4200

_Please note that these files are served from memory and are not located anywhere in the project folder itself._

### Production build

Navigate to the project root and run the following command:

```shell
yarn ng build --aot --prod
```

The required files will reside inside the _/dist_ folder. The webserver should be able to serve the static files and redirect 404's to index.html (mod_rewrite plugin if using Apache).

## Browser support

The sole targeted browser is Google Chrome. The application may (not) work on other browsers. Firefox will probably work, but you'd rather forget IE and Safari.

## License

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/abdullahsari/personal-dictionary/master/LICENSE)

## Credits

* Book icon (on the header) by [Gregor Cresnar](https://www.flaticon.com/authors/gregor-cresnar) from www.flaticon.com
