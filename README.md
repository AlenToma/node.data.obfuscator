# node.data.obfuscator
 This library is build so that you could secure json or string data in js files. The library will shuffle the data in memory and make it unreadable for the naked eye.
 
 ## Platforms
 This library will work with any platforms react, react-native and web.
 
## Installation
`npm i -D node.data.obfuscator` 
OR
`npm i node.data.obfuscator -g`

## Command options for [secure]
| options | short Name | require |  description|
| ------------- | ------------- | ----------| ------|
| --file  | -f  | YES |  file path eg './mydata.[json,txt,ts etc..]', that containe the private data you want to secure, it is best to have outside the project or add it to .ignore file so it wont be included in the build|
| --path  | -p  | YES | path of the folder that will containe the obfuscated files |
| --counter  | -c  | NO |word counter, this will decide how many files will be created to scatter the data between more then one file. default 2 files |
| --type  | -t  | NO | the file type that will be created, default is js |
| --overwrite  | -o  | NO | Overwrite the content in the folder, this will remove everything in the folder and add new files.  |
| --includeTypeInImport  | -tm  | NO | This will include the file type in import so instead of './xx' will be './xx.js'  |

## How to use
for help simple execute `cla help secure`

lets say we have `secure.json` that containe the following json 
```json
{
  "user": "test",
  "password": "test.password"
}

```

To obfuscate a file simple execute `cla secure -f "../secure.json" -p "./data" -c 3`

The library will know if the file content is a json or simple string and return it as it should be.

The command above will create a folder with name 'data' that will containe the following files 

![image](https://github.com/AlenToma/node.data.obfuscator/blob/main/images/Capture.PNG?raw=true)

To make it create less files simple remove or increase `--counter`

As for the content or the files it will be the following. for the preview below I removed `--counter` so it create 2 files for the preview


```ts
// x0.js
// the array below is impossible to read as it is shuffled.
const x0= ['\u0074','\u003a','\u0022','\u000a','\u007b','\u0070','\u0077','\u0073','\u002c','\u0064','\u0072','\u0065','\u002e','\u006f','\u0061','\u007d','\u0020','\u000d','\u0075'];
export default [x0, ""];
```
```js
// index.js
import x0 from './x0'
let x36=x0[0X1];
x36+=x0[0X0][0X4];
x36+=x0[0X0][0X11];
x36+=x0[0X0][0X3];
x36+=x0[0X0][0X10];
x36+=x0[0X0][0X10];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X12];
x36+=x0[0X0][0X7];
x36+=x0[0X0][0XB];
x36+=x0[0X0][0XA];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X1];
x36+=x0[0X0][0X10];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X0];
x36+=x0[0X0][0XB];
x36+=x0[0X0][0X7];
x36+=x0[0X0][0X0];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X8];
x36+=x0[0X0][0X11];
x36+=x0[0X0][0X3];
x36+=x0[0X0][0X10];
x36+=x0[0X0][0X10];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X5];
x36+=x0[0X0][0XE];
x36+=x0[0X0][0X7];
x36+=x0[0X0][0X7];
x36+=x0[0X0][0X6];
x36+=x0[0X0][0XD];
x36+=x0[0X0][0XA];
x36+=x0[0X0][0X9];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X1];
x36+=x0[0X0][0X10];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X0];
x36+=x0[0X0][0XB];
x36+=x0[0X0][0X7];
x36+=x0[0X0][0X0];
x36+=x0[0X0][0XC];
x36+=x0[0X0][0X5];
x36+=x0[0X0][0XE];
x36+=x0[0X0][0X7];
x36+=x0[0X0][0X7];
x36+=x0[0X0][0X6];
x36+=x0[0X0][0XD];
x36+=x0[0X0][0XA];
x36+=x0[0X0][0X9];
x36+=x0[0X0][0X2];
x36+=x0[0X0][0X11];
x36+=x0[0X0][0X3];
x36+=x0[0X0][0XF];
export default JSON.parse(x36)
```

now for use you can simple do the following
```js
import secureJSON from './data'
console.log(secureJSON.password);
```


