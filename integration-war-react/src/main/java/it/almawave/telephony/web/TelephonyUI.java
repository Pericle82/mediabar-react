/*
 * Copyright (c) 2014 Almawave s.r.l. Via di Casal Boccone 188/1Re90 00137 Roma Italy All rights reserved.
 *
 * Almawave s.r.l. has intellectual property rights relating to implementations
 * of the technology described in this publication. In particular, and without
 * limitation, these intellectual property rights may include one or more Italy
 * patents, foreign patents, or pending applications.
 * Almawave and the Almawave logo are trademarks or registered trademarks of
 * Almawave, s.r.l. in Italy and other countries.
 *
 * THIS PUBLICATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
 * KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
 *
 * THIS PUBLICATION COULD INCLUDE TECHNICAL INACCURACIES OR
 * TYPOGRAPHICAL ERRORS.
 * CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN;
 * THESE CHANGES WILL BE INCORPORATED IN NEW EDITIONS OF THE
 * PUBLICATION.
 * ALMAWAVE, s.r.l. MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE
 * PRODUCT(S) AND/OR PROGRAM(S) DESCRIBED IN THIS PUBLICATION
 * AT ANY TIME.
 */
package it.almawave.telephony.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.function.Consumer;

import javax.enterprise.context.spi.CreationalContext;
import javax.enterprise.inject.spi.Bean;
import javax.enterprise.inject.spi.BeanManager;
import javax.enterprise.inject.spi.CDI;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;

import it.almawave.telephony.ConfigProvider;
import it.almawave.telephony.config.GlobalConfiguration;
import it.almawave.telephony.event.DefaultEventBus;
import it.almawave.telephony.event.EventBus;
import it.almawave.telephony.factory.ChannelModelFactory;
import it.almawave.telephony.presenter.ComponentFactory;
import it.almawave.telephony.presenter.PhoneBarPresenter;
import it.almawave.telephony.utils.ChannelHubLogger;
import it.almawave.telephony.view.HttpRequestHeaderHandler;
import it.almawave.telephony.view.ViewToUiBus;
import it.almawave.telephony.view.command.ReactUICommand;
import it.almawave.telephony.view.command.ReactUINotifyCommand;
import it.almawave.telephony.view.event.ReactEventDispatcher;
import it.almawave.telephony.view.factory.ReactViewFactory;
import it.almawave.telephony.ws.ReactWSServer;

/**
 *
 * @version 1.0.0
 *
 */
public class TelephonyUI implements Consumer {

	public static final String DEFAULT_WIDTH = "310";

	private static final long serialVersionUID = -1338134001405674462L;

	private static final Logger LOG = ChannelHubLogger.getLogger(ChannelHubLogger.MEDIA_BAR, TelephonyUI.class);
	
	private static final String LAST_REQUEST_HEADER_MAP = "LAST_REQUEST_HEADER_MAP";
	private static final String UI_SESSION_UUID = "UI_SESSION_UUID";

	private EventBus eventBus;
	
	private ViewToUiBus toWSBus;

	private ComponentFactory factory;
	
	private GlobalConfiguration configuration;
	
	private String sessionId;
	
	private String uuid;
	
	@SuppressWarnings("unused")
	private PhoneBarPresenter phoneBarPresenter; 
	
	public static TelephonyUI getUI() {
		return new TelephonyUI();
	} 
	
	@SuppressWarnings("unchecked")
	public void init(String sessionId, HttpSession httpSession) {

		LOG.info("Initializing Telephony UI");
		
		uuid = httpSession.getAttribute(UI_SESSION_UUID).toString();

		this.sessionId = sessionId;
		
        initConfiguration();

		initEventBus();

		factory = new ComponentFactory(new ReactViewFactory(uuid), new ChannelModelFactory());	

		HttpRequestHeaderHandler.getInstance().addHeaderMap(uuid, (Map<String, String>)httpSession.getAttribute(LAST_REQUEST_HEADER_MAP));		
		
		// TODO configuration issues?
		boolean autologinMode = true;

		phoneBarPresenter = new PhoneBarPresenter(eventBus, factory, configuration, autologinMode);

		initDesktopNotification();

		/* TODO
		ComponentFactory factory = new ComponentFactory(viewFactory, modelFactory);
		PhoneBarPresenter presenter = new PhoneBarPresenter(eventBus, factory, configuration, autologinMode);
		final Component phonebarView = (Component) presenter.getView();
		content.addComponent(phonebarView);


		SoftPhoneSizer textarea = new SoftPhoneSizer(phonebarView);

		if (isDebugMode(request)) {
			debugWindow.setPhoneBarView((VaadinPhoneBarView) phonebarView);
		} else {
			if (configuration.getShowConfiguration()) {
				Accordion accordion = new Accordion();
				accordion.addTab(textarea, "Sizer");
				ConfigurationPanel configurationPanel = new ConfigurationPanel(configuration);
				accordion.addTab(configurationPanel, "Configuration");
				accordion.addTab(observer, "Event Observer");
				Window window = new Window("Configurations", accordion);
				window.setWidth("300px");
				window.setHeight("400px");
				addWindow(window);
			}
		}
		phonebarView.setWidth(DEFAULT_WIDTH + "px");
		setContent(content);
		ui = this;
		*/ 		
	}

	public void detach() {
		phoneBarPresenter.onDetach();
	}		
	
	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	
	private void initEventBus() {
		eventBus = new DefaultEventBus();
		ViewToUiBus.getInstance().register(uuid, this);
	}

	@Override
	public void accept(Object object) {
		try {
			ReactWSServer.sendMessage(sessionId, object.toString());
		} catch (IOException e) {
			LOG.error("cannot send command to WS {}", e);
		}
	}
	
	public void sendEvent(String eventObject) {
		ReactEventDispatcher.dispatch(uuid, eventObject);
	}
	
	private void initConfiguration() {
	    Properties properties = lookupProvider().getConfigurationProperties();
		Map<String, String> configurationValue = new HashMap(properties);
		configuration = new GlobalConfiguration(configurationValue);
	}

    private ConfigProvider lookupProvider() {
        BeanManager bm            = CDI.current().getBeanManager();
        Bean<?>     bean          = bm.resolve(bm.getBeans(ConfigProvider.class));
        CreationalContext<?> cctx = bm.createCreationalContext(bean);
        return (ConfigProvider) bm.getReference(bean, ConfigProvider.class, cctx);
    }

	private void initDesktopNotification() {
		
	    if(configuration.isDesktopNotificationEnabled()) {

			var notificationInitCommand = new ReactUINotifyCommand(
				ReactUINotifyCommand.ASK_PERMISSION,
				Map.of(
					ReactUICommand.CommandAttributeField.default_timeout.name(), configuration.getDesktopNotifcationDefaultTimeout(),
					ReactUICommand.CommandAttributeField.close_on_click.name(), configuration.isDesktopNotificationCloseOnClick(),
					ReactUICommand.CommandAttributeField.require_active_browser.name(), configuration.isDesktopNotifcationShowWhenBrowserActive()
				)
			);

			try {
				ReactWSServer.sendMessage(sessionId,  notificationInitCommand.getCommandJson().toString());
			} catch (IOException e) {
				LOG.error("cannot initialize desktop notifications with command {}", e);
			}
	    }
	}
    
	/*
	private void setConfigurationParameter(GlobalConfiguration configuration, HttpServletRequest request) {
		String terminal = request.getParameter("terminal");
		String voiceClosable = request.getParameter("voiceClosable");
		String auto_accept_call = request.getParameter("auto_accept_call");

		if (terminal != null && !terminal.trim().isEmpty()) {
			configuration.setDefaultTerminal(terminal);
		}

		if (voiceClosable != null && !voiceClosable.trim().isEmpty()) {
			configuration.setVoiceCanBeClosed(new Boolean(voiceClosable));
		}

		if (auto_accept_call != null && !auto_accept_call.trim().isEmpty()) {
			configuration.setAutoAcceptTime(Integer.valueOf(auto_accept_call));
		}
	}
    */
}
