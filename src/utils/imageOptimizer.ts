/**
 * Utilitário de processamento e otimização de imagens para o catálogo KVANORI.
 * Redimensiona e comprime imagens carregadas do computador/celular para formatos
 * leves (WebP/JPEG), garantindo carregamento ultrarrápido e persistência segura no Firestore.
 */

export async function optimizeImageFile(
  file: File,
  maxWidth = 1000,
  maxHeight = 1000,
  quality = 0.80
): Promise<{ dataUrl: string; originalSize: number; optimizedSize: number; name: string }> {
  return new Promise((resolve, reject) => {
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return reject(new Error('O arquivo selecionado não é uma imagem válida.'));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo de imagem.'));
    };

    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        return reject(new Error('Falha ao processar arquivo.'));
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Falha ao carregar a imagem na memória.'));
      
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calcular proporções
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback para o dataUrl original se o canvas falhar
          return resolve({
            dataUrl: rawDataUrl,
            originalSize: file.size,
            optimizedSize: Math.round(rawDataUrl.length * 0.75),
            name: file.name
          });
        }

        // Suavização de alta fidelidade
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Tentar exportar como WebP, senão JPEG
        let optimizedDataUrl: string;
        try {
          optimizedDataUrl = canvas.toDataURL('image/webp', quality);
          if (!optimizedDataUrl.startsWith('data:image/webp')) {
            optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const approxOptimizedBytes = Math.round(optimizedDataUrl.length * 0.75);

        resolve({
          dataUrl: optimizedDataUrl,
          originalSize: file.size,
          optimizedSize: approxOptimizedBytes,
          name: file.name
        });
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Formata tamanho em bytes para leitura humana (ex: 240 KB, 1.2 MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
