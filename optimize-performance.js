const fs = require('fs');
const path = require('path');

// Функция для рекурсивного поиска файлов
function findFiles(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Пропускаем node_modules, .next, .git
      if (!['node_modules', '.next', '.git'].includes(file)) {
        findFiles(filePath, ext, fileList);
      }
    } else if (file.endsWith(ext)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Функция оптимизации
function optimizeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Замены для оптимизации
  const replacements = [
    // backdrop-blur оптимизация
    { from: /backdrop-blur-xl/g, to: 'backdrop-blur-md' },
    { from: /backdrop-blur-lg/g, to: 'backdrop-blur-sm' },
    { from: /backdrop-blur-md/g, to: '' }, // Убираем полностью
    { from: /backdrop-blur-sm/g, to: '' }, // Убираем полностью
    { from: /backdrop-blur/g, to: '' }, // Убираем полностью
    
    // Убираем двойные пробелы после удаления классов
    { from: /  +/g, to: ' ' },
    { from: /className=" /g, to: 'className="' },
    { from: / "/g, to: '"' },
    
    // Оптимизация transition
    { from: /transition-all duration-300/g, to: 'transition-colors duration-200' },
    { from: /transition-all duration-500/g, to: 'transition-colors duration-200' },
    
    // Убираем тяжёлые тени
    { from: /shadow-2xl/g, to: 'shadow-lg' },
    { from: /shadow-xl/g, to: 'shadow-md' },
  ];
  
  replacements.forEach(({ from, to }) => {
    const newContent = content.replace(from, to);
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Оптимизирован: ${path.relative(process.cwd(), filePath)}`);
    return 1;
  }
  
  return 0;
}

// Основная функция
function main() {
  console.log('🚀 Начинаем глобальную оптимизацию производительности...\n');
  
  const componentsDir = path.join(__dirname, 'components');
  const appDir = path.join(__dirname, 'app');
  
  // Находим все .tsx и .ts файлы
  const files = [
    ...findFiles(componentsDir, '.tsx'),
    ...findFiles(componentsDir, '.ts'),
    ...findFiles(appDir, '.tsx'),
    ...findFiles(appDir, '.ts'),
  ];
  
  console.log(`📁 Найдено файлов: ${files.length}\n`);
  
  let optimizedCount = 0;
  files.forEach(file => {
    optimizedCount += optimizeFile(file);
  });
  
  console.log(`\n✨ Готово! Оптимизировано файлов: ${optimizedCount}/${files.length}`);
  console.log('\n💡 Рекомендация: Перезапустите dev сервер (npm run dev)');
}

main();
