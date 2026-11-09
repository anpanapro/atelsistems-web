window.ATEL_CONFIG = Object.assign(
    {
        FORMSPREE_FORM_ID: "",
        CONTACT_EMAIL: "atel@atelsistems.com",
        GOOGLE_ANALYTICS_ID: "G-WCKBEB4PPJ",
        MAPS: {
            // Sede Central Málaga: Calle Alcalde Gómez Gómez, 16 (Pol. Ind. El Viso, 29006 Málaga) - [36.6994, -4.4642]
            linkMalaga: "https://www.google.com/maps/dir/?api=1&destination=36.6994,-4.4642",
            embedMalaga: "https://maps.google.com/maps?q=36.6994,-4.4642+(ATEL+SISTEMS+Sede+Central+Malaga)&t=&z=16&ie=UTF8&iwloc=B&output=embed",
            osmMalaga: "https://www.openstreetmap.org/export/embed.html?bbox=-4.474%2C36.694%2C-4.454%2C36.704&layer=mapnik&marker=36.6994%2C-4.4642",

            // Delegación Costa del Sol Marbella: Ctra. Nacional 340, KM 178 (Centro Comercial Expo Marbella, 29602 Marbella) - [36.5082, -4.9213]
            linkMarbella: "https://www.google.com/maps/dir/?api=1&destination=36.5082,-4.9213",
            embedMarbella: "https://maps.google.com/maps?q=36.5082,-4.9213+(ATEL+SISTEMS+Delegacion+Marbella)&t=&z=15&ie=UTF8&iwloc=B&output=embed",
            osmMarbella: "https://www.openstreetmap.org/export/embed.html?bbox=-4.931%2C36.503%2C-4.911%2C36.513&layer=mapnik&marker=36.5082%2C-4.9213"
        }
    },
    window.ATEL_CONFIG || {}
);
