/**
 * סקריפט לחיפוש קבצים לפי תבנית שם או תוכן (ESM Version - Fixed)
 * 
 * הוראות הרצה:
 * 1. התקן חבילות נדרשות: npm install fs-extra path glob
 * 2. הרץ את הסקריפט עם פרמטרים: 
 *    - חיפוש לפי שם: node find-files.js --name "pattern"
 *    - חיפוש לפי תוכן: node find-files.js --content "pattern"
 *    - חיפוש לפי סוג קובץ: node find-files.js --ext ".jsx"
 */

import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob'; // תיקון היבוא של glob
import { fileURLToPath } from 'url';

// הגדרת נתיב התחלתי
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, 'src');
const OUTPUT_FILE = path.join(__dirname, 'search-results.md');

// ניתוח פרמטרים מהפקודה
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i += 2) {
  if (args[i].startsWith('--')) {
    params[args[i].substring(2)] = args[i + 1];
  }
}

// בדיקת פרמטרים
if (!params.name && !params.content && !params.ext) {
  console.error('יש לציין לפחות פרמטר אחד לחיפוש: --name, --content או --ext');
  process.exit(1);
}

/**
 * פונקציה לחיפוש בתוכן הקובץ
 */
async function searchInFileContent(filePath, pattern) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    if (content.includes(pattern)) {
      const lines = content.split('\n');
      const matchingLines = [];
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(pattern)) {
          matchingLines.push({
            lineNum: i + 1,
            text: lines[i].trim()
          });
        }
      }
      
      return {
        path: filePath,
        matches: matchingLines
      };
    }
    
    return null;
  } catch (err) {
    console.warn(`שגיאה בקריאת קובץ ${filePath}:`, err.message);
    return null;
  }
}

/**
 * פונקציה ראשית לחיפוש קבצים
 */
async function findFiles() {
  try {
    console.log('מתחיל חיפוש...');
    
    let searchPattern = '**/*';
    if (params.ext) {
      searchPattern += params.ext;
    }
    
    // שימוש בגלוב מעודכן
    const files = await glob(path.join(ROOT_DIR, searchPattern));
    const results = {
      searchParams: params,
      totalFiles: files.length,
      matchingFiles: []
    };
    
    // בדיקה לפי שם
    if (params.name) {
      const namePattern = new RegExp(params.name, 'i');
      const nameMatches = files.filter(file => namePattern.test(path.basename(file)));
      
      for (const file of nameMatches) {
        results.matchingFiles.push({
          path: file,
          matchType: 'name',
          relativePath: path.relative(ROOT_DIR, file)
        });
      }
    }
    
    // בדיקה לפי תוכן
    if (params.content) {
      console.log(`בודק תוכן קבצים (${files.length} קבצים)...`);
      
      const contentMatches = [];
      let counter = 0;
      
      for (const file of files) {
        counter++;
        if (counter % 100 === 0) {
          console.log(`נבדקו ${counter} קבצים מתוך ${files.length}...`);
        }
        
        const result = await searchInFileContent(file, params.content);
        if (result) {
          contentMatches.push({
            path: result.path,
            matchType: 'content',
            relativePath: path.relative(ROOT_DIR, result.path),
            matches: result.matches
          });
        }
      }
      
      results.matchingFiles = [...results.matchingFiles, ...contentMatches];
    }
    
    // סידור התוצאות - ייחודיות ומיון
    results.matchingFiles = Array.from(new Set(results.matchingFiles.map(f => JSON.stringify(f))))
      .map(str => JSON.parse(str))
      .sort((a, b) => a.relativePath.localeCompare(b.relativePath));
    
    results.totalMatches = results.matchingFiles.length;
    
    // יצירת דוח מרקדאון
    let report = `# תוצאות חיפוש\n\n`;
    report += `## פרמטרי חיפוש\n`;
    if (params.name) report += `- **שם**: ${params.name}\n`;
    if (params.content) report += `- **תוכן**: ${params.content}\n`;
    if (params.ext) report += `- **סיומת**: ${params.ext}\n`;
    
    report += `\n## סיכום\n`;
    report += `- נבדקו: ${results.totalFiles} קבצים\n`;
    report += `- נמצאו: ${results.totalMatches} התאמות\n\n`;
    
    report += `## קבצים תואמים\n\n`;
    
    for (const file of results.matchingFiles) {
      report += `### ${file.relativePath}\n`;
      report += `- סוג התאמה: ${file.matchType === 'name' ? 'שם קובץ' : 'תוכן'}\n`;
      report += `- נתיב מלא: ${file.path}\n`;
      
      if (file.matchType === 'content' && file.matches) {
        report += `- שורות תואמות:\n`;
        for (const match of file.matches.slice(0, 5)) {
          report += `  - שורה ${match.lineNum}: \`${match.text}\`\n`;
        }
        if (file.matches.length > 5) {
          report += `  - ... ועוד ${file.matches.length - 5} התאמות\n`;
        }
      }
      
      report += `\n`;
    }
    
    // שמירת התוצאות לקובץ
    await fs.writeFile(OUTPUT_FILE, report);
    
    console.log(`החיפוש הסתיים בהצלחה! נמצאו ${results.totalMatches} קבצים תואמים.`);
    console.log(`תוצאות מלאות נשמרו בקובץ: ${OUTPUT_FILE}`);
    
    return results;
  } catch (err) {
    console.error('שגיאה בחיפוש:', err);
    throw err;
  }
}

// הרצת הסקריפט
findFiles().catch(err => {
  console.error('שגיאה בהרצת הסקריפט:', err);
});