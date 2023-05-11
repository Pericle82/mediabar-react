import express = require("express");
import * as WebSocket from 'ws';
import { ACTIONS_PAYLOAD, socketMsgMapping } from "./actions";
import { ACTIONS_REST_KEY } from "./actionsCode";


const router = express.Router();


const restToSocketMiddlware = (wss: WebSocket.WebSocketServer) => {

    router.get("/:action", (req, res) => {
        const action = req.params.action as ACTIONS_REST_KEY;

        if(!ACTIONS_PAYLOAD[action]) { 
            res.send("Action not found");
            res.end();
            return;
        }

        const payload = ACTIONS_PAYLOAD[action];
        const msg = socketMsgMapping(action, payload);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(msg) );
            }
        
        });
        res.send(msg);
        res.end();

    }
    );

    return router;

}
export default restToSocketMiddlware;

