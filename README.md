# Monitor

A NodeJS app for viewing computer preformanc remotely. 

It only appears to work well on Linux and Mac due to the module for reading the process list taking ages to run on Windows. 

# Installation

Installation is standard to most NodeJS apps. download or clone the repository, and then enter the directory and run:

`npm install`

After that finishes, start the server with:

`node .`

# Features

List all running processess, memory usage, CPU usage, in a searchable and sortable table. 

See information such as operatiing system type and version, external IP address, hostname and internal IP, etc

Run commands as the user running the nodejs process in a terminal section. 

#Errors

If you get error while installing that suggest an outdated Node version, or if `node .` if refered to as "legacy", you MUST make sure your running the latest Node and NPM builds. 

Note that on Ubuntu you will need to add a Node package repository in order to get the latest version. Ask me how I know ;) 
