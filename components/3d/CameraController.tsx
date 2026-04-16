"use client";

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useZModelStore } from '@/lib/store';

const ORBITAL_POS = new THREE.Vector3(0, 7, 11);

export function CameraController() {
  const { camera } = useThree();
  const cameraPos = useZModelStore((s) => s.cameraPos);
  const viewState = useZModelStore((s) => s.viewState);

  // Current lookAt target (origin by default)
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos = useRef(new THREE.Vector3(0, 7, 11));

  useEffect(() => {
    if (viewState === 'ORBITAL') {
      targetPos.current.copy(ORBITAL_POS);
      lookAtTarget.current.set(0, 0, 0);
    } else if (viewState === 'CARD_FOCUS') {
      // Phase 2: Earth slides left
      targetPos.current.set(3.5, 0, 9);
      lookAtTarget.current.set(3.5, 0, 0);
    } else {
      // EARTH_FOCUS
      targetPos.current.set(...cameraPos);
      lookAtTarget.current.set(0, 0, 0);
    }
  }, [cameraPos, viewState]);

  useFrame(() => {
    // Smoothly lerp camera position
    camera.position.lerp(targetPos.current, 0.1);

    // Smoothly lerp lookAt target instead of calculating from rotation
    // This makes the camera behavior much more predictable and stable
    const lookTarget = new THREE.Vector3().copy(lookAtTarget.current);
    const cameraTarget = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    cameraTarget.lerp(lookTarget, 0.1);
    camera.lookAt(cameraTarget);
  });

  return null;
}
