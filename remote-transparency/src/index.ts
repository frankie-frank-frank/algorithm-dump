import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import { execSync} from "child_process";
import NotionExporter from "notion-exporter"

dotenv.config();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY ?? ""
const NOTION_TOKEN_V2 = process.env.NOTION_TOKEN_V2 ?? ""

async function sendMessage() {
    const anthropic = new Anthropic({
      apiKey: CLAUDE_API_KEY
    });
    
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello, Claude" }],
    });
    console.log(msg);
}

async function NotionData(userNotionAssetId: string, fileToken: string) {
    const exporter = new NotionExporter(NOTION_TOKEN_V2, fileToken)
}

NotionData("kio", "kio")