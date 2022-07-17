# node.data.obfuscator
 This library is build so that you could secure json or string data in js files. The library will shuffle the data in memory and make it unreadable for the naked eye.
 
 
## Installation
`npm i -D node.data.obfuscator` 

`npm i node.data.obfuscator -g`

## Command options for [secure]
| options | short Name | require |  description|
| ------------- | ------------- | ----------| ------|
| --file  | -f  | YES |  file path eg './mydata.[json,txt,ts etc..]', that containe the private data you want to secure, it is best to have outside the project or add it to .ignore file so it wont be included in the build|
| --path  | -p  | YES | path of the folder that will containe the obfuscated files |
| --counter  | -c  | NO |word counter, this will decide how many files will be created to scatter the data between more then one file. default 2 files |
| --type  | -t  | NO | the file type that will be created, default is js |
| --overwrite  | -o  | NO | Overwrite the content in the folder, this will remove everything in the folder and add new files.  |

## How to use
for help simple execute `cla help secure`

lets say we have `secure.json` that containe the following json 
```json
{
  user: "test",
  password: "test.password"
}

```

for ob a file simple execute `cla secure -f "../secure.json" -p "./data" -c 3`

The command above will create a folder with name 'data' the will containe the following files 


