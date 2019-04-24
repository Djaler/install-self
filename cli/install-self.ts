#!/usr/bin/env node

import * as FileSystem from "fs";

const packageDirectory = process.cwd();

// get package name
const packageJson = require(packageDirectory + "/package.json");

// create folder with package name

// create index file to that folder
// with the following contents
// module.exports = require("..");

const isScopedPackage = (packageJson.name as string).includes('/');

const packageNodeModuleDirectory = packageDirectory + "/node_modules/" + packageJson.name;

if (!FileSystem.existsSync(packageNodeModuleDirectory)) {
    FileSystem.mkdirSync(packageNodeModuleDirectory, { recursive: isScopedPackage });
}

const nestingLevel = isScopedPackage ? 3 : 2;

packageJson.main = "../".repeat(nestingLevel) + packageJson.main;

if (packageJson.typings) {
    packageJson.typings = "../".repeat(nestingLevel) + packageJson.typings;
}

FileSystem.writeFileSync(packageNodeModuleDirectory + "/package.json", JSON.stringify(packageJson, null, 4));

// log errors or log everything's A-OK