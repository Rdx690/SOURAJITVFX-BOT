// ============================================
// 📢 CHANNEL AUTO-FOLLOW  (𝐒ꭷᴜʀᴀᴊɪᴛ メ 𝐕𝐅𝐗)
// Follows every newsletter listed in settings.CHANNEL_IDS
// when a session connects. Plain, readable code.
// ============================================
const config = require('../settings');

async function followChannels(conn) {
    if (String(config.AUTO_FOLLOW_CHANNEL) !== 'true') return;
    const ids = Array.from(new Set([config.CHANNEL_JID, ...(config.CHANNEL_IDS || [])].filter(Boolean)));
    for (const jid of ids) {
        try {
            if (typeof conn.newsletterFollow === 'function') {
                await conn.newsletterFollow(jid);
                console.log(`[Channel] Followed ${jid}`);
            }
        } catch (e) {
            console.log(`[Channel] Follow skipped for ${jid}: ${e.message}`);
        }
    }
}

module.exports = { followChannels };
