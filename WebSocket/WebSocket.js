const { wsServer } = require("..");
const jwt = require('jsonwebtoken');

wsServer.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        try {
            var d = JSON.parse(data.toString());
            if(d.op == null)return ws.close();
            
            if(d.op == 10){
                if(d.token == null){
                    ws.close();
                }else{
                    var t = jwt.decode(d.token,{complete:true});
                    if(t == null){
                        ws.close();
                    }else{
                        ws.send(t);
                    }
                }
            }
        } catch (c) {
            if(c) ws.close();
        }
    });  
});
  