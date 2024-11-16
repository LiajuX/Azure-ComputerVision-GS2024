import { AnalyzeResults } from '@azure/cognitiveservices-computervision/esm/models';

export interface ApiResponse {
  URL?: string;
  categories?: Category[];
  adult?: AdultContent;
  color?: ColorInfo;
  imageType?: ImageType;
  tags?: Tag[];
  description?: Description;
  faces?: Face[];
  objects?: DetectedObject[];
  brands?: Brand[];
  requestId?: string;
  metadata?: Metadata;
  modelVersion?: string;
  text?: AnalyzeResults | undefined;
}

interface Category {
  name: string;
  score: number;
  detail?: {
    landmarks?: Landmark[];
  };
}

interface Landmark {
  name: string;
  confidence: number;
}

interface AdultContent {
  isAdultContent: boolean;
  isRacyContent: boolean;
  isGoryContent?: boolean;
  adultScore: number;
  racyScore: number;
  goreScore?: number;
}

interface ColorInfo {
  dominantColorForeground: string;
  dominantColorBackground: string;
  dominantColors: string[];
  accentColor: string;
  isBWImg: boolean;
}

interface ImageType {
  clipArtType: number;
  lineDrawingType: number;
}

interface Tag {
  name: string;
  confidence: number;
}

interface Description {
  tags: string[];
  captions: Caption[];
}

interface Caption {
  text: string;
  confidence: number;
}

interface Face {
  faceRectangle: Rectangle;
}

interface Rectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface DetectedObject {
  rectangle: Rectangle;
  object: string;
  confidence: number;
  parent?: ParentObject;
}

interface ParentObject {
  object: string;
  confidence: number;
}

interface Brand {
  name: string;
  confidence: number;
  rectangle: Rectangle;
}

interface Metadata {
  width: number;
  height: number;
  format: string;
}
