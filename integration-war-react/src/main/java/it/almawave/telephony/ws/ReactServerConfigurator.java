package it.almawave.telephony.ws;

import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;

import org.slf4j.Logger;

import it.almawave.telephony.utils.ChannelHubLogger;

public class ReactServerConfigurator extends ServerEndpointConfig.Configurator {
	private static final Logger LOG = ChannelHubLogger.getLogger(ChannelHubLogger.MEDIA_BAR, ReactServerConfigurator.class);

    @Override
    public void modifyHandshake(ServerEndpointConfig config,
            					HandshakeRequest request,
            					HandshakeResponse response) {
        HttpSession httpSession = (HttpSession) request.getHttpSession();
        LOG.trace("writing http session into config user properties {}", httpSession);
        config.getUserProperties().put(HttpSession.class.getName(), httpSession);
    }
}
