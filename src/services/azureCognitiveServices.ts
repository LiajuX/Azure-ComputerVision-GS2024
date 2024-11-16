/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

import { VisualFeatureTypes } from '@azure/cognitiveservices-computervision/esm/models';

import { randomImageUrl } from '../utils/generateRandomImageUrl';

const key = process.env.NEXT_PUBLIC_AZURE_COMPUTER_VISION_KEY || "";
const endpoint = process.env.NEXT_PUBLIC_AZURE_COMPUTER_VISION_ENDPOINT || "";

const visualFeatures: VisualFeatureTypes[] = [
    "Description",
    //"ImageType",
    //"Faces",
    //"Adult",
    //"Categories",
    //"Color",
    //"Tags",
    //"Objects",
    //"Brands"
];

export function isConfigured() {
  const result = key.length > 0 && endpoint.length > 0;
  console.log(`key = ${key}`);
  console.log(`endpoint = ${endpoint}`);
  console.log(`ComputerVision isConfigured = ${result}`);
  return result;
}

function includesText(tags: { name: string }[]) {
    return tags.some(tag => tag.name.toLowerCase() === 'text');
};

function includesHandwriting(tags: { name: string }[]) {
    return tags.some(tag => tag.name.toLowerCase() === 'handwriting');
};

function wait(timeout: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export async function computerVision(url?: string) {
    if (!isConfigured()) {
        throw new Error('Azure Computer Vision Key and/or Endpoint not configured.');
    }
  
    const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }),
        endpoint
    );
  
    const urlToAnalyze = url || randomImageUrl();
    
    if (!urlToAnalyze) {
        throw new Error('No URL provided for analysis.');
    }
  
    const analysis: any = await computerVisionClient.analyzeImage(urlToAnalyze, { visualFeatures });
  
    if (analysis.tags && (includesText(analysis.tags) || includesHandwriting(analysis.tags))) {
        analysis.text = await readTextFromURL(computerVisionClient, urlToAnalyze);
    }
  
    return { URL: urlToAnalyze, ...analysis };
  }  

async function readTextFromURL(client: ComputerVisionClient, url: string) {
    const result = await client.read(url);
    const operationID = result.operationLocation!.split('/').slice(-1)[0];

    let readResult;

    do {
        await wait(1000);
        readResult = await client.getReadResult(operationID);
    } while (readResult.status !== 'succeeded' && readResult.status !== 'failed');

    if (readResult.status === 'succeeded') {
        return readResult.analyzeResult;
    } else {
        throw new Error('Text extraction failed or timed out.');
    }
};
