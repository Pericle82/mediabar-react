import { ACTIONS_KEY_MAP, ACTIONS_REST_KEY } from "./actionsCode";

export const socketMsgMapping = (action_code: ACTIONS_REST_KEY, payload: Object = {}) => {

    const ws_action = ACTIONS_KEY_MAP[action_code]

    const actionCodeSplitted = ws_action.split("_")
    const command = ws_action.split("_")[actionCodeSplitted.length - 1];
    const view = ws_action.split("_" + command)[0];

    const msg = {
        view, command, payload
    }

    return msg
}


// "state": "ACTIVE|BUSY|IDLE|INITIALIZED|INITIALIZING|LOGGED_IN|LOGGED_OUT|OCCUPIED|UNINITIALIZED| UNINITIALIZING",

export const ACTIONS_PAYLOAD: { [key in ACTIONS_REST_KEY]?: Object } = {
    // agent state
    [ACTIONS_REST_KEY.agent_state_update]: {
        "attributes": {
            "agent_id": "g.scrugli@almawave.it",
            "agent_name": "g.scrugli@almawave.it",
            "agent_state": "INIT_AVAILABLE",
            "agent_login_life_time": 0
        }
    },
    [ACTIONS_REST_KEY.agent_state_LOGGED_OUT_update]: {
        "attributes": {
            "agent_id": "g.scrugli@almawave.it",
            "agent_name": "g.scrugli@almawave.it",
            "agent_state": "LOGGED_OUT",
            "agent_login_life_time": 0
        }
    },
    [ACTIONS_REST_KEY.agent_state_show]: {
    },
    [ACTIONS_REST_KEY.agent_state_time_1_update]: {
        "attributes": {
            "agent_id": "g.scrugli@almawave.it",
            "agent_name": "g.scrugli@almawave.it",
            "agent_state": "INIT_AVAILABLE",
            "agent_login_life_time": 1
        }
    },
    [ACTIONS_REST_KEY.agent_state_time_2_update]: {
        "attributes": {
            "agent_id": "g.scrugli@almawave.it",
            "agent_name": "g.scrugli@almawave.it",
            "agent_state": "INIT_AVAILABLE",
            "agent_login_life_time": 2
        }
    },
    [ACTIONS_REST_KEY.agent_state_time_300_update]: {
        "attributes": {
            "agent_id": "g.scrugli@almawave.it",
            "agent_name": "g.scrugli@almawave.it",
            "agent_state": "INIT_AVAILABLE",
            "agent_login_life_time": 300
        }
    },
    [ACTIONS_REST_KEY.agent_state_time_3000_update]: {
        "attributes": {
            "agent_id": "g.scrugli@almawave.it",
            "agent_name": "g.scrugli@almawave.it",
            "agent_state": "INIT_AVAILABLE",
            "agent_login_life_time": 3000
        }
    },
    [ACTIONS_REST_KEY.agent_state_time_30000_update]: {
        "attributes": {
            "agent_id": "g.scrugli@almawave.it",
            "agent_name": "g.scrugli@almawave.it",
            "agent_state": "INIT_AVAILABLE",
            "agent_login_life_time": 30000
        }
    },
    // agent channels
    [ACTIONS_REST_KEY.agent_channels_show]: {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "EMAIL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "SOCIAL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "VOICE",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_channels_update]: {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "EMAIL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "SOCIAL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "VOICE",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_channels_zero_update]: {
        "components": []
    },
    [ACTIONS_REST_KEY.agent_channels_one_update]: {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_channels_two_update]: {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "EMAIL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_channels_three_update]: {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "EMAIL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "SOCIAL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_channels_four_update]: {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "EMAIL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "SOCIAL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "VOICE",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_channels_2_enabled_2_disabled_update]: {
        "components": [
            {
                "id": "channel_id",
                "name": "CHAT",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "EMAIL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": false,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "SOCIAL",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": false,
                "on": true
            },
            {
                "id": "channel_id",
                "name": "VOICE",
                "state": "LOGGED_OUT",
                "delivery_state": "DOWN",
                "enabled": true,
                "on": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_channels_control]: {
        "attributes": {
          "uaStatus": "1",
          "config": "{\"options\": {\"ua\": {\"wsServers\": \"wss://channelhub-astk.westeurope.cloudapp.azure.com:8080/ws\",\"uri\": \"102@channelhub-astk.westeurope.cloudapp.azure.com\",\"authorizationUser\": \"102\",\"password\": \"hub.102\",\"iceServers\": [{\"urls\": \"stun:stun.services.mozilla.com\"},{\"urls\": \"stun:stun.1.google.com:19302\"}],\"rtcpMuxPolicy\": \"negotiate\",\"traceSip\":true,\"connectionTimeout\":5,\"maxReconnectionAttempts\":1000,\"reconnectionTimeout\":3,\"userAgentString\": \"channelhub-webphone-SIP/0.11.4\"}}}"
        }
      },
    // agent commands
    [ACTIONS_REST_KEY.agent_commands_all_disabled_show]: {

        "components": [
            {
                "visible": true,
                "name": "start_button",
                "enabled": false
            },
            {
                "visible": true,
                "name": "logout_button",
                "enabled": false
            },
            {
                "visible": true,
                "name": "outbound_button",
                "enabled": false
            },
            {
                "visible": true,
                "name": "break_button",
                "enabled": false
            }
        ]

    },
    [ACTIONS_REST_KEY.agent_commands_all_enabled_show]: {
        "components": [
            {
                "visible": true,
                "name": "start_button",
                "enabled": true
            },
            {
                "visible": true,
                "name": "logout_button",
                "enabled": true
            },
            {
                "visible": true,
                "name": "outbound_button",
                "enabled": true
            },
            {
                "visible": true,
                "name": "break_button",
                "enabled": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_commands_all_disabled_update]: {
        "components": [
            {
                "visible": true,
                "name": "start_button",
                "enabled": true
            },
            {
                "visible": true,
                "name": "logout_button",
                "enabled": true
            },
            {
                "visible": true,
                "name": "outbound_button",
                "enabled": true
            },
            {
                "visible": true,
                "name": "break_button",
                "enabled": true
            }
        ]
    },
    [ACTIONS_REST_KEY.agent_commands_all_enabled_update]: {
        "components": [
            {
                "visible": true,
                "name": "start_button",
                "enabled": false
            },
            {
                "visible": true,
                "name": "logout_button",
                "enabled": false
            },
            {
                "visible": true,
                "name": "outbound_button",
                "enabled": false
            },
            {
                "visible": true,
                "name": "break_button",
                "enabled": false
            }
        ]
    },
    // work list
    [ACTIONS_REST_KEY.work_list_show]: {
        "children": [
            {
                "components": [
                    { visible: true, name: "accept", enabled: true },
                    { visible: true, name: "decline", enabled: true },
                    { visible: false, name: "accept_timer_countdown", enabled: false },
                    { visible: false, name: "decline_timer_countdown", enabled: false }
                ],
                "attributes": {
                    life_time: 0,
                    country_code: "en",
                    caller: "caller-id",
                    called: "called-id",
                    work_item_id: "001",
                    channel_sub_type: "FACEBOOK",
                    channel_type: "SOCIAL",
                    update_channel_counter: 0,
                    current: false,
                    opened: false,
                    disconnected: false,
                    transferred: false,
                }
            },
        ],
        "attributes": {
            "visible": "true"
        }
    },
    [ACTIONS_REST_KEY.work_list_update]: {
        "children": [
          {
            "components": [
              {
                "enabled": true,
                "name": "accept",
                "visible": false
              },
              {
                "enabled": true,
                "name": "decline",
                "visible": false
              },
              {
                "name": "accept_timer_countdown",
                "visible": false
              },
              {
                "name": "reject_timer_countdown",
                "visible": false,
                "value": "-1"
              }
            ],
            "attributes": {
              "life_time": "0",
              "country_code": "",
              "caller": "+393458877413",
              "current": false,
              "disconnected": false,
              "transferred": false,
              "called": "all",
              "work_item_id": "19e1baf5-7c70-4f1e-a21b-55555f826f42",
              "update_channel_counter": "0",
              "channel_sub_type": "",
              "opened": false,
              "channel_type": ""
            }
          }
        ],
        "attributes": {
          "visible": true
        }
      },
    [ACTIONS_REST_KEY.work_item_update]: {
        "components": [
          {
            "enabled": true,
            "name": "accept",
            "visible": true
          },
          {
            "enabled": true,
            "name": "decline",
            "visible": true
          },
          {
            "name": "accept_timer_countdown",
            "visible": false
          },
          {
            "name": "reject_timer_countdown",
            "visible": false,
            "value": "-1"
          }
        ],
        "attributes": {
          "life_time": "0",
          "country_code": "it",
          "caller": "+393458877413",
          "current": false,
          "disconnected": false,
          "transferred": false,
          "called": "all",
          "work_item_id": "19e1baf5-7c70-4f1e-a21b-55555f826f42",
          "update_channel_counter": "0",
          "channel_sub_type": "ASTERISK",
          "opened": false,
          "channel_type": "VOICE"
        }
      },
    [ACTIONS_REST_KEY.work_list_hide_update]: {

        "children": [
            {
                "components": ["{visible:true, name:accept, enabled:true}", "{visible:true, name:decline, enabled:true}"],
                "attributes": { "life_time": 0, "country_code": "it", "caller": "caller-id", "called": "called-id", "work_item_id": "001", "channel_sub_type": "FACEBOOK", "channel_type": "SOCIAL" }
            },
            {
                "components": [{ "visible": true, "name": "accept", "enabled": true },
                { visible: true, "name": "decline", "enabled": true }],
                "attributes": {
                    "life_time": 0, "country_code": "it", "caller": "caller-id", "called": "called-id",
                    "work_item_id": "002", "channel_sub_type": "TWITTER", "channel_type": "SOCIAL", "work_item_auto_reject_time": "O"
                }
            }
        ],
        "attributes": {
            "visible": false
        }

    },
    [ACTIONS_REST_KEY.work_list_no_timer_update]: {
        "children": [
            {
                "components": [

                    { visible: true, name: "accept_timer_countdown", value: 15 },
                    { visible: false, name: "decline_timer_countdown" },
                    { visible: true, name: "accept", enabled: true },
                    { visible: false, name: "decline", enabled: false },
                ],
                "attributes": {
                    life_time: 0,
                    country_code: "it",
                    caller: "caller-id",
                    called: "called-id",
                    work_item_id: "001",
                    channel_sub_type: "FACEBOOK",
                    channel_type: "SOCIAL",
                    update_channel_counter: 3,
                    current: false,
                    opened: false,
                    disconnected: false,
                    transferred: false,
                }

            },
            {
                "components": [

                    { visible: false, name: "accept_timer_countdown", value: -1 },
                    { visible: false, name: "decline_timer_countdown", value: 15 },
                    { visible: false, name: "accept", enabled: false },
                    { visible: false, name: "decline", enabled: false },
                ],
                "attributes": {
                    life_time: 0,
                    country_code: "it",
                    caller: "caller-id",
                    called: "called-id",
                    work_item_id: "002",
                    channel_sub_type: "SKYPE",
                    channel_type: "VOICE",
                    update_channel_counter: 1,
                    current: false,
                    opened: false,
                    disconnected: false,
                    transferred: false,
                }
            },
            {
                "components": [

                    { visible: true, name: "accept_timer_countdown", value: -1 },
                    { visible: false, name: "decline_timer_countdown", value: 15 },
                    { visible: true, name: "accept", enabled: true },
                    { visible: false, name: "decline", enabled: false },
                ],
                "attributes": {
                    life_time: 0,
                    country_code: "it",
                    caller: "caller-id",
                    called: "called-id",
                    work_item_id: "002",
                    channel_sub_type: "SKYPE",
                    channel_type: "VOICE",
                    update_channel_counter: 1,
                    current: false,
                    opened: false,
                    disconnected: false,
                    transferred: false,
                }
            },
            {
                "components": [
                    { visible: false, name: "accept_timer_countdown", value: -1 },
                    { visible: true, name: "decline_timer_countdown", value: 15 },
                    { visible: true, name: "accept", enabled: true },
                    { visible: true, name: "decline", enabled: false },
                ],
                "attributes": {
                    life_time: 0,
                    country_code: "it",
                    caller: "caller-id",
                    called: "called-id",
                    work_item_id: "002",
                    channel_sub_type: "SKYPE",
                    channel_type: "VOICE",
                    update_channel_counter: 1,
                    current: false,
                    opened: false,
                    disconnected: false,
                    transferred: false,
                }
            },
        ],
        "attributes": {
            "visible": "true"
        }
    },
    // work item
    [ACTIONS_REST_KEY.work_item_show]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 3,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_current_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_current_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: true,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_opened_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: false,
            opened: true,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_opened_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_disconnected_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: true,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_disconnected_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_transferred_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: true,
        }
    },
    [ACTIONS_REST_KEY.work_item_1_transferred_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "001",
            channel_sub_type: "FACEBOOK",
            channel_type: "SOCIAL",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_current_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_current_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: true,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_opened_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: false,
            opened: true,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_opened_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_disconnected_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: true,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_disconnected_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_transferred_true_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: true,
        }
    },
    [ACTIONS_REST_KEY.work_item_2_transferred_false_update]: {
        "components": [
            { visible: true, name: "accept", enabled: true },
            { visible: true, name: "decline", enabled: false },
            { visible: false, name: "accept_timer_countdown", enabled: true },
            { visible: false, name: "decline_timer_countdown", enabled: true }
        ],
        "attributes": {
            life_time: 0,
            country_code: "it",
            caller: "caller-id",
            called: "called-id",
            work_item_id: "002",
            channel_sub_type: "FACEBOOK",
            channel_type: "VOICE",
            update_channel_counter: 2,
            current: false,
            opened: false,
            disconnected: false,
            transferred: false,
        }
    },
    [ACTIONS_REST_KEY.work_item_accepted]: {
        "components":[
            {
                "visible":false,
                "name":"accept",
                "enabled":true
            },
            {
                "visible":false,
                "name":"decline",
                "enabled":true
            },
            {
                "visible":false,
                "name":"accept_timer_countdown"
            },
            {
                "visible":false,
                "name":"reject_timer_countdown",
                "value":"-1"
            },
            {
                "visible":true,
                "name":"info",
                "enabled":true
            },
            {
                "visible":true,
                "name":"forward",
                "enabled":false
            },
            {
                "visible":true,
                "name":"defer",
                "enabled":false
            },
            {
                "visible":true,
                "name":"history",
                "enabled":false
            },
            {
                "visible":true,
                "name":"acw",
                "enabled":false
            },
            {
                "visible":true,
                "name":"close",
                "enabled":false
            }
        ],
        "attributes":{
            "life_time":"25",
            "country_code": "it",
            "caller": "+393458877413",
            "current":true,
            "disconnected":false,
            "transferred":false,
            "called":"all",
            "work_item_id": "19e1baf5-7c70-4f1e-a21b-55555f826f42",
            "update_channel_counter":"0",
            "channel_sub_type": "ASTERISK",
            "opened":true,
            "channel_type": "VOICE"
        },
        "children": [
            {
                "components": [],
                "attributes": {
                    "media_interaction_id": "md123"
                }
            },
        ],
    },
    [ACTIONS_REST_KEY.work_item_info_show]: {
        "components": [
            { name: "contact_info", value:  {
                "at_test_2":"at_test_value_2",
                "at_test_1":"at_test_value_1"
            }},
            { name: "attachment_data", value:  {
                "at_test_2":"at_test_value_2",
                "at_test_1":"at_test_value_1"
            }},
            { name: "roster", value: {
                "rs_test_1":{
                    "r1_map_2":"r1_map_value_2",
                    "r1_map_1":"r1_map_value_1"
                },
                "rs_test_2":{
                    "r2_map_2":"r2_map_value_2",
                    "r2_map_1":"r2_map_value_1"
                }
            }},
        ],
        "attributes":{
            "work_item_id": "19e1baf5-7c70-4f1e-a21b-55555f826f42",
        }
    },
    [ACTIONS_REST_KEY.work_item_history_show]: {
        "components": [
            { name: "contact_info", value:  {
                "at_test_2":"at_test_value_2",
                "at_test_1":"at_test_value_1"
            }}
        ],
        "attributes":{
            "work_item_id": "19e1baf5-7c70-4f1e-a21b-55555f826f42",
        }
    },
    // voice media interaction
    [ACTIONS_REST_KEY.voice_media_interaction_show]: {
        "components":[
            {
                "visible":true,
                "name":"codes",
                "enabled":false
            },
            {
                "visible":true,
                "name":"hold",
                "enabled":false
            },
            {
                "visible":true,
                "name":"mute",
                "enabled":false
            },
            {
                "visible":true,
                "name":"release",
                "enabled":false
            }
        ],
        "attributes": {
            "media_interaction_id": "md123"
        }
    },
}
