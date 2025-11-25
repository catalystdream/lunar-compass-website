"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Group } from "three";

export default function Satellites() {
    const groupRef = useRef<Group>(null);
    const meshRef = useRef<InstancedMesh>(null);
    const dummy = useMemo(() => new Object3D(), []);
    const count = 12; // Reduced from 100 for performance

    // Generate random orbit parameters
    const satellites = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            radius: 2.5 + Math.random() * 2, // Distance from center (Moon radius is 2)
            speed: 0.1 + Math.random() * 0.3, // Orbit speed
            angle: Math.random() * Math.PI * 2, // Starting angle
            type: Math.random() > 0.5 ? 'polar' : 'equatorial', // Orbit type
            offset: Math.random() * Math.PI * 2, // Phase offset
        }));
    }, []);

    useFrame((state, delta) => {
        // Rotate the entire swarm slowly
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
        }

        if (meshRef.current) {
            satellites.forEach((sat, i) => {
                sat.angle += sat.speed * delta;

                if (sat.type === 'polar') {
                    // Polar orbit (around X axis roughly)
                    dummy.position.set(
                        0,
                        Math.sin(sat.angle) * sat.radius,
                        Math.cos(sat.angle) * sat.radius
                    );
                    // Add some random tilt
                    dummy.rotation.set(sat.offset, 0, 0);
                } else {
                    // Equatorial orbit (around Y axis roughly)
                    dummy.position.set(
                        Math.cos(sat.angle) * sat.radius,
                        0,
                        Math.sin(sat.angle) * sat.radius
                    );
                    // Add some random tilt
                    dummy.rotation.set(0, sat.offset, 0);
                }

                // Apply the tilt to position
                dummy.position.applyEuler(dummy.rotation);

                dummy.lookAt(0, 0, 0); // Satellites face the moon? Or direction of travel? Let's just orient them randomly or towards center.
                dummy.scale.setScalar(0.05);
                dummy.updateMatrix();
                meshRef.current!.setMatrixAt(i, dummy.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group ref={groupRef}>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <boxGeometry args={[0.5, 0.5, 1]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={1}
                    toneMapped={false} // Important for bloom
                />
            </instancedMesh>
        </group>
    );
}
