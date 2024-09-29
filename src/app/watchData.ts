"use client"

export function getContinueWatchData() {
    const watchData = JSON.parse(localStorage.getItem("continueWatchData") ?? "[]") as { title: string, time: number, data: {episode: string, season: string, timeIn: number} }[]
    return watchData.sort((a, b) => b.time - a.time)
}

export function setContinueWatchData(newContinueWatchDataItem: { title: string, time: number, data: {episode: string, season: string, timeIn: number} }) {
    const watchData = getContinueWatchData()
    if (watchData.some(data => data.title === newContinueWatchDataItem.title)) {
        watchData.splice(watchData.findIndex(data => data.title === newContinueWatchDataItem.title), 1)
    }
    watchData.push(newContinueWatchDataItem)
    localStorage.setItem("continueWatchData", JSON.stringify(watchData))
}



export function getGlobalWatchData() {
    const watchData = JSON.parse(localStorage.getItem("globalWatchData") ?? "[]") as { videoUrl: string, time: number }[]
    return watchData
}

export function setGlobalWatchData(newGlobalWatchDataItem: { videoUrl: string, time: number }) {
    const watchData = getGlobalWatchData()
    if (watchData.some(data => data.videoUrl === newGlobalWatchDataItem.videoUrl)) {
        watchData.splice(watchData.findIndex(data => data.videoUrl === newGlobalWatchDataItem.videoUrl), 1)
    }
    watchData.push(newGlobalWatchDataItem)
    localStorage.setItem("globalWatchData", JSON.stringify(watchData))
}


export function getCurrentEpisodeWatchTime(videoUrl: string): number {
    const watchData = getGlobalWatchData()
    const videoData = watchData.find(data => data.videoUrl === videoUrl)
    return videoData?.time ?? 0
}