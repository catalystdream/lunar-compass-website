import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(moonRef: React.RefObject<any>) {
    const { camera } = useThree();
    const timeline = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (!moonRef.current) return;

        // Reset camera position
        camera.position.set(0, 0, 8);
        camera.lookAt(0, 0, 0);

        // Create a timeline that scrubs with scroll
        timeline.current = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrubbing
            },
        });

        // 0% to 50%: Rotate Moon and Zoom In
        timeline.current.to(moonRef.current.rotation, {
            y: Math.PI * 0.5, // Rotate 90 degrees
            ease: "power1.inOut",
            duration: 1,
        }, 0);

        timeline.current.to(camera.position, {
            z: 4, // Zoom in (Dolly)
            ease: "power1.inOut",
            duration: 1,
        }, 0);

        // 50% to 100%: Pan Camera to follow a cluster
        // We'll simulate this by moving the camera and looking at a new point
        timeline.current.to(camera.position, {
            x: 2,
            y: 1,
            z: 3,
            ease: "power1.inOut",
            duration: 1,
        }, 1);

        // Also rotate moon a bit more
        timeline.current.to(moonRef.current.rotation, {
            y: Math.PI * 0.8,
            x: 0.2,
            ease: "power1.inOut",
            duration: 1,
        }, 1);

        return () => {
            if (timeline.current) timeline.current.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [camera, moonRef]);

    return timeline;
}
