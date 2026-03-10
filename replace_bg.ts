import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace CTA section background
  content = content.replace(
    /<section className="py-32 px-6 bg-gradient-to-b from-black to-\[#111\] text-center border-t border-white\/10">/g,
    '<section className="py-32 px-6 text-center border-t border-white/10 relative overflow-hidden">\n        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-[-1]"></div>'
  );

  // Replace bg-black with nothing or transparent if it's a section
  content = content.replace(
    /<section className="py-32 px-6 bg-black">/g,
    '<section className="py-32 px-6">'
  );
  
  content = content.replace(
    /<section className="py-32 px-6 bg-\[#0a0a0a\]">/g,
    '<section className="py-32 px-6">'
  );

  fs.writeFileSync(filePath, content);
}
console.log('Done replacing backgrounds');
