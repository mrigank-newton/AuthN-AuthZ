//Module wrapper function

(function(exports, require, module, __filename, __dirname) {
    
    console.log(x);


    let x = 10;

    try {
        throw new Error('test')
    } catch(ex) {
        console.dir(ex);
    }

    
})();