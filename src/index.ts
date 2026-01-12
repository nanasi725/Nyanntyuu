import { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN!;

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

function toNyanchu(text: string): string {
    const smallOCount = Math.floor(Math.random() * 10) + 3;
    const scream = 'ぉ゛'.repeat(smallOCount); 
    const prefix = `お゛${scream}ん゛！！`;
    const body = text.split('').map(char => char + '゛').join(' ');
    const bangCount = Math.floor(Math.random() * 10) + 1;
    const suffix = '！'.repeat(bangCount);
    return `${prefix}　${body}${suffix}`;
}

const commands = [
    new SlashCommandBuilder()
        .setName('nyanchu')
        .setDescription('ニ゛ ャ゛ ン゛ ち゛ ゅ゛ う゛ だ゛ ニ゛ ャ゛ ン゛')
        .addStringOption(option =>
            option.setName('text') 
                .setDescription('お゛ぉ゛ぉ゛ぉ゛ぉ゛ん！！')
                .setRequired(true)
        ),
];

client.once(Events.ClientReady, async (c) => {
    console.log(`準備完了！ ${c.user.tag} がログインしました`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    try {
        console.log('コマンドを更新中...');
        await rest.put(
            Routes.applicationCommands(c.user.id),
            { body: commands },
        );
        console.log('コマンド更新完了！');
    } catch (error) {
        console.error(error);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'nyanchu') {
        const inputText = interaction.options.getString('text') ?? '';
        
        const result = toNyanchu(inputText);

        await interaction.reply(result);
    }
});

client.login(TOKEN);