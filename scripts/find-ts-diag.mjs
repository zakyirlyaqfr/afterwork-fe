import fs from "fs";
import ts from "typescript";

const html = fs.readFileSync("c:/Users/M.Victo Irlyando/Downloads/afterwork-deployment/index.html", "utf8");
const lines = html.split("\n");
const line38 = lines[37];

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(line38)) !== null) {
  const attrs = match[1];
  const code = match[2];
  if (!code.trim()) continue;
  
  // Create TS source file
  const sf = ts.createSourceFile("embedded.js", code, ts.ScriptTarget.Latest, true);
  const diags = sf.parseDiagnostics;
  console.log("Script with attrs [" + attrs + "]:");
  console.log("  Diagnostics count:", diags.length);
  diags.forEach(d => {
    console.log("   - Message:", d.messageText, "Code:", d.code, "at pos:", d.start);
    console.log("     Around pos:", JSON.stringify(code.slice(Math.max(0, d.start - 30), d.start + 30)));
  });
}
