/**
 * Утилита для чтения .docx файлов в браузере
 * Использует встроенный API для работы с ZIP архивами
 */

export async function readDocxFile(file: File): Promise<string> {
  try {
    // Используем JSZip для чтения .docx файла
    const JSZip = (await import('jszip')).default;
    
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    
    // Извлекаем document.xml из архива
    const documentXml = await zip.file('word/document.xml')?.async('text');
    
    if (!documentXml) {
      throw new Error('Не найден document.xml в файле');
    }
    
    // Извлекаем текст из XML
    const text = extractTextFromXml(documentXml);
    return text;
  } catch (error) {
    console.error('Ошибка чтения .docx файла:', error);
    // Fallback: пытаемся прочитать как обычный текст
    try {
      return await file.text();
    } catch {
      throw new Error('Не удалось прочитать .docx файл. Попробуйте сохранить как .txt');
    }
  }
}

function extractTextFromXml(xmlContent: string): string {
  try {
    // Ищем текстовое содержимое между XML тегами <w:t>
    const textMatches = xmlContent.match(/<w:t[^>]*>([^<]+)<\/w:t>/g);
    
    if (textMatches) {
      const extractedText = textMatches
        .map(match => {
          const textMatch = match.match(/>([^<]+)</);
          return textMatch ? textMatch[1] : '';
        })
        .join(' ');
      
      return extractedText;
    }
    
    // Если не удалось извлечь через <w:t>, пробуем извлечь весь текст
    const allText = xmlContent.replace(/<w:t[^>]*>/g, '').replace(/<\/w:t>/g, ' ');
    
    // Fallback: убираем все XML теги
    return xmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
  } catch (error) {
    console.error('Ошибка извлечения текста из XML:', error);
    return xmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
}

/**
 * Универсальная функция для чтения файла (поддерживает .txt и .docx)
 */
export async function readReportFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  if (extension === 'txt') {
    return await file.text();
  } else if (extension === 'docx' || extension === 'doc') {
    return await readDocxFile(file);
  } else {
    throw new Error('Неподдерживаемый формат файла. Используйте .txt или .docx');
  }
}
