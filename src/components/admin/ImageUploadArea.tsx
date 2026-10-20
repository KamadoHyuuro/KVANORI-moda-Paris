import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Star, Link as LinkIcon, Loader2, Plus } from 'lucide-react';
import { optimizeImageFile, formatBytes } from '../../utils/imageOptimizer';

interface ImageUploadAreaProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
  allowUrlFallback?: boolean;
}

export const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  images,
  onChange,
  maxImages = 8,
  label = 'Galeria de Imagens da Peça',
  allowUrlFallback = true,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      setUploadError('Por favor, selecione arquivos de imagem válidos (JPG, PNG, WEBP).');
      return;
    }

    if (images.length + fileArray.length > maxImages) {
      setUploadError(`Você pode adicionar no máximo ${maxImages} fotos por produto.`);
      return;
    }

    setUploadError(null);
    setIsProcessing(true);

    const newOptimizedImages: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setProcessingStatus(`Processando foto ${i + 1} de ${fileArray.length}: ${file.name} (${formatBytes(file.size)})...`);
      try {
        const result = await optimizeImageFile(file, 1000, 1000, 0.80);
        
        // Tentativa de salvar diretamente no backend para URL leve e persistência permanente
        let finalImageUrl = result.dataUrl;
        try {
          const uploadRes = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name,
              dataUrl: result.dataUrl
            })
          });

          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            if (uploadData.url) {
              finalImageUrl = uploadData.url;
            }
          }
        } catch (uploadErr) {
          console.warn('Upload no servidor indisponível, fallback local ativo:', uploadErr);
        }

        newOptimizedImages.push(finalImageUrl);
      } catch (err) {
        console.error('Erro ao otimizar foto:', err);
        setUploadError(`Erro ao processar imagem "${file.name}".`);
      }
    }

    if (newOptimizedImages.length > 0) {
      onChange([...images, ...newOptimizedImages]);
    }

    setIsProcessing(false);
    setProcessingStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, idx) => idx !== index));
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const target = images[index];
    const filtered = images.filter((_, idx) => idx !== index);
    onChange([target, ...filtered]);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    if (images.length >= maxImages) {
      setUploadError(`Limite de ${maxImages} imagens atingido.`);
      return;
    }
    onChange([...images, urlInput.trim()]);
    setUrlInput('');
    setUploadError(null);
  };

  return (
    <div className="border border-[#E8E1D5] p-5 bg-[#FAF8F5]/70 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#181716] uppercase tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#6B1D2F]" />
          <span>{label} ({images.length}/{maxImages})</span>
        </span>

        {images.length > 0 && (
          <span className="text-[11px] text-[#7A746B] italic font-serif">
            A 1ª imagem é a foto de capa do produto
          </span>
        )}
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-200 select-none ${
          isDragging
            ? 'border-[#6B1D2F] bg-[#FAF3F0] scale-[0.99]'
            : 'border-[#D8CEBC] hover:border-[#6B1D2F] bg-white hover:bg-[#FAF8F5]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#F4EFE6] text-[#6B1D2F] flex items-center justify-center">
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-[#181716]">
              {isProcessing
                ? 'Processando e otimizando fotos...'
                : 'Clique para fazer upload ou arraste suas fotos aqui'}
            </p>
            <p className="text-xs text-[#7A7367] mt-0.5">
              Suporta JPG, PNG, WEBP, GIF · Múltiplos arquivos permitidos
            </p>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="mt-1 px-4 py-2 bg-[#181716] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#6B1D2F] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Selecionar Fotos do Dispositivo</span>
          </button>
        </div>
      </div>

      {/* Processing Status Banner */}
      {isProcessing && processingStatus && (
        <div className="p-3 bg-[#FAF3F0] border border-[#EACEC8] text-[#6B1D2F] text-xs flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>{processingStatus}</span>
        </div>
      )}

      {/* Error Feedback */}
      {uploadError && (
        <div className="p-3 bg-[#FDF0EE] border border-[#F5C2BC] text-[#6B1D2F] text-xs">
          {uploadError}
        </div>
      )}

      {/* Image Gallery Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#7A746B] font-medium block">
            Fotos Carregadas ({images.length})
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`relative group border p-1 bg-white transition-all ${
                  idx === 0
                    ? 'border-[#6B1D2F] ring-1 ring-[#6B1D2F]/40 shadow-xs'
                    : 'border-[#E8E1D5] hover:border-[#181716]'
                }`}
              >
                {/* Badge capa */}
                {idx === 0 && (
                  <div className="absolute top-2 left-2 z-10 bg-[#6B1D2F] text-white text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 shadow-sm flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>Capa</span>
                  </div>
                )}

                {/* Thumbnail */}
                <div className="w-full h-28 bg-[#F4EFE6] overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Foto ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Action buttons */}
                <div className="mt-1.5 flex items-center justify-between text-[10px]">
                  <span className="text-[#8C8476] font-mono">
                    Foto 0{idx + 1}
                  </span>

                  <div className="flex items-center gap-1">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(idx)}
                        className="p-1 text-[#5E584E] hover:text-[#6B1D2F] hover:bg-[#FAF3F0] rounded cursor-pointer"
                        title="Definir como foto de capa (principal)"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                      title="Excluir foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional fallback to paste URL */}
      {allowUrlFallback && (
        <div className="pt-2 border-t border-[#E8E1D5]/70">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-[#7A746B] hover:text-[#181716] flex items-center gap-1.5 cursor-pointer underline decoration-dotted"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Ocultar inserção por link' : 'Também tenho um link de imagem externo'}</span>
          </button>

          {showUrlInput && (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="p-2 text-xs bg-white border border-[#E8E1D5] flex-1 focus:outline-none focus:border-[#6B1D2F]"
              />
              <button
                type="button"
                onClick={handleAddUrl}
                className="px-3 py-2 bg-[#181716] text-white text-xs font-semibold cursor-pointer hover:bg-black whitespace-nowrap"
              >
                + Adicionar Link
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
