const log = require("../functions/log");
const sequelize = require("./sequelize");

module.exports = (client) => {

    process.on("unhandledRejection", (reason, promise) => {
        log("UNHANDLED_REJECTION", reason);
    });

    process.on("uncaughtException", (error) => {
        log("UNCAUGHT_EXCEPTION", error);
    });

    process.on("uncaughtExceptionMonitor", (error) => {
        log("UNCAUGHT_EXCEPTION_MONITOR", error);
    });

    process.on("warning", (warning) => {
        log("NODE_WARNING", warning);
    });

    let isShuttingDown = false;

    process.on("SIGINT", async () => {
        if (isShuttingDown) return;
        isShuttingDown = true;

        console.log(`\n(WK-${process.pid}) [🛡️] » [ANTI-CRASH] SIGINT reçu (Ctrl+C), arrêt propre en cours...`);

        try {
            if (client) {
                await client.destroy();
                console.log(`(WK-${process.pid}) [🛡️] » [ANTI-CRASH] Client Discord arrêté`);
            }

            if (sequelize) {
                await sequelize.close();
                console.log(`(WK-${process.pid}) [🛡️] » [ANTI-CRASH] Connexion Sequelize fermée`);
            }
        } catch (e) {
            console.error(`(WK-${process.pid}) [🛡️] » [ANTI-CRASH] Erreur pendant l'arrêt:`, e);
        } finally {
            process.exit(0);
        }
    });


    process.on("exit", (code) => {
        console.log(`(WK-${process.pid}) [🛡️] » [ANTI-CRASH] Process arrêté avec le code ${code}`);
    });

};