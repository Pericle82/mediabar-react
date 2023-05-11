import express = require("express");
import * as WebSocket from 'ws';
import { ACTIONS_PAYLOAD, socketMsgMapping } from "./actions";
import { TEST, TEST_TO_ACTIONS_MAP } from "./flow_test";
import { actions_batch_caller } from "./server";


const router = express.Router();


const test_rcpRoutes = (wss: WebSocket.WebSocketServer) => {

    router.get("/:test", (req, res) => {
        const test = req.params.test as TEST;

        if(!TEST[test]) { 
            res.send("Test not found");
            res.end();
            return;
        }

        actions_batch_caller(wss, test);

        res.send({msg: "Test sent"});
        res.end();

    }
    );

    return router;

}
export default test_rcpRoutes;