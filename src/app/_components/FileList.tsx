import { Video } from "@/fakeApi/schema/video"
import { CircularProgressbar } from "react-circular-progressbar"

interface FileListProps {
  imageThumb: string
  file: Video
  progress: number
}

export function FileList({ imageThumb, file, progress }: FileListProps) {
  return (
    <div className="w-full h-[84px] flex p-2 border border-violet-200 rounded-xl">
      <img src={imageThumb} alt="thumbs" className="size-[64px] rounded-[8px] overflow-hidden object-cover" />
      <div className="ml-3 flex flex-col gap-1 flex-1">
        <span className="text-xl font-semibold text-zinc-600 truncate">{file.name}</span>
        <div className="flex gap-3">
          <span className="text-sm font-normal text-zinc-500">{(file.size / 100 / 100 / 100).toFixed(2)} MB</span>
          <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14.3844 4.40873L11.5913 1.61623C11.3568 1.38189 11.039 1.25024 10.7075 1.25024C10.376 1.25024 10.0582 1.38189 9.82375 1.61623L2.11625 9.3231C1.99978 9.43886 1.90744 9.57658 1.84457 9.72828C1.7817 9.87998 1.74956 10.0426 1.75 10.2069V13C1.75 13.3315 1.8817 13.6494 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H13.5C13.6989 14.25 13.8897 14.171 14.0303 14.0303C14.171 13.8897 14.25 13.6989 14.25 13.5C14.25 13.3011 14.171 13.1103 14.0303 12.9696C13.8897 12.829 13.6989 12.75 13.5 12.75H7.8125L14.3844 6.17685C14.5005 6.06077 14.5926 5.92295 14.6555 5.77126C14.7183 5.61957 14.7507 5.45698 14.7507 5.29279C14.7507 5.12859 14.7183 4.96601 14.6555 4.81432C14.5926 4.66263 14.5005 4.52481 14.3844 4.40873ZM5.6875 12.75H3.25V10.3125L8.5 5.06248L10.9375 7.49998L5.6875 12.75ZM12 6.43748L9.5625 3.99998L10.7088 2.85373L13.1463 5.29123L12 6.43748Z" fill="#71717A" />
            </svg>

            <span className="text-sm font-normal text-zinc-500">Edit name</span>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <CircularProgressbar
          value={progress}
          styles={{
            root: { width: 40, flex: 1, },
            path: {
              stroke: '#7159c1',
            },
            trail: {
              stroke: '#A9A9A9',
            },
            text: {
              fill: '#000',
              fontSize: '12px',
              dominantBaseline: 'central',
              textAnchor: 'middle',
            },
          }

          }
          strokeWidth={14}
          className="mt-2"
        />
      </div>
    </div>
  )
}