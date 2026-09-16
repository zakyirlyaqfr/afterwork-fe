import fs from "fs";

const html = fs.readFileSync("out/index.html", "utf8");
const startTag = "<script>self.__next_f.push([1,";
const endTag = "</script>";

const startIdx = html.indexOf(startTag);
if (startIdx !== -1) {
  const endIdx = html.indexOf(endTag, startIdx);
  const scriptContent = html.slice(startIdx + "<script>".length, endIdx);
  console.log("Script content length:", scriptContent.length);
  try {
    const fn = new Function("self", scriptContent);
    const mockSelf = { __next_f: [] };
    fn(mockSelf);
    console.log("✅ EVAL SUCCEEDED! Valid JavaScript without any syntax error.");
  } catch (err) {
    console.log("❌ EVAL FAILED with error:", err.message);
  }
} else {
  console.log("Start tag not found");
}
