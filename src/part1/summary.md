**MODULE 1 SUMMARY**

This lesson is a summary of what we’ve done in Module 1.0.
In Part 1 we’ve built a very simple Node/Express/Typescript project.

***PACKAGE.JSON***

    In the package.json file of our app, we can see the dependencies and devDependencies our
    app depends on. body-parser and the express packages are our app’s main dependencies. In
    our development dependencies, we’ve introduced the TypeScript ESLint packages, the eslint
    package, nodemon , and typescript . We’ve introduced two scripts in our app; the start script
    which allows us to start the server and the build script which allows us to compile our TypeScript
    code to valid JavaScript.

***server/package.json***
    {
        "name": "tinyhouse-v1-server",
        "version": "0.1.0",
        "dependencies": {
            "body-parser": "^1.19.0",
            "express": "^4.17.1"
        },
        "devDependencies": {
            "@types/body-parser": "^1.17.0",
            "@types/express": "^4.17.0",
            "@types/node": "^12.0.10",
            "@typescript-eslint/eslint-plugin": "^1.11.0",
            "@typescript-eslint/parser": "^1.11.0",
            "eslint": "^6.0.1",
            "nodemon": "^1.19.1",
            "ts-node": "^8.3.0",
            "typescript": "^3.5.2"
        },
        "scripts": {
            "start": "nodemon src/index.ts",
            "build": "tsc -p ./"
        }
    }

***.ESLINTRC.JSON***

The .eslintrc.json file sets up the configuration for our ESLint setup. We’re using the
@typescript-eslint/parser package to help parse TypeScript code. We’re extending the
@typescript-eslint/recommended package which contains a series of recommended rules.
We’ve also added and customized a few rules of our own.


***server/.eslintrc.json***
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "extends": ["plugin:@typescript-eslint/recommended"],
    "env": { "node": true },
    "rules": {
        `"indent": "off",
        "@typescript-eslint/indent": "off",
        "`@typescript-eslint/explicit-function-return-type": "off"
    }
}


***TSCONFIG.JSON***

The tsconfig.json file is responsible for setting up the configuration of our TypeScript project.
We’ve stated the src/ folder to be the root directory of our TypeScript code. The output directory of
compiled JavaScript code will be a build/ folder that is to be created in the root of the server
project directory. We’ve introduced a strict: true field in our configuration to enable a series of
strict type-checking options.

***server/tsconfig.json***

    {
        "compilerOptions": {
            "target": "es6",
            "module": "commonjs",
            "rootDir": "./src",
            "outDir": "./build",
            "esModuleInterop": true,
            "strict": true
        }
    }