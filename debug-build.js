#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

console.log("🔍 Build Environment Debug Script");
console.log("=====================================");

console.log("📁 Current working directory:", process.cwd());
console.log("🌍 Node environment:", process.env.NODE_ENV || "not set");
console.log("☁️ Vercel environment:", process.env.VERCEL || "not set");

// Check if files exist
const checkPaths = [
  "./components/mdx/callout.tsx",
  "./components/mdx/callout.js",
  "./mdx-components.tsx",
  "./tsconfig.json",
];

console.log("\n📋 File existence check:");
checkPaths.forEach((filePath) => {
  const exists = fs.existsSync(path.resolve(filePath));
  console.log(
    `${exists ? "✅" : "❌"} ${filePath}: ${exists ? "exists" : "missing"}`,
  );
});

// Test module resolution
console.log("\n🔧 Module resolution test:");
try {
  const tsConfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf8"));
  console.log("✅ tsconfig.json paths:", tsConfig.compilerOptions?.paths);

  // Test the actual path resolution
  const Module = require("node:module");
  const originalResolveFilename = Module._resolveFilename;

  Module._resolveFilename = function (request, parent, isMain) {
    if (request.startsWith("@/")) {
      console.log(`🔍 Resolving: ${request} from ${parent.filename}`);
    }
    return originalResolveFilename.call(this, request, parent, isMain);
  };
} catch (error) {
  console.log("❌ Error reading tsconfig:", error.message);
}

// List actual directory contents
console.log("\n📂 Components directory structure:");
try {
  const listDir = (dir, prefix = "") => {
    const items = fs.readdirSync(dir);
    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        console.log(`${prefix}📁 ${item}/`);
        if (prefix.length < 4) {
          // Limit depth
          listDir(fullPath, `${prefix}  `);
        }
      } else {
        console.log(`${prefix}📄 ${item}`);
      }
    });
  };

  listDir("./components");
} catch (error) {
  console.log("❌ Error listing components:", error.message);
}
