"use client";

import { NavBar } from "~/components/custom/nav-bar";
import collectionData from "./data.json";
import { SeriesButton } from "~/components/custom/series-button";
import { getContinueWatchData } from "./watchData";

export default function Page() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-col gap-8 p-4">
        <div className="text-3xl">Continue Watching</div>
        <div className="flex flex-row flex-wrap items-center justify-evenly gap-4">
          {getContinueWatchData().map(
            (currentSeriesData: {
              title: string;
              time: number;
              data: { episode: string; season: string; timeIn: number };
            }) => (
              <SeriesButton
                key={currentSeriesData.title}
                seriesData={{
                  title: currentSeriesData.title,
                  isVideo: true,
                  // @ts-expect-error uhh
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  thumbnail: `${collectionData[currentSeriesData.title].internetArchiveUrl}s${currentSeriesData.data.season}/${Number(currentSeriesData.data.episode) < 10 ? 0 : ""}${currentSeriesData.data.episode} - s${currentSeriesData.data.season}e${currentSeriesData.data.episode}.mp4`,
                  timestamp: currentSeriesData.time,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  description:
                    // @ts-expect-error uhh
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    collectionData[currentSeriesData.title].seasons[
                      `s${currentSeriesData.data.season}`
                    ][`e${currentSeriesData.data.episode}`].description,
                }}
                timingData={{
                  episode: Number(
                    currentSeriesData.data.episode.replace("e", ""),
                  ),
                  season: Number(
                    currentSeriesData.data.season.replace("s", ""),
                  ),
                }}
              />
            ),
          )}
        </div>
      </div>

      {/*
      <div className="flex flex-col">
        <div>Saved List</div>
        <div>...</div>
      </div>

      <div className="flex flex-col">
        <div>Recently Added</div>
        <div>...</div>
      </div>
        */}

      <div className="flex flex-col gap-8 p-4">
        <div className="text-3xl">Full Collection</div>
        <div className="flex flex-row flex-wrap items-center justify-evenly gap-4">
          {Object.keys(collectionData).map(
            (seriesKey) =>
              seriesKey && (
                <SeriesButton
                  key={seriesKey}
                  seriesData={{
                    title: seriesKey,
                    episodeCount: Object.values(
                      // @ts-expect-error umm
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                      collectionData[seriesKey].seasons,
                    ).reduce(
                      // @ts-expect-error umm
                      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                      (total, season) => total + Object.keys(season).length,
                      0,
                    ) as number,
                    // @ts-expect-error uhh
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    thumbnail: collectionData[seriesKey].thumbnail,
                    // @ts-expect-error uhh
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    tags: collectionData[seriesKey].tags,
                  }}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
}
