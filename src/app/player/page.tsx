"use client";

import { useEffect, useRef, useState } from "react";
import collectionData from "../data.json";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { NavBar } from "~/components/custom/nav-bar";
import {
  getCurrentEpisodeWatchTime,
  setContinueWatchData,
  setGlobalWatchData,
} from "../watchData";

export default function Page() {
  const [seriesData, setSeriesData] = useState(
    null as {
      title: string;
      description: string;
      ageRating: number;
      thumbnail: string;
      tags: string[];
      internetArchiveUrl: string;
      seasons: Record<
        string,
        Record<
          string,
          {
            title: string;
            releaseDate: string;
            description: string;
          }
        >
      >;
    } | null,
  );
  const [epNum, setEpNum] = useState(null as string | null);
  const [seNum, setSeNum] = useState(null as string | null);

  const [updateVideo, setUpdateVideo] = useState(1);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    // @ts-expect-error uhh
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSeriesData(collectionData[queryParameters.get("series") ?? ""] ?? null);
    setEpNum(queryParameters.get("episode") ?? null);
    setSeNum(queryParameters.get("season") ?? null);
  }, [updateVideo]);

  function VideoElement() {
    const videoPlayerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
      const videoInterval = setInterval(() => {
        // @ts-expect-error uhh
        const videoTime = videoPlayerRef.current?.currentTime as number;

        if (videoTime != currentTime) {
          setCurrentTime(videoTime);
          setContinueWatchData({
            title: seriesData?.title ?? "",
            time: videoTime,
            data: {
              episode: epNum ?? "",
              season: seNum ?? "",
              timeIn: videoTime,
            },
          });
          setGlobalWatchData({
            videoUrl:
              seriesData?.internetArchiveUrl +
              `s${seNum}/${Number(epNum) < 10 ? 0 : ""}${epNum} - s${seNum}e${epNum}.mp4`,
            time: videoTime,
          });
          console.log(videoTime);
        }
      }, 1000);

      return () => {
        clearInterval(videoInterval);
      };
    }, [currentTime, setCurrentTime]);
    useEffect(() => {
      const videoWatchtime = getCurrentEpisodeWatchTime(
        `${seriesData?.internetArchiveUrl}s${seNum}/${Number(epNum) < 10 ? "0" : ""}${epNum} - s${seNum}e${epNum}.mp4`,
      );
      if (videoPlayerRef.current) {
        // @ts-expect-error uhh
        videoPlayerRef.current.currentTime = videoWatchtime;
      }
    }, []);
    return (
      <video
        className="max-h-[80vh] w-full"
        controls
        ref={videoPlayerRef}
        src={
          seriesData?.internetArchiveUrl +
          `s${seNum}/${Number(epNum) < 10 ? 0 : ""}${epNum} - s${seNum}e${epNum}.mp4`
        }
      ></video>
    );
  }

  return (
    <div>
      <NavBar />
      <VideoElement />
      <div className="flex flex-row flex-wrap gap-12 p-4">
        {seriesData &&
          Object.keys(seriesData?.seasons)?.map((seasonKey) => (
            <div key={seasonKey} className="flex flex-col gap-2">
              <div>{seasonKey.replace("s", "Season ")}</div>
              <div className="flex flex-row flex-wrap gap-4">
                {/* @ts-expect-error uhh */}
                {Object.keys(seriesData?.seasons[seasonKey]).map(
                  (episodeKey) => (
                    <Link
                      key={episodeKey}
                      href={`/player?series=${seriesData.title}&episode=${episodeKey.split("e")[1]}&season=${seasonKey.split("s")[1]}`}
                      onClick={() => {
                        // @ts-expect-error uhh
                        setEpNum(episodeKey.split("e")[1]); // Update episode number
                        // @ts-expect-error uhh
                        setSeNum(seasonKey.split("s")[1]); // Update season number
                        setTimeout(() => {
                          setUpdateVideo((prev) => prev + 1); // Update video state
                        }, 100);
                      }}
                      className="h-fit w-fit flex-grow"
                    >
                      <Button
                        className="flex h-full w-full flex-col items-start rounded-md p-4"
                        variant={
                          epNum == episodeKey.split("e")[1] &&
                          seNum == seasonKey.split("s")[1]
                            ? "secondary"
                            : "outline"
                        }
                      >
                        <div className="text-base">
                          {/* @ts-expect-error uhh */}
                          {seriesData?.seasons[seasonKey][episodeKey]?.title}
                        </div>
                        <div className="flex w-full flex-row justify-between gap-4">
                          <div className="text-xs font-thin">
                            {episodeKey.replace("e", "Episode ")}
                          </div>
                          <div className="text-xs font-thin opacity-50">
                            {
                              /* @ts-expect-error uhh */
                              seriesData?.seasons[seasonKey][episodeKey]
                                ?.releaseDate
                            }
                          </div>
                        </div>
                      </Button>
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
