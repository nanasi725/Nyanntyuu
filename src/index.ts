import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';

// .envファイルから環境変数を読み込む
dotenv.config();

// クライアント（Bot）の作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // サーバーに関するイベントを受け取る
        GatewayIntentBits.GuildMessages, // メッセージに関するイベントを受け取る
        GatewayIntentBits.MessageContent, // メッセージの中身を読み取る（特権）
    ],
});

// 起動時のイベント
client.once(Events.ClientReady, (c) => {
    console.log(`準備完了！ ${c.user.tag} としてログインしました。`);
});

// ログイン実行
client.login(process.env.DISCORD_TOKEN);