package net.kalmas.cruzers.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import com.google.common.net.HttpHeaders;

@Component
public class HttpHeadersFilter implements Filter
{
    @Override
    public void destroy() {}

    @Override
    public void doFilter(final ServletRequest req, final ServletResponse res, final FilterChain chain)
            throws IOException, ServletException
    {
        final HttpServletResponse response = (HttpServletResponse) res;

        response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
        response.setHeader(HttpHeaders.CACHE_CONTROL, "max-age=3600");

        chain.doFilter(req, res);
    }

    @Override
    public void init(final FilterConfig filterConfig) {}
}
