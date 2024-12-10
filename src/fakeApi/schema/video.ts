export interface VideoChunk {
  videoId: string;
  chunkIndex: number;
  data: Uint8Array;
}

export interface Video {
  id: string;
  name: string;
  size: number;
  type: string;
  blob?: Blob | null;
  chunks: number;
  uploadedChunks: number;
  status: 'uploading' | 'completed';
  url?: string;
  thumbnail?: string;
}
