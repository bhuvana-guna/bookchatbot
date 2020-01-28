var ocr = require('ocr');
 
// Set default values. 
var params = {
    input: './node_modules/ocr/samples/images/color.bmp',
    output: './out.txt',
    format: 'text'
};
    
// OCR the input image and output result to text file given by params.output
var imageToText =  ocr.recognize(params, function(err, document){
    if(err)
        console.error(err);
    else{        
        //output the document object: 
        console.log(document); 
    }
});

modules.export = imageToText;