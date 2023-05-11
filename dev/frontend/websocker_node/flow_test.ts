import { ACTIONS_CODE, ACTIONS_REST_KEY } from "./actionsCode";

export enum TEST {
    conf_1 = "conf_1", // state, channels, commands
}

export const TEST_TO_ACTIONS_MAP: { [key in TEST]: ACTIONS_REST_KEY[] } = {

    conf_1: [
        ACTIONS_REST_KEY.agent_state_show,
        ACTIONS_REST_KEY.agent_state_update,
        ACTIONS_REST_KEY.agent_channels_show,
        ACTIONS_REST_KEY.agent_channels_update,
        ACTIONS_REST_KEY.agent_commands_all_enabled_show
    ]

}