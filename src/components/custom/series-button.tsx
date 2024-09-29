"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Badge } from "~/components/ui/badge";

export function SeriesButton({
  seriesData,
  timingData,
}: {
  seriesData: {
    isVideo?: boolean;
    title: string;
    episodeCount?: number;
    thumbnail: string;
    tags?: string[];
    timestamp?: number;
    description?: string;
  };
  timingData?: {
    season: number;
    episode: number;
  };
}) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      // @ts-expect-error uhh
      videoRef.current.currentTime = seriesData?.timestamp ?? 0;
    }
  });
  if (seriesData.isVideo == true) {
    return (
      <Link
        href={`/player?series=${seriesData.title}&episode=${timingData?.episode ?? 1}&season=${timingData?.season ?? 1}`}
        className="h-fit w-fit"
      >
        <div className="h-fit min-h-96 w-[24rem] rounded-md border opacity-75 transition-all hover:opacity-100">
          <video src={seriesData.thumbnail} ref={videoRef}></video>
          <div className="flex h-fit w-full flex-col justify-between gap-2 rounded-b-md p-4">
            <div className="text-lg">{seriesData.title}</div>
            <div className="text-sm font-thin">{seriesData.description}</div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link
        href={`/player?series=${seriesData.title}&episode=${timingData?.episode ?? 1}&season=${timingData?.season ?? 1}`}
      >
        <div className="h-[32rem] w-64 rounded-md border opacity-75 transition-all hover:opacity-100">
          <img
            src={seriesData.thumbnail}
            alt={seriesData.title}
            className="h-96 w-64 rounded-t-md"
          />
          <div className="flex h-[8rem] w-full flex-col justify-between gap-2 rounded-b-md p-4">
            <div className="text-sm">{seriesData.title}</div>
            {seriesData.tags && (
              <div className="h-fit">
                {seriesData.tags.map((tag) => (
                  <Badge variant="outline" className="text-[0.6rem]" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }
}
