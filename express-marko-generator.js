/**
 * Express Marko Generator v2.1.0
 * A CLI tool to generate an ExpressJS application with MarkoJS and MaterializeCSS framework.
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 * Website: www.sandeepv.in
 */

/**
 * async - utilities library for async operations
 */
const async = require('async');

/**
 * Figlet - render ASCII graphics in terminal
 */
const figlet = require('figlet');

/**
 * Chalk - colorful terminal logs
 */
const chalk = require('chalk');

/**
 * Clui - spinners and loaders in terminal
 */
const clui = require('clui');

/**
 * Replace-in-file - replace strings in files
 */
const replace = require('replace-in-file');

/**
 * Clui spinner instance
 */
const spinner = clui.Spinner;

/**
 * Custom progress message and spinner
 */
const progress = new spinner('\nCloning repo...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

/**
 * Exec command from child_process
 * Function to Spawns a shell then executes the command within that shell, buffering any generated output. 
 * The command string passed to the exec function is processed directly by the shell and special 
 * characters (vary based on shell) need to be dealt with accordingly.
 * Note: Never pass unsanitized user input to this function. 
 * Any input containing shell metacharacters may be used to trigger arbitrary command execution.
 */
const { exec } = require('child_process');

/**
 * Application configuration object
 */
const config = {
    name: 'Express Marko Generator',
    version: '2.1.0'
};

/**
 * Log - console.log instance
 */
const log = console.log;

/**
 * express-marko github repository url
 */
const repoUrl = `https://github.com/SandeepVattapparambil/express-marko.git`;

/**
 * @name isWindows
 * Helper function to check the current platform for Windows/Unix-ish.
 * @returns {Boolean} - Returns true if Windows, else false.
 */
const isWindows = () => {
    if (/^win/i.test(process.platform)) {
        return true;
    } else {
        return false;
    }
}

/**
 * @name run
 * A Promise factory to execute an arbitrary shell command.
 * @param {String} script - The arbitrary shell command to execute.
 * @returns {<Promise>} - The promise object containing the stdout/stderr. 
 */
const run = (script) => {
    return new Promise((resolve, reject) => {
        /**
         * If a callback function is provided, it is called with the arguments (error, stdout, stderr). 
         * On success, error will be null. On error, error will be an instance of Error. 
         * The error.code property will be the exit code of the child process while error.signal 
         * will be set to the signal that terminated the process. 
         * Any exit code other than 0 is considered to be an error.
         * The stdout and stderr arguments passed to the callback will contain the stdout and stderr 
         * output of the child process. By default, Node.js will decode the output as UTF-8 and pass 
         * strings to the callback. The encoding option can be used to specify the character encoding 
         * used to decode the stdout and stderr output. If encoding is 'buffer', or an unrecognized 
         * character encoding, Buffer objects will be passed to the callback instead.
         */
        exec(script, (error, stdout, stderr) => {
            if (stderr) {
                //reject promise with error
                reject(stderr);
            } else {
                //resolve promise with success
                resolve(stdout);
            }
        });
    });
}

/**
 * Bootstrap the generator after rendering the logo
 */
figlet(config.name, (err, data) => {
    if (err) {
        log(chalk.red('logo rendering failed!: ', err));
    }

    /**
     * render the logo in bold yellow and version in blue
     */
    log(chalk.yellow.bold(data));
    log(chalk.blue(`v${config.version}`));

    /**
     * check the args[] of process for parameters and then initiate the generator or else log the help.
     */
    if (process.argv[2]) {

        /**
         * get the argument passed as the project name.
         */
        let projectName = process.argv[2];

        /**
         * validate the name
         */
        if (projectName.length < 4) {
            log(chalk.red.bold(`\nError: Use a valid project name with minimum 4 chars`));
            process.exit();
        }
        if (!projectName.match(/^[^\\/?%*:|"<>\.]+$/g)) {
            log(chalk.red.bold(`\nError: Project name cannot contain special chars`));
            process.exit();
        }

        /**
         * Check whether git is installed or not and continue.
         */
        let checkGit = `git`;
        exec(checkGit, (data) => {
            if (!data) {
                log(chalk.red.bold(`\nError: Git is not installed`));
                process.exit();
            }

            /**
             * Clone repo
             */
            const gitCommand = `git clone ${repoUrl} ${projectName}`;
            //Start progress bar
            progress.start();
            //Set progress message
            progress.message('cloning repo...');
            let clone = exec(gitCommand, (err) => {
                if (err) {
                    log(chalk.red.bold(err));
                    process.exit();
                }
            });

            /**
             * Customize project once clone is complete.
             * ie, when clone command emits 'close' event.
             */
            clone.on('close', () => {
                //Stop progress bar
                progress.stop();
                log(chalk.green(`\nProject files downloaded successfully.`));
                if (isWindows) {

                    /**
                     * Cleanup project folder in WINDOWS.
                     */
                    //remove .git directory
                    let removeGitFolder = `rmdir ${projectName}\\.git /s /q`;
                    //remove .github folder
                    let removeGithubFolder = `rmdir ${projectName}\\.github /s /q`;
                    //remove CODE_OF_CONDUCT.md
                    let removeCoC = `del ${projectName}\\CODE_OF_CONDUCT.md /s /q`;
                    //remove PULL_REQUEST_TEMPLATE.md
                    let removePullReqTemp = `del ${projectName}\\PULL_REQUEST_TEMPLATE.md /s /q`;
                    //remove CONTRIBUTING.md
                    let removeContrib = `del ${projectName}\\CONTRIBUTING.md /s /q`;
                    //remove LICENSE
                    let removeLicense = `del ${projectName}\\LICENSE /s /q`;

                    /**
                     * Promisify and execute remove commands.
                     */
                    run(removeGitFolder).then((command1) => {
                        return run(removeGithubFolder);
                    }).then((command2) => {
                        return run(removeCoC);
                    }).then((command3) => {
                        return run(removePullReqTemp);
                    }).then((command4) => {
                        return run(removeContrib);
                    }).then((command5) => {
                        return run(removeLicense);
                    }).catch((error) => {
                        log(chalk.red.bold(`\nError cleaning up the project: , ${error}`));
                    });
                } else {
                    /**
                     * Cleanup in unix, mac, linux
                     */

                    //remove .git directory
                    let removeGitFolder = `rm ${projectName}/.git`;
                    //remove .github folder
                    let removeGithubFolder = `rm ${projectName}/.github`;
                    //remove CODE_OF_CONDUCT.md
                    let removeCoC = `del ${projectName}/CODE_OF_CONDUCT.md`;
                    //remove PULL_REQUEST_TEMPLATE.md
                    let removePullReqTemp = `del ${projectName}/PULL_REQUEST_TEMPLATE.md`;
                    //remove CONTRIBUTING.md
                    let removeContrib = `del ${projectName}/CONTRIBUTING.md`;
                    //remove LICENSE
                    let removeLicense = `del ${projectName}/LICENSE`;

                    /**
                     * Promisify and execute remove commands.
                     */
                    run(removeGitFolder).then((command1) => {
                        return run(removeGithubFolder);
                    }).then((command2) => {
                        return run(removeCoC);
                    }).then((command3) => {
                        return run(removePullReqTemp);
                    }).then((command4) => {
                        return run(removeContrib);
                    }).then((command5) => {
                        return run(removeLicense);
                    }).catch((error) => {
                        log(chalk.red.bold(`\nError cleaning up the project: , ${error}`));
                    });
                }
                let packageFiles = {
                    files: [`${projectName}/package.json`, `${projectName}/package-lock.json`],
                    from: 'experiment',
                    to: `${projectName}`
                };
                let serverFile = {
                    files: [`${projectName}/bin/server.js`],
                    from: 'experiment',
                    to: `${projectName}`
                };
                let configFiles = {
                    files: [`${projectName}/config/pino.js`, `${projectName}/config/lasso.js`],
                    from: 'Express Marko',
                    to: `${projectName}`
                };
                async.parallel({
                    replacePackageFiles: (callback) => {
                        replace(packageFiles, (error) => {
                            if (error) {
                                return console.error('Error occurred:', error);
                            }
                        });
                        callback(null, `Package files customized.`);
                    },
                    replaceServerFile: (callback) => {
                        replace(serverFile, (error) => {
                            if (error) {
                                return console.error('Error occurred:', error);
                            }
                        });
                        callback(null, `Server file configured.`);
                    },
                    replaceConfigFiles: (callback) => {
                        replace(configFiles, (error) => {
                            if (error) {
                                return console.error('Error occurred:', error);
                            }
                        });
                        callback(null, `Configuration files customized.`);
                    }
                }, (err, results) => {
                    if (results) {
                        log(chalk.green(`Project customizations completed succesfully.`));
                        log(chalk.green(`Project -> ${projectName} created succesfully.`));
                    }
                });
            });
        });
    } else {
        log(chalk.blue(`\nUsage:`));
        log(chalk.blue(`\$ express-marko-generator <project-name>`));
    }
});