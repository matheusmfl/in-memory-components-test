'use client'

import React, { useState, useMemo } from 'react'


import { InMemoryApiVideo } from '@/fakeApi/videos/fakeApiVideo'
import { Video } from '@/fakeApi/schema/video'

import { FileList } from './FileList'
import { ProgressBar } from './ProgressBar'
import { UploadDropzone } from './Dropzone'


const api = new InMemoryApiVideo()

export default function VideoUploader() {
  const [videos, setVideos] = useState<Video[]>([])
  const [stage, setStage] = useState<boolean>(false)

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

  const handleChangeVideoName = ({ name, videoId }: { name: string; videoId: string }) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? { ...video, name }
          : video
      )
    );
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };


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


  const handleFilesAdded = async (files: File[]) => {
    for (const file of files) {
      const video = api.addVideo(file)
      const thumbnail = await generateThumbnail(file)
      setVideos(prev => [...prev, { ...video, thumbnail }])
      simulateUpload(file, video.id)
    }
  }

  const MemoizedProgressBar = React.memo(ProgressBar);

  const videoProgress = useMemo(() => {
    return videos.map((video) => ({
      ...video,
      progress: uploadProgress.find((p) => p.videoId === video.id)?.progress || 0,
    }));
  }, [videos, uploadProgress]);

  return (
    <>
      <button onClick={() => setStage(false)}>step1</button>
      <button onClick={() => setStage(true)}>step2</button>


      {stage ? (
        <div className="p-4 flex flex-col gap-10">


          <UploadDropzone onFilesAdded={handleFilesAdded} />

          <div className="space-y-4">
            {videos.map((video) => (

              <FileList handleDelete={handleDeleteVideo} progress={videoProgress.find((CurrentVideo) => CurrentVideo.id === video.id)?.progress ?? 0} handleChangeVideoName={handleChangeVideoName} key={video.id} file={video} imageThumb={video.thumbnail ?? ''}  >
                <MemoizedProgressBar progress={videoProgress.find((CurrentVideo) => CurrentVideo.id === video.id)?.progress ?? 0} />
              </FileList>
            ))}
          </div>
        </div>
      ) : (
        <div>Tabs metadata</div>
      )}

    </>

  )
}

