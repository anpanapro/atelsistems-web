/* ==============================================================
   SECURITY.JS - HARDENING CLIENTE Y CONTROL DE ENTORNO
   ATEL SISTEMS - Compatible con producción, preview y red local
============================================================== */
(function () {
    'use strict';

    const TRUSTED_DOMAINS = [
        'atelsistems.com',
        'atelsistems.es',
        'atelsistems.eu',
        'atelsistems.net'
    ];

    function isLocalHost(h) {
        if (!h) return false;
        // Localhost y loopback IPv4/IPv6
        if (h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '0.0.0.0') return true;
        // Rangos de red privada RFC 1918 (WiFi local, tablets, móviles)
        if (/^192\.168\./.test(h)) return true;
        if (/^10\./.test(h)) return true;
        if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(h)) return true;
        // CGNAT (100.64.0.0/10) usado a veces en tethering móvil
        if (/^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./.test(h)) return true;
        // Dominios locales mDNS y entornos de pruebas
        if (h.endsWith('.local') || h.endsWith('.lan') || h.endsWith('.home') || h.endsWith('.internal') || h.endsWith('.test')) return true;
        // Wildcards DNS locales comunes
        if (h.endsWith('.nip.io') || h.endsWith('.sslip.io')) return true;
        return false;
    }

    function isPreviewOrStaging(h) {
        if (!h) return false;
        if (h.endsWith('.netlify.app')) return true;
        if (h.endsWith('.pages.dev')) return true;
        if (h.endsWith('.loca.lt')) return true;
        if (h.endsWith('.ngrok.io') || h.endsWith('.ngrok-free.app')) return true;
        return false;
    }

    function isTrustedHost(h) {
        if (!h) return false;
        if (isLocalHost(h) || isPreviewOrStaging(h)) return true;
        return TRUSTED_DOMAINS.some(function (d) {
            return h === d || h.endsWith('.' + d);
        });
    }

    const host = window.location.hostname;
    const isLocal = isLocalHost(host);
    const isPreview = isPreviewOrStaging(host);
    const isTrusted = isTrustedHost(host);

    // Forzar HTTPS solo en dominios de producción oficial.
    // NUNCA forzar HTTPS en localhost, IPs de red local (192.168.x.x) ni entornos de prueba HTTP.
    if (!isLocal && !isPreview && isTrusted && window.location.protocol !== 'https:') {
        const httpsUrl = 'https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash;
        window.location.replace(httpsUrl);
        return;
    }

    // Defensa contra clickjacking (frame-busting) SOLO en producción estricta.
    // Desactivada en local y preview para permitir previsualizaciones en iframes y herramientas de desarrollo.
    const shouldEnforceFrameBusting = !isLocal && !isPreview && isTrusted;

    if (shouldEnforceFrameBusting && window.top !== window.self) {
        try {
            window.top.location = window.self.location;
        } catch (error) {
            document.documentElement.style.display = 'none';
        }
    }

    // Indicador visual solo si se suplanta la identidad en dominios ajenos públicos no confiables
    if (!isTrusted) {
        document.addEventListener('DOMContentLoaded', function () {
            const warning = document.createElement('div');
            warning.setAttribute('role', 'alert');
            warning.style.position = 'fixed';
            warning.style.top = '0';
            warning.style.left = '0';
            warning.style.right = '0';
            warning.style.zIndex = '99999';
            warning.style.background = '#8a1f1f';
            warning.style.color = '#fff';
            warning.style.padding = '12px 16px';
            warning.style.fontSize = '14px';
            warning.style.fontWeight = '700';
            warning.style.textAlign = 'center';
            warning.style.boxShadow = '0 3px 10px rgba(0,0,0,0.35)';
            warning.textContent = 'Aviso de seguridad: Estás accediendo a través de un dominio no oficial. Por favor, accede mediante www.atelsistems.com';
            document.body.prepend(warning);
        });
    }
})();
