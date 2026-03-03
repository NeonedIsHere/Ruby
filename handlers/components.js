const fs = require('fs');
const path = require('path');
const logTitle = require('../functions/logTitle');

module.exports = (client) => {
    logTitle("Chargement des intéraction", false)
    const inter = [
        { name: 'buttons', collection: client.buttons },
        { name: 'selects', collection: client.selects },
        { name: 'modals', collection: client.modals }
    ];

    for (const type of inter) {
        const interPath = path.join(__dirname, '../components', type.name);

        if (!fs.existsSync(interPath)) {
            console.warn(`├── (WK-${process.pid}) [📁] » [Interaction] Dossier ${type.name} introuvable, création...`);
            fs.mkdirSync(interPath, { recursive: true });
            console.log(`├── (WK-${process.pid}) [✅] » [Interaction] Dossier ${type.name} créé avec succès.`);
            continue;
        }

        const files = fs.readdirSync(interPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const filepath = path.join(interPath, file);
            const interactionModule = require(filepath);

            if (!interactionModule || !interactionModule.customId || !interactionModule.execute) {
                console.error(`├── (WK-${process.pid}) [❌] » [Interaction] ${file} est invalide (customId ou execute manquant).`);
                continue;
            }

            type.collection.set(interactionModule.customId, interactionModule);
            console.log(`├── (WK-${process.pid}) [🧩] » [Interaction] chargé avec succès: ${interactionModule.customId} depuis ${path.relative(process.cwd(), filepath)}`);
        }
    }
};