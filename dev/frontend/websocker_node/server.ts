import cors = require('cors');
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import restToSocketMiddlware from './hubEventsRoutes';
import bodyParser = require('body-parser');
import test_rcpRoutes from './test_rcpRoutes';
import { TEST, TEST_TO_ACTIONS_MAP } from './flow_test';
import { ACTIONS_PAYLOAD, socketMsgMapping } from './actions';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

const ask_notification_permission = {
    "view": "desktop",
    "command": "ask_permission",
    "payload": {
        "close_on_click": true,
        "require_active_browser": false,
        "default_timeout": "10"
    }
};

const login_event = {
    "view": "login", "command": "show", "payload": {}
};

const agent_status_event = {
    "view": "agent_state", "command": "show", "payload": {
        "attributes": { "agent_id": "myusername", "agent_name": "Giovanni", "agent_state": "LOGGED_OUT", "agent_login_life_time": "0", 
        "enabled": "false" }
    }
}

const agent_status_update_event = {
    "view": "agent_state", "command": "show", "payload": {
        "attributes": { "agent_id": "myusername", "agent_name": "Giovanni", "agent_state": "LOGGED_OUT", 

        "agent_login_life_time": "1" }
    }
}

const agent_status_update_event1 = {
    "view": "agent_state", "command": "show", "payload": {
        "attributes": { "agent_id": "myusername", "agent_name": "Giovanni", "agent_state": "LOGGED_OUT",

        "agent_login_life_time": "2" }
    }
}

const agent_channel_event = {
    "view": "agent_channels", "command": "show", "payload": {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state" : "DOWN",
                "enabled": "false",
            },
            {
                "id": "channel_id",
                "name": "SOCIAL",
                "state": "LOGGED_OUT",
                "delivery_state" : "DOWN",
                "enabled": "false",
            },
            {
                "id": "channel_id",
                "name": "EMAIL",
                "state": "LOGGED_OUT",
                "delivery_state" : "DOWN",
                "enabled": "false",
            }
        ]
        
    }
}

const work_list = { "view": "work_list", "command": "show", "payload": {} }

const agent_actionbar_show = {
    "view": "agent_actionbar", "command": "show", "payload": {
    }
}

const agent_commands1 = {
    "view":"agent_commands",
    "command":"update",
    "payload":{
       "components":[
          {
             "visible":"true",
             "name":"start_button",
             "enabled":"true"
          },
          {
             "visible":"true",
             "name":"logout_button",
             "enabled":"true"
          },
          {
             "visible":"true",
             "name":"outbound_button",
             "enabled":"false"
          },
          {
             "visible":"true",
             "name":"break_button",
             "enabled":"false"
          }
       ]
    }
 };

 const agent_commands2 = {
     "view":"agent_commands",
     "command":"update",
     "payload":{
        "components":[
           {
              "visible":"true",
              "name":"start_button",
              "enabled":"false"
           },
           {
              "visible":"true",
              "name":"logout_button",
              "enabled":"true"
           },
           {
              "visible":"true",
              "name":"outbound_button",
              "enabled":"true"
           },
           {
              "visible":"true",
              "name":"break_button",
              "enabled":"true"
           }
        ]
     }
  };

interface InboundEvent {
    source: string;
    event: string;
    payload?: object;
};

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    console.log('connected');

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        
        const parsedMessage: InboundEvent = JSON.parse(message.toString('utf8'));

        //log the received message and send it back to the client
        console.log('received:', parsedMessage, typeof parsedMessage);

        switch(parsedMessage.event) {
            case 'onStartClick':
                agentState_OnStartClicked(ws);
                break;
            case 'onTerminateBreakClick':
                agentState_OnTerminateBreakClick(ws);
                break;
            case 'onChannelCommandClick':
                agentChannel_OnChannelCommandClick(ws, parsedMessage.payload);
                break;
            default:
                console.log('Fallback to default');
                // test burst
                ws.send(JSON.stringify(parsedMessage));
        }
    });
    
    //send immediatly a feedback to the incoming connection    
    ws.send(JSON.stringify(ask_notification_permission));
    ws.send(JSON.stringify(login_event));
    ws.send(JSON.stringify(agent_status_event));
    ws.send(JSON.stringify(agent_status_update_event));
    ws.send(JSON.stringify(agent_status_update_event1));
    ws.send(JSON.stringify(agent_channel_event));
    ws.send(JSON.stringify(work_list));
    ws.send(JSON.stringify(agent_actionbar_show));
    ws.send(JSON.stringify(agent_commands1));

    // app.use('/api', restToSocketMiddlware(ws));

    ws.onclose = () => {
        console.log('disconnected');
    }

});

app.use('/api', restToSocketMiddlware(wss));
app.use('/api/test', test_rcpRoutes(wss));

export const actions_batch_caller = (wss:  WebSocket.WebSocketServer, test: TEST) => {
    for(let action of TEST_TO_ACTIONS_MAP[test]) {
        const payload = ACTIONS_PAYLOAD[action];
        const msg = socketMsgMapping(action, payload);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(msg) );
            }
        
        });
    }
}

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port  ${JSON.stringify(server.address())}`);
});

function agentState_OnStartClicked(ws: WebSocket) {

    const agent_status_update_event2 = {
        "view": "agent_state", "command": "update", "payload": {
            "attributes": { "agent_id": "myusername", "agent_name": "Giovanni", "agent_state": "INIT_AVAILABLE", "agent_login_life_time": "10" }
        }
    }
    
    const agent_status_update_event3 = {
        "view": "agent_state", "command": "update", "payload": {
            "attributes": { "agent_id": "myusername", "agent_name": "Giovanni", "agent_state": "LOGGED_IN", "agent_login_life_time": "11" }
        }
    }
    
    const agent_status_update_event4 = {
        "view": "agent_state", "command": "update", "payload": {
            "attributes": { "agent_id": "myusername", "agent_name": "Giovanni", "agent_state": "PAUSED", "agent_login_life_time": "12" }
        }
    }

    ws.send(JSON.stringify(agent_status_update_event2));
    ws.send(JSON.stringify(agent_status_update_event3));
    ws.send(JSON.stringify(agent_status_update_event4));
    ws.send(JSON.stringify(agent_commands2));
}

let currentState = "IDLE";
const channelSocial = {
    "id": "channel_id",
    "name": "SOCIAL",
    "state": currentState,
    "delivery_state" : "UP",
    "enabled": "true",
    "on": "true",
};

function toggleChannelSocial() {
    currentState = currentState === "IDLE" ? "LOGGED_OUT" : "IDLE"
    return {
        ...channelSocial,
        "state": currentState,
    }
}

function agentState_OnTerminateBreakClick(ws: WebSocket) {

    const agent_status_update_event5 = {
        "view": "agent_state", "command": "update", "payload": {
            "attributes": { "agent_id": "myusername", "agent_name": "Giovanni", "agent_state": "AVAILABLE", "agent_login_life_time": "13" }
        }
    }
    
    const agent_channel_event2 = {
        "view": "agent_channels", "command": "show", "payload": {
            "components": [
                {
                    "id": "channel_id",
                    "name": "CHAT",
                    "state": "LOGGED_OUT",
                    "delivery_state" : "UP",
                    "enabled": "true",
                    "on": true,
                },
                channelSocial,
                {
                    "id": "channel_id",
                    "name": "EMAIL",
                    "state": "IDLE",
                    "delivery_state" : "DOWN",
                    "enabled": "false",
                    "on": false,
                }
            ]
            
        }
    }
    
    ws.send(JSON.stringify(agent_status_update_event5));
    ws.send(JSON.stringify(agent_channel_event2));
}

function agentChannel_OnChannelCommandClick(ws: WebSocket, payload: any) {
    if(payload.id === 'SOCIAL') {
        const useSocial = toggleChannelSocial();
    
        const agent_channel_event2 = {
            "view": "agent_channels", "command": "show", "payload": {
                "components": [
                    {
                        "id": "channel_id",
                        "name": "CHAT",
                        "state": "LOGGED_OUT",
                        "delivery_state" : "DOWN",
                        "enabled": "false",
                    },
                    useSocial,
                    {
                        "id": "channel_id",
                        "name": "EMAIL",
                        "state": "IDLE",
                        "delivery_state" : "UP",
                        "enabled": "true",
                    }
                ]
                
            }
        }

        ws.send(JSON.stringify(agent_channel_event2));
    }


    
    const sample_notification = {
        "view": "notification", "command": "error", "payload": {
            "message_key": "This is a sample notification {0}",
            "args": ["asd"],
            "title": "cicciotitolo"
        }
    }
    ws.send(JSON.stringify(sample_notification));
    ws.send(JSON.stringify(sample_notification));
}

