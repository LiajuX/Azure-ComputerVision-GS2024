/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { computerVision, isConfigured as ComputerVisionIsConfigured } from '../services/azureCognitiveServices';

import { ApiResponse } from '@/types/ApiResponse';
 
export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [fileSelected, setFileSelected] = useState('');
  const [analysis, setAnalysis] = useState<ApiResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isComputerVisionConfigured = ComputerVisionIsConfigured();

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileSelected(e.target.value);
  } 

  function onFileUrlEntered() {
    setIsProcessing(true);
    setAnalysis(null);

    computerVision(fileSelected || undefined).then((item: ApiResponse) => {
      setAnalysis(item);
      setFileSelected('');
      setIsProcessing(false);
    });
  }

  useEffect(() => {
    if (isComputerVisionConfigured) {
      setIsReady(true);
    }
  }, [isComputerVisionConfigured]);
  
  if (!isReady) {
    return null;
  }
  
  return (
    <div className="bg-zinc-950 h-auto min-h-screen pb-16">
      <header className="flex justify-between items-center px-28 py-6 border-b border-b-zinc-900 bg-zinc-950">
        <Image src="/assets/green-energy-logo.svg" alt="" width={86} height={32} />
        <Image src="/assets/gs-logo.svg" alt="" width={120} height={16} />
      </header>
      
      <main className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-green-400 text-lg font-semibold drop-shadow-green">
          CENTRAL DE VISÃO COMPUTACIONAL
        </h1>
          
        {!isProcessing ? (
          <>
            <p className="mt-2 text-sm text-zinc-300">
              Analise as imagens enviadas pelos nossos pontos de monitoramento 
            </p>

            <input
              id="urlInput"
              type="text"
              placeholder="Digite a URL ou deixe vazio para analisar uma imagem padrão"
              size={70}
              onChange={handleUrlChange}
              className="h-10 my-6 border border-zinc-800 px-4 rounded-lg bg-zinc-900 text-sm text-zinc-500 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-green-400"
            />

            <button onClick={onFileUrlEntered} className="h-10 bg-gradient-to-r from-green-300 to-emerald-500 drop-shadow-green px-4 py-2 rounded-lg text-sm text-zinc-950 font-semibold">
              Analisar
            </button>
          </>
        ) : (
          <p className="mt-2 text-sm text-green-100">Analisando imagem...</p>
        )}

        {analysis && 
          <div className="flex flex-col w-full mt-10 px-28">
            <h2 className="mb-2 text-green-300 text-lg font-semibold drop-shadow-green">
              Resultados da Análise:
            </h2>

            <p className="mb-8 text-sm text-zinc-300">
              <strong>Descrição (EN-US):</strong> {analysis?.description?.captions?.[0]?.text}
            </p>

            <div className="grid grid-cols-2 gap-12 h-auto mx-auto mt-4">
              <img
                src={analysis.URL}
                className="h-80 rounded-lg object-cover object-center"
                alt={
                  analysis?.description?.captions?.[0]?.text || "Can't find caption"
                }
              />

              {analysis && (
                <div className="h-80 p-4 border-2 border-dashed border-zinc-900 rounded-lg bg-zinc-950">
                  <pre className="h-72 overflow-auto whitespace-pre-wrap break-words text-zinc-600">
                    {JSON.stringify(analysis, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <p className="my-4 text-green-300 text-sm font-semibold">
              Tags Identificadas:
            </p>

            <div className="flex flex-wrap gap-2">
              {analysis?.description?.tags.map((tag, index) => (
                <div
                  key={index}
                  className="p-2 bg-zinc-900 text-zinc-300 rounded-lg text-sm"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        }
      </main>
    </div>
  );
}
 