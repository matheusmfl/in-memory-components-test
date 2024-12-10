'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"

import { InMemoryApiVideo } from '@/fakeApi/videos/fakeApiVideo'
import { Video } from '@/fakeApi/schema/video'

import { FileList } from './FileList'


const api = new InMemoryApiVideo()

export default function VideoUploader() {
  const [videos, setVideos] = useState<Video[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState<{ videoId: string; progress: number }[]>([]);

  const generateThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = () => {
        video.currentTime = 1
      }
      video.onseeked = () => {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL())
      }
      video.src = URL.createObjectURL(file)
    })
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const video = api.addVideo(file)
        const thumbnail = await generateThumbnail(file)
        setVideos(prev => [...prev, { ...video, thumbnail }])
        simulateUpload(file, video.id)
      }
    }
  }

  const simulateUpload = async (file: File, videoId: string) => {
    const chunkSize = 1024 * 1024 // 1MB chunks
    const chunks = Math.ceil(file.size / chunkSize)

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize
      const end = Math.min(file.size, start + chunkSize)
      const chunk = file.slice(start, end)

      await api.uploadVideoChunk(videoId, await chunk.arrayBuffer(), i)

      setVideos(prev =>
        prev.map(v =>
          v.id === videoId
            ? { ...v, uploadedChunks: i + 1 }
            : v
        )
      )

      const progress = Math.round(((i + 1) / chunks) * 100);
      setUploadProgress((prev) => {
        const index = prev.findIndex((p) => p.videoId === videoId);
        if (index !== -1) {
          // Update existing entry
          const updated = [...prev];
          updated[index] = { ...updated[index], progress };
          return updated;
        } else {

          return [...prev, { videoId, progress }];
        }
      });
    }

    const completedVideo = await api.completeUpload(videoId)
    if (completedVideo) {
      setVideos(prev =>
        prev.map(v =>
          v.id === videoId
            ? { ...v, status: 'completed', blob: completedVideo }
            : v
        )
      )
    }
  }

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className="p-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        multiple
        className="hidden"
      />
      <Button onClick={handleUploadClick} className="mb-4">Selecionar Vídeos</Button>

      <div className="space-y-4">
        {videos.map((video) => (
          // <div key={video.id} className="border p-4 rounded-lg">
          //   <div className="flex items-center space-x-4">
          //     {video.thumbnail && (
          //       <img src={video.thumbnail} alt="Thumbnail" className="w-24 h-24 object-cover rounded" />
          //     )}
          //     <div className="flex-1">
          //       <h3 className="font-semibold">{video.name}</h3>
          //       <p className="text-sm text-gray-500">{Math.round(video.size / 1024 / 1024 * 100) / 100} MB</p>
          //       <div className='w-[40px] h-[40px]'>

          //         <CircularProgressbar

          //           value={uploadProgress.find((p) => p.videoId === video.id)?.progress || 0}
          //           text={uploadProgress.find((p) => p.videoId === video.id)?.progress.toString() || '0'}
          //           styles={{
          //             root: { width: 40, flex: 1, },
          //             path: {
          //               stroke: '#7159c1',
          //             },
          //             trail: {
          //               stroke: '#A9A9A9',
          //             },
          //             text: {
          //               fill: '#000',
          //               fontSize: '12px',
          //               dominantBaseline: 'central',
          //               textAnchor: 'middle',
          //             },
          //           }

          //           }
          //           strokeWidth={14}
          //           className="mt-2"
          //         />
          //       </div>
          //       <p className="text-sm mt-1">
          //         {video.status === 'completed'
          //           ? 'Upload completo'
          //           : `${video.uploadedChunks} de ${video.chunks} chunks enviados`
          //         }

          //         teste : {uploadProgress.find((p) => p.videoId === video.id)?.progress || 0}
          //       </p>
          //     </div>
          //   </div>
          // </div>
          <FileList key={video.id} file={video} imageThumb={video.thumbnail ?? ''} progress={uploadProgress.find((p) => p.videoId === video.id)?.progress || 0} />
        ))}
      </div>
    </div>
  )
}

