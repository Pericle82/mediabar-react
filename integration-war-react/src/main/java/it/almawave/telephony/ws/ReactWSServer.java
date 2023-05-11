package it.almawave.telephony.ws;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;

import it.almawave.telephony.utils.ChannelHubLogger;
import it.almawave.telephony.web.TelephonyUI;

@ServerEndpoint(value = "/v2",
				configurator = it.almawave.telephony.ws.ReactServerConfigurator.class)
public class ReactWSServer {
	private static final String UI_SESSION_UUID = "UI_SESSION_UUID";
	
	private static final Logger LOG = ChannelHubLogger.getLogger(ChannelHubLogger.MEDIA_BAR, ReactWSServer.class);

	private static Map<String, ReactUISession> sessions = new ConcurrentHashMap<>();

	@OnOpen
    public void onOpen(Session session, EndpointConfig config) throws IOException {
		TelephonyUI ui = null;
		
		LOG.debug("opening client session {}", session);
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        LOG.trace("getting http session from EndpointConfig {}", httpSession);

		// Create UI and session objects if required.
		if ( !sessions.containsKey(session.getId()) ) {
			// check if the UI comes from a page refresh, if true update socket session id
			String ui_uuid = httpSession.getAttribute(UI_SESSION_UUID).toString();
			for (Map.Entry<String, ReactUISession> entry: sessions.entrySet()) {
				if ( entry.getValue().getUi().getUuid().equals(ui_uuid) ) {
					LOG.debug("found an existing ui with uuid [{}]", ui_uuid);
					ui = entry.getValue().getUi();
					ui.setSessionId(session.getId());
					LOG.debug("updating ws session");
					sessions.put(session.getId(), entry.getValue());
					sessions.remove(entry.getKey());
					break;
				}
			}
			if ( ui == null ) {			
				ui = TelephonyUI.getUI();
				sessions.put(session.getId(), new ReactUISession(session, ui));
				ui.init(session.getId(), httpSession);
				
			}
		} else
			LOG.warn("opening socket on existing session..doing nothing");
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
    	LOG.trace("Received messagge on session [{}] - message [{}]", session.getId(), message);
    	ReactUISession s = sessions.get(session.getId());
    	if ( s!=null )
    		s.getUi().sendEvent(message);
    	else
    		LOG.warn("invalid session {} in receiving message [{}]", session.getId());
    }

    @OnClose
    public void onClose(Session session) throws IOException {
    	// invalidate sessions components
    	LOG.debug("closing client session {}", session);
    	if ( sessions.containsKey(session.getId()) ) {
    		ReactUISession s = sessions.get(session.getId());
    		s.getUi().detach();
    		sessions.remove(session.getId());
    	}
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
    	LOG.error("socker error session[{}] - {}", session, throwable);
    }
    
    public static void sendMessage(String sessionId, String message) throws IOException {
    	ReactUISession s = sessions.get(sessionId);
    	if (s!=null && s.getSession()!=null) {
        	LOG.trace("Sending message on session [{}] - {}", sessionId, message);
			var useSession = s.getSession();
			synchronized (useSession) {
    			useSession.getBasicRemote().sendText(message);
			}
    	}
    	else
    		LOG.error("invalid session {} in sending message", sessionId);
    }
    
    public static void addListener(String sessionId, String event, Consumer<Object> c) {
    	ReactUISession s = sessions.get(sessionId);
    	if (s!=null) s.addListener(event,  c);
    	else LOG.warn("invalid session on addListerner {}", sessionId);
    }

    public static void removeListeners(String sessionId, String event) {
    	ReactUISession s = sessions.get(sessionId);
    	if (s!=null) s.removeListeners(event);
    	else LOG.warn("invalid session on removeListeners {}", sessionId);
    }

    
    private class ReactUISession {
    	private Session session;
		private TelephonyUI ui;

		private Map<String, List<Consumer>> listeners = new ConcurrentHashMap<>();
    	
    	ReactUISession(Session session, TelephonyUI ui) {
    		this.session = session;
    		this.ui = ui;
    	}

    	public Session getSession() {
			return session;
		}

		public TelephonyUI getUi() {
			return ui;
		}
    	
		public void addListener(String event, Consumer c) {
			@SuppressWarnings("rawtypes")
			List<Consumer> consumers = listeners.get(event);
			if ( null==consumers ) {
				consumers = Collections.synchronizedList(new ArrayList<Consumer>());
				listeners.put(event, consumers);
			}
			consumers.add(c);
		}
		
		public void removeListeners(String event) {
			if ( listeners.containsKey(event) ) listeners.remove(event);
		}	

		@SuppressWarnings("rawtypes")	
		public List<Consumer> getListeners(String event) {
			return listeners.get(event);
		}
    }    
}
