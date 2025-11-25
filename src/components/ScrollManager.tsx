"use client";

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollManagerProps {
    moonRef: React.RefObject<any>;
}

export default function ScrollManager({ moonRef }: ScrollManagerProps) {
    const { camera } = useThree();

    useLayoutEffect(() => {
        if (!moonRef.current) return;

        // Initial State
        camera.position.set(0, 0, 8);
        moonRef.current.rotation.y = 0;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        // Phase 1: Top to Middle (0% - 50%)
        // Moon rotates 180 degrees (PI)
        // Camera dollies in (Zoom)
        tl.to(moonRef.current.rotation, {
            y: Math.PI,
            ease: "power1.inOut",
            duration: 1,
        }, 0);

        tl.to(camera.position, {
            z: 4, // Zoom in
            ease: "power1.inOut",
            duration: 1,
        }, 0);

        // Phase 2: Middle to Bottom (50% - 100%)
        // Camera pans to follow a satellite (simulated by moving camera x/y)
        tl.to(camera.position, {
            x: 2,
            y: 1,
            z: 3,
            ease: "power1.inOut",
            duration: 1,
        }, 1);

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [camera, moonRef]);

    return null;
}
