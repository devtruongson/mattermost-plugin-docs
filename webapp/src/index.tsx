import React from "react";
import type { Store } from "redux";
import manifest from "../../plugin.json";

const ERP_URL = "https://docs.fstack.asia";

type RightHandSidebarRegistration = {
    id?: string;
    showRHSPlugin?: unknown;
    hideRHSPlugin?: () => void;
    toggleRHSPlugin?: unknown;
};

type PluginRegistry = {
    registerRightHandSidebarComponent: (
        component: React.ComponentType,
        title: string,
    ) => RightHandSidebarRegistration;
    registerChannelHeaderButtonAction: (
        icon: React.ReactElement,
        action: () => void,
        dropdownText: string,
        tooltipText: string,
    ) => void;
};

const styles: Record<string, React.CSSProperties> = {
    shell: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100dvh",
        minHeight: 0,
        background: "#f7f8fa",
        color: "#1f2329",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        minHeight: 52,
        padding: "10px 12px",
        borderBottom: "1px solid rgba(63, 67, 80, 0.16)",
        background: "#ffffff",
    },
    titleGroup: {
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
    },
    title: {
        margin: 0,
        overflow: "hidden",
        color: "#1f2329",
        fontSize: 15,
        fontWeight: 700,
        lineHeight: "20px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    subtitle: {
        overflow: "hidden",
        color: "#5b6573",
        fontSize: 12,
        lineHeight: "16px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    actions: {
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        gap: 8,
    },
    button: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        border: "1px solid rgba(63, 67, 80, 0.2)",
        borderRadius: 6,
        background: "#ffffff",
        color: "#2f3742",
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1,
    },
    content: {
        position: "relative",
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        background: "#ffffff",
    },
    frame: {
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background: "#ffffff",
    },
    overlay: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "#ffffff",
    },
    message: {
        width: "min(320px, 100%)",
        textAlign: "center",
    },
    spinner: {
        width: 28,
        height: 28,
        margin: "0 auto 14px",
        border: "3px solid #d8dde6",
        borderTopColor: "#166de0",
        borderRadius: "50%",
        animation: "erp-spin 0.9s linear infinite",
    },
    messageTitle: {
        margin: "0 0 6px",
        color: "#1f2329",
        fontSize: 14,
        fontWeight: 700,
        lineHeight: "20px",
    },
    messageText: {
        margin: 0,
        color: "#5b6573",
        fontSize: 13,
        lineHeight: "18px",
    },
};

const openInNewTab = () => {
    window.open(ERP_URL, "_blank", "noopener,noreferrer");
};

const ERPEmbed = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadKey, setLoadKey] = React.useState(0);

    const refresh = () => {
        setIsLoading(true);
        setLoadKey((key) => key + 1);
    };

    return (
        <section style={styles.shell} aria-label="ERP sidebar">
            <style>
                {"@keyframes erp-spin { to { transform: rotate(360deg); } }"}
            </style>
            <header style={styles.header}>
                <div style={styles.titleGroup}>
                    <h1 style={styles.title}>Docs</h1>
                    <span style={styles.subtitle}>docs.fstack.asia</span>
                </div>
                <div style={styles.actions}>
                    <button
                        type="button"
                        style={styles.button}
                        title="Tải lại ERP"
                        aria-label="Tải lại ERP"
                        onClick={refresh}
                    >
                        ↻
                    </button>
                    <button
                        type="button"
                        style={styles.button}
                        title="Mở ERP trong tab mới"
                        aria-label="Mở ERP trong tab mới"
                        onClick={openInNewTab}
                    >
                        ↗
                    </button>
                </div>
            </header>
            <div style={styles.content}>
                <iframe
                    key={loadKey}
                    title="ERP"
                    src={ERP_URL}
                    style={styles.frame}
                    onLoad={() => setIsLoading(false)}
                    referrerPolicy="strict-origin-when-cross-origin"
                />
                {isLoading && (
                    <div
                        style={styles.overlay}
                        role="status"
                        aria-live="polite"
                    >
                        <div style={styles.message}>
                            <div style={styles.spinner} />
                            <p style={styles.messageTitle}>Đang tải Docs</p>
                            <p style={styles.messageText}>
                                Nếu màn hình không hiển thị, hãy mở docs trong
                                tab mới.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const DocsIcon = () => (
    <span
        style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            color: "#166de0",
            fontSize: 11,
            fontWeight: 700,
            lineHeight: "20px",
        }}
    >
        <img
            style={{
                width: 20,
                height: 20,
                objectFit: "contain",
            }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAAEHCAMAAADI2meYAAAAeFBMVEUwhvb9//////8MZ9Y3ivYigfaZvfqtzPumx/ucwforhPYZfvbI3fx0qfgXbt0aceFZm/gAYNSHtPlAgN5SiuAIe/VNlPdgnvg6fd06i/bW5f1Cj/eyz/vw9v670/yHs/lKiugud9trpPgAZttmmenD2Pxnofjr8/6sn7JAAAADmUlEQVR4nO3d23qaQBiF4WEMagebRlqgiiZt2iT3f4dFohGJmxkYWfPX9R3l8F15kIBxo3Sj9eNTUarhMr9039T+x8cii2NjBvSr+9+RL/+yTAal132b9x2w86fZ8PrKP5r/7Dfg3R89JAD9xt93QO2P8hjC3/h7Dqj9BYhf+/sN2PhTzMGz8/caUPmXGYq/9Y/m3zsPqPw54sxz4O8xQOkZ7OjZ+7sPULrA/fr3/s4D1Bp39Df9XQeoF+Dh0/R3HKDGqHN/299tgHoGHv6H/k4DFPDs2fZ3GaAWQH7b32GAugvJ7z4gML/zgND81cWcbL/jgPD8bgMC9DsNCNHvMiBIv8OAMP3VaVS233pAqH7bm/pg/ZZ/icP12w0I2G81IGS/zYCg/RYDwvZfHhC4/+KA0P2XBgTvvzAgfP/5AQL8ZwdI8J+7mBPhPzNAhv/0ACH+kwOk+E8NEOM/MUCO//gAQf6jAyT5jw0Q5T8yQJZ/NP8h2/9pgDR/e4A4f2uAPP/hAIH+gwES/c0BIv2NATL9+wFC/R8DpPp3A8T6twPk+t8HCPbXAyT7NwPA/vt+/fmL9XtItv+Ofmj0Y6MfG/3Y6MdGPzb6sdGPjX5s9GOjHxv92OjHRj82+rHRj83Bb+Lhsn5Pvr3flOPhKm0HOPgfPr3273o9XMUfDRX99NNPP/30009/IH7R12+qXE2GamX9Ibwu918D3r9Ym27o/jHI6MdGPzb6sdGPjX5s9GOjHxv92G7o/rGcTIdqcoX7d+nPn/wHz1/RTz/99NNPP/30u/plX7+V0y9DNb3C68ekv34vzOjHRj82+rHRj41+bPRjox8b/dhuyZ/4zNO3rjr485nPPH3tLez5k9TP1w6jnr+in3766aeffvrpF+GXff22+Oqz3Avf6f9fXvPDv6n7xxCjHxv92OjHRj82+rHRj41+bPRjox8b/djox0Y/Nvqx0Y+Nfmz0Y6MfG/3Y6MdGPzb6sdGPjX5s9GOjHxv92OT7F2hCrxYq9/VSUkQmV57eCIfJPKuxnxdSY4rH6iVBI3qUvKh1hkb0KFsrXch9AJhXrfRM7gGUzSq/FnsGNbne+JdSHwHZsvbrVOYRlKT63a8LiX8D4kLv/FEub0CcRx9+HRXSDqGkqPlbf/UYyCSdhUyWbt07v57lvj6T4eqZJF/qtr9aUGRx7O2dWdfJmDjOitke3fBr/bZKX60/Oh1S+Zqu3prkfzbViV3SX3zxAAAAAElFTkSuQmCC"
            alt=""
        />
    </span>
);

export default class Plugin {
    initialize(registry: PluginRegistry, store: Store) {
        const rhsRegistration = registry.registerRightHandSidebarComponent(
            ERPEmbed,
            "ERP",
        );

        registry.registerChannelHeaderButtonAction(
            <DocsIcon />,
            () => {
                // toggleRHSPlugin: thunk     → (dispatch, getState) => ...
                // showRHSPlugin:   object    → { type: 'UPDATE_RHS_STATE', ... }
                // cả hai đều cần store.dispatch()
                const action =
                    rhsRegistration.toggleRHSPlugin ??
                    rhsRegistration.showRHSPlugin;
                if (action) {
                    store.dispatch(
                        action as Parameters<typeof store.dispatch>[0],
                    );
                    return;
                }
                openInNewTab();
            },
            "Mở Docs",
            "Docs",
        );
    }
}

declare global {
    interface Window {
        registerPlugin(pluginId: string, plugin: Plugin): void;
    }
}

window.registerPlugin(manifest.id, new Plugin());
