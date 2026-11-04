const fs = require("fs");//iska matlab ye hai ki fs ki sari modules fs const wale variable me store ho jayenge 
/*fs.writeFile("hey.txt" , "hey hello kaise ho" , function(err){
    if(err) console.error(err);
    else console.log("DONE");
})//means creating a file ----->>fs.writeFileSync("file", data[, options],callback)




fs.appendFile("hey.txt" , " me to achha hu " , function(err){
    if(err) console.error(err);
    else console.log("DONE1");
})//means Adds content at the end ------> fs.appendFile("Path", data[, options],callback)



fs.rename("hey.txt" , "hello.txt" ,  function(err){
    if(err) console.error(err);
    else console.log("DONE2");
})// rename and make new file ---->fs.rename("OldPath", "NewPath",callback)




fs.copyFile("hello.txt" , "./myname/myname.txt" ,  function(err){
    if(err) console.error(err.message);
    else console.log("DONE3");
})// rename and make new file ---->fs.copyFile("src", "dest[,mode]",callback)


fs.unlink("hello.txt" , function(err){
    if(err) console.error(err.message);
    else console.log("Removed");
})//it means deleting the file------> fs.unlink(path , callback)

//   ./ ka matlab hai ussi folder me dudhn afile l\ko
fs.rm("./myname",{recursive : true} , function(err){
    if(err) console.error(err.message);
    else console.log("Removed File or directory");
})//remove directory or folder---------->fs.rm(path[,options] , callback)
*/

/*<-------OPTIONS---------->

force: If true, ignores errors when the path does not exist. Default is false.

maxRetries: Specifies the number of times Node.js retries an operation if removal fails. Default is 0.

recursive: If true, removes a folder along with all its contents. Default is false.

retryDelay: Specifies the waiting time between retries in milliseconds. Default is 100 */


fs.readFile("hello.txt", "utf8", function(err, data) {
    if (err) console.error(err);
    else console.log(data);
});//fs.readFile(path, options, callback); is used to read the contents of a file.  utf8 converts the file content into readable text.


const data = fs.readFileSync("hello.txt", "utf8");

console.log(data);//fs.readFileSync(path, options); reads a file synchronously, meaning the program waits until the file is completely read.