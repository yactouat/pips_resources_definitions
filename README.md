# PIPS resources definitions package

<!-- TOC -->

- [PIPS resources definitions package](#pips-resources-definitions-package)
  - [what is this ?](#what-is-this-)
  - [pre requisites](#pre-requisites)
  - [CI/CD](#cicd)
  - [Contribution guidelines](#contribution-guidelines)
  - [Contributors](#contributors)

<!-- /TOC -->

## what is this ?

the TS npm package that centralizes all the resources definitions for the PIPS project

## pre requisites

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)

## CI/CD

building with tsc and publishing to NPM are automated using the Github Actions listed in the `.github/workflows` folder; the building and publishing to NPM part happens whenever a new release is created on Github

required repository secrets are:

-`NPM_ACCESS_TOKEN` : the access token to the NPM account that will be used to publish the package

## Contribution guidelines

dear past, present, and future contributors, you have my many thanks, but please follow these guidelines:

- please use comments to explain your code, even if it's obvious to you, it might not be to someone else
- please test your code thourougly in the the `./tests` folder
- you are free to arrange the code, the folder structure, the file names, etc. as you see fit if you're able to provide a good reason for it
- if you're introducing a breaking change in the usage of this lib, please notify me in the PR so I can update the version number accordingly
- dont bother building the code, just test it, the CI will build it for you when you PR

that's all, thank you for your time !

## Contributors

a big thanks goes to the contributors of this project:

<table>
<tbody>
    <tr>
        <td align="center"><a href="https://github.com/yactouat"><img src="https://avatars.githubusercontent.com/u/37403808?v=4" width="100px;" alt="yactouat"/><br /><sub><b>Yactouat</b></sub></a><br /><a href="https://github.com/yactouat"></td>
    </tr>
</tbody>
</table>
