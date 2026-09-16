import React from "react";
import type { Store } from "redux";
import manifest from "../../plugin.json";

const PMS_URL = "https://center.fstack.asia/pms";

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
        height: "100%",
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
        zIndex: 10,
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
        animation: "pms-spin 0.9s linear infinite",
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

    openButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 34,
        marginTop: 16,
        padding: "0 14px",
        border: 0,
        borderRadius: 6,
        background: "#166de0",
        color: "#ffffff",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
    },
};

const openInNewTab = () => {
    const newWindow = window.open(
        PMS_URL,
        "_blank",
        "noopener,noreferrer",
    );

    if (newWindow) {
        newWindow.opener = null;
    }
};

const PMSEmbed = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasTimeout, setHasTimeout] = React.useState(false);
    const [loadKey, setLoadKey] = React.useState(0);

    /*
     * Nếu iframe không gọi onLoad, không để loading quay vô hạn.
     * Sau 12 giây sẽ hiện nút mở PMS trong tab mới.
     */
    React.useEffect(() => {
        setIsLoading(true);
        setHasTimeout(false);

        const timeout = window.setTimeout(() => {
            setIsLoading(false);
            setHasTimeout(true);
        }, 12000);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [loadKey]);

    /*
     * Debug lifecycle.
     * Có thể xóa sau khi plugin hoạt động ổn định.
     */
    React.useEffect(() => {
        console.log("[PMS] Component mounted");

        return () => {
            console.log("[PMS] Component unmounted");
        };
    }, []);

    const refresh = () => {
        setIsLoading(true);
        setHasTimeout(false);
        setLoadKey((key) => key + 1);
    };

    const handleLoad = () => {
        console.log("[PMS] iframe loaded");

        setIsLoading(false);
        setHasTimeout(false);
    };

    return (
        <section
            style={styles.shell}
            aria-label="PMS sidebar"
        >
            <style>
                {
                    "@keyframes pms-spin { to { transform: rotate(360deg); } }"
                }
            </style>

            <header style={styles.header}>
                <div style={styles.titleGroup}>
                    <h1 style={styles.title}>
                        PMS
                    </h1>

                    <span style={styles.subtitle}>
                        center.fstack.asia/pms
                    </span>
                </div>

                <div style={styles.actions}>
                    <button
                        type="button"
                        style={styles.button}
                        title="Tải lại PMS"
                        aria-label="Tải lại PMS"
                        onClick={refresh}
                    >
                        ↻
                    </button>

                    <button
                        type="button"
                        style={styles.button}
                        title="Mở PMS trong tab mới"
                        aria-label="Mở PMS trong tab mới"
                        onClick={openInNewTab}
                    >
                        ↗
                    </button>
                </div>
            </header>

            <div style={styles.content}>
                <iframe
                    key={loadKey}
                    title="PMS"
                    src={PMS_URL}
                    style={styles.frame}
                    onLoad={handleLoad}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="clipboard-read; clipboard-write"
                />

                {isLoading && (
                    <div
                        style={styles.overlay}
                        role="status"
                        aria-live="polite"
                    >
                        <div style={styles.message}>
                            <div style={styles.spinner} />

                            <p style={styles.messageTitle}>
                                Đang tải PMS
                            </p>

                            <p style={styles.messageText}>
                                Đang kết nối tới PMS...
                            </p>
                        </div>
                    </div>
                )}

                {hasTimeout && (
                    <div style={styles.overlay}>
                        <div style={styles.message}>
                            <p style={styles.messageTitle}>
                                Không thể tải PMS
                            </p>

                            <p style={styles.messageText}>
                                PMS có thể không cho phép hiển thị
                                bên trong Mattermost hoặc kết nối đang
                                mất nhiều thời gian.
                            </p>

                            <button
                                type="button"
                                style={styles.openButton}
                                onClick={openInNewTab}
                            >
                                Mở PMS trong tab mới ↗
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const PMSIcon = () => (
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
        title="PMS"
    >
        PMS
    </span>
);

export default class Plugin {
    initialize(
        registry: PluginRegistry,
        store: Store,
    ) {
        const rhsRegistration =
            registry.registerRightHandSidebarComponent(
                PMSEmbed,
                "PMS",
            );

        registry.registerChannelHeaderButtonAction(
            <PMSIcon />,
            () => {
                /*
                 * Mattermost có thể trả về toggleRHSPlugin
                 * hoặc showRHSPlugin tùy version/API.
                 *
                 * Cả hai đều được dispatch qua Redux store.
                 */
                const action =
                    rhsRegistration.toggleRHSPlugin ??
                    rhsRegistration.showRHSPlugin;

                if (action) {
                    store.dispatch(
                        action as Parameters<
                            typeof store.dispatch
                        >[0],
                    );

                    return;
                }

                /*
                 * Fallback:
                 * nếu Mattermost không cung cấp RHS action
                 * thì mở PMS trong tab mới.
                 */
                openInNewTab();
            },
            "Mở PMS",
            "PMS",
        );
    }
}

declare global {
    interface Window {
        registerPlugin(
            pluginId: string,
            plugin: Plugin,
        ): void;
    }
}

window.registerPlugin(
    manifest.id,
    new Plugin(),
);
