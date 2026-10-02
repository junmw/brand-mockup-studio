export type MediumId = 'billboard' | 'newspaper' | 'social_post' | 'subway_poster' | 'magazine';

export type AspectRatio = '16:9' | '1:1' | '3:4' | '4:3' | '9:16';

export interface MediumDefinition {
  id: MediumId;
  name: string;
  badge: string;
  aspectRatio: AspectRatio;
  description: string;
  environmentPrompt: string;
}

export interface MockupItem {
  id: string;
  mediumId: MediumId;
  mediumName: string;
  aspectRatio: AspectRatio;
  imageUrl: string;
  base64Data?: string;
  mimeType?: string;
  productDescription: string;
  isReference?: boolean;
  createdAt: number;
}

export interface GenerateRequest {
  productDescription: string;
  mediumId: MediumId;
  aspectRatio?: AspectRatio;
  referenceImage?: {
    data: string;
    mimeType: string;
  };
}

export interface GenerateBatchRequest {
  productDescription: string;
  mediumIds?: MediumId[];
}

export interface GenerateResponse {
  item: MockupItem;
}

export interface GenerateBatchResponse {
  items: MockupItem[];
}
