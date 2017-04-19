function log( msg, type){

    var dt = new Date();
    var timeStamp = dt.toUTCString();


  switch(type){
        case 'inf':            
            type = 'INFO: '
            break; 
        case 'wrn':
            type = 'WARN: '
            break;
        case 'err':
            type = 'ERROR: '
            break;
        default:
            type = 'INFO: ';
    }

    console.log(type + timeStamp + ": " + msg);
    type = null;
}