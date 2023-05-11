package it.almawave.telephony.http;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import java.nio.charset.StandardCharsets;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import it.almawave.channels.sdk.message.UUID;

public class ReactUiServlet implements Servlet {

	private static final String INDEX_HTML;
	static {
		try(var indexHtml = Thread.currentThread().getContextClassLoader().getResourceAsStream("/index.html")) {
			INDEX_HTML = new String(indexHtml.readAllBytes(), StandardCharsets.UTF_8);
		} catch(IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	private static final String LAST_REQUEST_HEADER_MAP = "LAST_REQUEST_HEADER_MAP";
	private static final String UI_SESSION_UUID = "UI_SESSION_UUID";

	@Override
	public void init(ServletConfig config) throws ServletException {
		// not used
	}

	@Override
	public ServletConfig getServletConfig() { return null; }

	@Override
	public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
		Map<String, String> headerMap = new HashMap<>();
		Enumeration<String> headerNames = ((HttpServletRequest)req).getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String headerName = headerNames.nextElement();
			String headerValue = ((HttpServletRequest)req).getHeader(headerName);
			if (!headerValue.isEmpty()) {
				headerMap.put(headerName, headerValue);
			}
		}
		((HttpServletRequest)req).getSession().setAttribute(LAST_REQUEST_HEADER_MAP, headerMap);
		if ( ((HttpServletRequest)req).getSession().getAttribute(UI_SESSION_UUID) == null )
			((HttpServletRequest)req).getSession().setAttribute(UI_SESSION_UUID, UUID.randomUUID());

		res.setContentType("text/html");
		res.getWriter().write(INDEX_HTML);
	}

	@Override
	public String getServletInfo() { return null; }

	@Override
	public void destroy() {
		// not used
	}

}
