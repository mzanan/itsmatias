"use client";

import { posterFor } from "@/lib/video";
import type { JourneyVideo as JourneyVideoSource } from "@/lib/journey";
import { useJourneyVideo } from "./useJourneyVideo";

type JourneyVideoProps = {
  video: JourneyVideoSource;
  className?: string;
  playing?: boolean;
  near?: boolean;
};

export const JourneyVideo = ({ video, className, playing = true, near = true }: JourneyVideoProps) => {
  const { ref } = useJourneyVideo(playing);

  return (
    <video
      ref={ref}
      key={video.desktop}
      autoPlay={playing}
      muted
      loop
      playsInline
      preload={near ? "auto" : "metadata"}
      poster={posterFor(video.desktop)}
      className={className}
    >
      <source src={video.mobile} type="video/mp4" media="(max-width: 767px)" />
      <source src={video.desktop} type="video/mp4" />
    </video>
  );
};
